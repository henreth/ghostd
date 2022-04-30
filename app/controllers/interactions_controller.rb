class InteractionsController < ApplicationController

    def index
        user = find_user
        interactions = user.interactions.all
        render json: interactions
    end

    def like
        user = find_user
        profile = find_profile
        target_interaction = Interaction.find_by(:user_id => user.id, :profile_id => profile.id)

        target_interaction.update(:user_like => true, :swiped_status => true)

        if target_interaction.profile_like == true
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

        target_interaction.update(:user_like => false, :swiped_status => true)

        if target_interaction.profile_like == true
            response = true
            render json: response
        else
            response = false
            render json: response
        end

    end

    def undo 
        user = find_user
        profile = find_profile
        target_interaction = Interaction.find_by(:user_id => user.id, :profile_id => profile.id)

        target_interaction.update(:user_like => nil, :swiped_status => false)
    end

    def unmatch
        user = find_user
        profile = find_profile
        target_interaction = Interaction.find_by(:user_id => user.id, :profile_id => profile.id)

        target_interaction.update(:user_like => false)
    end

    def reset
        user = find_user
        target_interactions = Interaction.where(user_id: user.id)

        ### destroys all previous interactions
        target_interactions.destroy_all

        ### creates new likes
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

        render json: profile_array
    end

    private 

    def find_user
        User.find_by(id: session[:user_id])
    end

    def find_profile
        Profile.find(params[:profile_id])
    end

end
