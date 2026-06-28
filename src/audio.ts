let audioContext: AudioContext | null = null;
let musicTimer: number | null = null;
let musicStep = 0;

const getAudioContext = () => {
  audioContext ??= new AudioContext();
  return audioContext;
};

const playTone = (
  frequency: number,
  duration: number,
  gainValue: number,
  type: OscillatorType = "sine",
) => {
  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  gain.gain.setValueAtTime(0, context.currentTime);
  gain.gain.linearRampToValueAtTime(gainValue, context.currentTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration + 0.03);
};

export const playButtonSound = () => {
  playTone(660, 0.12, 0.045);
  window.setTimeout(() => playTone(880, 0.12, 0.03), 70);
};

export const playPageSound = () => {
  playTone(392, 0.18, 0.025, "triangle");
  window.setTimeout(() => playTone(523.25, 0.18, 0.022, "triangle"), 110);
};

export const playCheckpointSound = () => {
  [523.25, 659.25, 783.99, 1046.5].forEach((note, index) => {
    window.setTimeout(() => playTone(note, 0.22, 0.04, "triangle"), index * 80);
  });
};

export const startMusic = () => {
  if (musicTimer !== null) return;

  const notes = [261.63, 329.63, 392, 493.88, 440, 392, 329.63, 293.66];

  const tick = () => {
    const note = notes[musicStep % notes.length];
    playTone(note, 0.58, 0.018, "sine");
    playTone(note / 2, 0.62, 0.012, "triangle");
    musicStep += 1;
  };

  tick();
  musicTimer = window.setInterval(tick, 620);
};

export const stopMusic = () => {
  if (musicTimer === null) return;
  window.clearInterval(musicTimer);
  musicTimer = null;
};

