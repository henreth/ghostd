Rails.application.routes.draw do
  resources :users

  # Profiles 
  get "/profiledeck", to: "profiles#index"
  get "/profile/:id", to: "profiles#show"

  # Users
  get "/matches", to: "users#matching_profiles"
  get "/unswiped_profiles", to: "users#unswiped_profiles"
  get "/unswiped_likes", to: "users#unswiped_likes"

  # Authorization
  get "/me", to: "users#show"

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"

  delete "/logout", to: "sessions#destroy"

  # Interactions
  get "/all_interactions", to: "interactions#index"

  post "/reset", to: "interactions#reset"
  
  patch "/like", to: "interactions#like"
  patch "/dislike", to: "interactions#dislike"
  patch "/undo", to: "interactions#undo"
  patch "/unmatch", to: "interactions#unmatch"

end
