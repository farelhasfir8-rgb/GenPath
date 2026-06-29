import { AnimatePresence, motion } from "framer-motion";
import { Compass, Leaf, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

const SPLASH_KEY = "genpath-splash-seen";

function SplashIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 3800);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="splash-intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.div
        className="splash-scene splash-teen"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ times: [0, 0.78, 1], duration: 1 }}
      >
        <div className="splash-teen-frame">
          <img src="/illustrations/welcome-journey.svg" alt="" />
          <motion.span
            className="splash-wave"
            animate={{ rotate: [0, 15, -8, 14, 0] }}
            transition={{ duration: 0.9, repeat: 1, ease: "easeInOut" }}
            aria-hidden="true"
          >
            Hai
          </motion.span>
        </div>
        <h1>Halo! Selamat datang.</h1>
      </motion.div>

      <motion.div
        className="splash-scene"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.96, 1, 1, 1.02] }}
        transition={{ times: [0, 0.2, 0.78, 1], duration: 1, delay: 0.95 }}
      >
        <span className="genre-logo">GenRe</span>
      </motion.div>

      <motion.div
        className="splash-scene"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: [0, 1, 1, 0], y: [18, 0, 0, -10] }}
        transition={{ times: [0, 0.22, 0.78, 1], duration: 1.1, delay: 1.85 }}
      >
        <span className="genpath-logo">GenPath</span>
        <p>Mapping Better Decisions</p>
      </motion.div>

      <motion.div
        className="splash-cloud-transition"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: ["100%", "12%", "-16%"], opacity: [0, 1, 0.95] }}
        transition={{ duration: 1, delay: 2.85, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

function Welcome() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(
    () => window.sessionStorage.getItem(SPLASH_KEY) !== "true",
  );

  const finishSplash = () => {
    window.sessionStorage.setItem(SPLASH_KEY, "true");
    setShowSplash(false);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashIntro onComplete={finishSplash} />}
      </AnimatePresence>

      {!showSplash && (
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

        <div className="welcome-actions">
          <button className="start-button" onClick={() => navigate("/compass")}>
            <UserRound size={19} />
            Mulai Melangkah
          </button>

          <button
            className="community-button"
            onClick={() => navigate("/navigator")}
          >
            <Leaf size={19} />
            Jelajahi Cerita Remaja
          </button>

          <button
            className="facilitator-button"
            onClick={() => navigate("/facilitator")}
          >
            <ShieldCheck size={19} />
            Masuk Sebagai Fasilitator
          </button>
        </div>
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
      )}
    </>
  );
}

export default Welcome;
