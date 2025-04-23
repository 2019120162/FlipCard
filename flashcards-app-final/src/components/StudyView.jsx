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
    <div className="study-container">
  <button className="study-button" onClick={next}>Next</button>

  <div className="card-flip" onClick={() => setFlipped(!flipped)}>
    <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
      <div className="card-front">{cards[index].front}</div>
      <div className="card-back">{cards[index].back}</div>
    </div>
  </div>
</div>
  );
}
