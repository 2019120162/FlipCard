import CardList from "./components/CardList";
import CardForm from "./components/CardForm";
import StudyView from "./components/StudyView";
import { useState } from "react";
import flashcardsData from "./data/flashcards";

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
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Flashcards App</h1>
      <CardForm addCard={addCard} />
      <CardList cards={cards} onDelete={deleteCard} onUpdate={updateCard} />
      <StudyView cards={cards} />
    </div>
  );
}
