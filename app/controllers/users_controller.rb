class UsersController < ApplicationController

    def show
        user = find_user
        render json: user
    end

    def matching_profiles
        user = find_user
        matches = user.interactions.where(user_like: true, profile_like: true).collect do |match|
            match.profile
        end

        matches.to_json

    end

    private 

    def user_params 
        params.permit(:name, :pronouns, :age, :description, :location, :image, :username, :password, :password_confirmation)
    end

    def find_user 
        User.find_by(id: session[:user_id])
    end
end
