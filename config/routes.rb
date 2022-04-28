Rails.application.routes.draw do
  # resources :interactions
  # resources :profiles
  resources :users

  # Profiles 
  get "/profiledeck", to: "profiles#index"
  get "/profile/:id", to: "profiles#show"

  # Users
  get "/matches", to: "users#matching_profiles"
  get "/unswiped_profiles", to: "users#unswiped_profiles"

  # Authorization
  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Interactions
  post "/like", to: "interactions#like"
  post "/dislike", to: "interactions#dislike"

  ## All route name changes
    ##"/profiles" to "/profiledeck"

end
