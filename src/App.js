import React, { useState, useEffect } from 'react';
import './App.css';
import SectionSelection from './components/SectionSelection';
import QuizQuestion from './components/QuizQuestion';
import ResultsDashboard from './components/ResultsDashboard';
import quizData from './data/quiz_data.json';

function App() {
  const [gameState, setGameState] = useState('selection'); // 'selection', 'quiz', 'results'
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Extract unique sections from quiz data
  useEffect(() => {
    if (quizData && quizData.length > 0) {
      const uniqueSections = [...new Set(quizData.map(item => item.section))];
      setSections(uniqueSections);
      setLoading(false);
    }
  }, []);

  // Shuffle array function
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Start quiz for selected section
  const startQuiz = (section) => {
    setCurrentSection(section);
    const sectionQuestions = quizData.filter(q => q.section === section);
    const selectedQuestions = shuffleArray(sectionQuestions).slice(0, 20);
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAttempted(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setGameState('quiz');
  };

  // Handle answer selection
  const handleAnswer = (isCorrect) => {
    setAttempted(prev => prev + 1);
    if (isCorrect) {
      setScore(prev => prev + 1.0);
      setCorrectCount(prev => prev + 1);
    } else {
      setScore(prev => prev - 0.2);
      setIncorrectCount(prev => prev + 1);
    }
  };

  // Move to next question
  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState('results');
    }
  };

  // Reset to section selection
  const playAgain = () => {
    setGameState('selection');
    setCurrentSection('');
    setQuestions([]);
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-spinner">Loading quiz data...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📝 Quiz Master</h1>
      </header>
      
      <main className="app-main">
        {gameState === 'selection' && (
          <SectionSelection 
            sections={sections} 
            onSelectSection={startQuiz} 
          />
        )}
        
        {gameState === 'quiz' && questions.length > 0 && (
          <QuizQuestion 
            question={questions[currentQuestionIndex]}
            currentNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
          />
        )}
        
        {gameState === 'results' && (
          <ResultsDashboard 
            attempted={attempted}
            correct={correctCount}
            incorrect={incorrectCount}
            totalScore={score}
            onPlayAgain={playAgain}
          />
        )}
      </main>
      
      <footer className="app-footer">
        <p>© 2025 · Select a section to begin</p>
      </footer>
    </div>
  );
}

export default App;