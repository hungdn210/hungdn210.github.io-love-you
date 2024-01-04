function updateTime() {
  const startDate = new Date('2023-12-04');
  const now = new Date();

  let delta = Math.abs(now - startDate) / 1000;

  const months = Math.floor(delta / 2628000);
  delta -= months * 2628000;

  const days = Math.floor(delta / 86400);
  delta -= days * 86400;

  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  const seconds = Math.floor(delta % 60);

  document.getElementById('output-months').textContent = `${months} Months, `;
  document.getElementById('output-days').textContent = `${days} Days, `;
  document.getElementById('output-hours').textContent = `${hours} Hours, `;
  document.getElementById('output-minutes').textContent = `${minutes} Minutes, `;
  document.getElementById('output-seconds').textContent = `${seconds} Seconds`;
}


function updateImage(month) {
  console.log('hello');
  const imagePath = `assets/HomePage/pic-month/${month}.png`;
  document.querySelector('.box-img img').src = imagePath;
}

function loadHeader() {
  fetch('header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header-placeholder').innerHTML = html;
    })
    .catch(error => console.error('Error loading header:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  // Countdown timer
  setInterval(updateTime, 1000);
  updateTime();

  // Month buttons functionality
  const monthButtons = document.querySelectorAll('.month-btn');
  monthButtons.forEach(button => {
    button.addEventListener('click', () => {
      const month = button.getAttribute('data-month');
      updateImage(month);
    });
  });

  // Set default image
  updateImage('1');
});
