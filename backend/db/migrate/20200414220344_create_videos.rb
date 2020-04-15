class CreateVideos < ActiveRecord::Migration[6.0]
  def change
    create_table :videos do |t|
      t.string :title
      t.string :url_path
      t.references :user, null: false, foreign_key: true

      t.datetime :created_at
    end
  end
end
