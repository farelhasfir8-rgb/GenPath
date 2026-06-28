import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <main className="app-shell welcome-page">
      <motion.div
        className="content-panel welcome-card"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="badge">GenPath</span>

        <div className="hero-icon">
          <Compass size={56} />
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          GenPath
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Mapping Better Decisions
        </motion.h2>

        <p className="description">
          Setiap perjalanan besar dimulai dari satu langkah kecil.
          <br />
          Mari petakan masa depanmu bersama GenPath.
        </p>

        <button className="start-button" onClick={() => navigate("/compass")}>
          Mulai Melangkah -&gt;
        </button>
      </motion.div>

      <motion.aside
        className="illustration-panel"
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        aria-label="Area ilustrasi GenPath"
      >
        <div className="illustration-slot">
          <img
            className="illustration-image"
            src="/illustrations/welcome-journey.svg"
            alt="Ilustrasi perjalanan menuju masa depan"
          />
        </div>
      </motion.aside>
    </main>
  );
}

export default Welcome;
