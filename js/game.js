let currentPlayer = 'circle';
const playerElement = document.querySelector('.player');

const play = (event) => {
  event.target.classList.add(`board__field--${currentPlayer}`);
  event.target.disabled = true;

  if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
  } else {
    currentPlayer = 'circle';
  }

  playerElement.src = `./img/${currentPlayer}-white.svg`;
};

const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
  cell.addEventListener('click', play);
});

const restartButton = document.querySelector('.restart__button');

restartButton.addEventListener('click', (event) => {
  const reload = confirm('Opravdu chceš začít znovu?');

  if (!reload) {
    event.preventDefault();
  }
});
