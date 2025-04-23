import React, { useState } from "react";

export default function CardForm({ addCard }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (front && back) {
      addCard({ front, back });
      setFront("");
      setBack("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Front" value={front} onChange={(e) => setFront(e.target.value)} />
      <input placeholder="Back" value={back} onChange={(e) => setBack(e.target.value)} />
      <button type="submit">Add Card</button>
    </form>
  );
}
