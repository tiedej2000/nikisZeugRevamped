//custom cursor
const customCursor = document.getElementById('custom-cursor')

const moveCursor = (e) =>{
    const mouseY = e.clientY
    const mouseX = e.clientX

    customCursor.style.left = `${mouseX}px`
    customCursor.style.top = `${mouseY}px`
}

window.addEventListener('mousemove', moveCursor)

// Gallery configuration - change this to switch galleries
let GALLERY_SET = 'home'; // Options: 'home', 'mfrits'

let index = 0; 
let currentGallery = []; 

let allData = {};

fetch('data/images.json')
	.then(response => response.json())
	.then(data => {
		allData = data;
		currentGallery = data[GALLERY_SET]; 
		showImage()
	});

function changeGallery(galleryName) {
	GALLERY_SET = galleryName;
	currentGallery = allData[GALLERY_SET];
	index = 0;
	showGallery()
	showImage();
}

function showGallery() {
	const projectSection = document.querySelector('section.projects')
	projectSection.classList.add('hide')
	setTimeout(()=>{
		projectSection.classList.add('hidden')
		projectSection.classList.remove('show')
	},500)

	const gallerySection = document.querySelector('section.gallery')
	gallerySection.classList.remove('hide')
	setTimeout(()=>{
		gallerySection.classList.remove('hidden')
		gallerySection.classList.add('show')
	},500)

	playLoading()
} 

function showImage(){
	const image = currentGallery[index];
	if(image.src){
		document.querySelector('.img__container img').src = image.src;
	}

	if(image.alt){
		document.querySelector('.img__container img').alt = image.alt;
	}

	if(image.title){
		document.getElementById('title').textContent = image.title;
	}

	if(image.info){
		document.getElementById('info').textContent = image.info;
	}

}

function nextImage(){
	if(index === currentGallery.length - 1){ 
		index = 0
	} else{
		index++
	}
	showImage()
}

function prevImage(){
	if(index === 0){
        index = currentGallery.length - 1
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

/* hamburger toggle

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

*/

function playLoading (){
	const body = document.querySelector('body')

	body.classList.add('active')

	setTimeout(()=>{
		body.classList.remove('active')
	},1000)
}

// hide show sections
const menuItems = document.querySelectorAll('.nav-right li');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetSection = document.querySelector(`.${item.id}`);
        
        // Hide all sections except the target one
        document.querySelectorAll('section').forEach(section => {
            if (section !== targetSection) {
				section.classList.add('hide')
                setTimeout(()=>{
                    section.classList.add('hidden')
					section.classList.remove('show')
                },500)
            }
        });
        
        // Show the target section
        if (targetSection) {
			targetSection.classList.remove('hide')
            setTimeout(()=>{
				targetSection.classList.remove('hidden')
				targetSection.classList.add('show')
			},500)
        }
		
		// toggleNavMenu()
		playLoading()
    });
});

