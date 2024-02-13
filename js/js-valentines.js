function loadHeader() {
  fetch('header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header-placeholder').innerHTML = html;
    })
    .catch(error => console.error('Error loading header:', error));
}

var noButton = document.getElementById('no-button');
var style = window.getComputedStyle(noButton);
var curWidthNoButton = style.width;

function changeBackgroundColor() {
  const container = document.querySelector('.container');
  container.style.backgroundImage = 'none';
  container.style.backgroundColor = '#fba7bf';

  // Show the GIF, question, and buttons
  document.getElementById('valentine-gif').style.display = 'block';
  setTimeout(() => {
    document.getElementById('valentine-question').style.display = 'block';
  }, 2000);
  setTimeout(() => {
    document.getElementById('yes-button').style.display = 'block';
    document.getElementById('no-button').style.display = 'block';
  }, 4000);
}

function changeGif() {
  // Change the source of the gif image
  document.getElementById('valentine-gif').src = "assets/Valentines/catWithGun.png";

  // Get the current style for the 'No' button
  var noButton = document.getElementById('no-button');
  var style = window.getComputedStyle(noButton);

  // Parse the width from the computed style and reduce it by half
  var currentWidth = parseInt(style.width, 10); // Get the width as an integer
  var newWidth = currentWidth / 2; // Reduce the width by half
  
  // Set the new width to the 'No' button
  noButton.style.width = newWidth + 'px';

  // If you also want to reduce the height by half, do the same for the height
  var currentHeight = parseInt(style.height, 10); // Get the height as an integer
  var newHeight = currentHeight / 2; // Reduce the height by half

  // Set the new height to the 'No' button
  noButton.style.height = newHeight + 'px';
}

function showValentinesPlan() {
  // Hide all the elements
  document.getElementById('valentine-gif').style.display = 'none';
  document.getElementById('valentine-question').style.display = 'none';
  document.getElementById('yes-button').style.display = 'none';
  document.getElementById('no-button').style.display = 'none';

  // Show the Valentine's Day plan
  document.getElementById('valentines-plan').style.display = 'block';

  // Correctly set the container's background image
  var container = document.querySelector('.container');
  container.style.backgroundColor = 'transparent'; // Make sure this is 'transparent' and not 'none'
  container.style.backgroundImage = "url('assets/Valentines/plan.jpg')"; // Correctly formatted as a URL
}

document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  setTimeout(changeBackgroundColor, 10000);

  // Now that the DOM is fully loaded, we can safely add the event listener
  document.getElementById('yes-button').addEventListener('click', showValentinesPlan);
});