const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

const rooms = {};

// Trivia DB from separate file
const questionsData = require('./questions');
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

function initializeBoard() {
  const board = {};
  const width = 5;
  const height = 5;
  
  // Shuffle alphabet to guarantee no repeats (5x5 = 25 cells, 26 letters available)
  const letters = alphabet.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  let letterIdx = 0;

  for (let r = 0; r < height; r++) {
    let r_offset = Math.floor(r / 2);
    for (let q = -r_offset; q < width - r_offset; q++) {
      const randomLetter = letters[letterIdx++];
      board[`${q},${r}`] = { id: `${q},${r}`, q, r, ownerId: null, letter: randomLetter };
    }
  }
  return board;
}

function getNeighbors(q, r) {
  const dirs = [[1, 0], [1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1]];
  return dirs.map(d => `${q + d[0]},${r + d[1]}`);
}

function checkWinCondition(board, playerId) {
  const width = 5;
  const height = 5;
  
  // Find all cells owned by player
  const playerCells = Object.values(board).filter(c => c.ownerId === playerId);
  if (playerCells.length === 0) return false;

  const playerCellIds = new Set(playerCells.map(c => c.id));
  
  function getConnectedComponent(startId) {
    const visited = new Set();
    const stack = [startId];
    
    while (stack.length > 0) {
      const curr = stack.pop();
      if (!visited.has(curr)) {
        visited.add(curr);
        const [cq, cr] = curr.split(',').map(Number);
        const neighbors = getNeighbors(cq, cr);
        for (const n of neighbors) {
          if (playerCellIds.has(n) && !visited.has(n)) {
            stack.push(n);
          }
        }
      }
    }
    return visited;
  }
  
  // Group all player cells into connected components
  const unvisited = new Set(playerCellIds);
  
  while (unvisited.size > 0) {
    const startId = unvisited.values().next().value;
    const component = getConnectedComponent(startId);
    
    let touchesTop = false;
    let touchesBottom = false;
    let touchesLeft = false;
    let touchesRight = false;
    
    for (const cellId of component) {
      const [q, r] = cellId.split(',').map(Number);
      
      if (r === 0) touchesTop = true;
      if (r === height - 1) touchesBottom = true;
      
      const r_offset = Math.floor(r / 2);
      const min_q = -r_offset;
      const max_q = width - r_offset - 1;
      
      if (q === min_q) touchesLeft = true;
      if (q === max_q) touchesRight = true;
      
      unvisited.delete(cellId);
    }
    
    if ((touchesTop && touchesBottom) || (touchesLeft && touchesRight)) {
      return true;
    }
  }
  
  return false;
}

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("create-room", () => {
    const code = generateRoomCode();
    rooms[code] = {
      id: code,
      hostSocketId: socket.id,
      players: [],
      board: initializeBoard(),
      phase: "LOBBY",
      activePlayerIndex: 0,
      currentQuestion: null,
      selectedCellId: null,
      winner: null,
      answeredPlayers: [],
      questionTimeout: null
    };
    socket.join(code);
    socket.emit("room-created", rooms[code]);
  });

const PLAYER_COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];

  socket.on("join-room", ({ code, name }) => {
    const room = rooms[code];
    if (room && room.phase === "LOBBY") {
      // Find an unused color
      const usedColors = room.players.map(p => p.color);
      const availableColors = PLAYER_COLORS.filter(c => !usedColors.includes(c));
      const color = availableColors.length > 0 ? availableColors[0] : PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)];
      
      const player = { socketId: socket.id, name, color, score: 0 };
      room.players.push(player);
      socket.join(code);
      io.to(code).emit("room-updated", room);
      socket.emit("joined-success", player);
    } else {
      socket.emit("error", "Room not found or game already started");
    }
  });

  socket.on("start-game", (code) => {
    const room = rooms[code];
    if (room && room.hostSocketId === socket.id && room.players.length > 0) {
      room.phase = "TURN_START";
      room.activePlayerIndex = Math.floor(Math.random() * room.players.length);
      io.to(code).emit("room-updated", room);
    }
  });

  socket.on("select-cell", ({ code, cellId }) => {
    const room = rooms[code];
    if (room && room.board[cellId] && !room.board[cellId].ownerId) {
      room.selectedCellId = cellId;
      const cellLetter = room.board[cellId].letter;
      const letterQuestions = questionsData[cellLetter] || questionsData['A'];
      const baseQuestion = letterQuestions[Math.floor(Math.random() * letterQuestions.length)];
      
      // Deep copy to shuffle options without mutating the global database
      const shuffledQuestion = {
        text: baseQuestion.text,
        options: [...baseQuestion.options],
        correct: baseQuestion.correct
      };

      const correctAnswerText = shuffledQuestion.options[shuffledQuestion.correct];

      // Fisher-Yates shuffle the options
      for (let i = shuffledQuestion.options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestion.options[i], shuffledQuestion.options[j]] = [shuffledQuestion.options[j], shuffledQuestion.options[i]];
      }

      // Find new index of correct answer
      shuffledQuestion.correct = shuffledQuestion.options.indexOf(correctAnswerText);
      room.currentQuestion = shuffledQuestion;
      room.phase = "QUESTION_COUNTDOWN";
      room.countdown = 3;
      room.answeredPlayers = [];
      // We don't send the 'correct' index to prevent cheating on mobile
      const clientQuestion = { ...room.currentQuestion };
      delete clientQuestion.correct;
      
      io.to(code).emit("room-updated", { ...room, currentQuestion: clientQuestion, questionTimeout: null });

      if (room.countdownInterval) clearInterval(room.countdownInterval);
      if (room.questionTimeout) clearTimeout(room.questionTimeout);
      
      room.countdownInterval = setInterval(() => {
        const currentRoom = rooms[code];
        if (!currentRoom || currentRoom.phase !== "QUESTION_COUNTDOWN") {
          clearInterval(room.countdownInterval);
          return;
        }
        
        currentRoom.countdown--;
        if (currentRoom.countdown > 0) {
          io.to(code).emit("room-updated", { ...currentRoom, currentQuestion: clientQuestion, questionTimeout: null });
        } else {
          clearInterval(currentRoom.countdownInterval);
          currentRoom.phase = "QUESTION";
          io.to(code).emit("room-updated", { ...currentRoom, currentQuestion: clientQuestion, questionTimeout: null });
          
          currentRoom.questionTimeout = setTimeout(() => {
            const timedOutRoom = rooms[code];
            if (timedOutRoom && timedOutRoom.phase === "QUESTION" && timedOutRoom.selectedCellId === cellId) {
              // Time finished without a correct answer
              timedOutRoom.phase = "TURN_START";
              timedOutRoom.selectedCellId = null;
              timedOutRoom.currentQuestion = null;
              timedOutRoom.activePlayerIndex = (timedOutRoom.activePlayerIndex + 1) % timedOutRoom.players.length;
              io.to(code).emit("room-updated", { ...timedOutRoom, questionTimeout: null });
            }
          }, 15000);
        }
      }, 1000);
    }
  });

  socket.on("submit-answer", ({ code, answerIndex }) => {
    const room = rooms[code];
    if (room && room.phase === "QUESTION" && room.currentQuestion) {
      const answeringPlayer = room.players.find(p => p.socketId === socket.id);
      if (!answeringPlayer) return;
      if (room.answeredPlayers.includes(socket.id)) return;

      const selectedParts = room.selectedCellId.split(',');
      const sq = Number(selectedParts[0]);
      const sr = Number(selectedParts[1]);

      // Capture correct index BEFORE mutating state
      const isCorrect = answerIndex === room.currentQuestion.correct;

      // Emit feedback immediately (before state changes) to the answering player
      socket.emit("answer-feedback", { correct: isCorrect });

      if (isCorrect) {
        if (room.questionTimeout) clearTimeout(room.questionTimeout);
        // Correct: claim the cell
        room.board[room.selectedCellId].ownerId = answeringPlayer.socketId;
        answeringPlayer.score += 1;
        
        if (checkWinCondition(room.board, answeringPlayer.socketId)) {
          room.phase = "GAME_OVER";
          room.winner = answeringPlayer;
        } else {
          room.phase = "TURN_START";
          room.selectedCellId = null;
          room.currentQuestion = null;
          room.activePlayerIndex = room.players.findIndex(p => p.socketId === answeringPlayer.socketId);
        }
        io.to(code).emit("room-updated", { ...room, questionTimeout: null });
      } else {
        // Wrong: add to answeredPlayers
        room.answeredPlayers.push(socket.id);
        
        // If all players have answered incorrectly
        if (room.answeredPlayers.length >= room.players.length) {
          if (room.questionTimeout) clearTimeout(room.questionTimeout);
          room.phase = "TURN_START";
          room.selectedCellId = null;
          room.currentQuestion = null;
          room.activePlayerIndex = (room.activePlayerIndex + 1) % room.players.length;
          io.to(code).emit("room-updated", { ...room, questionTimeout: null });
        }
      }
    }
  });

  socket.on("disconnect", () => {
    // Basic cleanup logic could go here
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});
