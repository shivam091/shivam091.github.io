class ApplicationController < ActionController::API
  private

  def require_auth
    render json: { error: "Authentication required" }, status: :unauthorized unless current_user_id
  end

  def current_user_id
    return @current_user_id if defined?(@current_user_id)

    token = request.headers["Authorization"]&.delete_prefix("Bearer ")
    return @current_user_id = nil if token.blank?

    secret = ENV.fetch("NEXTAUTH_SECRET") { return @current_user_id = nil }
    payload = JWT.decode(token, secret, true, algorithms: ["HS256"]).first
    @current_user_id = payload["sub"]
  rescue JWT::DecodeError
    @current_user_id = nil
  end
end
