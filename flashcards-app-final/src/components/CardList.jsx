import React from "react";
import Flashcard from "./Flashcard";

export default function CardList({ cards, onDelete, onUpdate }) {
  return (
    <div>
      {cards.map(card => (
        <Flashcard key={card.id} card={card} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
