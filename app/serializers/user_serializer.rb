class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :pronouns, :age, :description, :location, :image, :username

  has_many :profiles
end
