class InteractionsController < ApplicationController

    def like
        user = User.find_by(id: session[:user_id])
        profile = Profile.find(params[:profile_id])
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
        user = User.find_by(id: session[:user_id])
        profile = Profile.find(params[:profile_id])
        target_interaction = Interaction.find_by(:user_id => user.id, :profile_id => profile.id)

        target_interaction.update(:user_like => false, swiped_status => true)

    end

end
