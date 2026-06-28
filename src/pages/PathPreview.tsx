import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function PathPreview() {
  const navigate = useNavigate();

  return (
    <main className="page app-shell">
      <motion.section
        className="content-panel"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1>Masa Depanku</h1>

        <h3>5 Stasiun</h3>

        <ul>
          <li>Kenali Potensi Diri</li>
          <li>Mental Readiness</li>
          <li>Skill Building</li>
          <li>Mentorship</li>
          <li>Finish</li>
        </ul>

        <button onClick={() => navigate("/roadmap")}>
          Mulai Perjalanan -&gt;
        </button>
      </motion.section>

      <motion.aside
        className="illustration-panel"
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
      aria-label="Area ilustrasi pratinjau jalur"
    >
        <div className="illustration-slot">
          <img
            className="illustration-image"
            src="/illustrations/path-preview-adventure.svg"
            alt="Ilustrasi memulai petualangan baru"
          />
        </div>
      </motion.aside>
    </main>
  );
}

export default PathPreview;
