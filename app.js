const galleryContainer = document.getElementById("galleryContainer");
const thumbnailContainer = document.getElementById("thumbnailContainer");
const selectedImage = document.getElementById("imgPopUp");

// This function calls the API and fetches an amount of random images. //
async function getImages() {
    const response = await fetch ("https://api.unsplash.com/photos/space?orientation=landscape?client_id=ktSsmhPqav1bu-7fZIYJRJUE0PzY1B5vKjCzjfMF1gA");
    const json = await response.json();
    return json;
};

getImages();

async function displayImages() {
    const imageData = await getImages();
    for (let i = 0; i < imageData.length; i++) {
        const thumbnail = document.createElement("img");
        thumbnail.src = imageData[i].url;
        thumbnail.alt = "";
        thumbnail.classList.add("thumbnail");
        thumbnail.addEventListener('click', () => showPreview(index));
        thumbnailContainer.appendChild(thumbnail);        
    };
};

// showPreview(0);

displayImages();





