import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import HostScreen from './components/HostScreen';
import MobileScreen from './components/MobileScreen';
import BackgroundHexagons from './components/BackgroundHexagons';
import ThemeToggle from './components/ThemeToggle';
import TutorialScreen from './components/TutorialScreen';
import { playBackgroundPlaylist } from './utils/sound';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';

// Real hex colors for players
const PLAYER_COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];

// Force single global socket to ensure zero react-lifecycle bugs
let globalSocket: Socket | null = null;
const getSocket = () => {
  if (!globalSocket) {
    globalSocket = io(SERVER_URL, { autoConnect: true });
  }
  return globalSocket;
};

// ---- App Root ----
function App() {
  const [roomData, setRoomData] = useState<any>(null);
  const [currentPlayer, setCurrentPlayer] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = getSocket();

    const onConnect = () => {
      setIsConnected(true);
      const savedCode = sessionStorage.getItem('roomCode');
      const savedRole = sessionStorage.getItem('role');
      if (savedCode && savedRole === 'host') {
        socket.emit('rejoin-host', savedCode);
      }
    };
    const onDisconnect = () => setIsConnected(false);
    const onRoomCreated = (room: any) => {
      console.log('Room created!', room);
      sessionStorage.setItem('roomCode', room.id);
      sessionStorage.setItem('role', 'host');
      setRoomData(room);
      navigate(`/host`);
    };
    const onRoomUpdated = (room: any) => setRoomData(room);
    const onJoinSuccess = (player: any) => setCurrentPlayer(player);
    const onJoinError = (msg: string) => alert('Error: ' + msg);
    const onRoomDestroyed = () => {
      sessionStorage.removeItem('roomCode');
      sessionStorage.removeItem('role');
      window.location.href = '/';
    };

    // Initial check
    setIsConnected(socket.connected);
    if (socket.connected) {
      const savedCode = sessionStorage.getItem('roomCode');
      const savedRole = sessionStorage.getItem('role');
      if (savedCode && savedRole === 'host') {
        socket.emit('rejoin-host', savedCode);
      }
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('room-created', onRoomCreated);
    socket.on('room-updated', onRoomUpdated);
    socket.on('joined-success', onJoinSuccess);
    socket.on('join-error', onJoinError);
    socket.on('room-destroyed', onRoomDestroyed);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('room-created', onRoomCreated);
      socket.off('room-updated', onRoomUpdated);
      socket.off('joined-success', onJoinSuccess);
      socket.off('join-error', onJoinError);
      socket.off('room-destroyed', onRoomDestroyed);
    };
  }, [navigate]);

  if (!hasAcknowledged) {
    return (
      <>
        <ThemeToggle />
        <BackgroundHexagons />
        <div className="home-screen" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ maxWidth: '600px', padding: '40px', textAlign: 'center', margin: '20px' }}>
            <div className="home-hex-deco" style={{ animation: 'none', marginBottom: '20px' }}>⬡</div>
            <h2 style={{ marginBottom: '20px', color: 'var(--text-main)', letterSpacing: '2px' }}>ATTENTION</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px', color: 'var(--text-muted)' }}>
              This game is create for HCI course and it is done by the following students:
              <br /><br />
              <strong style={{ color: 'var(--text-main)' }}>Ahmad, Abdullah, Khalifa, Hazza</strong>
            </p>
            <button 
              className="button-primary huge-btn" 
              onClick={() => {
                setHasAcknowledged(true);
                playBackgroundPlaylist();
              }}
            >
              I Acknowledge
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ThemeToggle />
      <BackgroundHexagons />
      <Routes>
        <Route
        path="/"
        element={
          <Home
            isConnected={isConnected}
            onCreateRoom={() => {
              if (getSocket().connected) {
                getSocket().emit('create-room');
              } else {
                alert('Server is disconnected! Check console.');
              }
            }}
            onGoJoin={() => navigate('/play')}
          />
        }
      />
      <Route
        path="/host"
        element={<HostScreen socket={getSocket()} roomData={roomData} />}
      />
      <Route
        path="/play"
        element={
          <GuestJoin
            socket={getSocket()}
            roomData={roomData}
            currentPlayer={currentPlayer}
          />
        }
      />
      <Route path="/tutorial" element={<TutorialScreen />} />
      </Routes>
    </>
  );
}

// ---- Home Screen ----
function Home({
  isConnected,
  onCreateRoom,
  onGoJoin,
}: {
  isConnected: boolean;
  onCreateRoom: () => void;
  onGoJoin: () => void;
}) {
  const [showRules, setShowRules] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    playBackgroundPlaylist();
  }, []);

  return (
    <div className="home-screen">
      <div className="home-hero">
        <div className="home-hex-deco">⬡</div>
        <h1 className="home-title">CELLS GAME</h1>
        <p className="home-subtitle">Hexagon Territory · Trivia Strategy</p>
        
        {/* Connection Status Indicator removed */}
      </div>

      <div className="glass-panel home-card" style={{ marginTop: '10px' }}>
        <button
          className="button-primary huge-btn btn-join"
          onClick={onGoJoin}
          style={{ marginBottom: '16px' }}
        >
          JOIN AS PLAYER
        </button>
        <button 
          className="button-primary huge-btn" 
          onClick={onCreateRoom}
          disabled={!isConnected}
          style={{ marginBottom: '16px' }}
        >
          ⬡ &nbsp; HOST A ROOM
        </button>
        <button
          className="button-primary huge-btn btn-rules"
          onClick={() => setShowRules(true)}
        >
          HOW TO PLAY
        </button>
      </div>

      <p className="home-hint">
        Host opens on desktop · Players join on mobile
      </p>

      {showRules && (
        <div className="rules-overlay" onClick={() => setShowRules(false)}>
          <div className="rules-modal glass-panel" onClick={e => e.stopPropagation()}>
            <h2 className="rules-title">How to Play</h2>
            <ul className="rules-list">
              <li><strong>Objective:</strong> Be the first to connect a continuous path of your claimed hex cells between two opposite sides of the board.</li>
              <li><strong>Setup:</strong> One player Hosts the game on a big screen. Up to 4 players join using the room code on their mobile devices.</li>
              <li><strong>Gameplay:</strong> When it's your turn, select an unclaimed hexagon on the board from your device.</li>
              <li><strong>Trivia:</strong> A trivia question will appear for all players. Answer correctly before the timer runs out!</li>
              <li><strong>Claiming:</strong> If you answer correctly, you claim the cell. If you answer wrong, the cell remains empty, and your turn ends.</li>
              <li><strong>Strategy:</strong> Block your opponents' paths while building your own. Use your trivia knowledge to conquer the board!</li>
            </ul>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button className="button-primary" onClick={() => setShowRules(false)}>
                GOT IT
              </button>
              <button 
                className="button-primary btn-join" 
                onClick={() => {
                  setShowRules(false);
                  navigate('/tutorial');
                }}
              >
                INTERACTIVE TUTORIAL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Guest Join Screen ----
function GuestJoin({
  socket,
  roomData,
  currentPlayer,
}: {
  socket: Socket | null;
  roomData: any;
  currentPlayer: any;
}) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (!currentPlayer) {
      playBackgroundPlaylist();
    }
  }, [currentPlayer]);

  if (currentPlayer && socket) {
    return (
      <MobileScreen
        socket={socket}
        roomData={roomData}
        currentPlayer={currentPlayer}
      />
    );
  }

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) return;
    socket?.emit('join-room', {
      code: code.toUpperCase().trim(),
      name: name.trim(),
    });
  };

  return (
    <div className="home-screen">
      <button 
        className="button-primary" 
        style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100, padding: '8px 16px', fontSize: '1rem', width: 'auto' }}
        onClick={() => window.location.href = '/'}
      >
        ← Home
      </button>
      <div className="home-hero">
        <div className="home-hex-deco">⬡</div>
        <h1 className="home-title" style={{ fontSize: '2.5rem' }}>
          JOIN GAME
        </h1>
      </div>

      <div className="glass-panel home-card">
        <form onSubmit={handleJoin} className="join-form">
          <input
            type="text"
            placeholder="Room Code (e.g. A4B2)"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="join-input"
            maxLength={4}
            autoFocus
            autoCapitalize="characters"
          />
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="join-input"
            maxLength={12}
          />
          <button type="submit" className="button-primary huge-btn" style={{ marginTop: '8px' }}>
            JOIN →
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
