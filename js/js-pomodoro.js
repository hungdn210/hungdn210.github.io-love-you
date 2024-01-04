function loadHeader() {
  fetch('header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header-placeholder').innerHTML = html;
    })
    .catch(error => console.error('Error loading header:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  loadHeader(); // Replace 50 with the actual number of images in your folder
});


// Wait for the document to be fully loaded
$(document).ready(function(){
  // Initialize session length (countS) to 25 minutes
  var countS = 25;
  // Display the initial session length on the page
  $("#session").html(countS);

  // Initialize break length (countB) to 5 minutes
  var countB = 5;
  // Display the initial break length on the page
  $("#break").html(countB);

  // Initialize a variable 'pos' to track current mode (session or break)
  var pos = "pomodoro";

  // Variables to store previous values
  var countLama; // Previous time
  var posLama;   // Previous position (session or break)
  var isLama = false;
  //Initialize the initial Time when the clock resets
  var isInitialTime = true;
  // Update the current mode on the page
  $("#stats").html(pos);

  function getTimeTittle(addTime) {
    var time = clock.getTime().time + addTime;
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;

    // Update document title with current time and mode
    document.title = (pos === "session" || pos ==="pomodoro" ? "Session" : "Break") + " - " + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  // Initialize the FlipClock with 0 time, set to countdown, and not start automatically
  var clock = $(".timer").FlipClock(0, {
    countdown: true, // Clock counts down
    clockFace: 'MinuteCounter', // Display format for the clock
    autoStart: false, // Don't start the clock automatically
    callbacks: {
      // Function to execute at each interval
      interval: function() {
        // Calculate remaining minutes and second
        getTimeTittle(0);
        // Check if the clock time reaches 0
        if (clock.getTime() == 0 && isInitialTime == false) {
          // Switch between session and break when the time is up
          if (pos == "session") {
            setTimeout(function() { 
              clock.setTime(countB * 60);
              clock.stop();
              isInitialTime = true;
              pos = "break"; // Update the mode to 'break'
              $("#stats").html(pos); // Update the mode on the page
              getTimeTittle(1);
            }, 1000); // Delay setting new time by 1 second
          } else if (pos == "break") {
            setTimeout(function() { 
              clock.setTime(countS * 60);
              clock.stop();
              isInitialTime = true;
              pos = "session"; // Update the mode to 'session'
              $("#stats").html(pos); // Update the mode on the page
              getTimeTittle(1);
            }, 1000); // Delay setting new time by 1 second
          }
        }        
      }
    }
  });

    // Set the initial time of the clock to the session length
    if(pos == "session" || pos == "pomodoro") clock.setTime(countS * 60);
    else clock.setTime(countB * 60);

  // Event handler for increasing session length
  $("#sessInc").on("click", function(){
    // Check if session length is greater than 0
    if ($("#session").html() > 0){
      // Increase session length by 1
      countS = parseInt($("#session").html());
      countS++;
      clock.setTime(countS* 60);
      // Update the session length on the page
      $("#session").html(countS);
      // Optionally set the clock time to new session length
      //clock.setTime(countS*60);
    }
  });

  // Event handler for decreasing session length
  $("#sessDec").on("click", function(){
    // Check if session length is greater than 1
    if ($("#session").html() > 1){
      // Decrease session length by 1
      countS = parseInt($("#session").html());
      countS--;
      clock.setTime(countS * 60);
      // Update the session length on the page
      $("#session").html(countS);
      // Optionally set the clock time to new session length
      //clock.setTime(countS*60);
    }
  });

  // Event handler for increasing break length
  $("#breakInc").on("click", function(){
    // Check if break length is greater than 0
    if ($("#break").html() > 0){
      // Increase break length by 1
      countB = parseInt($("#break").html());
      countB++;
      // Update the break length on the page
      $("#break").html(countB);
    }    
  });

  // Event handler for decreasing break length
  $("#breakDec").on("click", function(){
    // Check if break length is greater than 1
    if ($("#break").html() > 1){
      // Decrease break length by 1
      countB = parseInt($("#break").html());
      countB--;
      // Update the break length on the page
      $("#break").html(countB);
    }
  });  

  // Event handler for starting the clock
  $("#start").on("click", function() {
    //dissappear the main-row div
    $(".main-row").hide();
    //check to delete the current time
    console.log(isInitialTime);
    if(isInitialTime == true) {
      clock.setTime(0);
    }
    // Check if the clock is at 0 and it's not transitioning to a new session or break
    if (clock.getTime() == 0 && isInitialTime == true) {
      // Reset isInitialTime to allow the clock to set new time
      isInitialTime = false;
      
      // Determine whether to start a session or a break based on the current state
      if (pos == "pomodoro" || pos == "session") {
        clock.setTime(countS * 60);
        pos = "session";
      } else if (pos == "break") {
        clock.setTime(countB * 60);
        pos = "break";
      }
      
      // Update the mode on the page
      $("#stats").html(pos);
      // Start the clock
    }
    clock.start();
  });


  // Event handler for stopping the clock
  $("#stop").on("click", function(){
    // Stop the clock
    if(clock.getTime() != 0) {
      clock.stop();
      // Remember the current time and mode
      countLama = clock.getTime();
      posLama = $("#stats").html();
      console.log(clock.getTime());
    }
  });

  // Event handler for resetting the clock
  $("#clear").on("click", function(){
    //show the main row div
    $(".main-row").show();
    // Stop the clock
    clock.stop();
    // Reset to initial mode
    pos = "pomodoro";
    $("#stats").html(pos);
    // Reset the clock time to 0
    clock.setTime(countS * 60);
    isInitialTime = true;
    getTimeTittle(1);
  });
});
