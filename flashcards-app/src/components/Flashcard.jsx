import React, { useState } from "react";

export default function Flashcard({ card, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);

  const saveEdit = () => {
    onUpdate({ ...card, front, back });
    setEditing(false);
  };

  return (
    <div className="card">
      {editing ? (
        <>
          <input value={front} onChange={(e) => setFront(e.target.value)} />
          <input value={back} onChange={(e) => setBack(e.target.value)} />
          <button onClick={saveEdit}>Save</button>
        </>
      ) : (
        <>
          <div>{card.front}</div>
          <div className="card-buttons">
            <button onClick={() => onDelete(card.id)}>Delete</button>
            <button onClick={() => setEditing(true)}>Edit</button>
          </div>
        </>
      )}
    </div>
  );
}
