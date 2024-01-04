document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  loadGallery();
  lazyLoadImages();
  window.addEventListener('scroll', debounce(lazyLoadImages, 20)); // Debounce scroll event
});

let box = document.querySelector('.box');
let angle = 0;

// Rotate the box using CSS transition for smooth animation
function rotateBox() {
    box.style.transition = 'transform 0.1s linear'; // Smooth transition
    box.style.transform = `perspective(1000px) rotateY(${angle}deg)`;
    angle += 0.5; // Adjust the increment for speed control
    requestAnimationFrame(rotateBox); // Continuously call rotateBox
}

rotateBox(); // Start the rotation

function debounce(func, delay) {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

function loadHeader() {
  fetch('header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header-placeholder').innerHTML = html;
    })
    .catch(error => console.error('Error loading header:', error));
}

function loadGallery() {
  const maxFolders = 12; // Maximum number of folders
  const maxImagesPerFolder = 100; // Maximum number of images per folder
  let timeList = [
    'February 2023', 'March 2023', 'April 2023', 'May 2023',
    'June 2023', 'July 2023', 'August 2023', 'September 2023',
    'October 2023', 'November 2023', 'December 2023'
  ];

  for (let folder = 0; folder < timeList.length; folder++) {
    const galleryMonthDiv = document.createElement('div');
    galleryMonthDiv.className = 'gallery-month';
    const h3 = document.createElement('h3');
    h3.textContent = timeList[folder];
    galleryMonthDiv.appendChild(h3);

    for (let image = 1; image <= maxImagesPerFolder; image++) {
      const img = document.createElement('img');
      img.dataset.src = `assets/Gallery/${'Month-'+(folder+1)}/${image}.png`;
      img.alt = `Image ${image}`;
      img.className = 'lazy-load';
      img.onerror = function() {
        this.style.display = 'none';
      };
      galleryMonthDiv.appendChild(img);
    }

    document.querySelector('.gallery-time').appendChild(galleryMonthDiv);
  }
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const offset = 100; // Preloading offset
  return (
    rect.bottom >= -offset && 
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset
  );
}

function lazyLoadImages() {
  const lazyImages = document.querySelectorAll('.lazy-load');
  lazyImages.forEach(img => {
    if (isInViewport(img) && img.dataset.src) {
      img.src = img.dataset.src;
      img.classList.remove('lazy-load');
    }
  });
}
