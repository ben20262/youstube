class Comment < ApplicationRecord
  validates :content, :user_id, :video_id, presence: true

  belongs_to :user
  belongs_to :video
end
