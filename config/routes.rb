Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :cities, only: [:index] do
      resources :restaurants, only: :index
    end
    resources :restaurants, only: :show do
      resources :reservations, only: :index
    end
    resource :sessions, only: [:create, :destroy, :show]
    resource :users, only: [:create, :update, :show]
    resources :reservations, only: [:create, :destroy] do
      collection do
        get :temp_get
        post :temp_set
      end
    end
    get "searchbar", to: "utils#searchbar"
  end

  get 'auth/google_oauth2/callback', to: 'api/sessions#omniauth_google'



  root "static_pages#root"
end
