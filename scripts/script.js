// Show an image from the home collection by index
let index = 0; 
fetch('media/images.json')
	.then(response => response.json())
	.then(data => {
		const image = data.home[index];
		document.querySelector('.img__container img').src = image.src;
		document.querySelector('.img__container img').alt = image.alt;
		document.getElementById('title').textContent = image.title;
		document.getElementById('date').textContent = image.date;
	});
