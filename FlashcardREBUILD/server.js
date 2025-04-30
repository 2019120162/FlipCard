const express = require("express");
const path = require("path");
const pool = require("./db");
const app = express();
require("dotenv").config();

app.use(express.static("public"));
app.use(express.json());

app.get("/api/flashcards", async (req, res) => {
  const sort = req.query.sort || "date";
  let orderBy;
  if (sort === "question") orderBy = "ORDER BY question ASC";
  else if (sort === "custom") orderBy = "ORDER BY position ASC";
  else orderBy = "ORDER BY created_at DESC";

  try {
    const result = await pool.query(`SELECT * FROM flashcards ${orderBy}`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/flashcards", async (req, res) => {
  const { question, answer } = req.body;
  try {
    await pool.query(
      "INSERT INTO flashcards (question, answer) VALUES ($1, $2)",
      [question, answer]
    );
    res.status(201).json({ message: "Flashcard added." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/flashcards/order", async (req, res) => {
  const { order } = req.body;
  try {
    for (let { id, position } of order) {
      await pool.query("UPDATE flashcards SET position = $1 WHERE id = $2", [
        position,
        id,
      ]);
    }
    res.json({ message: "Order updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));