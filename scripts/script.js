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
let homeGallery = []; 

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


//hamburger toggle

const menuButton = document.querySelector('.hamburger-icon')
menuButton.addEventListener('click', () =>{
	toggleNavMenu()
    menuButton.classList.toggle('clicked')
})

function toggleNavMenu () {
    const nav = document.querySelector('.menu-nav')
	const navListItems = document.querySelectorAll('.menu-nav li')

    if(nav.classList.contains('active')){
		setTimeout(() =>{
        	nav.classList.remove('active')
		},1000)

		navListItems.forEach((item, i) => {
			setTimeout(() => {
				item.classList.remove('show');
			}, i * 100);
		});
    } 
	
	else{
        nav.classList.add('active')
		navListItems.forEach((item, i) => {
			setTimeout(() => {
				item.classList.add('show');
			}, i * 100); 
		});
    }
}

//remove current active section

const menuListItems = document.querySelectorAll('.menu-nav li');
menuListItems.forEach(item => {
	item.addEventListener('click', () => {
		const galleryContainer = document.querySelector('.gallery');
		if (item.id === 'gallery') {
			galleryContainer.classList.remove('hidden');
		} else {
			galleryContainer.classList.add('hidden');
		}
	});
});
