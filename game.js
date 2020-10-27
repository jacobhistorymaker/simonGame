
// The four colour options
var buttonColours = ["red", "blue", "green", "yellow"];

// Variable storing random color selections, a pattern for the user to follow
var gamePattern = [];








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

}
