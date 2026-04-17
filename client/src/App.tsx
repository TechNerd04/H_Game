import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import HostScreen from './components/HostScreen';
import MobileScreen from './components/MobileScreen';
import BackgroundHexagons from './components/BackgroundHexagons';

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
  const navigate = useNavigate();

  useEffect(() => {
    const socket = getSocket();

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    const onRoomCreated = (room: any) => {
      console.log('Room created!', room);
      setRoomData(room);
      navigate(`/host`);
    };
    const onRoomUpdated = (room: any) => setRoomData(room);
    const onJoinSuccess = (player: any) => setCurrentPlayer(player);
    const onJoinError = (msg: string) => alert('Error: ' + msg);

    // Initial check
    setIsConnected(socket.connected);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('room-created', onRoomCreated);
    socket.on('room-updated', onRoomUpdated);
    socket.on('joined-success', onJoinSuccess);
    socket.on('join-error', onJoinError);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('room-created', onRoomCreated);
      socket.off('room-updated', onRoomUpdated);
      socket.off('joined-success', onJoinSuccess);
      socket.off('join-error', onJoinError);
    };
  }, [navigate]);

  return (
    <>
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
          className="button-primary huge-btn" 
          onClick={onCreateRoom}
          disabled={!isConnected}
          style={{ marginBottom: '16px' }}
        >
          ⬡ &nbsp; HOST A ROOM
        </button>
        <button
          className="button-primary huge-btn btn-join"
          onClick={onGoJoin}
        >
          JOIN AS PLAYER
        </button>
      </div>

      <p className="home-hint">
        Host opens on desktop · Players join on mobile
      </p>
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
