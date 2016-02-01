Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :cities, only: [:index] do
      resources :restaurants, only: :index
    end
    resources :restaurants, only: :show do
      resources :reservations, only: :index
    end
    resource :sessions, only: [:create, :destroy, :show]
    resources :users, only: :create
    resources :reservations, only: :create do
      collection do
        get :temp_get
        post :temp_set
      end
    end
  end


  root "static_pages#root"
end
