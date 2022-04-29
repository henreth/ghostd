class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def show
        user = find_user
        render json: user
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id

        profile_array = Profile.all.shuffle.collect do |prof| 
            prof.id
        end

        count = 0
        while count < profile_array.length do
            if count < 14 
                Interaction.create(user_id: user.id, profile_id: profile_array[count], user_like: nil, profile_like: true, swiped_status: false)
            else
                Interaction.create(user_id: user.id, profile_id: profile_array[count], user_like: nil, profile_like: false, swiped_status: false)
            end

            count += 1
        end

        render json: user, status: :created
    end

    def update
        @current_user.update!(user_params)
        render json: @current_user
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

    def unswiped_likes
        user = find_user
        target_profiles = user.interactions.where(swiped_status: false, profile_like: true).collect do |target|
            target.profile
        end

        render json: target_profiles
    end

    private 

    def user_params 
        params.permit(:name, :pronouns, :age, :description, :location, :image, :username, :password, :password_confirmation)
    end

    def find_user 
        User.find_by(id: session[:user_id])
    end
end
