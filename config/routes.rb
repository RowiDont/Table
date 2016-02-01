Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :cities, only: [:index] do
      resources :restaurants, only: :index
    end
    resources :restaurants, only: :show do
      resources :reservations, only: :index
    end
    resource :sessions, only: [:create, :destroy, :show]
    resources :users, only: [:create]
  end


  root "static_pages#root"
end
