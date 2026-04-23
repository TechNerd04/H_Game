import React, { useState, useEffect, useRef } from 'react';
import HexBoard from './HexBoard';
import { playWinSound, playLoseSound, playCountdownSound, stopBackgroundPlaylist } from '../utils/sound';

export default function MobileScreen({
  socket,
  roomData,
  currentPlayer,
}: {
  socket: any;
  roomData: any;
  currentPlayer: any;
}) {
  const [feedback, setFeedback] = useState<boolean | null>(null);
  
  // To avoid rapid multi-taps from breaking state
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    stopBackgroundPlaylist();
  }, []);

  useEffect(() => {
    const handleFeedback = (res: { correct: boolean }) => {
      setFeedback(res.correct);
      if (res.correct) {
        setTimeout(() => {
          setFeedback(null);
          setHasAnswered(false);
        }, 5000);
      }
    };

    socket.on('answer-feedback', handleFeedback);
    return () => {
      socket.off('answer-feedback', handleFeedback);
    };
  }, [socket]);

  useEffect(() => {
    if (roomData?.phase === 'GAME_OVER') {
      const isWinner = roomData.winner?.socketId === currentPlayer.socketId;
      if (isWinner) playWinSound();
      else playLoseSound();
    } else if (roomData?.phase === 'QUESTION_COUNTDOWN') {
      playCountdownSound();
    }
  }, [roomData?.phase, roomData?.winner, currentPlayer]);

  // Reset answer state cleanly without race conditions
  useEffect(() => {
    if (roomData?.phase === 'QUESTION') {
      // Only clear feedback if no one has answered yet (brand new question just started)
      if (roomData.answeredPlayers?.length === 0) {
        setHasAnswered(false);
        setFeedback(null);
      }
    } else if (roomData?.phase !== 'QUESTION') {
      // If phase changes (like back to TURN_START), clear wrong feedback instantly
      setFeedback((prev) => (prev === false ? null : prev));
      setHasAnswered(false);
    }
  }, [roomData?.phase, roomData?.answeredPlayers, currentPlayer.socketId]);

  // Handle sudden disconnects or loading states
  if (!roomData || !currentPlayer) {
    return (
      <div className="mobile-screen">
        <div className="mobile-waiting">Syncing to Host...</div>
      </div>
    );
  }

  const { id: roomCode, phase, players, board, activePlayerIndex, winner } = roomData;
  const activePlayer = players[activePlayerIndex] || {};
  const isMyTurn = activePlayer.socketId === currentPlayer.socketId;

  // Pre-sort players by score (highest to lowest)
  const sortedPlayers = [...players].sort((a: any, b: any) => b.score - a.score);

  // Render temporary full-screen feedback
  if (feedback !== null) {
    return (
      <div className={`feedback-screen ${feedback ? 'feedback-correct' : 'feedback-wrong'}`}>
        <div style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '24px' }}>{feedback ? 'CORRECT!' : 'WRONG ✖'}</div>
        <div style={{ width: '90%', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sortedPlayers.map((p: any) => (
            <div key={p.socketId} style={{ background: 'rgba(0,0,0,0.3)', padding: '14px 20px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>{p.name}</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>{p.score}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Reveal Phase (for players who didn't answer / timed out)
  if (phase === 'QUESTION_REVEAL') {
    return (
      <div className="mobile-screen" style={{ justifyContent: 'center' }}>
        <h2 style={{ marginBottom: '20px', letterSpacing: '2px', color: 'var(--text-muted)' }}>CURRENT SCORES</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '350px' }}>
          {sortedPlayers.map((p: any) => (
            <div key={p.socketId} className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `5px solid ${p.color}` }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: p.color }}>{p.name}</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)' }}>{p.score}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Lobby Phase
  if (phase === 'LOBBY') {
    return (
      <div className="mobile-screen">
        <div className="home-hex-deco" style={{ fontSize: '3rem', animation: 'none', color: currentPlayer.color, filter: 'none' }}>⬡</div>
        <div className="lobby-mobile" style={{ color: currentPlayer.color }}>
          {currentPlayer.name}
        </div>
        <div style={{ marginTop: '20px' }}>
          <span className="mobile-waiting">CONNECTED TO ROOM</span>
          <div className="lobby-code">{roomCode}</div>
        </div>
        <div className="mobile-waiting" style={{ marginTop: '40vh' }}>
          Wait for host to start match...
        </div>
      </div>
    );
  }

  // Game Over Phase
  if (phase === 'GAME_OVER') {
    const isWinner = winner?.socketId === currentPlayer.socketId;
    return (
      <div className={`feedback-screen ${isWinner ? 'feedback-correct' : ''}`}>
        <div style={{ fontSize: '3rem', textAlign: 'center' }}>
          {isWinner ? '🏆 YOU WIN!' : 'MATCH OVER'}
        </div>
        <button
          className="button-primary"
          style={{ marginTop: '30px', fontSize: '1.2rem', padding: '12px 24px', width: 'auto' }}
          onClick={() => window.location.href = '/'}
        >
          Back to home page
        </button>
      </div>
    );
  }

  // Turn Start (Select Hexagon) Phase
  if (phase === 'TURN_START') {
    return (
      <div
        className="mobile-screen"
        style={{
          background: isMyTurn ? `${currentPlayer.color}15` : 'transparent',
          transition: 'background 0.5s ease',
          padding: '12px',
        }}
      >
        <div style={{ flexShrink: 0, padding: '10px 0', height: '80px', display: 'flex', alignItems: 'center' }}>
          {isMyTurn ? (
            <div className="mobile-your-turn" style={{ color: currentPlayer.color }}>
              YOUR TURN!
            </div>
          ) : (
            <div className="mobile-waiting">
              Waiting for{' '}
              <strong style={{ color: activePlayer.color }}>{activePlayer.name}</strong>...
            </div>
          )}
        </div>

        {isMyTurn && (
          <div style={{ fontSize: '0.9rem', color: 'white', marginBottom: '10px', flexShrink: 0, fontWeight: 700 }}>
            TAP AN UNCLAIMED HEXAGON
          </div>
        )}

        <div className="mobile-board-wrap" style={{ opacity: isMyTurn ? 1 : 0.4 }}>
          <HexBoard
            board={board}
            players={players}
            interactive={isMyTurn}
            onCellClick={(id) => {
              if (isMyTurn) socket.emit('select-cell', { code: roomCode, cellId: id });
            }}
          />
        </div>
      </div>
    );
  }

  // Question Countdown Phase
  if (phase === 'QUESTION_COUNTDOWN') {
    return (
      <div className="countdown-screen">
        <div className="countdown-label">GET READY</div>
        {/* We use key={roomData.countdown} to force re-trigger the CSS animation each second */}
        <div key={roomData.countdown} className="countdown-number">
          {roomData.countdown === 1 ? 'GO' : roomData.countdown - 1}
        </div>
      </div>
    );
  }

  // Question Phase
  if (phase === 'QUESTION') {
    const hasAlreadyAnswered = roomData.answeredPlayers?.includes(currentPlayer.socketId);

    if (hasAlreadyAnswered) {
      return (
        <div className="q-screen-mobile">
          <div className="mobile-waiting" style={{ marginTop: '40vh', fontSize: '1.2rem' }}>
            Waiting for other players...
          </div>
        </div>
      );
    }

    return (
      <div className="q-screen-mobile">
        <div className="q-label">LOOK AT HOST SCREEN</div>
        <div className="q-timer-bar">
          <div className="q-timer-fill" />
        </div>
        <div className="q-buttons">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              className={`q-btn q-btn-${idx}`}
              disabled={hasAnswered}
              onClick={() => {
                if (hasAnswered) return;
                setHasAnswered(true);
                socket.emit('submit-answer', { code: roomCode, answerIndex: idx });
              }}
            >
              {['A', 'B', 'C', 'D'][idx]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
