import { motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { playCheckpointSound } from "../audio";
import type { StationNumber } from "../roadmapStations";

type CheckpointProps = {
  currentStation: StationNumber;
  setCurrentStation: Dispatch<SetStateAction<StationNumber>>;
};

function Checkpoint({ currentStation, setCurrentStation }: CheckpointProps) {
  const navigate = useNavigate();

  const handleContinue = () => {
    playCheckpointSound();

    if (currentStation === 4) {
      navigate("/complete");
      return;
    }

    const nextStation = (currentStation + 1) as StationNumber;
    window.localStorage.setItem("genpath-current-station", String(nextStation));
    setCurrentStation(nextStation);
    navigate("/roadmap");
  };

  return (
    <main className="page app-shell">
      <motion.section
        className="content-panel"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1>Checkpoint</h1>

        <h2>Bagaimana perasaanmu setelah menyelesaikan misi ini?</h2>

        <p>
          Tidak apa-apa jika perjalananmu belum sempurna. Yang terpenting
          adalah kamu sudah mengambil satu langkah kecil hari ini.
        </p>

        <button onClick={handleContinue}>Aku Siap Melanjutkan</button>

        <button onClick={() => navigate("/navigator")}>
          Aku Masih Butuh Teman Bicara
        </button>
      </motion.section>

      <motion.aside
        className="illustration-panel"
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
      aria-label="Area ilustrasi checkpoint"
    >
        <div className="illustration-slot">
          <img
            className="illustration-image"
            src="/illustrations/checkpoint-celebration.svg"
            alt="Ilustrasi perayaan pencapaian"
          />
        </div>
      </motion.aside>
    </main>
  );
}

export default Checkpoint;
