'use strict';

var imgSection = document.getElementById('image');
var images = ['./img/bag.jpg', './img/banana.jpg', './img/bathroom.jpg', './img/boots.jpg', './img/breakfast.jpg', './img/bubblegum.jpg', './img/chair.jpg', './img/cthulhu.jpg', './img/dog-duck.jpg', './img/dragon.jpg', './img/pen.jpg', './img/pet-sweep.jpg', './img/scissors.jpg', './img/shark.jpg', './img/tauntaun.jpg', './img/unicorn.jpg', './img/usb.gif', './img/water-can.jpg', './img/wine-glass.jpg'];
var numberOfImg = 3;
var numClick = -1;
var previousIndex = []; 

function getRandomImages(randomImageIndex, imageSrc) { 
  for (var i = 0; i < numberOfImg; i++) {
    randomImageIndex = Math.floor(Math.random() * images.length);
    imageSrc = images[randomImageIndex];
    var img = document.createElement("img");
    img.className = 'images';
    img.src = imageSrc;
    imgSection.appendChild(img);
  }
}

function removePreviousImages(parentElement) { 
  for (var i = 0; i < numberOfImg; i++) { 
    parentElement.removeChild(eachImage[i]);
  }
}

function displayRandomImages() { 
  var randomImageIndex;
  var imageSrc;

  numClick++;
  if (numClick === 0) { 
    getRandomImages(randomImageIndex, imageSrc);
  } else { 
    getRandomImages(randomImageIndex, imageSrc);
    removePreviousImages(imgSection);
  }

}

displayRandomImages();

var eachImage = document.getElementsByClassName('images');

for (var i = 0; i < eachImage.length; i++) {
  eachImage[i].addEventListener('click', displayRandomImages);
}
