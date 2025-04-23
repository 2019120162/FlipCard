# Install req:

npm install -g parcel

npm install --save-dev parcel

npm install


 So... Why Do We Use JSX for This Flashcard App?
You're building a dynamic user interface — cards that flip, a button that loads the next one, user interactions, conditional rendering. JSX (combined with React) is perfect for that kind of thing.

Here’s the breakdown:

1. Declarative UI
Instead of saying how to update the DOM step-by-step, JSX lets us describe what we want the UI to look like for any given state.

Why it matters for you: You’re flipping cards, updating questions — JSX + React handle all of that by updating the DOM only when needed, and only the parts that changed.

2. State-Driven Logic Is Super Clean
When the user clicks "Next", you’re changing state (like setIndex() and setFlipped(false)).

With JSX, the card automatically re-renders with the new question/answer. You don’t need to manually update text content or DOM elements.

Old-school JS way:
document.getElementById("card").innerText = cards[index].question;

JSX way:
<p>{cards[index].question}</p>

More readable, more reliable, and less prone to bugs.

3. Component-Based Design
You can break your app into pieces — like a Card component, a Button, etc. JSX makes it super easy to define reusable components.
function Card({ front, back, flipped }) {
  return (
    <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
      <div className="card-front">{front}</div>
      <div className="card-back">{back}</div>
    </div>
  );
}

4. Dynamic Classes and Content
You want a class like flipped to appear only when the card should flip. JSX makes it crazy easy:

<div className={`card-inner ${flipped ? 'flipped' : ''}`}></div>
Doing that manually with classList.add()/remove() is way more verbose and error-prone.

5. It’s Still Just JavaScript
Anything you can do in JavaScript, you can do right inside JSX: conditions, loops (.map()), functions — everything.
{cards.length > 0 ? (
  <Card front={cards[index].front} back={cards[index].back} flipped={flipped} />
) : (
  <p>No cards available.</p>
)}

TL;DR – JSX for This Assignment
JSX makes your flashcard app:

Easier to build

Easier to read

Easier to maintain

More powerful without more complexity

It’s just JavaScript + HTML rolled into one — and for an interactive UI like flashcards, it’s the perfect tool.
