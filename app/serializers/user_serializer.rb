class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :pronouns, :age, :description, :location, :image

  has_many :profiles
end
