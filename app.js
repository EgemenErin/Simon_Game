var buttonColours = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// Sounds
var redSound = new Audio('./sounds/red.mp3');
var greenSound = new Audio('./sounds/green.mp3');
var yellowSound = new Audio('./sounds/yellow.mp3');
var blueSound = new Audio('./sounds/blue.mp3');

// Start game when key pressed
$(document).keypress(function() {
    if (!started) {
        started = true;
        $('#level-title').text('Level ' + level);
        nextSequence();
    }
});

// Handle button click
$('.btn').click(function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// Generate next color sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text('Level ' + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Check user's answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

// Start over function
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Play sound function
function playSound(name) {
    switch (name) {
        case 'red':
            redSound.play();
            break;
        case 'green':
            greenSound.play();
            break;
        case 'yellow':
            yellowSound.play();
            break;
        case 'blue':
            blueSound.play();
            break;
        case 'wrong':
            // Play your wrong sound here
            break;
        default:
            break;
    }
}

// Animate button press
function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}
