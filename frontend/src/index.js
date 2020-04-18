const BACKEND_URL = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded', () => {
	Video.getVideos()
	User.getUsers()
	User.addUser()
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
		let commentButton = document.createElement('button')
		commentButton.textContent = 'More Comments'

		vidDiv.appendChild(vidHead)
		vidDiv.appendChild(vidUser)
		vidDiv.appendChild(vidURL)
		vidDiv.appendChild(commentUl)
		vidDiv.appendChild(commentButton)
		diveo.appendChild(vidDiv)
		Comment.getComments(this.id)
		
		commentButton.addEventListener('click', (event) => {
			event.preventDefault()
			if (commentButton.textContent === 'More Comments') {
				commentUl.childNodes.forEach(comment => {
					comment.className = 'visible'
				})
				commentButton.textContent = 'Fewer Comments'
			} else {
				commentUl.childNodes.forEach((comment, index) => {
					index > 0 ? comment.className = 'hidden' : false

				})
				commentButton.textContent = 'More Comments'
			}
		})
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
		.then(() => {
			let commentLis = document.querySelectorAll(`div.video${video_id} ul li`)
			commentLis.forEach((li, index) => {
				if (index > 0) {
					li.className = 'hidden'
				}
			})
		})

	}

	makeComment() {
		let commentUl = document.querySelector(`div.videos div.video${this.video} ul`)
		let commentLi = document.createElement('li')
		commentLi.textContent = `${this.user.username}: ${this.content}`
		commentUl.prepend(commentLi)
	}

}

class User {

	static getUsers() {
		let userSelect = document.querySelector('div.header div.login select.users')
		fetch(`${BACKEND_URL}/users`)
		.then(resp => resp.json())
		.then(users => {
			users.forEach(user => {
				let userOption = document.createElement('option')
				userOption.value = user.id
				userOption.textContent = user.username
				userSelect.appendChild(userOption)
			})
		})
		.then(() => {
			userSelect.addEventListener('change', (event) => {
				event.preventDefault()
				let userH4 = document.querySelector('h4')
				userH4.textContent = `User: ${userSelect.selectedOptions[0].textContent}`
				userH4.value = userSelect.selectedOptions[0].value
				userH4.className = 'visible'
				document.querySelector('div.login').className = 'hidden'
			})
		})		
	}

	static addUser() {
		let userForm = document.querySelector('div.login form')
		userForm.addEventListener('submit', (event) => {
			event.preventDefault()
			let userInput = userForm.firstElementChild
			fetch(`${BACKEND_URL}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					username: `${userInput.value}`
				})
			})
			.then(resp => resp.json())
			.then(user => {
				let userH4 = document.querySelector('h4')
				userH4.textContent = `User: ${user.username}`
				userH4.value = user.id
				userH4.className = 'visible'
				document.querySelector('div.login').className = 'hidden'
			})
		})

	}

}

function uploadTime(dateTime) {
	let fixedTime = new Date(dateTime)
	return fixedTime.toLocaleString().replace(',', ' at')
}