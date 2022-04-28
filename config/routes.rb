Rails.application.routes.draw do
  # resources :interactions
  # resources :profiles
  # resources :users

  # Profiles 
  get "/profiledeck", to: "profiles#index"

  # Users
  get "/me", to: "users#show"
  get "/matches", to: "users#matching_profiles"

end
