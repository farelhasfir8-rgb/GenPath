import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { roadmapStations, type StationNumber } from "../roadmapStations";
import "../styles/Roadmap.css";

type RoadmapProps = {
  currentStation: StationNumber;
};

function Roadmap({ currentStation }: RoadmapProps) {
  const navigate = useNavigate();

  return (
    <main className="roadmap-page app-shell">
      <motion.section
        className="content-panel"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1>Jalur Masa Depanku</h1>

        <p>
          Berikut langkah-langkah yang direkomendasikan GenPath berdasarkan
          refleksi yang telah kamu lakukan.
        </p>

        <div className="timeline">
          {roadmapStations.map((station) => (
            <motion.div
              key={station.number}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: station.number * 0.06 }}
            >
              <div
                className={`step ${
                  station.number === currentStation ? "active" : ""
                }`}
              >
                <div className="circle">{station.number}</div>
                <div>
                  <h3>{station.title}</h3>
                  <span>
                    {station.number < currentStation
                      ? "Selesai"
                      : station.number === currentStation
                        ? "Mulai sekarang"
                        : "Belum dibuka"}
                  </span>
                </div>
              </div>

              <div className="line"></div>
            </motion.div>
          ))}

          <div className="step finish">
            <div className="circle">4+</div>
            <div>
              <h3>Tujuan Tercapai</h3>
              <span>Lebih siap mengambil keputusan</span>
            </div>
          </div>
        </div>

        <button onClick={() => navigate("/station")}>
          Mulai Stasiun {currentStation} -&gt;
        </button>
      </motion.section>

      <motion.aside
        className="illustration-panel"
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
      aria-label="Area ilustrasi roadmap"
    >
        <div className="illustration-slot">
          <img
            className="illustration-image"
            src="/illustrations/roadmap-milestones.svg"
            alt="Ilustrasi jalur dengan tujuan dan pencapaian"
          />
        </div>
      </motion.aside>
    </main>
  );
}

export default Roadmap;
