class User < ApplicationRecord
    has_many :interactions
    has_many :profiles, through: :interactions
end
