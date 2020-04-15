class User < ApplicationRecord
    validates :username, presence: true
    
    has_many :videos
    has_many :comments
end
