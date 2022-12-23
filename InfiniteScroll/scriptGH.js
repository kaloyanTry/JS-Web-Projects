const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API:
let count = 5;
const apiKey = 'xxxx';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded:
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

// Helper function to set attributes on DOM elements:
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos, add to DOM:
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // Run the function for each object in photosArray:
  photosArray.forEach((photo) => {
    //Create <a> to link Unsplash:
    const item = document.createElement('a');
    //replaced with the helper function setAttributes DRY code:
    setAttributes(item, {
      htef: photo.links.html,
      target: '_blank',
    });
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');

    //Create <img> for photo:
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);

    // Event Listener, check when each is finished loading:
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer:
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API:
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    photosArray = data;
    displayPhotos();
  } catch (error) {
    // Catch the error
  }
}

// Check to see if scrolling near the bottom of the page, Load more photos:
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
