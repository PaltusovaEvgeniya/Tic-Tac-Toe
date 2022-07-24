"use strict";

const cell = document.querySelectorAll(".cell");
const btnRestart = document.querySelector(".game--restart");
let realPlayer = document.querySelector(".game--status");
let player = "X";
let activeGame = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


//функция клика по ячейке, если х то х, если не х то 0
const giveData = event => {
  let dataCell = event.target.dataset.cellIndex;

  if (activeGame === false || gameState[dataCell] !== "") {
    return;
  }

  player === "X" ? (event.target.textContent = "X") : (event.target.textContent = player);

  gameState[dataCell] = player;
  resultCheck();
};


//клик по ячейке
cell.forEach(function(item) {
  item.addEventListener("click", giveData);
});

//смена игрока
const handlePlayerChange = () => {
  player = player === "X" ? "O" : "X";
  realPlayer.textContent = `It's ${player}'s turn`;
};

//проверка на выйгрыш
const resultCheck = () => {

  handlePlayerChange();

  for (var value of winningLines) {
    let a = value[0];
    let b = value[1];
    let c = value[2];

    if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {

      continue;

    } else if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {

      handlePlayerChange();
      activeGame = false;
      realPlayer.textContent = `Player ${player} has won!`;
      return;

    } else if (!gameState.includes("")) {

      activeGame = false;
      realPlayer.textContent = "Game ended in a draw!";

    }
  }
};


//сброс игры к начальному состоянию
btnRestart.addEventListener("click", function () {

  activeGame = true;
  player = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  realPlayer.textContent = `It's ${player}'s turn`;

  cell.forEach(function(item) {
    item.textContent = "";
    item.addEventListener("click", giveData);
  });

});

//комментарий для новой ветки