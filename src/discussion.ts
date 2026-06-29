import type { JourneyCategory } from "./journey";

export type DiscussionReply = {
  id: string;
  facilitatorName: string;
  facilitatorRole: string;
  message: string;
  createdAt: string;
};

export type DiscussionQuestion = {
  id: string;
  message: string;
  category: JourneyCategory;
  helpfulCount: number;
  createdAt: string;
  replies: DiscussionReply[];
};

export type InspirationPost = {
  id: string;
  message: string;
  category: JourneyCategory;
  createdAt: string;
};

const STORAGE_KEY = "genpath-discussion-questions";
const INSPIRATION_STORAGE_KEY = "genpath-inspiration-posts";

const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const loadQuestions = (): DiscussionQuestion[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultQuestions;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaultQuestions;

    return parsed
      .filter(
        (item) =>
          typeof item?.id === "string" &&
          typeof item?.message === "string" &&
          typeof item?.createdAt === "string" &&
          Array.isArray(item?.replies),
      )
      .map(normalizeQuestion)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  } catch {
    return defaultQuestions;
  }
};

export const saveQuestions = (questions: DiscussionQuestion[]) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
};

export const createQuestion = (
  message: string,
  category: JourneyCategory = "future",
): DiscussionQuestion => ({
  id: createId(),
  message,
  category,
  helpfulCount: 0,
  createdAt: new Date().toISOString(),
  replies: [],
});

export const createReply = (
  message: string,
  facilitatorName: string,
  facilitatorRole: string,
): DiscussionReply => ({
  id: createId(),
  facilitatorName,
  facilitatorRole,
  message,
  createdAt: new Date().toISOString(),
});

export const incrementHelpful = (
  questions: DiscussionQuestion[],
  questionId: string,
) =>
  questions.map((question) =>
    question.id === questionId
      ? { ...question, helpfulCount: question.helpfulCount + 1 }
      : question,
  );

export const loadInspirations = (): InspirationPost[] => {
  try {
    const raw = window.localStorage.getItem(INSPIRATION_STORAGE_KEY);
    if (!raw) return defaultInspirations;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaultInspirations;

    return [...parsed.filter(isInspirationPost), ...defaultInspirations].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } catch {
    return defaultInspirations;
  }
};

export const saveInspirations = (posts: InspirationPost[]) => {
  window.localStorage.setItem(
    INSPIRATION_STORAGE_KEY,
    JSON.stringify(posts.filter((post) => !post.id.startsWith("seed-"))),
  );
};

export const createInspiration = (
  message: string,
  category: JourneyCategory,
): InspirationPost => ({
  id: createId(),
  message,
  category,
  createdAt: new Date().toISOString(),
});

export const formatQuestionTime = (isoDate: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));

const isJourneyCategory = (category: unknown): category is JourneyCategory =>
  category === "future" || category === "wellbeing" || category === "genre";

const normalizeQuestion = (item: {
  id: string;
  message: string;
  category?: unknown;
  helpfulCount?: unknown;
  createdAt: string;
  replies: unknown[];
}): DiscussionQuestion => ({
  id: item.id,
  message: item.message,
  category: isJourneyCategory(item.category) ? item.category : "future",
  helpfulCount:
    typeof item.helpfulCount === "number" && item.helpfulCount >= 0
      ? item.helpfulCount
      : 0,
  createdAt: item.createdAt,
  replies: item.replies
    .filter(
      (reply): reply is {
        id: string;
        facilitatorName: string;
        facilitatorRole?: unknown;
        message: string;
        createdAt: string;
      } => {
        if (typeof reply !== "object" || reply === null) return false;
        return (
          "id" in reply &&
          "facilitatorName" in reply &&
          "message" in reply &&
          "createdAt" in reply &&
          typeof reply.id === "string" &&
          typeof reply.facilitatorName === "string" &&
          typeof reply.message === "string" &&
          typeof reply.createdAt === "string"
        );
      },
    )
    .map((reply) => ({
      id: reply.id,
      facilitatorName: reply.facilitatorName,
      facilitatorRole:
        typeof reply.facilitatorRole === "string"
          ? reply.facilitatorRole
          : "Mentor GenPath",
      message: reply.message,
      createdAt: reply.createdAt,
    })),
});

const isInspirationPost = (item: unknown): item is InspirationPost =>
  typeof item === "object" &&
  item !== null &&
  "id" in item &&
  "message" in item &&
  "category" in item &&
  "createdAt" in item &&
  typeof item.id === "string" &&
  typeof item.message === "string" &&
  isJourneyCategory(item.category) &&
  typeof item.createdAt === "string";

const defaultQuestions: DiscussionQuestion[] = [
  {
    id: "seed-future",
    message:
      "Aku bingung memilih jurusan karena suka desain, tapi keluargaku berharap aku masuk kedokteran. Mulainya dari mana ya?",
    category: "future",
    helpfulCount: 24,
    createdAt: "2026-06-24T08:30:00.000Z",
    replies: [
      {
        id: "seed-future-reply",
        facilitatorName: "Fahrel Hasbulloh",
        facilitatorRole: "Duta GenRe Kota Semarang",
        message:
          "Mulai dari memetakan alasanmu: apa yang kamu sukai, kemampuan yang sudah ada, dan informasi jurusan yang kamu butuhkan. Setelah itu ajak keluarga bicara dengan data, bukan hanya rasa takut.",
        createdAt: "2026-06-24T09:10:00.000Z",
      },
    ],
  },
  {
    id: "seed-wellbeing",
    message:
      "Akhir-akhir ini aku gampang cemas dan merasa sendirian, tapi takut dianggap berlebihan kalau cerita ke teman.",
    category: "wellbeing",
    helpfulCount: 31,
    createdAt: "2026-06-23T14:20:00.000Z",
    replies: [
      {
        id: "seed-wellbeing-reply",
        facilitatorName: "Nadia Rahma",
        facilitatorRole: "Konselor Sebaya PIK-R",
        message:
          "Kamu tidak berlebihan. Pilih satu orang yang paling aman, lalu mulai dengan kalimat sederhana seperti, 'Aku lagi butuh didengar sebentar.' Cerita pelan-pelan sudah cukup.",
        createdAt: "2026-06-23T15:05:00.000Z",
      },
    ],
  },
  {
    id: "seed-genre",
    message:
      "Aku ingin tahu informasi yang benar soal kesehatan reproduksi, tapi malu bertanya langsung.",
    category: "genre",
    helpfulCount: 19,
    createdAt: "2026-06-22T11:00:00.000Z",
    replies: [
      {
        id: "seed-genre-reply",
        facilitatorName: "Raka Putra",
        facilitatorRole: "Mentor Edukasi GenRe",
        message:
          "Rasa malu itu wajar. Kamu bisa mulai dari sumber edukasi resmi, lalu catat pertanyaan yang masih mengganjal. Kalau siap, bawa pertanyaan itu ke mentor atau PIK-R terdekat.",
        createdAt: "2026-06-22T12:18:00.000Z",
      },
    ],
  },
];

const defaultInspirations: InspirationPost[] = [
  {
    id: "seed-inspiration-1",
    message: "Aku sadar aku tidak sendirian.",
    category: "wellbeing",
    createdAt: "2026-06-25T10:00:00.000Z",
  },
  {
    id: "seed-inspiration-2",
    message: "Semoga kamu juga menemukan jalanmu.",
    category: "future",
    createdAt: "2026-06-25T09:30:00.000Z",
  },
  {
    id: "seed-inspiration-3",
    message: "Aku mulai berani mengambil langkah kecil.",
    category: "genre",
    createdAt: "2026-06-24T16:00:00.000Z",
  },
];
