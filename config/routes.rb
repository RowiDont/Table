Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :cities, only: [:index, :show]
    resources :restaurants, only: [:index, :show]
  end

  root "static_pages#root"
end
