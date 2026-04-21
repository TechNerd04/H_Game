import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HexBoard from './HexBoard';
import { playMainTheme, playQuestionTheme, stopTheme } from '../utils/sound';

// Generate 5x5 hex board
const createTutorialBoard = () => {
  const board: Record<string, any> = {};
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let letterIdx = 0;
  
  const width = 5;
  const height = 5;

  for (let r = 0; r < height; r++) {
    let r_offset = Math.floor(r / 2);
    for (let q = -r_offset; q < width - r_offset; q++) {
      const id = `${q},${r}`;
      board[id] = {
        id,
        q,
        r,
        ownerId: null,
        letter: letters[letterIdx++],
      };
    }
  }
  return board;
};

const TUTORIAL_PLAYER = { socketId: 'player1', name: 'You', color: '#3b82f6' }; // Blue
const TUTORIAL_OPPONENT = { socketId: 'player2', name: 'Opponent', color: '#ef4444' }; // Red

export default function TutorialScreen() {
  const navigate = useNavigate();
  const [board, setBoard] = useState(createTutorialBoard());
  const [step, setStep] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionPhase, setQuestionPhase] = useState<'COUNTDOWN' | 'QUESTION' | 'REVEAL' | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [highlightedCells, setHighlightedCells] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const isQuestionActive = questionPhase === 'COUNTDOWN' || questionPhase === 'QUESTION' || questionPhase === 'REVEAL';

  useEffect(() => {
    return () => stopTheme();
  }, []);

  useEffect(() => {
    if (step === 5) {
      // Finished tutorial
      stopTheme();
    } else if (isQuestionActive) {
      playQuestionTheme();
    } else {
      playMainTheme();
    }
  }, [step, isQuestionActive]);

  // Step driver
  useEffect(() => {
    switch (step) {
      case 0:
        setMessage("Welcome to Cells Game! Your objective is to form an unbroken path from one edge to the opposite edge. Let's practice!");
        setHighlightedCells([]);
        break;
      case 1:
        setMessage("When it is your turn, tap an empty hexagon to try and claim it. Tap the highlighted cell now.");
        setHighlightedCells(['0,2']);
        break;
      case 2:
        setMessage("Great! Now you must answer a trivia question correctly to claim the cell.");
        setTimeout(() => {
          setShowQuestion(true);
          setQuestionPhase('COUNTDOWN');
          setCountdown(3);
        }, 1500);
        break;
      case 3:
        setMessage("Correct! The cell is now yours. This brings you one step closer to bridging the board.");
        setBoard(prev => ({
          ...prev,
          '0,2': { ...prev['0,2'], ownerId: TUTORIAL_PLAYER.socketId }
        }));
        setHighlightedCells([]);
        break;
      case 4:
        setMessage("Watch out! Opponents will try to block your path with their own colors.");
        setTimeout(() => {
          setBoard(prev => ({
            ...prev,
            '1,1': { ...prev['1,1'], ownerId: TUTORIAL_OPPONENT.socketId }
          }));
        }, 1500);
        break;
      case 5:
        setMessage("Watch as you build an unbroken path to win the game! You are ready to play.");
        setTimeout(() => {
          setBoard(prev => ({
            ...prev,
            '-1,2': { ...prev['-1,2'], ownerId: TUTORIAL_PLAYER.socketId },
            '1,2': { ...prev['1,2'], ownerId: TUTORIAL_PLAYER.socketId },
            '2,2': { ...prev['2,2'], ownerId: TUTORIAL_PLAYER.socketId },
            '3,2': { ...prev['3,2'], ownerId: TUTORIAL_PLAYER.socketId },
          }));
        }, 1000);
        break;
    }
  }, [step]);

  // Handle tutorial countdown
  useEffect(() => {
    if (questionPhase === 'COUNTDOWN') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setQuestionPhase('QUESTION');
      }
    }
  }, [questionPhase, countdown]);

  const handleCellClick = (id: string) => {
    if (step === 1 && id === '0,2') {
      setStep(2);
      setHighlightedCells([]);
    }
  };

  const handleAnswer = (correct: boolean) => {
    setQuestionPhase('REVEAL');
    if (correct) {
      setCorrectAnswer(2);
      setTimeout(() => {
        setShowQuestion(false);
        setQuestionPhase(null);
        setStep(3);
      }, 3000);
    } else {
      setCorrectAnswer(-1);
      setTimeout(() => {
        setShowQuestion(false);
        setQuestionPhase(null);
        alert("Try again! (Hint: It's Paris)");
        setTimeout(() => {
          setShowQuestion(true);
          setQuestionPhase('COUNTDOWN');
          setCountdown(3);
        }, 500);
      }, 3000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="host-top-bar glass-panel" style={{ margin: '20px', padding: '16px' }}>
        <div className="room-code-display">INTERACTIVE TUTORIAL</div>
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', paddingBottom: '160px' }}>
        <HexBoard 
          board={board} 
          players={[TUTORIAL_PLAYER, TUTORIAL_OPPONENT]} 
          interactive={step === 1}
          onCellClick={handleCellClick}
          highlightedCells={highlightedCells}
        />
      </div>

      <div className="glass-panel tutorial-overlay-box" style={showQuestion ? { bottom: 'auto', top: '100px', transition: 'top 0.4s ease' } : { transition: 'bottom 0.4s ease' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '10px' }}>Step {step + 1} of 6</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: 1.4, color: 'var(--text-main)' }}>{message}</p>
        
        {step === 0 && <button className="button-primary" onClick={() => setStep(1)}>Next</button>}
        {step === 3 && <button className="button-primary" onClick={() => setStep(4)}>Next</button>}
        {step === 4 && <button className="button-primary" onClick={() => setStep(5)}>Next</button>}
        {step === 5 && <button className="button-primary btn-join" onClick={() => navigate('/')}>Finish Tutorial</button>}
      </div>

      <div className={`question-overlay ${showQuestion ? 'active' : ''}`}>
        <div className="q-timer-bar">
          <div className="q-timer-fill" style={questionPhase === 'QUESTION' ? { animationDuration: '15s' } : { width: '100%', animation: 'none' }}></div>
        </div>
        <div className="q-label" style={{ marginTop: '10px' }}>TUTORIAL QUESTION</div>
        <div className="question-text" style={{ color: 'var(--text-main)' }}>What is the capital of France?</div>
        
        <div style={{ position: 'relative' }}>
          <div className={`question-options ${questionPhase === 'COUNTDOWN' ? 'hidden' : ''}`}>
            {['London', 'Berlin', 'Paris', 'Madrid'].map((opt, i) => {
              let revealStyle: any = {};
              if (questionPhase === 'REVEAL') {
                if (correctAnswer === -1 || correctAnswer !== i) {
                  revealStyle = { opacity: 0.3, background: 'var(--timer-bg)', boxShadow: 'none' };
                } else {
                  revealStyle = { transform: 'scale(1.05)', boxShadow: '0 0 20px rgba(255,255,255,0.4)', zIndex: 10 };
                }
              }

              return (
                <button 
                  key={i} 
                  className={`q-option q-option-${i}`} 
                  onClick={() => handleAnswer(i === 2)}
                  style={{ transition: 'all 0.3s ease', ...revealStyle }}
                >
                  <span style={{ opacity: 0.6, marginRight: 10 }}>{['A', 'B', 'C', 'D'][i]}</span>
                  {opt}
                </button>
              );
            })}
          </div>
          {questionPhase === 'COUNTDOWN' && countdown > 0 && (
            <div 
              key={countdown}
              className="countdown-number" 
              style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', color: 'var(--accent)' }}
            >
              {countdown}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
