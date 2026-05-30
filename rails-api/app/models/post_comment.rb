class PostComment
  include Mongoid::Document

  store_in collection: "post_comments"

  field :postSlug,  type: String
  field :name,      type: String
  field :email,     type: String
  field :body,      type: String
  field :status,    type: String, default: "pending"
  field :createdAt, type: Time
end
