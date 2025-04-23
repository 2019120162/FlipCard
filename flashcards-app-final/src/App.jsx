import React, { useState } from "react";
import flashcardsData from "./data/flashcards";
import CardForm from "./components/CardForm";
import CardList from "./components/CardList";
import StudyView from "./components/StudyView";

export default function App() {
  const [cards, setCards] = useState(flashcardsData);

  const addCard = (card) => {
    setCards([...cards, { ...card, id: Date.now() }]);
  };

  const updateCard = (updatedCard) => {
    setCards(cards.map(card => card.id === updatedCard.id ? updatedCard : card));
  };

  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="container">
      <h1>Flashcards App</h1>
      <CardForm addCard={addCard} />
      <CardList cards={cards} onDelete={deleteCard} onUpdate={updateCard} />
      <StudyView cards={cards} />
    </div>
  );
}
