class ProfilesController < ApplicationController

    def index 
        profiles = Profile.all.shuffle
        render json: profiles
    end

end
