import { motion } from "framer-motion";

function Navigator() {
  return (
    <main className="page app-shell">
      <motion.section
        className="content-panel"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1>Navigator</h1>

        <h2>Kak Duta GenRe</h2>

        <button>Chat WhatsApp</button>

        <br />
        <br />

        <button>Cari PIK-R Terdekat</button>
      </motion.section>

      <motion.aside
        className="illustration-panel"
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
      aria-label="Area ilustrasi navigator"
    >
        <div className="illustration-slot">
          <img
            className="illustration-image"
            src="/illustrations/navigator-support.svg"
            alt="Ilustrasi komunitas dan dukungan mentor"
          />
        </div>
      </motion.aside>
    </main>
  );
}

export default Navigator;
