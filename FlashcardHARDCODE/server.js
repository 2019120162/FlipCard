const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(express.json());

let flashcards = [
  { id: 1, question: "What is TCP?", answer: "Transmission Control Protocol", created_at: new Date(), position: 0 },
  { id: 2, question: "What is UDP?", answer: "User Datagram Protocol", created_at: new Date(), position: 1 },
  { id: 3, question: "What does HTTP stand for?", answer: "HyperText Transfer Protocol", created_at: new Date(), position: 2 }
];

app.get("/api/flashcards", (req, res) => {
  const sort = req.query.sort || "date";
  let sorted = [...flashcards];

  if (sort === "question") {
    sorted.sort((a, b) => a.question.localeCompare(b.question));
  } else if (sort === "custom") {
    sorted.sort((a, b) => a.position - b.position);
  } else {
    sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  res.json(sorted);
});

app.post("/api/flashcards", (req, res) => {
  const { question, answer } = req.body;
  const newCard = {
    id: flashcards.length + 1,
    question,
    answer,
    created_at: new Date(),
    position: flashcards.length
  };
  flashcards.push(newCard);
  res.status(201).json({ message: "Flashcard added." });
});

app.put("/api/flashcards/order", (req, res) => {
  const { order } = req.body;
  order.forEach(({ id, position }) => {
    const card = flashcards.find(c => c.id === id);
    if (card) card.position = position;
  });
  res.json({ message: "Order updated." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
