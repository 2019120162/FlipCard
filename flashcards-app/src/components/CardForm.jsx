import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Front"
        value={front}
        onChange={(e) => setFront(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Back"
        value={back}
        onChange={(e) => setBack(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Card</button>
    </form>
  );
}
