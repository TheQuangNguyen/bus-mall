'use strict';

// Goals/Objectives
// track amount of clicks total
// track how many clicks for each image
// track how many times each image is displayed
// Upon a click, there should be 3 unique random images that were not duplicate of the previous 3.
// Use constructor function that creates an object for each image: 
  // name of image
  // filepath
  // number of times it has been shown 
  // number of times it has been clicked
// After 25 clicks, turn off event listeners and display a list of all images with how many clicks they received. 

// var filepaths = ['./img/bag.jpg', './img/banana.jpg', './img/bathroom.jpg', './img/boots.jpg', './img/breakfast.jpg', './img/bubblegum.jpg', './img/chair.jpg', './img/cthulhu.jpg', './img/dog-duck.jpg', './img/dragon.jpg', './img/pen.jpg', './img/pet-sweep.jpg', './img/scissors.jpg', './img/shark.jpg', './img/sweep.png', './img/tauntaun.jpg', './img/unicorn.jpg', './img/usb.gif', './img/water-can.jpg', './img/wine-glass.jpg'];

var filepaths = ['/img/bag.jpg', '/img/banana.jpg', '/img/bathroom.jpg', '/img/boots.jpg', '/img/breakfast.jpg', '/img/bubblegum.jpg', '/img/chair.jpg', '/img/cthulhu.jpg', '/img/dog-duck.jpg', '/img/dragon.jpg', '/img/pen.jpg', '/img/pet-sweep.jpg', '/img/scissors.jpg', '/img/shark.jpg', '/img/sweep.png', '/img/tauntaun.jpg', '/img/unicorn.jpg', '/img/usb.gif', '/img/water-can.jpg', '/img/wine-glass.jpg'];
var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var imgSection = document.getElementById('image');
var numberOfImg = 3;
var totalClick = 0;
var indexArray = []; 
var eventFired = false;
var imgSrc;

function Products(name, filepath) { 
  this.name = name; 
  this.filepath = filepath; 
  this.numShown = 0;
  this.numClick = 0; 
  Products.list.push(this);
}

Products.list = [];

function getRandomIndex() { 
  return Math.floor(Math.random() * filepaths.length);
}

function addImg(content) { 
  var img = document.createElement('img');
  img.className = 'images';
  img.src = content;
  imgSection.appendChild(img);
}

function removePreviousImg() { 
  var eachImage = document.getElementsByClassName('images');
  for (var i = eachImage.length; i > 0; i--) { 
    imgSection.removeChild(eachImage[eachImage.length-i]);
  }
}

function checkDuplicate(indexArray) { 
  var potentialIndex; 
  
  for(var i = 0; i < numberOfImg; i++) { 
    potentialIndex = getRandomIndex();
    if(indexArray.includes(potentialIndex) === false) { 
      Products.list[potentialIndex].numShown += 1;
      if (indexArray.length < numberOfImg*2) { 
        indexArray.push(potentialIndex);
      } else { 
        indexArray.shift();
        indexArray.push(potentialIndex);
      }
    } else { 
      i--;
    }
  }
  return indexArray;
}

function displayImages() { 
  indexArray = checkDuplicate(indexArray);

  for (var i = 1; i <= numberOfImg; i++) { 
    addImg(Products.list[indexArray[indexArray.length-i]].filepath);
  }

  eventListener(); 
}

function eventListener() { 
  var eachImage = document.getElementsByClassName('images');
  for(var i = 0; i < eachImage.length; i++) { 
    eachImage[i].addEventListener('click', eventClick);
  }
}

function checkIndex(element) { 
  return imgSrc.includes(element);
}

function eventClick(e) { 
  imgSrc = e.target.src;
  Products.list[filepaths.findIndex(checkIndex)].numClick += 1;
  removePreviousImg();
  displayImages();
  totalClick++;
}

for (var i = 0; i < filepaths.length; i++) { 
  new Products(names[i],filepaths[i]);
}
 
displayImages();

// function getRandomImages(randomImageIndex, imageSrc) { 
//   for (var i = 0; i < numberOfImg; i++) {
//     randomImageIndex = Math.floor(Math.random() * images.length);
//     imageSrc = images[randomImageIndex];
//     var img = document.createElement("img");
//     img.className = 'images';
//     img.src = imageSrc;
//     imgSection.appendChild(img);
//   }
// }

// function displayRandomImages() { 
//   var randomImageIndex;
//   var imageSrc;

//   numClick++;
//   if (numClick === 0) { 
//     getRandomImages(randomImageIndex, imageSrc);
//   } else { 
//     getRandomImages(randomImageIndex, imageSrc);
//     removePreviousImages(imgSection);
//   }

//   eachImage = document.getElementsByClassName('images');
// }

// displayRandomImages();
// var eachImage = document.getElementsByClassName('images');

// // for (var i = 0; i < eachImage.length; i++) {
//   while (numClick)

//   eachImage[0].addEventListener('click', displayRandomImages);
//   eachImage[1].addEventListener('click', displayRandomImages);
//   eachImage[2].addEventListener('click', displayRandomImages);
// // }
