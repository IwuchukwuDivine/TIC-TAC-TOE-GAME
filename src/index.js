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
const playerTurn = document.querySelector(".player-turn");

// Define variables to track game state
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gamePlayed = 0;
let xWins = 0;
let oWins = 0;



// arrays of different winning options
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

// to add event listeners to each cell and avoid clicking once cell multiple times
cells.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});


function handleClick(e) {
  clicked.play();
  const id = e.target.id;
  // to check if the cell clicked on is empty
  if (!gameBoard[id]) {
    gameBoard[id] = currentPlayer;
    e.target.innerHTML = currentPlayer;
    if (checkWin()) {
      win.play();
      popUpText.innerHTML = `Player ${currentPlayer} Has Won`;
      // to update score for whichever player that won
      currentPlayer == "X"? xWins = xWins + 1 : oWins = oWins + 1;
      // update number of games played
      gamePlayed = gamePlayed + 1;
      updateStats();

      // to give the winning cells a different background color
      let winingBlocks =  checkWin();
      winingBlocks.forEach(block => {
        cells[block].style.backgroundColor = "#0F2167";
      })
     renderPopup();

    //  disable click event on all cells
    cells.forEach((cell) => {
      cell.removeEventListener("click", handleClick);
    });
  } else if (gameBoard.every(space => space !== null)) {
      gamePlayed = gamePlayed + 1;
      updateStats();
      popUpText.innerHTML = `It's a Draw`;
      renderPopup();
    }
      
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerTurn.innerHTML  = `${currentPlayer}'s Turn`;
  playerTurn.style.color = currentPlayer ==="X" ? "#86A7FC" : "#FFDD95";
}

// to bring out the popup modal at the end of a game 
function renderPopup() {
  setTimeout(() => {
    popUp.classList.add("active");
  }, 1000);
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

playBtn.addEventListener("click", playAgain);

// resets all game stats / scores
resetBtn.addEventListener("click", () => {
  playAgain();
  gamePlayed = 0;
  xWins = 0;
  oWins = 0;
  updateStats();
})

function playAgain() {
  // add back the event listener
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  gameBoard.fill(null);
  popUp.classList.remove("active");

  // remove the background color on previous winning cells
  cells.forEach(cell => {
    cell.innerHTML = "";
    cell.style.backgroundColor = "transparent";
 });
}

// indicates current player's turn
playerTurn.innerHTML  = `${currentPlayer}'s Turn`;
playerTurn.style.color = currentPlayer ==="X" ? "#86A7FC" : "#FFDD95";