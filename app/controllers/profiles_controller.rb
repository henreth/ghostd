class ProfilesController < ApplicationController

    def index 
        profiles = Profile.all.shuffle
        render json: profiles
    end

    def show
        profile = Profile.find(params[:id])
        render json: profile
    end

end
