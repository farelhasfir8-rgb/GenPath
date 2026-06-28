import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Analysis.css";

function Analysis() {
  const navigate = useNavigate();
  const location = useLocation();

  const story = location.state?.story || "Kamu belum menuliskan cerita apa pun.";

  return (
    <main className="analysis-page app-shell">
      <motion.section
        className="content-panel"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1>Hasil Refleksimu</h1>

        <div className="analysis-card">
          <h2>Ceritamu</h2>

          <p className="story-box">{story}</p>

          <h2>Apa yang kami tangkap</h2>

          <p>
            Saat ini kamu sedang mengalami kebingungan dalam menentukan arah
            hidup karena ada tekanan dari lingkungan dan harapan orang lain.
          </p>

          <h2>Prioritas pertama</h2>

          <p>
            Sebelum mengambil keputusan besar, kamu perlu memahami apa yang
            benar-benar kamu inginkan dan membuat rencana kecil yang realistis.
          </p>

          <button onClick={() => navigate("/roadmap")}>
            Lihat Jalur Navigasi -&gt;
          </button>
        </div>
      </motion.section>

      <motion.aside
        className="illustration-panel"
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
      aria-label="Area ilustrasi analisis"
    >
        <div className="illustration-slot">
          <img
            className="illustration-image"
            src="/illustrations/analysis-planning.svg"
            alt="Ilustrasi ide dan rencana pengembangan diri"
          />
        </div>
      </motion.aside>
    </main>
  );
}

export default Analysis;
