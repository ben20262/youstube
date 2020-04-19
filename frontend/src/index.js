const BACKEND_URL = 'http://localhost:3000'

document.addEventListener('DOMContentLoaded', () => {
	Video.getVideos()
	User.getUsers()
	User.addUser()
	Video.addVideo()
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
				vidDiv.querySelector('form').className = 'visible'
				commentButton.textContent = 'Fewer Comments'
			} else {
				commentUl.childNodes.forEach((comment, index) => {
					index > 0 ? comment.className = 'hidden' : false

				})
				vidDiv.querySelector('form').className = 'hidden'
				commentButton.textContent = 'More Comments'
			}
		})
	}

	static addVideo() {
		let videoButton = document.querySelector('div.videos button')
		videoButton.addEventListener('click', (event) => {
			event.preventDefault()
			if (videoButton.textContent === 'Add Video')
			{	document.querySelector('div.videos form').className = 'visible'
				videoButton.textContent = 'Cancel'
			}	else {
				document.querySelector('div.videos form').className = 'hidden'
				videoButton.textContent = 'Add Video'
			}
		})

		let videoForm = document.querySelector('div.videos form')
		videoForm.addEventListener('submit', event => {
			event.preventDefault()
			let videoArray = videoForm.querySelectorAll('input')
			let user_id = document.querySelector('div.header h4').id
			if (user_id === '') {
				document.querySelector('div.header div.login').style.outline = 'red solid 2px'
				alert('Please Log In')
				setTimeout(() => {document.querySelector('div.header div.login').style.outline = 'none'}, 5000)
			} else if (videoArray[0].value === '' || videoArray[1].value === '') {
				videoForm.style.outline = 'red solid 2px'
				alert('Please Add Information')
				setTimeout(() => {videoForm.style.outline = 'none'}, 5000)
			} else {
			fetch(`${BACKEND_URL}/videos`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					title: videoArray[0].value,
					url_path: videoArray[1].value,
					user_id: user_id
				})
			})
			.then(resp => resp.json())
			.then(video => {
				new this(video)
				videoForm.className = 'hidden'
				videoButton.textContent = 'Add Video'
			})
		}})
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
			this.addComment(video_id)
		})

	}

	makeComment() {
		let commentUl = document.querySelector(`div.videos div.video${this.video} ul`)
		let commentLi = document.createElement('li')
		commentLi.textContent = `${this.user.username}: ${this.content}`
		commentUl.prepend(commentLi)
	}

	static addComment(video_id) {
		let vidDiv = document.querySelector(`div.video${video_id}`)
		let commentForm = document.createElement('form')
		commentForm.className = 'hidden'

		let commentContent = document.createElement('input')
		commentContent.type = 'text'
		commentContent.name = 'content'
		commentContent.placeholder = 'New Comment'
		commentForm.appendChild(commentContent)

		let commentSubmit = document.createElement('input')
		commentSubmit.type = 'submit'
		commentSubmit.value = 'Comment'
		commentForm.appendChild(commentSubmit)

		vidDiv.insertBefore(commentForm, vidDiv.lastChild)

		commentForm.addEventListener('submit', (event) => {
			let user_id = document.querySelector('div.header h4').id
			event.preventDefault()
			if (user_id === '') {
				document.querySelector('div.header div.login').style.outline = 'red solid 2px'
				alert('Please Log In')
				setTimeout(() => {document.querySelector('div.header div.login').style.outline = 'none'}, 5000)
			} else if (commentContent.value === '') {
				commentContent.style.outline = 'red solid 2px'
				alert('Please Make a Comment')
				setTimeout(() => {commentContent.style.outline = 'none'}, 5000)
			} else {
				fetch(`${BACKEND_URL}/videos/${video_id}/comments`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					body: JSON.stringify({
						content: commentContent.value,
						user_id: user_id,
						video_id: video_id
					})
				})
				.then(resp => resp.json())
				.then(comment => {
					new this(comment)
					commentContent.value = ''
				})
			}
		})
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
				userH4.id = userSelect.selectedOptions[0].value
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
					username: userInput.value
				})
			})
			.then(resp => resp.json())
			.then(user => {
				let userH4 = document.querySelector('h4')
				userH4.textContent = `User: ${user.username}`
				userH4.id = user.id
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