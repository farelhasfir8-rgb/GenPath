export type JourneyCategory = "future" | "wellbeing" | "genre";

export type StationNumber = 1 | 2 | 3 | 4;

export type JourneyStation = {
  number: StationNumber;
  title: string;
  checklist: string[];
};

export type JourneyDefinition = {
  id: JourneyCategory;
  label: string;
  shortLabel: string;
  why: string;
  affirmation: string;
  stations: JourneyStation[];
};

export const JOURNEY_STORAGE_KEY = "genpath-journey-category";

export const journeyDefinitions: Record<JourneyCategory, JourneyDefinition> = {
  future: {
    id: "future",
    label: "🎓 Masa Depan & Pendidikan",
    shortLabel: "Masa Depan",
    why:
      "Ceritamu paling banyak menyentuh arah belajar, pilihan jurusan, karier, skill, atau rasa percaya diri untuk melangkah.",
    affirmation:
      "Kamu tidak harus langsung tahu semua jawaban. Hari ini kamu sudah mulai mengenali potensi dan memilih satu langkah yang bisa dijalani.",
    stations: [
      {
        number: 1,
        title: "Potensi Diri",
        checklist: [
          "Tulis 3 hal yang kamu sukai.",
          "Ingat satu pencapaian yang paling kamu banggakan.",
          "Tentukan tujuan kecil minggu ini.",
        ],
      },
      {
        number: 2,
        title: "Mental Readiness",
        checklist: [
          "Apa ketakutan terbesarmu?",
          "Mana yang bisa kamu kendalikan?",
          "Tulis satu afirmasi untuk dirimu.",
        ],
      },
      {
        number: 3,
        title: "Skill Building",
        checklist: [
          "Pilih satu skill yang ingin dikembangkan.",
          "Cari sumber belajar.",
          "Jadwalkan latihan minggu ini.",
        ],
      },
      {
        number: 4,
        title: "Mentor",
        checklist: [
          "Tulis satu pertanyaan kepada mentor.",
          "Baca pengalaman mentor lain.",
          "Hubungi mentor bila diperlukan.",
        ],
      },
    ],
  },
  wellbeing: {
    id: "wellbeing",
    label: "❤️ Relasi & Kesehatan Mental",
    shortLabel: "Relasi & Mental",
    why:
      "Ceritamu menunjukkan kebutuhan untuk mengenali emosi, mencari dukungan aman, dan menjaga dirimu pelan-pelan.",
    affirmation:
      "Perasaanmu valid. Kamu sudah berani berhenti sejenak, menamai yang terasa berat, dan membuka ruang untuk dukungan.",
    stations: [
      {
        number: 1,
        title: "Mengenali Emosi",
        checklist: [
          "Pilih emosi dominanmu.",
          "Ceritakan penyebabnya.",
          "Sebutkan satu hal yang masih kamu syukuri.",
        ],
      },
      {
        number: 2,
        title: "Dukungan",
        checklist: [
          "Siapa orang yang paling kamu percaya?",
          "Apa bantuan yang kamu harapkan?",
          "Kirim pesan atau ajak ngobrol orang tersebut.",
        ],
      },
      {
        number: 3,
        title: "Self Care",
        checklist: [
          "Lakukan aktivitas yang membuatmu tenang.",
          "Istirahat sejenak dari media sosial.",
          "Tulis satu hal positif hari ini.",
        ],
      },
      {
        number: 4,
        title: "Teman Sebaya",
        checklist: [
          "Baca pengalaman remaja lain.",
          "Bertanya kepada mentor.",
          "Cari komunitas pendukung.",
        ],
      },
    ],
  },
  genre: {
    id: "genre",
    label: "🌱 Isu GenRe",
    shortLabel: "Isu GenRe",
    why:
      "Ceritamu berkaitan dengan situasi remaja yang perlu informasi valid, dukungan aman, dan akses layanan yang tepat.",
    affirmation:
      "Kamu layak mendapat informasi yang benar dan dukungan yang aman. Langkah kecilmu hari ini adalah bentuk keberanian menjaga masa depan.",
    stations: [
      {
        number: 1,
        title: "Memahami Situasi",
        checklist: [
          "Apa yang sedang terjadi?",
          "Apa yang paling membuatmu khawatir?",
          "Apa tujuanmu membuka GenPath hari ini?",
        ],
      },
      {
        number: 2,
        title: "Informasi Valid",
        checklist: [
          "Baca edukasi sesuai topik.",
          "Pelajari mitos dan fakta.",
          "Tandai informasi yang paling membantu.",
        ],
      },
      {
        number: 3,
        title: "Dukungan Aman",
        checklist: [
          "Pilih orang dewasa yang kamu percaya.",
          "Tulis pertanyaan yang masih mengganjal.",
          "Diskusikan dengan mentor bila siap.",
        ],
      },
      {
        number: 4,
        title: "Layanan Profesional",
        checklist: [
          "Cari PIK-R terdekat.",
          "Lihat layanan profesional.",
          "Simpan informasi penting.",
        ],
      },
    ],
  },
};

const futureWords = [
  "jurusan",
  "kuliah",
  "kampus",
  "sekolah",
  "belajar",
  "karier",
  "kerja",
  "pekerjaan",
  "cita-cita",
  "masa depan",
  "skill",
  "bakat",
  "minat",
  "percaya diri",
  "minder",
  "prestasi",
];

const wellbeingWords = [
  "sedih",
  "cemas",
  "khawatir",
  "takut",
  "stres",
  "stress",
  "mental",
  "emosi",
  "teman",
  "sahabat",
  "pacar",
  "keluarga",
  "orang tua",
  "ayah",
  "ibu",
  "sendiri",
  "kesepian",
  "overthinking",
];

const genreWords = [
  "nikah",
  "menikah",
  "pernikahan",
  "hamil",
  "kehamilan",
  "seks",
  "pacaran",
  "reproduksi",
  "narkoba",
  "napza",
  "pergaulan bebas",
  "bullying",
  "kekerasan",
  "pik-r",
  "genre",
  "kesehatan reproduksi",
];

const scoreWords = (text: string, words: string[]) =>
  words.reduce((score, word) => score + (text.includes(word) ? 1 : 0), 0);

export const classifyJourney = (story: string): JourneyCategory => {
  const text = story.toLowerCase();
  const scores: Record<JourneyCategory, number> = {
    future: scoreWords(text, futureWords),
    wellbeing: scoreWords(text, wellbeingWords),
    genre: scoreWords(text, genreWords),
  };

  const ranked = (Object.entries(scores) as [JourneyCategory, number][]).sort(
    (a, b) => b[1] - a[1],
  );

  return ranked[0][1] > 0 ? ranked[0][0] : "future";
};

export const saveJourneyCategory = (category: JourneyCategory) => {
  window.localStorage.setItem(JOURNEY_STORAGE_KEY, category);
};

export const loadJourneyCategory = (): JourneyCategory => {
  const stored = window.localStorage.getItem(JOURNEY_STORAGE_KEY);
  return stored === "future" || stored === "wellbeing" || stored === "genre"
    ? stored
    : "future";
};

export const getActiveJourney = () => journeyDefinitions[loadJourneyCategory()];
