$("h1").on("click", function () {
    console.log("h1 was clicked");
})

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// function that adds a random colour to gamePattern
function nextSequence() {
    level++;
    let randomNumber = Math.floor(4 * Math.random());
    let randomColour = buttonColours[randomNumber];
    gamePattern.push(randomColour);
}

// show the sequence to the player... the player *might* be able to click during this time though...
function showSequence() {
    // i don't know...
    // i cannot comprehend the minds of the gods of listeners
    // courtesy to magic text from * the internet *sparkle*
    for (let i = 0; i < gamePattern.length; ++i) {
        showSequenceFunction(i);
    }
}
// function to aid showSequence
function showSequenceFunction(i) {
    setTimeout(() => {
        console.log(gamePattern[i] + i)
        playAnimationSound(gamePattern[i])
    }, 500 * i);
}

// function that takes a colour, plays the pressed animation and plays the sound
function playAnimationSound(colour) {
    console.log(`playing animation and sound for ${colour}`);
    var audio = new Audio(`./sounds/${colour}.mp3`);
    audio.play();

    $(`#${colour}`).fadeOut(100).fadeIn(100);

}

$(".btn").on("click", (evt) => {
    var userClickedColour = evt["target"].id;
    playAnimationSound(userClickedColour);
    userClickedPattern.push(userClickedColour);
    // if (checkAnswer()) {
    //     game();
    // } else if (checkAnswer() === "wrong") {
    //     console.log("this game sound end.");
    //     // location.reload();
    // }
    switch (checkAnswer()) {
        case true:
            game()
        case null:
            break;
        case undefined:
            break;
        default:
            gameEnd();
    }
})

$(document).on("keydown", (e) => {
    game()  
})

function game() {
    nextSequence();
    userClickedPattern = [];
    $("h1").text(`Level ${level}`);
    showSequence();
}

function gameEnd() {
    location.reload();
}

function checkAnswer() {
    let currIndex = userClickedPattern.length - 1;
    console.log("this is the checking for checkAnswer()");
    console.log(userClickedPattern[currIndex]);
    console.log(gamePattern[currIndex])

    if (userClickedPattern[currIndex] === gamePattern[currIndex]) {
        console.log('good');
        if (userClickedPattern.length === gamePattern.length) {
            return true;
        }
    } else {
        return "wrong";
    }
}