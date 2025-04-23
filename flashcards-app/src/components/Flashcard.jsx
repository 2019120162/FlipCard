import { useState } from "react";

export default function Flashcard({ card, onDelete, onUpdate }) {
  const [flipped, setFlipped] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editFront, setEditFront] = useState(card.front);
  const [editBack, setEditBack] = useState(card.back);

  const handleSave = () => {
    onUpdate({ ...card, front: editFront, back: editBack });
    setEditing(false);
  };

  return (
    <div
      className="border p-4 rounded shadow cursor-pointer relative"
      onClick={() => !editing && setFlipped(!flipped)}
    >
      {editing ? (
        <>
          <input value={editFront} onChange={(e) => setEditFront(e.target.value)} className="w-full mb-2" />
          <input value={editBack} onChange={(e) => setEditBack(e.target.value)} className="w-full" />
          <button onClick={handleSave} className="text-green-600 mt-2">Save</button>
        </>
      ) : (
        <>
          <div className="text-center text-lg min-h-[60px]">
            {flipped ? card.back : card.front}
          </div>
          <button
            className="absolute top-2 right-2 text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(card.id);
            }}
          >
            Delete
          </button>
          <button
            className="absolute bottom-2 right-2 text-blue-500"
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
            }}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}
