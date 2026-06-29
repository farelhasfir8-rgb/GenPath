import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Reflection.css";

function Reflection() {
  const navigate = useNavigate();
  const [story, setStory] = useState("");

  const submitReflection = () => {
    window.localStorage.setItem("genpath-last-reflection", story);
    window.localStorage.setItem("genpath-current-station", "1");
    window.dispatchEvent(new Event("genpath-reset-station"));
    navigate("/analysis", {
      state: { story },
    });
  };

  return (
    <main className="reflection-page app-shell">
      <motion.section
        className="content-panel"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1>Ceritakan apa yang sedang kamu rasakan.</h1>

        <p>
          Tulis dengan santai. GenPath akan membantumu memahami situasi sebelum
          menentukan langkah berikutnya.
        </p>

        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Contoh: Aku bingung memilih jurusan karena orang tua ingin aku menjadi dokter, tapi aku lebih suka desain..."
        />

        <button
          onClick={submitReflection}
        >
          Analisis Ceritaku -&gt;
        </button>
      </motion.section>

      <motion.aside
        className="illustration-panel"
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
      aria-label="Area ilustrasi refleksi"
    >
        <div className="illustration-slot">
          <img
            className="illustration-image"
            src="/illustrations/reflection-writing.svg"
            alt="Ilustrasi remaja menulis refleksi"
          />
        </div>
      </motion.aside>
    </main>
  );
}

export default Reflection;
