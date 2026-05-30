class Admin::LikesController < Admin::BaseController
  def index
    @likes_by_slug = PostLike.collection.aggregate([
      { "$group" => { "_id" => "$postSlug", "count" => { "$sum" => 1 } } },
      { "$sort"  => { "count" => -1 } }
    ]).to_a
  end
end
