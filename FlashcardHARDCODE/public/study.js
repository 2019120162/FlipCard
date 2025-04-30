const cards = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "What is the boiling point of water?", answer: "100°C" },
];

let current = 0;

const cardEl = document.getElementById("card");
const cardFront = document.getElementById("card-front");
const cardBack = document.getElementById("card-back");
const flipBtn = document.getElementById("flipBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function showCard() {
  if (cards.length === 0) {
    cardFront.textContent = "No cards available.";
    cardBack.textContent = "";
    return;
  }
  const { question, answer } = cards[current];
  cardFront.textContent = question;
  cardBack.textContent = answer;
  cardEl.classList.remove("flipped");
}

flipBtn.addEventListener("click", () => {
  cardEl.classList.toggle("flipped");
});

prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    showCard();
  }
});

nextBtn.addEventListener("click", () => {
  if (current < cards.length - 1) {
    current++;
    showCard();
  }
});

showCard();
