import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import './QuizQuestion.css';

const QuizQuestion = ({ 
  question, 
  currentNumber, 
  totalQuestions, 
  onAnswer, 
  onNext 
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleOptionClick = (option) => {
    if (answered) return;
    
    setSelectedOption(option);
    setAnswered(true);
    setCorrectAnswer(question.correctAnswer);
    
    const isCorrect = option === question.correctAnswer;
    onAnswer(isCorrect);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setAnswered(false);
    setCorrectAnswer('');
    onNext();
  };

  const getOptionClass = (option) => {
    if (!answered || selectedOption !== option) {
      if (answered && option === correctAnswer) {
        return 'option-btn correct';
      }
      return 'option-btn';
    }
    
    if (option === correctAnswer) {
      return 'option-btn correct';
    }
    return 'option-btn incorrect';
  };

  return (
    <div className="quiz-container">
      <ProgressBar current={currentNumber} total={totalQuestions} />
      
      <div className="question-text">{question.question}</div>
      
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(option)}
            onClick={() => handleOptionClick(option)}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>
      
      {answered && (
        <button className="next-btn" onClick={handleNext}>
          Next Question
        </button>
      )}
    </div>
  );
};

export default QuizQuestion;