import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Compass.css";

function Compass() {
  const navigate = useNavigate();

  return (
    <main className="page app-shell">
      <motion.section
        className="content-panel"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1>Hallo GenRangerss, Apa yang sedang kamu hadapi hari ini?</h1>

        <p>
          Pilih kondisi yang paling menggambarkan dirimu. GenPath akan
          membantumu menemukan langkah selanjutnya.
        </p>

        <div className="card-list">
          <motion.button
            className="compass-card"
            onClick={() => navigate("/reflection")}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <h2>Aku bingung menentukan masa depan</h2>
            <span>Pendidikan, karier, dan tujuan hidup.</span>
          </motion.button>

          <motion.button
            className="compass-card"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <h2>Aku ingin bercerita</h2>
            <span>Ceritakan masalahmu dan temukan arah terbaik.</span>
          </motion.button>

          <motion.button
            className="compass-card"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <h2>Aku sedang punya masalah hubungan</h2>
            <span>Teman, keluarga, maupun pasangan.</span>
          </motion.button>

          <motion.button
            className="compass-card"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <h2>Aku ingin berkembang</h2>
            <span>Skill, organisasi, dan pengembangan diri.</span>
          </motion.button>
        </div>
      </motion.section>

      <motion.aside
        className="illustration-panel"
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
      aria-label="Area ilustrasi kompas"
    >
        <div className="illustration-slot">
          <img
            className="illustration-image"
            src="/illustrations/compass-navigation.svg"
            alt="Ilustrasi memilih arah perjalanan"
          />
        </div>
      </motion.aside>
    </main>
  );
}

export default Compass;
