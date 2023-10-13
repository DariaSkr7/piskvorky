import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';
const playerElement = document.querySelector('.player');

const gameBoard = Array.from({ length: 100 }, (_, i) => {
  return '_';
});

const whoIsWinner = () => {
  const winner = findWinner(gameBoard);
  if (winner === 'o' || winner === 'x') {
    alert(`Vyhrál hráč se symbolem ${winner}.`);
    location.reload();
  }
  if (winner === 'tie') {
    alert(`Hra scončila neroyhodně.`);
    location.reload();
  }
};

const play = (event) => {
  event.target.classList.add(`board__field--${currentPlayer}`);
  event.target.disabled = true;

  const index = Number(event.target.id);

  if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
    gameBoard[index] = 'o';
  } else {
    currentPlayer = 'circle';
    gameBoard[index] = 'x';
  }

  playerElement.src = `./img/${currentPlayer}-white.svg`;
  setTimeout(whoIsWinner, 200);
};

const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
  cell.id = index;
  cell.addEventListener('click', play);
});

const restartButton = document.querySelector('.restart__button');

restartButton.addEventListener('click', (event) => {
  const reload = confirm('Opravdu chceš začít znovu?');

  if (!reload) {
    event.preventDefault();
  }
});
