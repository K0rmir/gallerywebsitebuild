const galleryContainer = document.getElementById("galleryContainer");
const selectedImage = document.getElementById("displayImage");
const clickprevImg = document.getElementById("prev");
const clicknextImg = document.getElementById("next");
const thumbnails = document.getElementsByClassName('thumbnail');
const imgArray = []
const imgArrayFull = []
let currentImgPosition = 0;

// ----------------- //

// This function calls the API //
async function getImages() {
    const response = await fetch ("https://api.unsplash.com/search/photos?query=planets&per_page=10&orientation=landscape&client_id=ktSsmhPqav1bu-7fZIYJRJUE0PzY1B5vKjCzjfMF1gA");
    const json = await response.json();
    displayImages(json.results);
};

getImages();

// This function takes the data from the API and creates image elements with the URL's as a source //

async function displayImages(data) {
    data.forEach(function (thumbnailObject, index) {
        const thumbnail = document.createElement("img");
        thumbnail.src = thumbnailObject.urls.thumb;
        thumbnail.alt = thumbnailObject.alt_description;
        thumbnail.classList.add("thumbnail");
        document.getElementById("thumbnails").appendChild(thumbnail);
// Push imgs to array //
        imgArray.push(thumbnail.src);
        imgArrayFull.push(thumbnailObject.urls.full);
// Make the image larger on click & highlight //
        thumbnail.addEventListener("click", function () {  
            selectedImage.src = thumbnailObject.urls.full;
            selectedImage.alt = thumbnailObject.alt_description;
            selectedImage.classList.add("displayImage");
            currentImgPosition = index;
            updateThumbnailHighlight();
        });         
    });
};

// Functions to cycle left and right through img thumbnails //

function nextImg () {
    if (currentImgPosition === 9) {
        currentImgPosition = 0
        selectedImage.src = imgArrayFull[currentImgPosition];
    } else {
        currentImgPosition++;
        selectedImage.src = imgArrayFull[currentImgPosition];
    }
    updateThumbnailHighlight();
};

function prevImg() {
    if (currentImgPosition === 0) {
        currentImgPosition = 9
        selectedImage.src = imgArrayFull[currentImgPosition];
    } else {
        currentImgPosition--;
        selectedImage.src = imgArrayFull[currentImgPosition];
    }
    updateThumbnailHighlight();
};

// Function to highlight the thumbnail of the current image //

function updateThumbnailHighlight() {
    for (let i = 0; i < thumbnails.length; i++) {
      thumbnails[i].classList.remove('selectedThumbnail');
    }

    thumbnails[currentImgPosition].classList.add('selectedThumbnail');
};

// Event listeners to cycle through images on click //

clicknextImg.addEventListener("click", function() {
    nextImg();
});

clickprevImg.addEventListener("click", function() {
    prevImg();
});

 // Event listeners to cycle through images on left/right arrow key press //

window.addEventListener("keydown", function (event){
    if (event.code === "ArrowLeft") {
        prevImg();
    }
});

window.addEventListener("keydown", function (event){
    if (event.code === "ArrowRight") {
        nextImg();
    }
});

// --------------------- //






