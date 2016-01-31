Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :cities, only: [:index] do
      resources :restaurants, only: :index
    end
    resources :restaurants, only: :show do
      resources :reservations, only: :index
    end
  end

  resources :sessions, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  root "static_pages#root"
end
