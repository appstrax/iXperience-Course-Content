/*
GAME FUNCTION:
    - Player must guess a number between min and max
    - Player gets a certain amounut of guesses
    - Notify player of guesses remaining
    - Notify the player of the correct answer if loses
    - Let player choose to play again
*/

// Creat our variables
// Game values
let min = 0, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('.input-group-text'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Asign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'input-group-text play-again'){
        window.location.reload();
    }
});

// Event listener for button
// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
 
    // Validate input 
    if( isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if winning number 
    if(guess === winningNum){
        // Game over, win 
        gameOver(true, `${winningNum} is correct! You win!`);
    } else {
        // Wrong nummber 
        guessesLeft -=1;
        if(guessesLeft ===0){
            // Game over lost 
            gameOver(false, `Game over, you lost! Correct answer: ${winningNum}`);
        } else {
            // Game continues - answer worng 

            // Channge border color 
            guessInput.style.borderColor = 'red';

            // Clear input 
            guessInput.value = '';

            // Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
        }

    }

});

// Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disble input 
    guessInput.disabled = true;
    // Change border color if won
    guessInput.style.borderColor = color;
    // Set text color
    message.style.color = color;
    // Set win message 
    setMessage(msg);

    // Play again 
    guessBtn.innerHTML = 'Play again?';
    guessBtn.className += ' play-again';
}

// Get winning number 
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message 
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

