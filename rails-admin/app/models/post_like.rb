class PostLike
  include Mongoid::Document

  store_in collection: "post_likes"

  field :postSlug,  type: String
  field :userId,    type: String
  field :createdAt, type: Time
end
