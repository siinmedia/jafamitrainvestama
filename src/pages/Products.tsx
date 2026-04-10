import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ChevronDown, ArrowLeft, Package, Truck, MapPin, Store, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// DATA BRAND (Copywriting natural untuk SEO, tanpa spam keyword)
const brands = [
  { name: "Mybestea", logo: "/logos/1.webp", desc: "Minuman teh kekinian dengan varian rasa premium yang disukai milenial. Setup booth praktis dan bahan baku terjangkau." },
  { name: "You Need Mie", logo: "/logos/2.webp", desc: "Peluang bisnis mie pedas berlevel dengan topping melimpah dan bumbu rahasia otentik yang bikin pelanggan kembali." },
  { name: "Mentoast", logo: "/logos/3.webp", desc: "Konsep roti bakar modern dengan isian manis dan gurih. Cocok untuk target pasar segala usia di berbagai lokasi." },
  { name: "Kopi Ibukota", logo: "/logos/4.webp", desc: "Kopi susu gula aren dengan biji kopi pilihan nusantara. Menghadirkan cita rasa khas kedai kopi senja masa kini." },
  { name: "Esteh Ibukota", logo: "/logos/5.webp", desc: "Es teh manis jumbo dengan racikan daun teh asli yang menyegarkan dahaga. Usaha dengan perputaran modal tercepat." },
  { name: "Kentang Gantenk", logo: "/logos/6.webp", desc: "Camilan french fries dengan bumbu tabur aneka rasa yang renyah dan gurih. Sangat digemari anak-anak hingga dewasa." },
  { name: "Raja Steak", logo: "/logos/7.webp", desc: "Paket usaha steak ayam dan sapi dengan harga kaki lima namun memberikan pengalaman makan dengan rasa bintang lima." },
  { name: "Nice Coffee", logo: "/logos/8.webp", desc: "Kedai kopi modern berkonsep minimalis, menyajikan espresso base dan frappe berkualitas untuk pencinta kopi." },
  { name: "Seblak Express", logo: "/logos/9.webp", desc: "Peluang kemitraan seblak prasmanan pedas nampol dengan puluhan varian topping menarik yang sedang viral." },
];

// DATA FAQ (People Also Ask SEO)
const faqs = [
  {
    question: "Pengiriman paket peralatan dan bahan baku dari mana?",
    answer: "Seluruh kelengkapan booth, peralatan masak, dan bahan baku awal dikirim langsung dari gudang operasional pusat kami yang berlokasi di **Jepara, Jawa Tengah**."
  },
  {
    question: "Apakah mitra dibebankan biaya ongkos kirim (ongkir)?",
    answer: "Ya, ongkos kirim ditanggung oleh mitra. Namun kami telah bekerja sama dengan berbagai ekspedisi kargo rekanan untuk memastikan Anda mendapatkan **tarif pengiriman paling ekonomis** ke seluruh Indonesia."
  },
  {
    question: "Berapa lama estimasi waktu pengiriman paket usaha?",
    answer: "Untuk wilayah Pulau Jawa, estimasi barang sampai sekitar **2-4 hari kerja**. Sedangkan untuk luar Pulau Jawa (Sumatera, Kalimantan, Sulawesi, dll) rata-rata membutuhkan waktu **7-14 hari kerja** menyesuaikan jadwal kapal kargo."
  },
  {
    question: "Apakah calon mitra bisa datang langsung ke kantor pusat?",
    answer: "Sangat dianjurkan! Kami menyambut baik calon mitra yang ingin berkunjung, melakukan **food tasting (mencicipi produk)**, dan berkonsultasi bisnis secara langsung di kantor kami."
  }
];

const highlightText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-extrabold text-[#132b26]">{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

const generateSEOData = () => {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": brands.map((brand, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Brand",
        "name": brand.name,
        "description": brand.desc,
        "logo": `https://mahaniagaartha.com${brand.logo}` 
      }
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/\*\*/g, "") 
      }
    }))
  };

  return `[${JSON.stringify(itemListSchema)}, ${JSON.stringify(faqSchema)}]`;
};

const Products = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
// KODE BARU:
<div className="min-h-screen bg-white text-[#132b26]">
          <Helmet>
        <title>Daftar Brand Franchise F&B Terlaris | Maha Niaga Artha</title>
        <meta name="description" content="Pilih paket usaha makanan dan minuman (F&B) dari Maha Niaga Artha. Tersedia franchise Es Teh, Mie Pedas, Kopi, hingga Seblak dengan modal terjangkau." />
        <meta name="keywords" content="paket usaha minuman, kemitraan F&B, franchise makanan terlaris, daftar brand maha niaga artha, bisnis modal kecil" />
        <script type="application/ld+json">{generateSEOData()}</script>
      </Helmet>

      <Navbar />

      {/* HERO SECTION - Disesuaikan dengan Vibe Beranda (Bersih, Teks Gelap, Aksen Lime) */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            {/* Badge aksen khas warna lime green website utama */}
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#c2f21f] text-[#132b26] font-bold text-xs md:text-sm tracking-wide uppercase">
              Partner Usaha Terpercaya
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold mb-6 tracking-tight leading-[1.1] text-[#132b26]">
              Pilihan Lengkap Paket <br className="hidden md:block"/> Brand Usaha Siap Jalan
            </h1>

            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto font-medium">
              Kami memfasilitasi Anda untuk memulai bisnis makanan dan minuman tanpa ribet. Tersedia berbagai pilihan brand yang telah teruji pasar dengan sistem yang mudah dijalankan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BRAND GRID SECTION - Kartu disesuaikan dengan shape beranda */}
      <section className="py-16 lg:py-24 bg-slate-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[2rem] border border-slate-200/60 p-6 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-[#c2f21f] transition-all duration-300 flex flex-col"
              >
                {/* Image Box - Background abu-abu sangat muda dengan sudut melengkung */}
                <div className="h-56 w-full bg-slate-50 rounded-[1.5rem] flex items-center justify-center p-8 mb-6 relative overflow-hidden group-hover:bg-slate-100/50 transition-colors">
                  <img 
                    src={brand.logo} 
                    alt={`Logo kemitraan ${brand.name}`} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 relative z-10 mix-blend-multiply"
                    loading="lazy"
                  />
                </div>
                
                {/* Text Content */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#132b26] mb-3">
                      {brand.name}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-[15px]">
                      {brand.desc}
                    </p>
                  </div>
                  
                  {/* Tombol Aksen Lime Green khas Web Anda */}
                  <Link 
                    to="/kontak" 
                    className="mt-8 w-full py-3.5 rounded-full bg-[#c2f21f] text-[#132b26] font-bold text-sm hover:bg-[#b5e519] transition-all duration-300 flex justify-center items-center gap-2 group/btn"
                  >
                    Konsultasi Brand Ini 
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION - Desain Clean minimalis */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-100" id="informasi-pengiriman">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#132b26] mb-4">
              Informasi Operasional & Pengiriman
            </h2>
            <p className="text-slate-500 text-lg">
              Jawaban cepat untuk pertanyaan yang paling sering diajukan calon mitra.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border rounded-[1.5rem] transition-all duration-300 overflow-hidden ${openFaq === index ? 'border-[#132b26] bg-slate-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === index ? 'bg-[#c2f21f] text-[#132b26]' : 'bg-slate-100 text-slate-400'}`}>
                      {index === 0 && <Store size={18} />}
                      {index === 1 && <Package size={18} />}
                      {index === 2 && <Truck size={18} />}
                      {index === 3 && <MapPin size={18} />}
                    </div>
                    <h3 className={`font-bold text-base md:text-lg pr-4 ${openFaq === index ? 'text-[#132b26]' : 'text-[#132b26]/80'}`}>
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown 
                    className={`shrink-0 transition-transform duration-300 w-5 h-5 ${openFaq === index ? 'rotate-180 text-[#132b26]' : 'text-slate-400'}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 pl-[4.5rem] pr-8 text-slate-500 text-base leading-relaxed">
                        {highlightText(faq.answer)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;