/*
GAME FUNCTIONS:
    - Player must guess the movie based on a bad description given
    - Player gets a certain amount of guesses
    - Notify player of guesses remaining
    - Notify the player of the correct answer if loses
    - Let player choose to play again
*/

const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');
const description = document.querySelector('.movie-description');
const hint = document.querySelector('.hint');
const hintBtn = document.querySelector('#hint-btn');
const errorMsg = document.querySelector('.error');

const movies = [
  {title: 'Harry Potter', explanation: 'This movie is about a dude with a stick...', hint: 'It\'s Magic'},
  {title: 'Just Go With It', explanation: 'This movie is about people who go on holiday...', hint: 'Adam, Drew and Jennifer'},
  {title: 'Never Back Down', explanation: 'This movie is about two guys with daddy issues who beat each other up...', hint: 'Kanye West - Stronger'},
  {title: 'Spongebob Squarepants', explanation: 'This movie is about a rectangle...', hint: 'It\'s a cartoon'},
  {title: '50 First Dates', explanation: 'This movie is about a chick, she has the worst memory...', hint: '50 times...'},
  {title: 'Cars', explanation: 'In this movie, car go fast...', hint: 'Kachow'},
  {title: 'Spiderman', explanation: 'In this movie this guy just does not pay his rent, no matter how many times the landlord asks...', hint: 'Peta-Paka'},
  {title: 'The Wolf Of Wall Street', explanation: 'In this movie there\'s like illegal stuff, lots of money, and a blonde chick...', hint: 'AWOOooooooooooo goes the...'},
  {title: 'Inception', explanation: 'In this movie everyone is like sleeping all the time...', hint: 'Dreams...'},
  {title: 'Peter Pan', explanation: 'In this movie some kids die and an angel escorts them to heaven...', hint: 'Always flying, cuz he neverlands'},
  {title: 'The Lord Of The Rings', explanation: 'In this movie some small guys go for a walk...', hint: 'You will not vacate past this exact position'}
]

const min = 0;
const max = movies.length;
const num = getRandomNum(min, max);
let guessesLeft = 3;

description.textContent = movies[num].explanation;

function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min));
}

hintBtn.addEventListener('click', function(){
  hint.textContent = movies[num].hint;
})

guessBtn.addEventListener('click', function(){

  const rightMovie = movies[num].title;
  let guess = guessInput.value;

  if(guess === ''){
    errorMsg.style.color = 'red'; 
    errorMsg.textContent = 'Whoopsy, try again...';
    setTimeout(()=>{
      errorMsg.remove();
    }, 2500);
  }

  else if(guess.toLowerCase() === rightMovie.toLowerCase()){
    message.textContent = `${guess} is the right movie, well done!`;
    guessBtn.innerHTML = 'Next Question';
    guessBtn.addEventListener('click', () => {
      window.location.reload();
    });

  } else{
    guessesLeft -= 1;
    message.textContent = `Sorry, ${guess} is not correct...you have ${guessesLeft} guesses left.`;
  }

  if(guessesLeft === 0){
    message.textContent = `You are out of guesses, the correct answer was ${rightMovie}.`;
    guessBtn.innerHTML = 'Next Question';
    guessBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }

});