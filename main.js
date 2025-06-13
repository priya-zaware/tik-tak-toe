const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.textContent = '';
  isXTurn = true;
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  cell.classList.add(currentClass);
  cell.textContent = isXTurn ? 'X' : 'O';

  if (checkWin(currentClass)) {
    endGame(false, currentClass.toUpperCase());
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function endGame(draw, winner = '') {
  if (draw) {
    message.textContent = "It's a draw!";
  } else {
    message.textContent = `${winner} wins!`;
  }
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('x') || cell.classList.contains('o')
  );
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

restartBtn.addEventListener('click', startGame);
startGame(); // Initialize game on load
