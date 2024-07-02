

var buttonColours=['red','blue','green','yellow'];
var gamePattern=[];
var userClickedPattern = [];
//step-7
var started = false;
var level = 0;  //Create a new variable called level and start at level 0.


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);  
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});


function nextSequence(){
  userClickedPattern = []; // Reset userClickedPattern
  level++; // Increment level
  $("#level-title").text("Level " + level); 
  
   var randomNumber=Math.floor(Math.random()*4);
   
   var randomChosenColor= buttonColours[randomNumber];

   gamePattern.push(randomChosenColor);
// JQuery
   $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColor);
  }

  function checkAnswer(currentLevel) {

   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");

      
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }

}


function playSound(name){
   var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//step-6=Animation to the buttons
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}