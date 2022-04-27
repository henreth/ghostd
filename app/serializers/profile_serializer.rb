class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :name, :pronouns, :age, :description, :location, :image
end
