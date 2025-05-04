require('dotenv').config();
const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;

app.use(express.json());

// ✅ Serve everything in public/
app.use(express.static('public'));

// ✅ PostgreSQL client setup
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
client.connect();

// ✅ Routes
app.post('/api/flashcards', async (req, res) => {
  const { question, answer } = req.body;

  // Backend validation: ensure both question and answer are at least 3 characters long
  if (!question || question.length < 1) {
    return res.status(400).json({ error: 'Question cannot be empty!' });
  }
  
  if (!answer || answer.length < 1) {
    return res.status(400).json({ error: 'Answer cannot be empty!' });
  }

  // Validation for missing question or answer
  if (!question) {
    return res.status(400).json({ error: 'Question is required.' });
  }

  if (!answer) {
    return res.status(400).json({ error: 'Answer is required.' });
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

// Update a flashcard (edit)
app.put('/api/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  if (!question && !answer) {
    return res.status(400).json({ error: 'At least one of question or answer is required' });
  }

  try {
    let query = 'UPDATE flashcards SET';
    const values = [];
    if (question) {
      query += ` question = $${values.length + 1}`;
      values.push(question);
    }
    if (answer) {
      query += (question ? ',' : '') + ` answer = $${values.length + 1}`;
      values.push(answer);
    }
    query += ' WHERE id = $' + (values.length + 1) + ' RETURNING *';
    values.push(id);

    const result = await client.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update flashcard' });
  }
});

const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
