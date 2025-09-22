//custom cursor
const customCursor = document.getElementById('custom-cursor')

const moveCursor = (e) =>{
    const mouseY = e.clientY
    const mouseX = e.clientX

    customCursor.style.left = `${mouseX}px`
    customCursor.style.top = `${mouseY}px`
}

window.addEventListener('mousemove', moveCursor)

// Show an image from the home collection by index
let index = 0; 
let homeGallery = []; // Store the images array globally

fetch('media/images.json')
	.then(response => response.json())
	.then(data => {
		homeGallery = data.home; 
		showImage()
	});

function showImage(){
	const image = homeGallery[index]; 
	document.querySelector('.img__container img').src = image.src;
	document.querySelector('.img__container img').alt = image.alt;
	document.getElementById('title').textContent = image.title;
	document.getElementById('date').textContent = image.date;
}

function nextImage(){
	if(index === homeGallery.length - 1){ 
		index = 0
	} else{
		index++
	}
	showImage()
}

function prevImage(){
	if(index === 0){
        index = homeGallery.length - 1
    } else{
        index--
    }
    showImage()
}


// adds trigger function to window to change images
document.addEventListener('click', (event) =>{
    const ctrlContainer = document.querySelector('.ctrl__container');
    if(ctrlContainer.contains(event.target)){
        const clickX = event.clientX
        const viewportWidth = window.innerWidth

        if(clickX > viewportWidth / 2){
            nextImage()

			console.log('next')
        } else{
            prevImage()
			console.log('prev')
        }
    }    
})

document.addEventListener('mousemove', (event => {
	const ctrlContainer = document.querySelector('.ctrl__container');
	const cursor = document.getElementById('custom-cursor')
	if(ctrlContainer.contains(event.target)){
		const mouseX = event.clientX
        const viewportWidth = window.innerWidth

		if(mouseX > viewportWidth / 2){
			cursor.classList.remove('left')
			cursor.classList.add('right')
		} else {
			cursor.classList.remove('right')
			cursor.classList.add('left')
		}
	} else{
		cursor.classList.remove('left')
		cursor.classList.remove('right')
	}
}))