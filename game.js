let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {

  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);

  isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
};

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

const autoPlayButtonElement = document.querySelector('.js-auto-play-button')
autoPlayButtonElement.addEventListener('click', () => {
  autoPlay();
  changeInnerText();
});

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
  displayConfirmation();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
    changeInnerText();
  } else if (event.key === 'Backspace') {
    displayConfirmation();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
    result = 'You lose.'; 
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'It\'s a tie.';
    }
  } else if (playerMove === 'paper') {
      if (computerMove === 'rock'){
        result = 'You win.';
      } else if (computerMove === 'paper') {
        result = 'It\'s a tie.';
      } else if (computerMove === 'scissors') {
        result = 'You lose.'
      } 
  } else if (playerMove === 'rock') {
      if(computerMove === 'rock') {
        result = 'It\'s a tie.';
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else if (computerMove === 'scissors') {
        result = 'You win.';
      } 
  }

  if (result === 'You win.') {
    score.wins ++;
  } else if (result === 'You lose.') {
    score.losses ++;
  } else if (result === 'It\'s a tie.') {
    score.ties ++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon"><img src="images/${computerMove}-emoji.png" class="move-icon">Computer`;
};

function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
};

function changeInnerText() {
  if (autoPlayButtonElement.innerText === 'Auto Play') {
    autoPlayButtonElement.innerText = 'Stop Playing';
  } else {
    autoPlayButtonElement.innerText = 'Auto Play';
  }
}

function displayConfirmation() {
  const confirmationInfo = document.querySelector('.js-reset-score-info');
  confirmationInfo.innerHTML = `Are you sure you want to reset? <button class="yes-button js-yes-button">Yes</button> <button class="no-button js-no-button">No</button>`;

  const yesButtonElement = document.querySelector('.js-yes-button');
  yesButtonElement.addEventListener('click', () => {
    resetScore();
    confirmationInfo.innerHTML = '';
  });

  const noButtonElement = document.querySelector('.js-no-button');
  noButtonElement.addEventListener('click', () => {
    confirmationInfo.innerHTML = '';
  });
};

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3) {
    computerMove = 'scissors'; 
  }

  return computerMove;
};