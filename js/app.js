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

var filepaths = ['./img/bag.jpg', './img/banana.jpg', './img/bathroom.jpg', './img/boots.jpg', './img/breakfast.jpg', './img/bubblegum.jpg', './img/chair.jpg', './img/cthulhu.jpg', './img/dog-duck.jpg', './img/dragon.jpg', './img/pen.jpg', './img/pet-sweep.jpg', './img/scissors.jpg', './img/shark.jpg', './img/sweep.png', './img/tauntaun.jpg', './img/unicorn.jpg', './img/usb.gif', './img/water-can.jpg', './img/wine-glass.jpg'];

var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var imgSection = document.getElementById('image');
var fourImg = document.getElementById('fourImg');
var numberOfImg = 3;
var totalClick = 0;
var maxClick = 25;
var indexArray = [];
var imgSrc;

function Products(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.numShown = 0;
  this.numClick = 0;
  Products.list.push(this);
}

Products.list = [];

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function addImg(content) {
  var img = document.createElement('img');
  // var caption = document.createElement('p');
  img.className = 'images';
  img.src = content;
  // caption.textContent = name;
  imgSection.appendChild(img);
  // imgSection.appendChild(caption);
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
    potentialIndex = getRandomIndex(filepaths.length);
    if(indexArray.includes(potentialIndex) === false) {
      if(totalClick < maxClick) {
        Products.list[potentialIndex].numShown += 1;
      }
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

  if(numberOfImg === 4) {
    for(var j = 0; j < numberOfImg; j++) {
      document.getElementsByClassName('images')[j].style.width = '20%';
    }
  }
  eventListener();
}

function eventListener() {
  var eachImage = document.getElementsByClassName('images');

  if (totalClick < maxClick) {
    // TODO add figcaption to every image
    for(var i = 0; i < eachImage.length; i++) {
      eachImage[i].addEventListener('click', eventClick);
    }
  } else {
    showChart();
  }
}

function checkIndex(element) {
  var test = element.split('').slice(1,filepaths.length).join('');
  return imgSrc.includes(test);
}

function eventClick(e) {
  totalClick++;
  imgSrc = e.target.src;
  Products.list[filepaths.findIndex(checkIndex)].numClick += 1;
  removePreviousImg();
  displayImages();
}

function fourButtonClick() {
  numberOfImg = 4;
  removePreviousImg();
  displayImages();
}

function showChart() {
  var labels = [];
  var numShownData = [];
  var numClickData = [];
  var colors = [];
  var percentage = [];
  var previousData = combineData();

  var canvas = document.createElement('canvas');
  var results = document.getElementById('results');
  canvas.id = 'grouped-bar-chart';
  results.appendChild(canvas);
  canvas = document.createElement('canvas');
  canvas.id = 'percentage-bar-chart';
  results.appendChild(canvas);

  for (var i = 0; i < Products.list.length; i++) {
    labels.push(previousData[i].name);
    numShownData.push(previousData[i].numShown);
    numClickData.push(previousData[i].numClick);
    percentage.push((previousData[i].numClick/previousData[i].numShown) * 100);
    var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(randomColor);
  }

  numShownData.sort(function(a,b) { 
    return b - a;
  });

  numClickData.sort(function(a,b) { 
    return b - a;
  });

  setLocalStorage(previousData);

  new Chart(document.getElementById('grouped-bar-chart'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Times Clicked',
          backgroundColor: colors[getRandomIndex(colors.length)],
          data: numClickData
        }, {
          label: 'Times Shown',
          backgroundColor: colors[getRandomIndex(colors.length)],
          data: numShownData
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Comparison of Times Clicked and Times Shown For Each Product'
      },
      responsive: false,
      maintainAspectRatio: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            }
          }
        ]
      }
    }
  });

  new Chart(document.getElementById('percentage-bar-chart'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Percentage of clicks based on number of times shown',
          backgroundColor: colors,
          data: percentage
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Percentage Of Clicks Based On Number Of Times Shown'
      },
      legend: { display: false},
      responsive: false,
      maintainAspectRatio: true,
    }
  });
}

function getLocalStorage() {
  var lsData = localStorage.getItem('savedData');
  if (lsData) {
    var previousData = JSON.parse(lsData);
    return previousData;
  }
}

function combineData() {
  var previousData = getLocalStorage();
  for (var i = 0; i < previousData.length; i++) {
    previousData[i].numClick = previousData[i].numClick + Products.list[i].numClick;
    previousData[i].numShown = previousData[i].numShown + Products.list[i].numShown;
  }

  localStorage.setItem('savedData', previousData);
  return previousData;
}

function setLocalStorage(previousData) {
  var savedData = JSON.stringify(previousData);
  localStorage.setItem('savedData', savedData);
}

function createProducts() {
  for (var i = 0; i < filepaths.length; i++) {
    new Products(names[i],filepaths[i]);
  }
  if (!localStorage.getItem('savedData')) {
    var savedData = JSON.stringify(Products.list);
    localStorage.setItem('savedData', savedData);
  }
}

createProducts();
displayImages();

fourImg.addEventListener('click', fourButtonClick);
