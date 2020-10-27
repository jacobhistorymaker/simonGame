
// The four colour options
var buttonColours = ["red", "blue", "green", "yellow"];
// Variable storing random color selections, a pattern for the user to follow
var gamePattern = [];
// Variable which stores user's choices
var userClickedPattern = [];
// Boolean variable that shows if the game started or not
var started = false;




// Detect keypress event from keyboard, for the game to start
$(document).on("keypress", function(event) {
  // Call nextSequence function only on the first keypress event
  if (!started) {
    nextSequence();
  }
  started = true;
});

// Detect user's mouse click events
$(".btn").on("click", function(event) {
  // Get the user's selection
  var userChosenColour = this.id;
  // Play sound
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
});

// Random generated color selection from the game
function nextSequence(){
  // Create a random number between 0-3
  var randomNumber = Math.floor(Math.random() * 4);

  // Random selected colour
  var randomChosenColour = buttonColours[randomNumber];

  // Store the randomChosenColour to the sequence of colors
  gamePattern.push(randomChosenColour);

  // Animate a flash on computer's selection
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  // Play equivalent sound for user's selection
  playSound(randomChosenColour);
}


// Function that takes input a file name and it plays it
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

// Function that incomporates flash animation in user's click
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
