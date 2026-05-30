class Api::V1::Posts::LikesController < ApplicationController
  before_action :set_slug
  before_action :require_auth, only: [:toggle]

  def show
    count = PostLike.where(postSlug: @slug).count
    liked = current_user_id ? PostLike.where(postSlug: @slug, userId: current_user_id).exists? : false
    render json: { count:, likedByUser: liked }
  end

  def toggle
    existing = PostLike.find_by(postSlug: @slug, userId: current_user_id)

    if existing
      existing.destroy
      render json: { success: true, liked: false, count: PostLike.where(postSlug: @slug).count }
    else
      PostLike.create!(postSlug: @slug, userId: current_user_id, createdAt: Time.current)
      render json: { success: true, liked: true, count: PostLike.where(postSlug: @slug).count }
    end
  rescue Mongo::Error::OperationFailure => e
    raise unless e.message.include?("11000")
    render json: { success: true, liked: true, count: PostLike.where(postSlug: @slug).count }
  end

  private

  def set_slug
    @slug = params[:slug]
  end
end
