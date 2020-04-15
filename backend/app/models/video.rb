class Video < ApplicationRecord
  validates :title, :url_path, :user_id, presence: true

  belongs_to :user
  has_many :comments
end
