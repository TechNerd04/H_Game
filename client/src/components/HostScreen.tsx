import React, { useRef, useEffect } from 'react';
import HexBoard from './HexBoard';
import { playWinSound } from '../utils/sound';

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
    if (roomData?.phase === 'GAME_OVER') {
      playWinSound();
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
      case 'QUESTION':
        return (
          <div>
            Players are Answering…
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
    <div className="layout-host">
      {/* ── Left panel: Players 1, 3... ── */}
      <div className="host-side-panel">
        {players.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '8px' }}>
            Waiting for players to join…
          </p>
        )}
        {players.map((p: any, i: number) => {
          if (i % 2 !== 0) return null; // Left side gets index 0, 2
          return renderPlayerCard(p, i);
        })}
      </div>

      {/* ── Center panel: Board ── */}
      <div className="host-center">
        {/* Status bar */}
        <div className="host-top-bar glass-panel">{getTopBarContent()}</div>

        {/* Hex Board */}
        <div className="hex-board-container">
          <HexBoard board={board} players={players} selectedCellId={roomData.selectedCellId} />
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

      {/* ── Right panel: Players 2, 4... ── */}
      <div className="host-side-panel">
        {players.map((p: any, i: number) => {
          if (i % 2 === 0) return null; // Right side gets index 1, 3
          return renderPlayerCard(p, i);
        })}
      </div>

      {/* ── Question Countdown Overlay ── */}
      {phase === 'QUESTION_COUNTDOWN' && (
        <div className="countdown-screen" style={{ position: 'absolute' }}>
          <div className="countdown-label">GET READY</div>
          <div key={roomData.countdown} className="countdown-number">
            {roomData.countdown}
          </div>
        </div>
      )}

      {/* ── Question Overlay ── */}
      <div
        className={`question-overlay ${
          phase === 'QUESTION' && currentQuestion ? 'active' : ''
        }`}
      >
        {currentQuestion && (
          <>
            <div className="question-text">{currentQuestion.text}</div>
            <div className="question-options">
              {currentQuestion.options.map((opt: string, i: number) => (
                <div key={i} className={`q-option q-option-${i}`}>
                  <span style={{ opacity: 0.6, marginRight: 10 }}>
                    {['A', 'B', 'C', 'D'][i]}
                  </span>
                  {opt}
                </div>
              ))}
            </div>
            <div className="progress-bar-container">
              <div
                key={questionKeyRef.current}
                className="progress-bar"
                style={{ animation: 'timer-drain 15s linear forwards' }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
