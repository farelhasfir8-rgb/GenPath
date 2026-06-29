import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  classifyJourney,
  journeyDefinitions,
  saveJourneyCategory,
  type JourneyCategory,
} from "../journey";
import "../styles/Analysis.css";

type ReflectionInsight = {
  summary: string;
  concern: string;
  emotion: string;
  challenge: string;
  category: JourneyCategory;
  keywords: string[];
  possibleCause: string;
};

const concernRules = [
  {
    label: "pilihan pendidikan atau jurusan",
    words: ["jurusan", "kuliah", "kampus", "sekolah", "kelas", "belajar"],
  },
  {
    label: "arah karier dan masa depan",
    words: ["kerja", "karier", "pekerjaan", "cita-cita", "masa depan", "usaha"],
  },
  {
    label: "relasi dengan keluarga atau orang tua",
    words: ["orang tua", "ayah", "ibu", "keluarga", "rumah", "saudara"],
  },
  {
    label: "pertemanan dan lingkungan sosial",
    words: ["teman", "sahabat", "pacar", "lingkungan", "pergaulan"],
  },
  {
    label: "kepercayaan diri dan kondisi pribadi",
    words: ["percaya diri", "minder", "takut", "cemas", "mental", "diri"],
  },
];

const emotionRules = [
  {
    label: "bingung dan membutuhkan kejelasan",
    words: ["bingung", "bimbang", "ragu", "galau", "dilema"],
  },
  {
    label: "tertekan dan lelah secara emosional",
    words: ["tertekan", "capek", "lelah", "stres", "stress", "berat"],
  },
  {
    label: "cemas tentang keputusan berikutnya",
    words: ["cemas", "khawatir", "takut", "panik", "overthinking"],
  },
  {
    label: "sedih karena merasa kurang didengar",
    words: ["sedih", "kecewa", "sendiri", "kesepian", "menangis"],
  },
  {
    label: "bersemangat tetapi masih mencari arah",
    words: ["semangat", "ingin", "mau", "suka", "tertarik"],
  },
];

const causeRules = [
  {
    label: "ada harapan dari orang lain yang belum sejalan dengan keinginanmu",
    words: ["orang tua", "disuruh", "dipaksa", "harus", "ekspektasi", "tuntutan"],
  },
  {
    label: "informasi dan pilihan yang tersedia terasa terlalu banyak atau belum jelas",
    words: ["pilihan", "opsi", "informasi", "belum tahu", "tidak tahu", "nggak tahu"],
  },
  {
    label: "kamu sedang membandingkan diri dengan orang di sekitar",
    words: ["dibanding", "teman", "lebih", "ketinggalan", "gagal"],
  },
  {
    label: "kamu belum punya ruang aman untuk membicarakan keputusan ini",
    words: ["cerita", "didengar", "sendiri", "takut bilang", "diam"],
  },
];

const challengeRules = [
  {
    label: "memisahkan keinginan pribadi dari tekanan sekitar",
    words: ["orang tua", "disuruh", "dipaksa", "ekspektasi", "tuntutan"],
  },
  {
    label: "mencari dukungan yang terasa aman untuk diajak bicara",
    words: ["sendiri", "takut cerita", "takut bilang", "didengar", "diam"],
  },
  {
    label: "mengubah rasa bingung menjadi langkah kecil yang bisa dicoba",
    words: ["bingung", "pilihan", "belum tahu", "tidak tahu", "ragu"],
  },
  {
    label: "menemukan informasi yang benar sebelum mengambil keputusan",
    words: ["informasi", "mitos", "fakta", "reproduksi", "pik-r", "genre"],
  },
];

const stopWords = new Set([
  "aku",
  "saya",
  "yang",
  "dan",
  "atau",
  "karena",
  "untuk",
  "dengan",
  "jadi",
  "tapi",
  "kalau",
  "ingin",
  "mau",
  "lebih",
  "belum",
  "sudah",
  "tidak",
  "nggak",
  "gak",
  "ini",
  "itu",
  "ada",
  "dari",
  "ke",
  "di",
]);

const countMatches = (text: string, words: string[]) =>
  words.reduce((score, word) => score + (text.includes(word) ? 1 : 0), 0);

const pickBestRule = <T extends { label: string; words: string[] }>(
  text: string,
  rules: T[],
  fallback: string,
) => {
  const bestRule = rules
    .map((rule) => ({ ...rule, score: countMatches(text, rule.words) }))
    .sort((a, b) => b.score - a.score)[0];

  return bestRule && bestRule.score > 0 ? bestRule.label : fallback;
};

const extractKeywords = (text: string) => {
  const normalizedWords = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.has(word));

  const counts = normalizedWords.reduce<Record<string, number>>((acc, word) => {
    acc[word] = (acc[word] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    .slice(0, 4)
    .map(([word]) => word);
};

const analyzeStory = (story: string): ReflectionInsight => {
  const trimmedStory = story.trim();

  if (!trimmedStory) {
    return {
      concern: "situasi yang belum kamu ceritakan",
      emotion: "butuh waktu untuk mulai menamai perasaan",
      challenge: "mulai menuliskan situasi dengan lebih jujur dan pelan-pelan",
      category: "future",
      keywords: ["refleksi", "arah"],
      possibleCause: "ceritamu belum cukup lengkap untuk dibaca dengan jelas",
      summary:
        "GenPath belum menangkap cerita utamamu, jadi perjalanan awal diarahkan untuk membantumu mulai mengenali diri. Coba tulis beberapa kalimat tentang apa yang sedang terjadi dan bagian mana yang terasa berat.",
    };
  }

  const loweredStory = trimmedStory.toLowerCase();
  const category = classifyJourney(trimmedStory);
  const concern = pickBestRule(
    loweredStory,
    concernRules,
    "keputusan pribadi yang sedang terasa penting",
  );
  const emotion = pickBestRule(
    loweredStory,
    emotionRules,
    "butuh ketenangan sebelum mengambil langkah",
  );
  const possibleCause = pickBestRule(
    loweredStory,
    causeRules,
    "kebutuhan untuk memahami diri dan pilihan yang paling realistis",
  );
  const challenge = pickBestRule(
    loweredStory,
    challengeRules,
    "menyusun langkah kecil yang terasa aman dan realistis untuk dilakukan",
  );
  const keywords = extractKeywords(trimmedStory);
  const keywordText =
    keywords.length > 0
      ? ` Kata kunci yang menonjol: ${keywords.join(", ")}.`
      : "";

  return {
    concern,
    emotion,
    challenge,
    category,
    keywords,
    possibleCause,
    summary: `GenPath menangkap fokus utamamu ada pada ${concern}. Dari cara ceritamu mengalir, kamu tampaknya sedang ${emotion}; tantangan terdekatnya adalah ${challenge}. Kemungkinan ada latar berupa ${possibleCause}.${keywordText}`,
  };
};

function Analysis() {
  const navigate = useNavigate();
  const location = useLocation();

  const story =
    location.state?.story ||
    window.localStorage.getItem("genpath-last-reflection") ||
    "";
  const insight = analyzeStory(story);
  const journey = journeyDefinitions[insight.category];
  saveJourneyCategory(insight.category);

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

          <p className="story-box">
            {story || "Kamu belum menuliskan cerita apa pun."}
          </p>

          <h2>Apa yang kami tangkap</h2>

          <p>{insight.summary}</p>

          <div className="journey-selection">
            <span>🧭 Jalur yang dipilih GenPath</span>
            <strong>{journey.label}</strong>
            <p>{journey.why}</p>
          </div>

          <div className="insight-grid" aria-label="Ringkasan analisis">
            <div>
              <strong>Isu utama</strong>
              <span>{insight.concern}</span>
            </div>
            <div>
              <strong>Emosi</strong>
              <span>{insight.emotion}</span>
            </div>
            <div>
              <strong>Kemungkinan pemicu</strong>
              <span>{insight.possibleCause}</span>
            </div>
            <div>
              <strong>Tantangan utama</strong>
              <span>{insight.challenge}</span>
            </div>
            <div>
              <strong>Jalur perjalanan</strong>
              <span>{journey.shortLabel}</span>
            </div>
          </div>

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
