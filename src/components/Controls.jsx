function Controls({ currentIndex, total, onPrev, onNext, onShuffle }) {
  return (
    <div className="controls">
      <button
        className="btn"
        onClick={onPrev}
        disabled={currentIndex === 0}
      >
        ← Prev
      </button>

      <span className="counter">
        {currentIndex + 1} / {total}
      </span>

      <button
        className="btn"
        onClick={onNext}
        disabled={currentIndex === total - 1}
      >
        Next →
      </button>

      <button className="btn btn-shuffle" onClick={onShuffle}>
        🔀 Shuffle
      </button>
    </div>
  );
}

export default Controls;
