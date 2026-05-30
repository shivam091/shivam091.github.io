class Admin::SubmissionsController < Admin::BaseController
  def index
    @submissions = ContactSubmission.all
  end
end
