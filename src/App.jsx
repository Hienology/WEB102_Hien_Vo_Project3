import { useState } from 'react';
import CardView from './components/CardView';
import Controls from './components/Controls';
import deck from './data/deck';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const [cards, setCards] = useState(deck);
  const [index, setIndex] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(cards.length - 1, i + 1));

  const handleShuffle = () => {
    setCards((c) => shuffle(c));
    setIndex(0);
  };

  const handleSubmit = (isCorrect) => {
    if (isCorrect) {
      setCurrentStreak((s) => {
        const next = s + 1;
        setLongestStreak((l) => Math.max(l, next));
        return next;
      });
    } else {
      setCurrentStreak(0);
    }
  };

  return (
    <div className="app">
      <h1 className="title">WORLD QUIZ</h1>
      <p className="subtitle">Type your answer and submit to check!</p>

      <div className="streak-display">
        <span>🔥 Streak: {currentStreak}</span>
        <span>🏆 Best: {longestStreak}</span>
      </div>

      <CardView key={index} card={cards[index]} onSubmit={handleSubmit} />

      <Controls
        currentIndex={index}
        total={cards.length}
        onPrev={goPrev}
        onNext={goNext}
        onShuffle={handleShuffle}
      />
    </div>
  );
}

export default App;
