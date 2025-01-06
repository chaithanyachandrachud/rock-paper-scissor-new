const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
let userChoice;
let computerChoice;
let result;
let playerScore = 0;
let computerScore = 0;

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
  if (e.target.id !== 'reset') {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    getResult();
    updateScore();
    highlightWinner();
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
}