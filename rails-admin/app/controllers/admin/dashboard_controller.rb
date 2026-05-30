class Admin::DashboardController < Admin::BaseController
  def index
    @submission_count = ContactSubmission.count
    @comment_count    = PostComment.count
    @like_count       = PostLike.count
    @pending_count    = PostComment.pending.count
  end
end
