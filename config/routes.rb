Rails.application.routes.draw do
  # resources :interactions
  # resources :profiles
  # resources :users

  # Profiles 
  get "/profiledeck", to: "profiles#index"

  # Users
  get "/me", to: "users#show"

end
