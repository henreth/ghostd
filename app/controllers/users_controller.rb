class UsersController < ApplicationController

    def show
        user = find_user
        render json: user
    end

    private 

    def user_params 
        params.permit(:name, :pronouns, :age, :description, :location, :image, :username, :password, :password_confirmation)
    end

    def find_user 
        User.find_by(id: session[:user_id])
    end
end
