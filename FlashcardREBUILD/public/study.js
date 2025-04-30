let cards = [];
let current = 0;
let flipped = false;

const cardEl = document.getElementById("card");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const flipBtn = document.getElementById("flip");

async function fetchCards() {
  const res = await fetch("/api/flashcards");
  cards = await res.json();
  showCard();
}

function showCard() {
  if (cards.length === 0) {
    cardEl.textContent = "No cards available.";
    return;
  }
  const { question, answer } = cards[current];
  cardEl.textContent = flipped ? answer : question;
}

prevBtn.addEventListener("click", () => {
  if (cards.length === 0) return;
  current = (current - 1 + cards.length) % cards.length;
  flipped = false;
  showCard();
});

nextBtn.addEventListener("click", () => {
  if (cards.length === 0) return;
  current = (current + 1) % cards.length;
  flipped = false;
  showCard();
});

flipBtn.addEventListener("click", () => {
  if (cards.length === 0) return;
  flipped = !flipped;
  showCard();
});

fetchCards();