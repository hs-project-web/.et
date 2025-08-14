const board = document.getElementById("gameBoard");
const turnIndicator = document.getElementById("turn-indicator");

// Only 5 pairs (10 cards total)
const emojis = ["🍎", "🍌", "🍓", "🍇", "🍒"];
const cards = [...emojis, ...emojis];
let shuffled = cards.sort(() => 0.5 - Math.random());

let flipped = [];
let matched = [];
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

function createBoard() {
  shuffled.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    board.appendChild(card);
  });
}

function updateTurnIndicator() {
  turnIndicator.textContent = `Turn: ${currentPlayer === 1 ? "🟦 Player 1" : "🔴 Player 2"}`;
}

function flipCard(card) {
  if (
    flipped.length < 2 &&
    !card.classList.contains("flipped") &&
    !matched.includes(card)
  ) {
    card.textContent = card.dataset.emoji;
    card.classList.add("flipped");
    flipped.push(card);
    
    if (flipped.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flipped;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    matched.push(card1, card2);
    if (currentPlayer === 1) {
      player1Score++;
      document.getElementById("player1").textContent = player1Score;
    } else {
      player2Score++;
      document.getElementById("player2").textContent = player2Score;
    }
  } else {
    card1.textContent = "";
    card2.textContent = "";
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateTurnIndicator();
  }
  flipped = [];
}

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("card")) {
    flipCard(e.target);
  }
});

createBoard();
updateTurnIndicator();