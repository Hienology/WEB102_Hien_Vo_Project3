import { useState } from 'react';
import { normalize } from '../utils/normalize';

const CATEGORY_COLORS = {
  easy: '#22c55e',
  medium: '#eab308',
  hard: '#ef4444',
};

function CardView({ card, onSubmit }) {
  const [flipped, setFlipped] = useState(false);
  const [imgErrors, setImgErrors] = useState({});
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null); // null | 'correct' | 'incorrect'

  const accent = CATEGORY_COLORS[card.category] || '#888';

  const handleImgError = (key) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

  // Keep Project 2 interaction: card can always be flipped by clicking.
  const handleFlip = () => setFlipped((f) => !f);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback !== null || guess.trim() === '') return;
    const normalizedGuess = normalize(guess);
    const normalizedFull = normalize(card.backText);
    // Also accept the primary answer with any parenthetical notes stripped
    const primaryAnswer = card.backText.replace(/\s*\(.*?\)\s*/g, ' ').trim();
    const normalizedPrimary = normalize(primaryAnswer);
    const isCorrect =
      normalizedGuess === normalizedFull || normalizedGuess === normalizedPrimary;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setFlipped(true);
    onSubmit(isCorrect);
  };

  const showFrontImage = card.frontImage && !imgErrors[card.frontImage];
  const showBackImage = card.backImage && !imgErrors[card.backImage];

  return (
    <div className="card-scene is-interactive" onClick={handleFlip}>
      <div className={`card ${flipped ? 'is-flipped' : ''}`}>
        {/* ---- Front ---- */}
        <div
          className={`card-face card-front ${showFrontImage ? 'has-image' : ''}`}
          style={{ borderTopColor: accent }}
        >
          <span className="badge" style={{ backgroundColor: accent }}>
            {card.category}
          </span>
          {showFrontImage && (
            <img
              className="card-img"
              src={card.frontImage}
              alt=""
              onError={() => handleImgError(card.frontImage)}
            />
          )}
          <div className={`card-text ${showFrontImage ? 'with-image' : ''}`}>
            {card.frontText}
          </div>
          <form
            className="answer-form"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              className="answer-input"
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Type your answer…"
              disabled={feedback !== null}
              autoComplete="off"
            />
            <button
              type="submit"
              className="btn btn-submit"
              disabled={feedback !== null || guess.trim() === ''}
            >
              Submit
            </button>
          </form>
        </div>

        {/* ---- Back ---- */}
        <div
          className={`card-face card-back ${showBackImage ? 'has-image' : ''}`}
          style={{ borderTopColor: accent }}
        >
          <span className="badge" style={{ backgroundColor: accent }}>
            {card.category}
          </span>
          {showBackImage && (
            <img
              className="card-img"
              src={card.backImage}
              alt=""
              onError={() => handleImgError(card.backImage)}
            />
          )}
          <div className={`card-text ${showBackImage ? 'with-image' : ''}`}>
            {card.backText}
          </div>
          {feedback && (
            <div className={`feedback feedback-${feedback}`}>
              {feedback === 'correct' ? '✅ Correct!' : '❌ Incorrect!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardView;
