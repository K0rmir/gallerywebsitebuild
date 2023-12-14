const galleryContainer = document.getElementById("galleryContainer");
const selectedImage = document.getElementById("displayImage");
const prevImg = document.getElementById("prev");
const nextImg = document.getElementById("next");
const imgArray = []
let indexPosition = 0

// This function calls the API //
async function getImages() {
    const response = await fetch ("https://api.unsplash.com/search/photos?query=planets&per_page=10&orientation=landscape&client_id=ktSsmhPqav1bu-7fZIYJRJUE0PzY1B5vKjCzjfMF1gA");
    const json = await response.json();
    displayImages(json.results);
};

getImages();

// This function takes the data from the API and creates image elements with the URL's as a source //

async function displayImages(data) {
    data.forEach(function (thumbnailObject) {
        const thumbnail = document.createElement("img");
        thumbnail.src = thumbnailObject.urls.thumb;
        thumbnail.alt = thumbnailObject.alt_description;
        thumbnail.classList.add("thumbnail");
        document.getElementById("thumbnails").appendChild(thumbnail);
// Push imgs to array //
        imgArray.push(thumbnail.src);
        console.log(imgArray);
// Make the image larger on click //
        thumbnail.addEventListener("click", function () {  
            selectedImage.src = thumbnailObject.urls.full;
            selectedImage.alt = thumbnailObject.alt_description;
            selectedImage.classList.add("displayImage");
            });
    });
};

displayImages();

nextImg.addEventListener("click", function() {
    indexPosition++;
    selectedImage.src = imgArray[indexPosition];
    if (indexPosition === 10) {
        indexPosition = 0
    }
});

prevImg.addEventListener("click", function() {
    indexPosition--;
    selectedImage.src = imgArray[indexPosition];
    if (indexPosition === 0) {
        indexPosition = 10
    }
});




