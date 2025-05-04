const listEl = document.getElementById("flashcardList");
const sortEl = document.getElementById("sort");

async function loadCards(sort = "date") {
  const res = await fetch(`/api/flashcards?sort=${sort}`);
  const cards = await res.json();
  renderList(cards, sort);
}

function renderList(cards, sort) {
  listEl.innerHTML = "";
  cards.forEach((card, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div><strong>${card.question}</strong><br>${card.answer}</div>
      ${sort === "custom" ? `
        <div>
          <button onclick="moveUp(${index})">↑</button>
          <button onclick="moveDown(${index})">↓</button>
        </div>` : ""}
    `;
    listEl.appendChild(li);
  });

  if (sort === "custom") {
    window.customCards = cards;
  }
}

window.moveUp = (i) => {
  if (i === 0) return;
  [customCards[i - 1], customCards[i]] = [customCards[i], customCards[i - 1]];
  updateCustomOrder();
};

window.moveDown = (i) => {
  if (i === customCards.length - 1) return;
  [customCards[i], customCards[i + 1]] = [customCards[i + 1], customCards[i]];
  updateCustomOrder();
};

async function updateCustomOrder() {
  const order = customCards.map((c, idx) => ({ id: c.id, position: idx }));
  await fetch("/api/flashcards/order", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order }),
  });
  renderList(customCards, "custom");
}

sortEl.addEventListener("change", (e) => {
  loadCards(e.target.value);
});

loadCards();