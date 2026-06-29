import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveJourney } from "../journey";
import type { StationNumber } from "../roadmapStations";

type StationDetailProps = {
  currentStation: StationNumber;
};

const stationIllustrations: Record<StationNumber, { src: string; alt: string }> = {
  1: {
    src: "/illustrations/station-potential.svg",
    alt: "Ilustrasi mengenali potensi diri",
  },
  2: {
    src: "/illustrations/station-mental.svg",
    alt: "Ilustrasi membangun mental yang siap",
  },
  3: {
    src: "/illustrations/station-skill.svg",
    alt: "Ilustrasi mengembangkan skill",
  },
  4: {
    src: "/illustrations/station-mentor.svg",
    alt: "Ilustrasi terhubung dengan mentor",
  },
};

function StationDetail({ currentStation }: StationDetailProps) {
  const navigate = useNavigate();
  const journey = getActiveJourney();
  const station =
    journey.stations.find(
      (roadmapStation) => roadmapStation.number === currentStation,
    ) ?? journey.stations[0];
  const illustration = stationIllustrations[currentStation];

  const [task1, setTask1] = useState(false);
  const [task2, setTask2] = useState(false);
  const [task3, setTask3] = useState(false);

  const completed = task1 && task2 && task3;

  return (
    <main className="page app-shell">
      <motion.section
        className="content-panel"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1>{station.title}</h1>

        <p>Selesaikan misi kecil berikut sebelum melanjutkan perjalanan.</p>

        <label>
          <input
            type="checkbox"
            checked={task1}
            onChange={() => setTask1(!task1)}
          />
          {station.checklist[0]}
        </label>

        <br />
        <br />

        <label>
          <input
            type="checkbox"
            checked={task2}
            onChange={() => setTask2(!task2)}
          />
          {station.checklist[1]}
        </label>

        <br />
        <br />

        <label>
          <input
            type="checkbox"
            checked={task3}
            onChange={() => setTask3(!task3)}
          />
          {station.checklist[2]}
        </label>

        <br />
        <br />

        <button disabled={!completed} onClick={() => navigate("/checkpoint")}>
          {completed ? "Lanjut ke Checkpoint ->" : "Selesaikan semua misi"}
        </button>
      </motion.section>

      <motion.aside
        className="illustration-panel"
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
      aria-label="Area ilustrasi stasiun"
    >
        <div className="illustration-slot">
          <img
            className="illustration-image"
            src={illustration.src}
            alt={illustration.alt}
          />
        </div>
      </motion.aside>
    </main>
  );
}

export default StationDetail;
