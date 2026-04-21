let audioCtx: AudioContext | null = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playWinSound() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.type = 'sine';
    const now = ctx.currentTime;
    
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(659.25, now + 0.15);
    osc.frequency.setValueAtTime(783.99, now + 0.3);
    osc.frequency.setValueAtTime(1046.50, now + 0.45);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gainNode.gain.setValueAtTime(0.2, now + 0.45);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
    
    osc.start(now);
    osc.stop(now + 1.0);
  } catch (e) {
    console.warn("Audio playback failed", e);
  }
}

export function playLoseSound() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.type = 'sawtooth';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(150, now + 0.8);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

    osc.start(now);
    osc.stop(now + 0.8);
  } catch (e) {
    console.warn("Audio playback failed", e);
  }
}

// --- Background Music Synthesizer ---

let currentTheme: 'MAIN' | 'QUESTION' | null = null;
let themeInterval: any = null;

export function playMainTheme() {
  if (currentTheme === 'MAIN') return;
  stopTheme();
  currentTheme = 'MAIN';
  startSequencer('MAIN');
}

export function playQuestionTheme() {
  if (currentTheme === 'QUESTION') return;
  stopTheme();
  currentTheme = 'QUESTION';
  startSequencer('QUESTION');
}

export function stopTheme() {
  currentTheme = null;
  if (themeInterval) clearInterval(themeInterval);
}

let seqStep = 0;
function startSequencer(type: 'MAIN' | 'QUESTION') {
  const ctx = getAudioCtx();
  seqStep = 0;
  
  // MAIN: ~120 BPM 8th notes (250ms)
  // QUESTION: ~200 BPM 8th notes (150ms)
  const intervalMs = type === 'MAIN' ? 250 : 150; 
  
  const notes = {
    C3: 130.81, E3: 164.81, G3: 196.00, 
    C4: 261.63, E4: 329.63, G4: 392.00, A4: 440.00
  };
  
  themeInterval = setInterval(() => {
    if (ctx.state !== 'running') return;
    
    if (type === 'MAIN') {
      // Bouncy bass line
      const bassFreq = [notes.C3, notes.C3, notes.E3, notes.E3, notes.G3, notes.G3, notes.A4, notes.G3][seqStep % 8];
      playSynthNote(ctx, bassFreq, 'square', 0.15, 0.05);
      
      // Melody arpeggio
      if (seqStep % 2 === 0) {
        const melFreq = [notes.C4, notes.E4, notes.G4, notes.C4][(seqStep / 2) % 4];
        playSynthNote(ctx, melFreq, 'sine', 0.1, 0.03);
      }
    } else {
      // Question: intense ticking + bass pulse
      const bassFreq = [100, 100, 120, 100][seqStep % 4];
      playSynthNote(ctx, bassFreq, 'sawtooth', 0.1, 0.08);
      
      // Tick-tock
      const tickFreq = (seqStep % 2 === 0) ? 800 : 600;
      playSynthNote(ctx, tickFreq, 'triangle', 0.05, 0.02);
    }
    
    seqStep++;
  }, intervalMs);
}

function playSynthNote(ctx: AudioContext, freq: number, type: OscillatorType, duration: number, vol: number) {
  try {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration + 0.1);
  } catch(e){}
}
