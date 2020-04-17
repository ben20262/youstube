const BACKEND_URL = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded', () => {
	Video.getVideos()
})

class Video {

	constructor(video) {
		this.id = video.id
		this.title = video.title
		this.url = video.url_path
		this.uploaded = uploadTime(video.created_at)
		this.user = video.user

		this.makeVideo()
	}
	
	static getVideos() {
		fetch(`${BACKEND_URL}/videos`)
		.then(response => response.json())
		.then(videos => {
			videos.forEach(video => new this(video))
		})
	}

	makeVideo() {
		let diveo = document.querySelector('div.videos')
		let vidDiv = document.createElement('div')
		vidDiv.className = `video${this.id}`

		let vidHead = document.createElement('h4')
		vidHead.textContent = this.title

		let vidURL = document.createElement('img')
		vidURL.src = this.url

		let vidUser = document.createElement('p')
		vidUser.textContent = `Uploaded by ${this.user.username} on ${this.uploaded}`

		let commentUl = document.createElement('ul')

		vidDiv.appendChild(vidHead)
		vidDiv.appendChild(vidUser)
		vidDiv.appendChild(vidURL)
		vidDiv.appendChild(commentUl)
		diveo.appendChild(vidDiv)
		Comment.getComments(this.id)
	}

}

class Comment {

	constructor(comment) {
		this.id = comment.id
		this.content = comment.content
		this.user = comment.user
		this.video = comment.video_id
		this.uploaded = uploadTime(comment.created_at)
		this.makeComment()
	}

	static getComments(video_id) {
		fetch(`${BACKEND_URL}/videos/${video_id}/comments`)
		.then(resp => resp.json())
		.then(comments => {
			comments.forEach(comment => new this(comment))
		})
	}

	makeComment() {
		let commentUl = document.querySelector(`div.videos div.video${this.video} ul`)
		let commentLi = document.createElement('li')
		commentLi.textContent = `${this.user.username}: ${this.content}`
		commentUl.prepend(commentLi)
	}

}

function uploadTime(dateTime) {
	let fixedTime = new Date(dateTime)
	return fixedTime.toLocaleString().replace(',', ' at')
}