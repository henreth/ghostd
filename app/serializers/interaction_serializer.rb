class InteractionSerializer < ActiveModel::Serializer
  attributes :id, :user_like, :profile_like, :swiped_status
  has_one :user
  has_one :profile
end
