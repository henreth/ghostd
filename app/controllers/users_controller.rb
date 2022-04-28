class UsersController < ApplicationController

    def show
        user = find_user
        render json: user
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def matching_profiles
        user = find_user
        matches = user.interactions.where(user_like: true, profile_like: true).collect do |match|
            match.profile
        end

        render json: matches
    end

    def unswiped_profiles
        user = find_user
        fresh_profiles = user.interactions.where(swiped_status: false).collect do |fresh|
            fresh.profile
        end

        render json: fresh_profiles
    end

    private 

    def user_params 
        params.permit(:name, :pronouns, :age, :description, :location, :image, :username, :password, :password_confirmation)
    end

    def find_user 
        User.find_by(id: session[:user_id])
    end
end
