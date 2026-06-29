import { motion } from "framer-motion";
import { Reply, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import {
  createReply,
  formatQuestionTime,
  loadQuestions,
  saveQuestions,
  type DiscussionQuestion,
} from "../discussion";

type MentorProfile = {
  name: string;
  role: string;
};

const MENTOR_PROFILE_KEY = "genpath-mentor-profile";

const loadMentorProfile = (): MentorProfile | null => {
  try {
    const raw = window.localStorage.getItem(MENTOR_PROFILE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return typeof parsed?.name === "string" && typeof parsed?.role === "string"
      ? parsed
      : null;
  } catch {
    return null;
  }
};

function Facilitator() {
  const [questions, setQuestions] = useState(() => loadQuestions());
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [mentorProfile, setMentorProfile] = useState<MentorProfile | null>(
    () => loadMentorProfile(),
  );
  const [profileDraft, setProfileDraft] = useState<MentorProfile>({
    name: mentorProfile?.name ?? "",
    role: mentorProfile?.role ?? "",
  });

  const updateQuestions = (nextQuestions: DiscussionQuestion[]) => {
    setQuestions(nextQuestions);
    saveQuestions(nextQuestions);
  };

  const saveMentorProfile = () => {
    const name = profileDraft.name.trim();
    const role = profileDraft.role.trim();
    if (!name || !role) return;

    const nextProfile = { name, role };
    window.localStorage.setItem(MENTOR_PROFILE_KEY, JSON.stringify(nextProfile));
    setMentorProfile(nextProfile);
  };

  const submitReply = (questionId: string) => {
    const draft = replyDrafts[questionId]?.trim();
    if (!draft || !mentorProfile) return;

    const nextQuestions = questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            replies: [
              ...question.replies,
              createReply(draft, mentorProfile.name, mentorProfile.role),
            ],
          }
        : question,
    );

    updateQuestions(nextQuestions);
    setReplyDrafts((currentDrafts) => ({ ...currentDrafts, [questionId]: "" }));
    setActiveQuestionId(null);
  };

  return (
    <main className="page app-shell">
      <motion.section
        className="content-panel facilitator-panel"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="badge">Mode Fasilitator</span>
        <h1>Pertanyaan Anonim</h1>
        <p>
          Bantu jawab pertanyaan yang masuk dari pengunjung GenPath secara
          hangat, singkat, dan menenangkan.
        </p>

        {mentorProfile && (
          <div className="mentor-profile-card">
            <ShieldCheck size={22} />
            <div>
              <span>Masuk sebagai mentor</span>
              <strong>{mentorProfile.name}</strong>
              <small>{mentorProfile.role}</small>
            </div>
            <button type="button" onClick={() => setMentorProfile(null)}>
              Ubah
            </button>
          </div>
        )}

        <div className="discussion-list facilitator-list">
          {questions.length === 0 ? (
            <p className="empty-discussion">
              Belum ada pertanyaan anonim yang masuk.
            </p>
          ) : (
            questions.map((question) => (
              <article className="discussion-card" key={question.id}>
                <div className="discussion-meta">
                  <strong>Anonymous</strong>
                  <span>{formatQuestionTime(question.createdAt)}</span>
                </div>
                <p>{question.message}</p>

                {question.replies.map((reply) => (
                  <div className="reply-card mentor-reply" key={reply.id}>
                    <span>Dijawab oleh</span>
                    <strong>{reply.facilitatorName}</strong>
                    <small>{reply.facilitatorRole}</small>
                    <p>{reply.message}</p>
                  </div>
                ))}

                {activeQuestionId === question.id ? (
                  <div className="reply-form">
                    <textarea
                      value={replyDrafts[question.id] ?? ""}
                      onChange={(event) =>
                        setReplyDrafts((currentDrafts) => ({
                          ...currentDrafts,
                          [question.id]: event.target.value,
                        }))
                      }
                      placeholder="Tulis jawaban fasilitator..."
                    />
                    <button
                      type="button"
                      onClick={() => submitReply(question.id)}
                      disabled={!replyDrafts[question.id]?.trim() || !mentorProfile}
                    >
                      <Send size={18} />
                      Kirim Jawaban
                    </button>
                  </div>
                ) : (
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => setActiveQuestionId(question.id)}
                  >
                    <Reply size={18} />
                    Balas
                  </button>
                )}
              </article>
            ))
          )}
        </div>
      </motion.section>

      <motion.aside
        className="illustration-panel"
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
        aria-label="Area ilustrasi fasilitator"
      >
        <div className="illustration-slot">
          <img
            className="illustration-image"
            src="/illustrations/navigator-support.svg"
            alt="Ilustrasi dukungan fasilitator"
          />
        </div>
      </motion.aside>

      {!mentorProfile && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <motion.section
            className="mentor-modal"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            aria-label="Profil mentor"
          >
            <span className="badge">Profil Mentor</span>
            <h2>Kenalkan dirimu dulu</h2>
            <p>
              Nama dan peranmu akan tampil di setiap jawaban agar remaja tahu
              siapa yang membantu mereka.
            </p>

            <label>
              Nama Lengkap
              <input
                value={profileDraft.name}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="Fahrel Hasbulloh"
              />
            </label>

            <label>
              Peran / Instansi
              <input
                value={profileDraft.role}
                onChange={(event) =>
                  setProfileDraft((current) => ({
                    ...current,
                    role: event.target.value,
                  }))
                }
                placeholder="Duta GenRe Kota Semarang"
              />
            </label>

            <button
              type="button"
              onClick={saveMentorProfile}
              disabled={!profileDraft.name.trim() || !profileDraft.role.trim()}
            >
              Simpan Profil Mentor
            </button>
          </motion.section>
        </motion.div>
      )}
    </main>
  );
}

export default Facilitator;
