export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[]; 
  author: string;
  date: string;
  category: string;
  imageUrl: string;
}

export const blogs: BlogPost[] = [
  {
    id: "1",
    slug: "tips-mengelola-keuangan-usaha",
    title: "5 Tips Ampuh Mengelola Keuangan untuk Usaha Kecil",
    excerpt: "Mengelola keuangan adalah kunci sukses usaha. Pelajari 5 tips praktis agar cash flow bisnis Anda tetap sehat.",
    content: [
      "Mengelola keuangan adalah tantangan terbesar bagi banyak pengusaha kecil. Tanpa manajemen yang baik, bisnis dengan penjualan tinggi pun bisa mengalami masalah kas (cash flow).",
      "Pertama, pisahkan uang pribadi dan uang bisnis. Ini adalah aturan emas yang sering dilanggar. Dengan memisahkannya, Anda bisa mengetahui secara pasti apakah bisnis Anda untung atau rugi.",
      "Kedua, buatlah anggaran bulanan. Catat semua proyeksi pemasukan dan pengeluaran. Ketiga, sediakan dana darurat bisnis untuk menghadapi bulan-bulan sepi atau pengeluaran tak terduga.",
      "Keempat, kelola utang dengan bijak. Jangan meminjam uang lebih dari yang bisa Anda bayar. Terakhir, gunakan software atau aplikasi pencatatan keuangan untuk memudahkan pemantauan harian."
    ],
    author: "Tim Maha Niaga",
    date: "12 Oktober 2023",
    category: "Keuangan",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    slug: "strategi-marketing-era-digital",
    title: "Strategi Marketing di Era Digital untuk Pemula",
    excerpt: "Bingung mulai dari mana untuk memasarkan produk secara online? Simak panduan dasar digital marketing berikut ini.",
    content: [
      "Era digital membuka peluang luar biasa bagi bisnis kecil untuk bersaing dengan perusahaan besar. Namun, tanpa strategi yang tepat, Anda hanya akan membuang-buang waktu dan anggaran.",
      "Langkah pertama adalah memahami siapa target audiens Anda. Di platform mana mereka menghabiskan waktu? Apakah di Instagram, TikTok, atau LinkedIn?",
      "Selanjutnya, bangun 'rumah' digital Anda. Ini bisa berupa website profesional atau akun media sosial yang dikelola secara konsisten dengan konten yang memberikan nilai tambah bagi pengikut Anda.",
      "Jangan ragu untuk mulai menggunakan iklan berbayar (Ads) dalam skala kecil. Uji coba dengan anggaran minim untuk melihat iklan mana yang paling banyak mendatangkan konversi."
    ],
    author: "Tim Maha Niaga",
    date: "25 November 2023",
    category: "Marketing",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  }
];