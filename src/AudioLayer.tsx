import { Music, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  playButtonSound,
  playPageSound,
  startMusic,
  stopMusic,
} from "./audio";

function AudioLayer() {
  const [musicOn, setMusicOn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleButtonClick = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("button")) {
        playButtonSound();
      }
    };

    document.addEventListener("click", handleButtonClick, true);
    return () => document.removeEventListener("click", handleButtonClick, true);
  }, []);

  useEffect(() => {
    playPageSound();
  }, [location.pathname]);

  useEffect(() => {
    if (musicOn) {
      startMusic();
      return;
    }

    stopMusic();
  }, [musicOn]);

  useEffect(() => stopMusic, []);

  return (
    <button
      className={`music-toggle ${musicOn ? "is-on" : ""}`}
      type="button"
      onClick={() => setMusicOn((isOn) => !isOn)}
      aria-pressed={musicOn}
      aria-label={musicOn ? "Matikan musik latar" : "Nyalakan musik latar"}
      title={musicOn ? "Matikan musik" : "Nyalakan musik"}
    >
      <Music size={16} />
      {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}

export default AudioLayer;

