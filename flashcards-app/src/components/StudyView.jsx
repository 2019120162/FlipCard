import { useState } from "react";

export default function StudyView({ cards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  if (!cards.length) return <p className="mt-6 text-center">No cards to study.</p>;

  return (
    <div className="mt-10 text-center">
      <div
        className="border p-6 rounded shadow text-xl cursor-pointer inline-block min-w-[200px]"
        onClick={() => setFlipped(!flipped)}
      >
        {flipped ? cards[index].back : cards[index].front}
      </div>
      <div className="mt-4">
        <button onClick={nextCard} className="bg-green-500 text-white px-4 py-2">Next</button>
      </div>
    </div>
  );
}
