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
    alert(`Hra scončila nerozhodně.`);
    location.reload();
  }
};

const cells = document.querySelectorAll('.cell');

const aiPlay = async () => {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
  const response = await fetch(
    'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: gameBoard,
        player: 'x',
      }),
    },
  );
  const data = await response.json();
  const { x, y } = data.position;
  cells.forEach((cell, index) => {
    if (gameBoard[index] === '_') {
      cell.disabled = false;
    }
  });
  const field = cells[x + y * 10];
  field.click();
};

const play = (event) => {
  event.target.classList.add(`board__field--${currentPlayer}`);
  event.target.disabled = true;

  const index = Number(event.target.id);

  if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
    gameBoard[index] = 'o';
    aiPlay();
  } else {
    currentPlayer = 'circle';
    gameBoard[index] = 'x';
  }

  playerElement.src = `./img/${currentPlayer}-white.svg`;
  setTimeout(whoIsWinner, 200);
};

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
