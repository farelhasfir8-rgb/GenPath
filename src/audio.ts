let audioContext: AudioContext | null = null;
let musicTimer: number | null = null;
let musicStep = 0;
const musicVolume = 0.35;

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

  const melody = [
    523.25, 659.25, 783.99, 880, 783.99, 659.25, 587.33, 659.25, 698.46,
    880, 987.77, 880, 783.99, 659.25, 587.33, 523.25,
  ];
  const harmony = [261.63, 349.23, 392, 329.63];

  const tick = () => {
    const note = melody[musicStep % melody.length];
    const chordRoot = harmony[Math.floor(musicStep / 4) % harmony.length];

    playTone(note, 0.34, 0.09 * musicVolume, "triangle");

    if (musicStep % 2 === 0) {
      playTone(note * 1.5, 0.22, 0.028 * musicVolume, "sine");
    }

    if (musicStep % 4 === 0) {
      playTone(chordRoot, 1.35, 0.052 * musicVolume, "sine");
      playTone(chordRoot * 1.5, 1.25, 0.032 * musicVolume, "triangle");
    }

    musicStep += 1;
  };

  tick();
  musicTimer = window.setInterval(tick, 360);
};

export const stopMusic = () => {
  if (musicTimer === null) return;
  window.clearInterval(musicTimer);
  musicTimer = null;
};
