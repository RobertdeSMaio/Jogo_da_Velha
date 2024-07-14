const board = document.getElementById("board");
const resetBtn = document.getElementById("reset");
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

//criacao da identidade

const createCell = (index) => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", () => handleCellClick(index));
  board.appendChild(cell);
};

const handleCellClick = (index) => {
  if (boardState[index] !== "" || !isGameActive) return;

  boardState[index] = currentPlayer;
  updateBoard();
  checkResult();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

const updateBoard = () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    cell.textContent = boardState[index];
  });
};

//Condicao de vitoria

const checkResult = () => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], //Horizontal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //Vertical
    [0, 4, 8],
    [2, 4, 6], //Diagonal
  ];
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      alert(`Jogador ${boardState[a]} venceu!`);
      isGameActive = false;
      return;
    }
  }
  if (!boardState.includes("")) {
    alert("Empate!");
    isGameActive = false;
  }
};
resetBtn.addEventListener("click", () => {
  boardState = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  updateBoard();
});

// Cria as células do tabuleiro

for (let i = 0; i < 9; i++) {
  createCell(i);
}
