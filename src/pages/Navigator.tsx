import { motion } from "framer-motion";
import {
  HeartHandshake,
  Leaf,
  MapPin,
  MessageCircle,
  Search,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import {
  createQuestion,
  formatQuestionTime,
  incrementHelpful,
  loadInspirations,
  loadQuestions,
  saveQuestions,
  type DiscussionQuestion,
} from "../discussion";
import { journeyDefinitions, loadJourneyCategory, type JourneyCategory } from "../journey";

const categoryOptions: Array<{ id: "all" | JourneyCategory; label: string }> = [
  { id: "all", label: "Semua" },
  { id: "future", label: journeyDefinitions.future.label },
  { id: "wellbeing", label: journeyDefinitions.wellbeing.label },
  { id: "genre", label: journeyDefinitions.genre.label },
];

const getQuestionText = (question: DiscussionQuestion) =>
  `${question.message} ${question.replies
    .map((reply) => `${reply.facilitatorName} ${reply.message}`)
    .join(" ")}`.toLowerCase();

function Navigator() {
  const [question, setQuestion] = useState("");
  const [activeTab, setActiveTab] = useState<"stories" | "inspiration">(
    () =>
      window.localStorage.getItem("genpath-community-tab") === "inspiration"
        ? "inspiration"
        : "stories",
  );
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | JourneyCategory>(
    "all",
  );
  const [questions, setQuestions] = useState(() => loadQuestions());
  const [inspirations] = useState(() => loadInspirations());

  const submitQuestion = () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    const nextQuestions = [
      createQuestion(trimmedQuestion, loadJourneyCategory()),
      ...questions,
    ];
    setQuestions(nextQuestions);
    saveQuestions(nextQuestions);
    setQuestion("");
  };

  const markHelpful = (questionId: string) => {
    const nextQuestions = incrementHelpful(questions, questionId);
    setQuestions(nextQuestions);
    saveQuestions(nextQuestions);
  };

  const filteredQuestions = questions.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      !search.trim() || getQuestionText(item).includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const filteredInspirations = inspirations.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      !search.trim() || item.message.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="page app-shell">
      <motion.section
        className="content-panel navigator-panel"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="badge">Ruang Aman Remaja</span>
        <h1>🌿 Komunitas GenPath</h1>

        <p>
          Baca cerita anonim, temukan jawaban mentor, dan simpan kalimat baik
          dari remaja lain tanpa harus memulai perjalanan dulu.
        </p>

        <div className="navigator-actions">
          <button type="button">
            <MapPin size={19} />
            Cari PIK-R Terdekat
          </button>
        </div>

        <div className="community-tabs" role="tablist" aria-label="Konten komunitas">
          <button
            className={activeTab === "stories" ? "active" : ""}
            type="button"
            onClick={() => {
              setActiveTab("stories");
              window.localStorage.setItem("genpath-community-tab", "stories");
            }}
          >
            <MessageCircle size={18} />
            Cerita
          </button>
          <button
            className={activeTab === "inspiration" ? "active" : ""}
            type="button"
            onClick={() => {
              setActiveTab("inspiration");
              window.localStorage.setItem("genpath-community-tab", "inspiration");
            }}
          >
            <Leaf size={18} />
            Inspirasi
          </button>
        </div>

        <div className="community-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari cerita, topik, atau jawaban mentor..."
          />
        </div>

        <div className="filter-chips" aria-label="Filter diskusi">
          {categoryOptions.map((category) => (
            <button
              key={category.id}
              className={activeCategory === category.id ? "active" : ""}
              type="button"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <section className="discussion-section" aria-labelledby="discussion-title">
          {activeTab === "stories" ? (
            <>
              <h2 id="discussion-title">Cerita Anonim</h2>
              <p>
                Ceritakan kendalamu secara anonim. Mentor GenPath dapat
                membantu memberi arah dengan hangat.
              </p>

              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Tulis pertanyaanmu di sini..."
              />

              <button
                className="discussion-submit"
                type="button"
                onClick={submitQuestion}
                disabled={!question.trim()}
              >
                <Send size={18} />
                Kirim Anonim
              </button>

              <div className="discussion-list" aria-live="polite">
                {filteredQuestions.length === 0 ? (
                  <p className="empty-discussion">
                    Belum ada cerita yang cocok dengan pencarianmu.
                  </p>
                ) : (
                  filteredQuestions.map((item) => (
                    <motion.article
                      className="discussion-card community-card"
                      key={item.id}
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="discussion-meta">
                        <span className="anonymous-avatar">A</span>
                        <strong>Anonymous</strong>
                        <span>{formatQuestionTime(item.createdAt)}</span>
                      </div>
                      <span className="category-chip">
                        {journeyDefinitions[item.category].label}
                      </span>
                      <p>{item.message}</p>

                      {item.replies.map((reply) => (
                        <div className="reply-card mentor-reply" key={reply.id}>
                          <span>Dijawab oleh</span>
                          <strong>{reply.facilitatorName}</strong>
                          <small>{reply.facilitatorRole}</small>
                          <p>{reply.message}</p>
                        </div>
                      ))}

                      <div className="community-card-footer">
                        <span>{item.replies.length} jawaban mentor</span>
                        <button type="button" onClick={() => markHelpful(item.id)}>
                          <HeartHandshake size={17} />
                          {item.helpfulCount} membantu
                        </button>
                      </div>
                    </motion.article>
                  ))
                )}
              </div>
            </>
          ) : (
            <>
              <h2 id="discussion-title">Inspirasi Remaja</h2>
              <p>
                Kalimat positif yang dibagikan anonim setelah menyelesaikan
                perjalanan GenPath.
              </p>

              <div className="inspiration-list" aria-live="polite">
                {filteredInspirations.map((item) => (
                  <motion.article
                    className="inspiration-card community-card"
                    key={item.id}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sparkles size={21} />
                    <p>“{item.message}”</p>
                    <span>{journeyDefinitions[item.category].label}</span>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </section>
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
