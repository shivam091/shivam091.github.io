Rails.application.routes.draw do
  devise_for :admin_users, path: "auth", path_names: {
    sign_in: "login",
    sign_out: "logout"
  }

  authenticate :admin_user do
    namespace :admin do
      root "dashboard#index"
      resources :submissions, only: [:index]
      resources :comments,    only: [:index, :update, :destroy]
      resources :likes,       only: [:index]
    end
  end

  root to: redirect("/admin")

  get "up" => "rails/health#show", as: :rails_health_check
end
