# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: 'Ben')
User.create(username: 'Bob')
User.create(username: 'Rick')

Video.create(title: 'This is Cool', url_path: 'https://i.giphy.com/media/3o6gDUY3B8ocAgMNhu/giphy.webp', user_id: 1)
Video.create(title: 'Tru', url_path: 'https://i2.wp.com/media0.giphy.com/media/4pMX5rJ4PYAEM/giphy.gif', user_id: 2)
Video.create(title: 'Interesting', url_path: 'https://hookagency.com/wp-content/uploads/2016/03/user-experience-gif-meme-water-drinking.gif', user_id: 3)

Comment.create(content: 'Omg that is indeed cool', user_id: 2, video_id: 1)
Comment.create(content: 'Perhaps this is true', user_id: 3, video_id: 2)
Comment.create(content: 'Interesting is an interesting word', user_id: 1, video_id: 3)
Comment.create(content: 'Skinner is the best', user_id: 3, video_id: 1)
Comment.create(content: 'Metal Gear?', user_id: 1, video_id: 2)
Comment.create(content: 'Fairly Odd Parents', user_id: 2, video_id: 3)
Comment.create(content: 'This gif has inspired me to use windows as doors', user_id: 1, video_id: 1)