class Admin::CommentsController < Admin::BaseController
  def index
    @comments = PostComment.all
  end

  def update
    comment = PostComment.find(params[:id])
    comment.update!(status: "approved")

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.replace(
          "comment_#{comment.id}",
          partial: "admin/comments/comment",
          locals: { comment: }
        )
      end
      format.html { redirect_to admin_comments_path, notice: "Comment approved." }
    end
  end

  def destroy
    comment = PostComment.find(params[:id])
    comment.destroy

    respond_to do |format|
      format.turbo_stream { render turbo_stream: turbo_stream.remove("comment_#{comment.id}") }
      format.html { redirect_to admin_comments_path, notice: "Comment deleted." }
    end
  end
end
