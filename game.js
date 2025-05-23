// Array of button colors
var buttonColors = ["red", "blue", "green", "yellow"];
// Array to store the game pattern
var gamePattern = [];
// Array to store user clicked pattern
var userClickedPattern = [];

// Playing the sound for the chosen color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//function animatePress(currentColor) {
//    $("#" + currentColor).addClass("pressed");
//    setTimeout(function() {
//        $("#" + currentColor).removeClass("pressed");
//    }, 100);
//}

function nextSequence() {
    // Generating a random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    // Adding the chosen color to the game pattern
    gamePattern.push(randomChosenColor);
    // Animating the button
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // Playing the sound for the chosen color
    playSound(randomChosenColor);
    currentLevel++;
    $("h1").text("Level " + currentLevel);
}

// Starting the game with A key press
$(document).keydown(function(event) {
    // Starting the game
    if (event.key.toLowerCase() === "a"){
        gamePattern = [];
        userClickedPattern = [];
        currentLevel = 0;
        nextSequence();
    }else if (event.key.toLowerCase() === "r") {
        startOver();
    }
});


// Animating the button when clicked
$(".btn").click(function(){
    $(this).fadeIn(100).fadeOut(100).fadeIn(100);

    // Playing the sound for the clicked button
    var playerChosenColor = $(this).attr("id");
    playSound(playerChosenColor);

    // Adding the clicked color to the user pattern
    userClickedPattern.push(playerChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    
});

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    currentLevel = 0;
    $("h1").text("Press 'A' to Start");
}

// Checking the answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // If the user has finished the sequence, call nextSequence after a delay
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    }else {
        // Playing the wrong sound
        playSound("wrong");
        // Changing the background color to red
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        // Displaying the game over message
        $("h1").text("Game Over, Press 'A'a to Restart");
        // Restarting the game
        startOver();
    }
}




