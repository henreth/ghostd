class InteractionsController < ApplicationController

    def index
        interactions = Interaction.all
        render json: interactions
    end

    def like
        user = find_user
        profile = find_profile
        target_interaction = Interaction.find_by(:user_id => user.id, :profile_id => profile.id)

        target_interaction.update(:user_like => true, swiped_status => true)

        if target_interaction.profile_like = true
            response = true
            render json: response
        else
            response = false
            render json: response
        end

    end

    def dislike
        user = find_user
        profile = find_profile
        target_interaction = Interaction.find_by(:user_id => user.id, :profile_id => profile.id)

        target_interaction.update(:user_like => false, swiped_status => true)

    end

    def undo 
        user = find_user
        profile = find_profile
        target_interaction = Interaction.find_by(:user_id => user.id, :profile_id => profile.id)

        target_interaction.update(:user_like => nil, swiped_status => false)
    end

    def unmatch
        user = find_user
        profile = find_profile
        target_interaction = Interaction.find_by(:user_id => user.id, :profile_id => profile.id)

        target_interaction.update(:user_like => false)
    end

    private 

    def find_user
        User.find_by(id: session[:user_id])
    end

    def find_profile
        Profile.find(params[:profile_id])
    end

end
