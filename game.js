let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  ties: 0,
  losses: 0
};

displayScore();

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3) {
    computerMove = 'scissors';
  }

  return computerMove;
};

function playGame(playerMove) {
  let result = '';
  const computerMove = pickComputerMove();

  if (playerMove === computerMove) {
    result = 'It\'s a tie!';
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') || 
    (playerMove === 'scissors') && computerMove === 'paper') {
    result = 'You win!';
  } else {
    result = 'You lose!';
  }

  if (result === 'You win!') {
    score.wins++;
  } else if (result === 'It\'s a tie!') {
    score.ties++;
  } else if (result === 'You lose!') {
    score.losses++;
  }

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You <img src="images/${playerMove}-emoji.png" class="button-icon"> 
      <img src="images/${computerMove}-emoji.png" class="button-icon"> Computer
    `;

  saveToStorage();
  displayScore();
};

function resetScore() {
  score.wins = 0;
  score.ties = 0;
  score.losses = 0
  
  displayScore();
};

function displayScore() {
  document.querySelector('.js-scores')
    .innerHTML = `Wins: ${score.wins}, Ties: ${score.ties}, Losses: ${score.losses}`;
};

let intervalId;
let isAutoplaying = false;

function autoPlay() {
  const playerMove = pickComputerMove();

  if (!isAutoplaying) {
    intervalId = setInterval(() => {
      playGame(playerMove);
    }, 1000);
    isAutoplaying = true;
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
  }
};

function displayConfirmationInfo() {
  const infoElement = document.querySelector('.js-confirmation-info');
  infoElement.innerHTML = `Are you sure you want to reset? 
      <button class="js-yes-button yes-button">Yes</button> 
      <button class="js-no-button no-button">No</button>
    `;
  
  document.querySelector('.js-yes-button')
    .addEventListener('click', () => {
      resetScore();
      infoElement.innerHTML = '';
    });

  document.querySelector('.js-no-button')
    .addEventListener('click', () => {
      infoElement.innerHTML = '';
    });

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      resetScore();
      infoElement.innerHTML = '';
    }
  });
};

function saveToStorage() {
  localStorage.setItem('score', JSON.stringify(score));
};

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'Backspace') {
    displayConfirmationInfo();
  } else if (event.key === 'a') {
    changeText();
    autoPlay();
  }
});

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    displayConfirmationInfo();
  });

document.querySelector('.js-autoplay-button')
  .addEventListener('click', () => {
    changeText();
    autoPlay();
  });

function changeText() {
  const infoElement = document.querySelector('.js-autoplay-button');

  if (infoElement.innerText === 'Auto Play') {
    infoElement.innerText = 'Stop Playing';
  } else {
    infoElement.innerText = 'Auto Play';
  }
};