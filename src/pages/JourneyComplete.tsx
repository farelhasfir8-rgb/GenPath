import { motion } from "framer-motion";
import { CheckCircle2, Leaf, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createInspiration,
  loadInspirations,
  saveInspirations,
} from "../discussion";
import { getActiveJourney } from "../journey";

const progressItems = [
  "Mengenali situasi",
  "Menemukan arah",
  "Menyusun langkah",
  "Menyelesaikan perjalanan",
];

function JourneyComplete() {
  const navigate = useNavigate();
  const journey = getActiveJourney();
  const [feedback, setFeedback] = useState("");

  const submitFeedback = () => {
    const message = feedback.trim();
    if (message) {
      const nextInspirations = [
        createInspiration(message, journey.id),
        ...loadInspirations(),
      ];
      saveInspirations(nextInspirations);
    }

    window.localStorage.setItem("genpath-community-tab", "inspiration");
    navigate("/navigator");
  };

  return (
    <main className="page app-shell journey-complete-page">
      <motion.section
        className="content-panel completion-panel"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="celebration-mark"
          animate={{ y: [0, -8, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={34} />
          <Leaf size={28} />
        </motion.div>

        <span className="badge">{journey.label}</span>
        <h1>🌱 Selamat!</h1>
        <h2>Kamu telah menyelesaikan satu perjalanan bersama GenPath.</h2>

        <p>
          Langkahmu hari ini mungkin kecil, tapi ia sudah membuat arah terasa
          lebih terlihat. Simpan keberanian itu untuk perjalanan berikutnya.
        </p>

        <div className="progress-summary">
          <strong>Hari ini kamu telah</strong>
          {progressItems.map((item) => (
            <span key={item}>
              <CheckCircle2 size={18} />
              {item}
            </span>
          ))}
        </div>

        <div className="affirmation-card">
          <Sparkles size={20} />
          <p>{journey.affirmation}</p>
        </div>

        <section className="feedback-box" aria-labelledby="feedback-title">
          <h2 id="feedback-title">
            Bagaimana perasaanmu setelah menjelajah bersama GenPath?
          </h2>
          <p>
            Tuliskan satu kalimat yang ingin kamu bagikan kepada remaja lain.
          </p>
          <textarea
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            placeholder="Contoh: Aku mulai berani mengambil langkah kecil."
          />
          <button type="button" onClick={submitFeedback}>
            <Send size={18} />
            Submit Anonim
          </button>
        </section>
      </motion.section>

      <motion.aside
        className="illustration-panel"
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
        aria-label="Area ilustrasi perjalanan selesai"
      >
        <div className="illustration-slot">
          <img
            className="illustration-image"
            src="/illustrations/checkpoint-celebration.svg"
            alt="Ilustrasi perayaan perjalanan selesai"
          />
        </div>
      </motion.aside>
    </main>
  );
}

export default JourneyComplete;
