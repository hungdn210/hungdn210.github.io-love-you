let count = 0;
const notesDiv = document.querySelector(".notes-container");
const containerDiv = document.querySelector(".container");
const sceneDiv = document.querySelector(".scene-container");
const tryAgainDiv = document.querySelector(".try-again"); 
const tryAgainPic = document.getElementById("try-again-pic")
const switchDiv = document.querySelector(".switch");
const span1 = document.getElementById("span-1");
const span2 = document.getElementById("span-2");
const canvasDiv = document.querySelector(".canvasDiv");
const continueButton = document.querySelector(".continueButton");
const heart = document.querySelector(".heart");



function loadHeader() {
  fetch('header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header-placeholder').innerHTML = html;
    })
    .catch(error => console.error('Error loading header:', error));
}

document.addEventListener('DOMContentLoaded', () =>  {
  loadHeader();
  const toggleInput = document.querySelector('.switch input[type="checkbox"]');

  toggleInput.addEventListener('change', function() {
      if (this.checked) {
        switchDiv.style.marginLeft = "200px";
        tryAgainDiv.style.display = "flex";
        count++;
          // Light is turned on
        if(count <= 7) {
          const imagePath = `assets/Anniversary/Try-again/try-again-${count}.png`;
          console.log(imagePath);
          tryAgainPic.src = imagePath;
          setTimeout(() => {
              this.checked = false; // Turn off the light after 2 seconds
          }, 800);
        }
        else {
          this.checked = true;
          iLoveYouFunc();
        }
      }
  });
});

function iLoveYouFunc() {
  setTimeout(() => {
    switchDiv.style.display = "none";
    tryAgainDiv.style.display = "none";
    span1.style.display = "block";
  }, 2000);
  setTimeout(() => {
    span1.style.display = "none";
    span2.style.display = "block";
  }, 4000);
  setTimeout(() => {
    span2.style.display = "none";
    canvasDiv.style.display = "block";
    runHeart();
  }, 6000);
}








//canvas code 

var canvas;
var stage;
var container;
var captureContainers;
var captureIndex;

function runHeart() {
  //show the continueButton 
  setTimeout(() => {
    continueButton.style.display = "block";
  }, 8000);
  // create a new stage and point it at our canvas:
  canvas = document.getElementById("testCanvas");
  stage = new createjs.Stage(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var w = canvas.width;
  var h = canvas.height;

  container = new createjs.Container();
  stage.addChild(container);

  captureContainers = [];
  captureIndex = 0;

  // create a large number of slightly complex vector shapes, and give them random positions and velocities:
		for (var i = 0; i < 30; i++) {
			var heart = new createjs.Shape();
			heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30));
			heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
			heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);
			heart.y = -100;

			container.addChild(heart);
		}
    setTimeout(() => {

      var font = "40px 'Great Vibes'"; // Replace with your desired font
      var color = "white";
      var outlineColor = "rgba(0, 0, 0, 0.5)";
      var outlineWidth = 2;
      
      var text = new createjs.Text("I love you so much, Aidana ❤️", "bold " + font, color);
      text.textAlign = "center";
      text.x = w / 2;
      text.y = h / 2 - text.getMeasuredLineHeight();
      text.outline = outlineWidth;
      text.color = outlineColor;
      
      // Shadow or Glow
      text.shadow = new createjs.Shadow("#ff0000", 5, 5, 10); // Red glow for romance
      
      // Add another text object for the fill
      var textFill = text.clone();
      textFill.outline = false;
      textFill.color = color;
      
      // Add to stage
      stage.addChild(text, textFill);
      
      // Animation (optional)
      createjs.Tween.get(text)
          .to({scaleX: 1.1, scaleY: 1.1}, 1000, createjs.Ease.getPowInOut(2))
          .to({scaleX: 1, scaleY: 1}, 1000, createjs.Ease.getPowInOut(2));
      
    }, 3000);

  for (i = 0; i < 100; i++) {
    var captureContainer = new createjs.Container();
    captureContainer.cache(0, 0, w, h);
    captureContainers.push(captureContainer);
  }

  // start the tick and point it at the window so we can do some work before updating the stage:
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on("tick", tick);
}

function tick(event) {
  var w = canvas.width;
  var h = canvas.height;
  var l = container.numChildren;

  captureIndex = (captureIndex + 1) % captureContainers.length;
  stage.removeChildAt(0);
  var captureContainer = captureContainers[captureIndex];
  stage.addChildAt(captureContainer, 0);
  captureContainer.addChild(container);

  // iterate through all the children and move them according to their velocity:
		for (var i = 0; i < l; i++) {
			var heart = container.getChildAt(i);
			if (heart.y < -50) {
				heart._x = Math.random() * w;
				heart.y = h * (1 + Math.random()) + 50;
				heart.perX = (1 + Math.random() * 2) * h;
				heart.offX = Math.random() * h;
				heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
				heart.velY = -Math.random() * 2 - 1;
				heart.scale = Math.random() * 2 + 1;
				heart._rotation = Math.random() * 40 - 20;
				heart.alpha = Math.random() * 0.75 + 0.05;
				heart.compositeOperation = Math.random() < 0.33 ? "lighter" : "source-over";
			}
			var int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
			heart.y += heart.velY * heart.scaleX / 2;
			heart.x = heart._x + Math.cos(int) * heart.ampX;
			heart.rotation = heart._rotation + Math.sin(int) * 30;
		}

  captureContainer.updateCache("source-over");

  // draw the updates to stage:
  stage.update(event);
}


function runScene() {
  //dissapear the canvas and continueButton
  containerDiv.style.display = "none";
  sceneDiv.style.display = "flex";
  setTimeout(() => {
    sceneDiv.style.display = "none";
    notesDiv.style.display = "flex";
    runNotes();
  }, 5000);
}


function runNotes() {
  var i = 0,
    a = 0,
    isBackspacing = false,
    isParagraph = false;

  // Typerwrite text content. Use a pipe to indicate the start of the second line "|".  
  var textArray = [
    "Dear my baby, Aidana,",
    "Happy 1st-month anniversary! ❤️ ❤️ ❤️",
    "I love you so much and miss you terribly. I know it is challenging for us to be apart right now, with you enjoying your time in Kazakhstan, and me with my older sister in Switzerland. But it is okay, hehe, because we still share our love, and that's the most important thing for me at the moment. Even though we are physically distant, I really enjoy every moment we spend together, even if I can only see your face and smile through the screen. Your face brightens my day, and your jokes are so funny – they always make me laugh, hahaha.",
    "I can not believe it is been a month since our trip when I confessed to being your boyfriend. I wish I could hug you right now, awww. It is 2024 already, and I hope our love continues to grow stronger, and we find ways to spend as much time together as possible, meow meow.",
    "I love you so much, Aidana! ❤️",
    "Hung Phi Nguyen"
  ];

  // Speed (in milliseconds) of typing.
  var speedForward = 10, //Typing Speed
      speedWait = 100; // Wait between typing and backspacing

  //Run the loop
  typeWriter("output", textArray);
  function typeWriter(id, ar) {
    var element = $("#" + id),
        aString = ar[a];

    function startTyping(index, paragraph) {
      // Function to add cursor to the current typing element
      function addCursorToCurrentElement(currentElement) {
        // Remove cursor from all elements
        element.find('.cursor').removeClass('cursor');
        // Add cursor to current typing element
        currentElement.addClass('cursor');
      }

      if (index < aString.length) {
        if (!paragraph) {
          paragraph = $('<p></p>'); // Create a new Paragraph element
          element.append(paragraph); // Append the new paragraph to the container
        }

        if (aString.charAt(index) == "|") {
          // Add a line break for new line
          paragraph.text(paragraph.text() + '<br>');
          addCursorToCurrentElement(paragraph);
          startTyping(index + 1, paragraph);
        } else {
          // Continue typing in the same paragraph
          addCursorToCurrentElement(paragraph);
          paragraph.text(paragraph.text() + aString.charAt(index));
          setTimeout(function() { startTyping(index + 1, paragraph); }, speedForward);
        }
      } else {
        // Move to the next quote if exists
        if (a < ar.length - 1) {
          a++;
          setTimeout(function() { typeWriter(id, ar); }, speedWait);
        } else {
          //show the heart
          heart.style.display = "block";
          // Keep the cursor on the last paragraph if no more quotes
          addCursorToCurrentElement(paragraph);
        }
      }
    }

    startTyping(0, null);
  }
}


