document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const question = e.target.question.value.trim();
  const answer = e.target.answer.value.trim();

  if (!question || !answer) return alert("Fill out both fields!");

  const res = await fetch("/api/flashcards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer }),
  });

  if (res.ok) {
    alert("Flashcard added!");
    e.target.reset();
  } else {
    alert("Failed to add flashcard.");
  }
});