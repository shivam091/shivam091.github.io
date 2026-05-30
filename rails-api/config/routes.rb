Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "contact", to: "contact#create"

      scope "posts/:slug" do
        get  "likes",    to: "posts/likes#show"
        post "likes",    to: "posts/likes#toggle"
        get  "comments", to: "posts/comments#index"
        post "comments", to: "posts/comments#create"
      end
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
