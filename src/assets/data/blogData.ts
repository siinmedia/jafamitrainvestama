// File: src/data/blogData.ts

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[]; // Menggunakan array agar mudah membuat paragraf
}

export const blogPosts: BlogPost[] = [
  {
    id: "tips-lolos-interview",
    title: "5 Tips Ampuh Lolos Interview Kerja di Era Digital",
    category: "Karir & Tips",
    date: "25 Mei 2024",
    readTime: "4 Menit Baca",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Persiapkan dirimu menghadapi wawancara kerja dengan strategi modern yang disukai oleh para HRD.",
    content: [
      "Wawancara kerja saat ini tidak lagi sekadar tanya jawab biasa. HRD kini lebih fokus pada bagaimana Anda bisa beradaptasi, memecahkan masalah, dan berkolaborasi dalam tim.",
      "Pertama, riset adalah kunci. Jangan datang ke wawancara tanpa mengetahui latar belakang perusahaan. Pelajari produk, visi, misi, dan budaya kerja mereka. Ini akan menunjukkan bahwa Anda proaktif dan benar-benar tertarik.",
      "Kedua, gunakan metode STAR (Situation, Task, Action, Result) saat menjawab pertanyaan berbasis pengalaman. Cara ini membantu Anda bercerita dengan terstruktur dan menonjolkan hasil nyata dari pekerjaan Anda sebelumnya.",
      "Terakhir, jangan lupa siapkan pertanyaan untuk HRD atau User. Bertanya di akhir sesi menunjukkan antusiasme dan pemikiran kritis Anda terhadap posisi yang dilamar."
    ]
  },
  {
    id: "budaya-kerja-inovatif",
    title: "Mengenal Budaya Kerja Inovatif di Jafa Mitra Investama",
    category: "Perusahaan",
    date: "20 Mei 2024",
    readTime: "3 Menit Baca",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Mengapa lingkungan kerja yang kolaboratif sangat penting bagi pertumbuhan karir dan perusahaan?",
    content: [
      "Di Jafa Mitra Investama, kami percaya bahwa inovasi lahir dari kolaborasi. Kami tidak hanya bekerja, tetapi kami tumbuh bersama sebagai satu keluarga besar.",
      "Budaya kerja kami mengedepankan komunikasi yang terbuka (open door policy), di mana setiap ide dihargai, terlepas dari apa pun posisi Anda di perusahaan.",
      "Selain itu, kami rutin mengadakan sesi 'Knowledge Sharing' setiap bulannya. Ini adalah momen di mana anggota tim bisa berbagi ilmu baru, pengalaman, atau sekadar berdiskusi santai mengenai tren industri terkini.",
      "Bergabung dengan kami berarti Anda siap untuk terus belajar, berinovasi, dan memberikan dampak positif bagi masyarakat."
    ]
  }
];