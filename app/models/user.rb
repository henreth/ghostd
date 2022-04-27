class User < ApplicationRecord
    has_many :interactions
    has_many :profiles, through: :interactions
    
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :name, presence: true
    validates :age, presence: true
    validates :pronouns, presence: true
    validates :location, presence: true
end
