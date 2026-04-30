import React, { useRef, useEffect } from 'react';
import HexBoard from './HexBoard';
import { playWinSound, playCountdownSound, playBackgroundPlaylist, stopBackgroundPlaylist, playStartOfQuestionSound, stopStartOfQuestionSound } from '../utils/sound';

export default function HostScreen({
  socket,
  roomData,
}: {
  socket: any;
  roomData: any;
}) {
  // Track question key so timer animation resets each new question
  const questionKeyRef = useRef(0);

  useEffect(() => {
    // Stop music when component unmounts (e.g. host leaves)
    return () => stopBackgroundPlaylist();
  }, []);

  const isQuestionActive = roomData?.phase === 'QUESTION_COUNTDOWN' || roomData?.phase === 'QUESTION' || roomData?.phase === 'QUESTION_REVEAL';

  useEffect(() => {
    if (!roomData) return;

    if (roomData.phase === 'GAME_OVER') {
      stopBackgroundPlaylist();
      stopStartOfQuestionSound();
      playWinSound();
    } else if (roomData.phase === 'QUESTION_COUNTDOWN') {
      stopBackgroundPlaylist();
      stopStartOfQuestionSound();
      playCountdownSound();
    } else if (roomData.phase === 'QUESTION') {
      stopBackgroundPlaylist();
      playStartOfQuestionSound();
    } else if (roomData.phase === 'QUESTION_REVEAL') {
      stopBackgroundPlaylist();
      stopStartOfQuestionSound();
    } else {
      stopStartOfQuestionSound();
      playBackgroundPlaylist();
    }
  }, [roomData?.phase]);

  if (!roomData) {
    return (
      <div className="home-screen">
        <div className="home-hex-deco">⬡</div>
        <p style={{ color: 'var(--text-muted)' }}>Waiting for room sync...</p>
      </div>
    );
  }

  const {
    id: roomCode,
    phase,
    players,
    board,
    currentQuestion,
    activePlayerIndex,
    winner,
  } = roomData;

  const activePlayer = players[activePlayerIndex];

  if (currentQuestion) questionKeyRef.current++;

  const startGame = () => {
    socket?.emit('start-game', roomCode);
  };

  const getTopBarContent = () => {
    switch (phase) {
      case 'LOBBY':
        return (
          <>
            <div className="room-code-display">ROOM CODE</div>
            <div className="room-code-value">{roomCode}</div>
          </>
        );
      case 'TURN_START':
        return (
          <div>
            <span style={{ color: activePlayer?.color }}>{activePlayer?.name}</span>
            &nbsp;— Pick a Hexagon!
          </div>
        );
      case 'GAME_OVER':
        return (
          <div style={{ color: winner?.color, fontSize: '2rem' }}>
            🏆 {winner?.name} WINS!
          </div>
        );
      default:
        return null;
    }
  };

  const renderPlayerCard = (p: any, i: number) => {
    const isActive = activePlayerIndex === i && phase !== 'LOBBY';
    return (
      <div
        key={p.socketId}
        className={`player-score-card glass-panel ${isActive ? 'active-turn' : ''}`}
        style={{ borderLeftColor: p.color, color: p.color }}
      >
        {isActive && (
          <div className="active-turn-badge">YOUR TURN</div>
        )}
        <div>
          <div className="player-name" style={{ color: p.color }}>
            {p.name}
          </div>
          <div className="player-label">Territory</div>
        </div>
        <div className="player-score">{p.score}</div>
      </div>
    );
  };

  return (
    <div className={`layout-host ${isQuestionActive ? 'lifted' : ''}`}>
      <button 
        className="button-primary" 
        style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100, padding: '8px 16px', fontSize: '1rem', width: 'auto' }}
        onClick={() => {
          if (phase !== 'LOBBY' && phase !== 'GAME_OVER') {
            if (window.confirm("Are you sure you want to return home? This will end the game for everyone.")) {
              window.location.href = '/';
            }
          } else {
            window.location.href = '/';
          }
        }}
      >
        ← Home
      </button>
      {/* ── Left panel: Active Player ── */}
      <div className="host-side-panel">
        {phase === 'LOBBY' ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '8px', textAlign: 'center' }}>
            {players.length === 0 ? 'Waiting for players to join…' : 'Waiting to start...'}
          </p>
        ) : (
          activePlayer && renderPlayerCard(activePlayer, activePlayerIndex)
        )}
      </div>

      {/* ── Center panel: Board ── */}
      <div className="host-center">
        {/* Status bar */}
        {!isQuestionActive && (
          <div className="host-top-bar glass-panel">{getTopBarContent()}</div>
        )}

        {/* Hex Board */}
        <div className="hex-board-container">
          <HexBoard 
            board={board} 
            players={players} 
            selectedCellId={roomData.selectedCellId} 
            winnerId={phase === 'GAME_OVER' && winner ? winner.socketId : null} 
          />
        </div>

        {/* Start button (only in lobby) */}
        {phase === 'LOBBY' && (
          <div className="start-btn-wrap">
            <button
              className="button-primary"
              style={{ maxWidth: '280px', fontSize: '1.3rem', padding: '16px 32px' }}
              onClick={startGame}
              disabled={players.length < 2}
            >
              ▶ START MATCH ({players.length}/2)
            </button>
          </div>
        )}

        {/* Back to home page button */}
        {phase === 'GAME_OVER' && (
          <div className="start-btn-wrap">
            <button
              className="button-primary"
              style={{ padding: '12px 24px', width: 'auto' }}
              onClick={() => window.location.href = '/'}
            >
              Back to home page
            </button>
          </div>
        )}
      </div>

      {/* ── Right panel: Leaderboard ── */}
      <div className="host-side-panel">
        <h2 style={{ marginBottom: '20px', letterSpacing: '2px', color: 'var(--text-muted)', textAlign: 'center', fontSize: '1.2rem' }}>LEADERBOARD</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          {[...players].sort((a: any, b: any) => b.score - a.score).map((p: any) => (
            <div key={p.socketId} className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `5px solid ${p.color}` }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: p.color }}>{p.name}</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)' }}>{p.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Question Overlay ── */}
      <div
        className={`question-overlay ${
          isQuestionActive && currentQuestion ? 'active' : ''
        }`}
      >
        {currentQuestion && (
          <>
            <div className="question-text">{currentQuestion.text}</div>
            <div style={{ position: 'relative' }}>
              <div className="question-options" style={{ visibility: phase === 'QUESTION_COUNTDOWN' ? 'hidden' : 'visible' }}>
                {currentQuestion.options.map((opt: string, i: number) => {
                  let revealStyle: any = {};
                  if (phase === 'QUESTION_REVEAL') {
                    if (currentQuestion.correct === -1 || currentQuestion.correct !== i) {
                      revealStyle = { opacity: 0.3, background: 'var(--timer-bg)', boxShadow: 'none' };
                    } else {
                      revealStyle = { transform: 'scale(1.05)', boxShadow: '0 0 20px rgba(255,255,255,0.4)', zIndex: 10 };
                    }
                  }

                  return (
                    <div key={i} className={`q-option q-option-${i}`} style={{ transition: 'all 0.3s ease', ...revealStyle }}>
                      <span style={{ opacity: 0.6, marginRight: 10 }}>
                        {['A', 'B', 'C', 'D'][i]}
                      </span>
                      {opt}
                    </div>
                  );
                })}
              </div>
              {phase === 'QUESTION_COUNTDOWN' && (
                <div 
                  key={roomData.countdown}
                  className="countdown-number" 
                  style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', color: 'var(--accent)' }}
                >
                  {roomData.countdown === 1 ? 'GO' : roomData.countdown - 1}
                </div>
              )}
            </div>
            {phase === 'QUESTION' && (
              <div className="progress-bar-container">
                <div
                  key={questionKeyRef.current}
                  className="progress-bar"
                  style={{ animation: 'timer-drain 15s linear forwards' }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
