Rails.application.routes.draw do
  # resources :interactions
  # resources :profiles
  # resources :users

  # Profiles 
  get "/profiledeck", to: "profiles#index"

  # Users
  get "/me", to: "users#show"
  get "/matches", to: "users#matching_profiles"
  get "/unswiped_profiles", to "users#unswiped_profiles"

  ## All route name changes
    ##"/profiles" to "/profiledeck"

end
