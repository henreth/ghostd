class User < ApplicationRecord
    has_many :interactions
    has_many :profiles, through: :interactions
    
    has_secure_password

    validates :username, presence: true, uniqueness: true, length: {minimum: 4}, allow_blank: false
    validates :name, presence: true, length: {minimum: 4}, allow_blank: false
    validates :age, presence: true
    validates :pronouns, presence: true, length: {minimum: 4}, allow_blank: false
    validates :location, presence: true, length: {minimum: 2}, allow_blank: false
end
