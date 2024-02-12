function loadHeader() {
  fetch('header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header-placeholder').innerHTML = html;
    })
    .catch(error => console.error('Error loading header:', error));
}

function changeBackgroundColor() {
  const container = document.querySelector('.container');
  // Remove the background image and set the new background color
  container.style.backgroundImage = 'none';
  container.style.backgroundColor = '#fba7bf';

  // Create an img element for the GIF
  const gif = document.createElement('img');
  gif.src = 'assets/Valentines/gif-1.gif'; // Make sure to use the correct path to your GIF
  gif.style.position = 'absolute'; // Use absolute positioning within the .container
  gif.style.top = '50%';
  gif.style.left = '50%';
  gif.style.width = '20%';
  gif.style.transform = 'translate(-50%, -50%)'; // Center the GIF
  // Calculate height as 30% of the width (aspect ratio maintenance might require additional JS if needed)
  gif.style.height = 'auto'; // This will maintain the aspect ratio of the gif
  gif.style.zIndex = '100'; // Ensure the gif is above other content
  gif.style.border = '5px solid red'; // Example: 5px wide, solid, red border
  gif.style.borderRadius = '50px';

  // Add the GIF to the container
  container.appendChild(gif);
}

document.addEventListener('DOMContentLoaded', () => {
  loadHeader();

  // Trigger background color change after 1 second
  setTimeout(changeBackgroundColor, 1000);
});