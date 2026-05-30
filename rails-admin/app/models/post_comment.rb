class PostComment
  include Mongoid::Document

  store_in collection: "post_comments"

  field :postSlug,  type: String
  field :name,      type: String
  field :email,     type: String
  field :body,      type: String
  field :status,    type: String, default: "pending"
  field :createdAt, type: Time

  scope :pending,  -> { where(status: "pending") }
  scope :approved, -> { where(status: "approved") }

  default_scope -> { order_by(createdAt: :desc) }
end
