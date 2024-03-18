const cells = Array.from(document.querySelectorAll('#game-board td'));
const playerX = document.querySelector(".x-win");
const playerO = document.querySelector(".o-win");
const popUp = document.querySelector(".result-box");
const popUpText = document.querySelector(".result-text");
const gamePlayedText = document.getElementById("games-played");
const playBtn = document.getElementById('play-btn');
const resetBtn = document.getElementById('reset-btn');
const clicked = document.getElementById("clicked");
const win = document.getElementById("win");

// Define variables to track game state
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gamePlayed = 0;
let xWins = 0;
let oWins = 0;




const winningOptions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
]

updateStats();

// add event listener to each cell
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    handleClick(event);
  });
})

function handleClick(e) {
  clicked.play();
  const id = e.target.id;
  if (!gameBoard[id]) {
    gameBoard[id] = currentPlayer;
    e.target.innerHTML = currentPlayer;
    if (checkWin()) {
      win.play();
      popUpText.innerHTML = `Player ${currentPlayer} Has Won`;
      currentPlayer == "X"? xWins = xWins + 1 : oWins = oWins + 1;
      gamePlayed = gamePlayed + 1;
      updateStats();
      let winingBlocks =  checkWin();
      winingBlocks.forEach(block => {
        cells[block].style.backgroundColor = "#0F2167";
      })
     setTimeout(() => {
      popUp.classList.add("active");
     }, 1000);
    } else if (gameBoard.every(space => space !== null)) {
        gamePlayed = gamePlayed + 1;
        updateStats();
        setTimeout(() => {
          popUp.classList.add("active");
          popUpText.innerHTML = `It's a Draw`;
          
        }, 1000);
    }
      
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// function to check for win
function checkWin() {
  for (const condition of winningOptions) {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return [a, b, c];
    }
  }
  return false;
}

function updateStats() {
  gamePlayedText.innerHTML = gamePlayed;
  playerX.innerHTML = xWins;
  playerO.innerHTML = oWins;
}

playBtn.addEventListener("click", () => {
  gameBoard.fill(null);
  popUp.classList.remove("active");
  cells.forEach(cell => {
     cell.innerHTML = "";
     cell.style.backgroundColor = "transparent";
  })
})

resetBtn.addEventListener("click", () => {
  gameBoard.fill(null);
  popUp.classList.remove("active");
  gamePlayed = 0;
  xWins = 0;
  oWins = 0;
  updateStats();
  cells.forEach(cell => {
     cell.innerHTML = "";
     cell.style.backgroundColor = "transparent";
  })
})