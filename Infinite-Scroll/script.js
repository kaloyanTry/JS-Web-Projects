const imageCOntainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count = 10;
const apiKey = 'feQLq78AH8p5V_zvT0iVYFHSX98EocvIyUv7y-08KxA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to set attributes

function displayPhotos() {
  photosArray.forEach((photo) => {});
}

// Get photos from Unsplash
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    photosArray = data;
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // Catche the error
    console.log(error);
  }
}

getPhotos();
