// server.js
require('dotenv').config();
const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Create a new PostgreSQL client
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to PostgreSQL
client.connect();

// Add a flashcard to the database
app.post('/api/flashcards', async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: 'Both question and answer are required' });
  }

  try {
    const result = await client.query(
      'INSERT INTO flashcards (question, answer) VALUES ($1, $2) RETURNING *',
      [question, answer]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add flashcard' });
  }
});

// Get all flashcards
app.get('/api/flashcards', async (req, res) => {
  const { sort = 'date' } = req.query;

  try {
    let query = 'SELECT * FROM flashcards ORDER BY created_at DESC';
    if (sort === 'question') {
      query = 'SELECT * FROM flashcards ORDER BY question ASC';
    }

    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve flashcards' });
  }
});

// Delete a flashcard
app.delete('/api/flashcards/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query('DELETE FROM flashcards WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }
    res.status(200).json({ message: 'Flashcard deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete flashcard' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
