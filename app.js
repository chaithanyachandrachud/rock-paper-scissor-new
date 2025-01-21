const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
const timerDisplay = document.getElementById('timer'); // Add a timer display in HTML
let userChoice;
let computerChoice;
let result;
let playerScore = 0;
let computerScore = 0;
let timerInterval;
let timeLeft = 5; // Set the countdown duration (in seconds)
let isGameActive = true;

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
  if (e.target.id !== 'reset' && isGameActive) {
    clearInterval(timerInterval); // Stop the timer
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    getResult();
    updateScore();
    highlightWinner();
    startNewRound();
  }
}));

document.getElementById('reset').addEventListener('click', resetGame);

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  if (randomNumber === 1) {
    computerChoice = 'rock';
  }
  if (randomNumber === 2) {
    computerChoice = 'scissors';
  }
  if (randomNumber === 3) {
    computerChoice = 'paper';
  }
  computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult() {
  if (computerChoice === userChoice) {
    result = 'It\'s a draw!';
  } else if ((computerChoice === 'rock' && userChoice === 'paper') ||
             (computerChoice === 'paper' && userChoice === 'scissors') ||
             (computerChoice === 'scissors' && userChoice === 'rock')) {
    result = 'You win!';
    playerScore++;
  } else {
    result = 'You lose!';
    computerScore++;
  }
  resultDisplay.innerHTML = result;
}

function updateScore() {
  document.getElementById('player-score').innerText = `Player Score: ${playerScore}`;
  document.getElementById('computer-score').innerText = `Computer Score: ${computerScore}`;
}

function highlightWinner() {
  document.getElementById(userChoice).style.backgroundColor = (result === 'You win!') ? 'green' : 'red';
  document.getElementById(computerChoice).style.backgroundColor = (result === 'You win!') ? 'red' : 'green';
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  updateScore();
  resultDisplay.innerHTML = '';
  computerChoiceDisplay.innerHTML = '';
  userChoiceDisplay.innerHTML = '';
  document.querySelectorAll('button').forEach(button => button.style.backgroundColor = '');
  clearInterval(timerInterval);
  isGameActive = true;
  startTimer(); // Restart the timer when the game is reset
}

// Timer function
function startTimer() {
  timeLeft = 5; // Reset timer to 5 seconds
  timerDisplay.innerHTML = `Time Left: ${timeLeft}s`; // Update the timer display
  isGameActive = true;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerHTML = `Time Left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      isGameActive = false; // Prevent further input
      resultDisplay.innerHTML = 'Time\'s up! No choice made.';
      startNewRound();
    }
  }, 1000);
}

// Start a new round
function startNewRound() {
  setTimeout(() => {
    resetRoundUI();
    startTimer();
  }, 2000); // Delay to reset the round
}

function resetRoundUI() {
  userChoice = '';
  computerChoice = '';
  userChoiceDisplay.innerHTML = '';
  computerChoiceDisplay.innerHTML = '';
  resultDisplay.innerHTML = '';
  document.querySelectorAll('button').forEach(button => button.style.backgroundColor = '');
}
  