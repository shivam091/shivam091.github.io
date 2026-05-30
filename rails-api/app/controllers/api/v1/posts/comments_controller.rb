class Api::V1::Posts::CommentsController < ApplicationController
  def index
    comments = PostComment
      .where(postSlug: params[:slug], status: "approved")
      .order_by(createdAt: :desc)
      .map { |c| { name: c.name, body: c.body, createdAt: c.createdAt } }

    render json: { comments: }
  end

  def create
    name  = params[:name]&.strip
    email = params[:email]&.strip&.downcase
    body  = params[:body]&.strip

    unless name.present? && email.present? && body.present?
      return render json: { error: "name, email, and body are required" }, status: :unprocessable_entity
    end

    PostComment.create!(
      postSlug:  params[:slug],
      name:,
      email:,
      body:,
      status:    "pending",
      createdAt: Time.current
    )

    render json: { success: true }, status: :created
  rescue => e
    Rails.logger.error("Comment create error: #{e}")
    render json: { error: "Failed to save comment" }, status: :internal_server_error
  end
end
