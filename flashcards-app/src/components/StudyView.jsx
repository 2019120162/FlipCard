import React, { useState } from "react";

export default function StudyView({ cards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!cards.length) return <p>No cards to study.</p>;

  const next = () => {
    setFlipped(false);
    setIndex((index + 1) % cards.length);
  };

  return (
    <div className="study-card">
      <div className="study-card-box" onClick={() => setFlipped(!flipped)}>
        {flipped ? cards[index].back : cards[index].front}
      </div>
      <div>
        <button onClick={next} style={{ marginTop: "10px" }}>Next</button>
      </div>
    </div>
  );
}
