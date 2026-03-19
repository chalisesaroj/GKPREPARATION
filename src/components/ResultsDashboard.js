import React from 'react';
import './ResultsDashboard.css';

const ResultsDashboard = ({ attempted, correct, incorrect, totalScore, onPlayAgain }) => {
  const finalScore = totalScore.toFixed(2);
  
  return (
    <div className="results-card">
      <h2>📊 Quiz Complete!</h2>
      
      <div className="results-stats">
        <div className="stat-item">
          <span className="stat-label">Attempted</span>
          <span className="stat-value">{attempted}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Correct</span>
          <span className="stat-value">{correct}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Incorrect</span>
          <span className="stat-value">{incorrect}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Total Score</span>
          <span className="stat-value">{finalScore}</span>
        </div>
      </div>
      
      <button className="play-again-btn" onClick={onPlayAgain}>
        🎮 Play Again
      </button>
    </div>
  );
};

export default ResultsDashboard;