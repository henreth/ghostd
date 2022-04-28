class InteractionsController < ApplicationController

    def like
        user = User.find_by(id: session[:user_id])
        profile = Profile.find(params[:profile_id])
        target_interaction = Interaction.find_by(:user_id => user.id, :profile_id => profile.id)

        if target_interaction.exists?
            target_interaction.update(:user_like => true, swiped_status => true)

            response = true
            render json: response

        else
            Interaction.create(user_id: user.id, profile_id: profile.id, user_like: true, profile_like: nil, swiped_status: true)

            response = false
            render json: response
        end



    end

end
