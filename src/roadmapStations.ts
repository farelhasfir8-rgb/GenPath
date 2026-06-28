export type StationNumber = 1 | 2 | 3 | 4;

export type Station = {
  number: StationNumber;
  title: string;
  checklist: string[];
};

export const roadmapStations: Station[] = [
  {
    number: 1,
    title: "Mengenali Potensi Diri",
    checklist: [
      "Catat 3 kelebihanmu.",
      "Tanyakan pada 1 teman tentang kekuatanmu.",
      "Tentukan target kecil minggu ini.",
    ],
  },
  {
    number: 2,
    title: "Membangun Mental yang Siap",
    checklist: [
      "Tulis 2 hal yang membuatmu cemas.",
      "Pilih satu hal yang bisa kamu kendalikan.",
      "Lakukan satu afirmasi positif hari ini.",
    ],
  },
  {
    number: 3,
    title: "Mengembangkan Skill",
    checklist: [
      "Pilih satu skill yang ingin dipelajari.",
      "Cari satu sumber belajar.",
      "Jadwalkan latihan minggu ini.",
    ],
  },
  {
    number: 4,
    title: "Terhubung dengan Mentor",
    checklist: [
      "Baca tips dari mentor GenRe.",
      "Siapkan satu pertanyaan.",
      "Buat rencana aksi 30 hari.",
    ],
  },
];
