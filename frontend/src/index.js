const BACKEND_URL = 'localhost:3000'

document.addEventListener('DOMContentLoaded', () => {
	Videos.getVideos()
})

class Videos {
	
	static getVideos() {
		fetch(`${BACKEND_URL}/videos`)
		.then(response => response.json())
		.then(videos => {
			videos.forEach(video => makeVideo(video))
		})
	}

	static makeVideo(video) {
		let diveo = document.querySelector('div.videos')
		let vidDiv = document.createElement('div')
		vidDiv.className = `video${video.id}`

		let vidHead = document.createElement('h4')
		vidHead.textContent = video.title

		let vidURL = document.createElement('img')
		vidURL.src = video.url_path
	}
}