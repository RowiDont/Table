Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :cities, only: [:index, :show] do
      resources :restaurants, only: :index
    end
    resources :restaurants, only: :show
  end

  root "static_pages#root"
end
