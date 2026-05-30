require "net/http"
require "json"

class Api::V1::ContactController < ApplicationController
  def create
    unless params[:name].present? && params[:email].present? &&
           params[:message].present? && params[:token].present?
      return render json: { error: "All fields are required" }, status: :unprocessable_entity
    end

    unless verify_recaptcha(params[:token])
      return render json: { error: "reCAPTCHA verification failed" }, status: :forbidden
    end

    ContactSubmission.create!(
      name:      params[:name].strip,
      email:     params[:email].strip.downcase,
      message:   params[:message].strip,
      createdAt: Time.current
    )

    render json: { success: true }
  rescue => e
    Rails.logger.error("Contact create error: #{e}")
    render json: { error: "Failed to save message" }, status: :internal_server_error
  end

  private

  def verify_recaptcha(token)
    secret = ENV["RECAPTCHA_SECRET_KEY"]
    return true if secret.blank?

    response = Net::HTTP.post_form(
      URI("https://www.google.com/recaptcha/api/siteverify"),
      secret: secret, response: token
    )
    data = JSON.parse(response.body)
    data["success"] && data.fetch("score", 1.0).to_f >= 0.5
  end
end
