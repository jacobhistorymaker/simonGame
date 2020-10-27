// The four colour options
var buttonColours = ["red", "blue", "green", "yellow"];
// Variable storing random color selections, a pattern for the user to follow
var gamePattern = [];
// Variable which stores user's choices
var userClickedPattern = [];
// Variable to show user's level
var level = 0;
// Variable showing if game is over or not
var gameOver = false;

// Detect keypress event from keyboard, for the game to start
$(document).on("keypress", function(event) {
  // Call nextSequence function only on the first keypress event
  if (!gameOver && level === 0) {
    nextSequence();
  }
  // Check if gave is over and restart the game
  if (gameOver) {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameOver = false;
    $("#restart").hide();
    setTimeout(function() {
      nextSequence();
    }, 1000);

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

  checkAnswer(userClickedPattern.length - 1);
});

// Random generated color selection from the game
function nextSequence() {

  // Reset the userClickedPattern, make it ready for the next level
  userClickedPattern = [];

  // Create a random number between 0-3
  var randomNumber = Math.floor(Math.random() * 4);

  // Random selected colour
  var randomChosenColour = buttonColours[randomNumber];

  // Animate a flash on computer's selection
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  // Play equivalent sound for user's selection
  playSound(randomChosenColour);

  // Store the randomChosenColour to the sequence of colors
  gamePattern.push(randomChosenColour);

  level++;
  // Update the h1 to current level
  $("#level-title").text("Level " + level);
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


// Function that checks user's answers
function checkAnswer(currentLevel) {
  // console.log("I am checking: " + userClickedPattern[currentLevel] + " at position: " + currentLevel);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // Check that the user have finished their sequence, and
    if (currentLevel === gamePattern.length - 1) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    // Only the first time the user makes a mistake tell him to refresh
    if (!gameOver) {
      // Update the h1 to current level
      $("#level-title").text("Game Over!");
      $("#level-title").after("<h3 id='restart'>Press any key to start again.</h3>");
      gameOver = true;
    }
  }
}
