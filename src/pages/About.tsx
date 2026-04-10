import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { 
  ArrowLeft, Target, Rocket, HeartHandshake, 
  ShieldCheck, ArrowRight, Store, Users, 
  CheckCircle2, Sparkles, ChevronRight, BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// KEYWORDS UNTUK SEO: "Paket Usaha Makanan", "Paket Usaha Minuman", "Bisnis Kuliner Siap Jalan", "CV Maha Niaga Artha"
const brands = [
  "Mybestea", "You Need Mie", "Mentoast", "Kopi Ibukota", "Esteh Ibukota", 
  "Kentang Gantenk", "Raja Steak", "Nice Coffee", "Seblak Express", 
  "Chick Ichick", "Merlumer", "Chickuruyuk", "Tahu Nyonyor"
];

const About = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  // ANIMASI VARIANTS
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
    viewport: { once: true }
  };

  return (
    <div className="min-h-screen bg-white text-[#132b26] selection:bg-[#c2f21f] overflow-x-hidden">
      <Helmet>
        <title>Tentang Maha Niaga Artha | Pusat Paket Usaha Makanan & Minuman</title>
        <meta name="description" content="Pelajari bagaimana CV Maha Niaga Artha membantu Anda memulai bisnis kuliner dengan paket usaha makanan dan minuman siap jalan yang matang dan terarah." />
        <meta name="keywords" content="paket usaha makanan, paket usaha minuman, bisnis kuliner siap jalan, franchise makanan jepara, modal usaha kuliner, kemitraan minuman, CV Maha Niaga Artha" />
        
        {/* JSON-LD Schema untuk SEO Organisasi */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CV Maha Niaga Artha",
            "url": "https://mahaniagaartha.com",
            "logo": "https://mahaniagaartha.com/logo.png",
            "description": "Penyedia paket usaha makanan dan minuman siap jalan terbaik di Indonesia.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Jepara",
              "addressRegion": "Jawa Tengah",
              "addressCountry": "ID"
            }
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* 1. INTERACTIVE HERO SECTION WITH PARALLAX */}
      <section ref={targetRef} className="relative h-[90vh] flex items-center justify-center bg-[#132b26] overflow-hidden">
        <motion.div style={{ opacity, scale, y }} className="container mx-auto px-6 z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#c2f21f] text-sm font-bold mb-8 backdrop-blur-md"
          >
            <Sparkles size={16} /> Partner Bisnis F&B Terpercaya
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-8">
            Solusi <span className="text-[#c2f21f]">Praktis</span> <br /> 
            Membangun Bisnis.
          </h1>
          
          <p className="text-white/60 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            Membantu Anda memulai bisnis kuliner dengan mudah, cepat, dan terarah melalui ekosistem paket usaha siap jalan.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <Link to="/produk" className="px-8 py-4 bg-[#c2f21f] text-[#132b26] rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-[#c2f21f]/20">
              Lihat Paket Usaha <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Animated Background Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -50, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
            className="absolute bg-gradient-to-br from-[#c2f21f] to-transparent rounded-full blur-3xl"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              zIndex: 0
            }}
          />
        ))}
      </section>

      {/* 2. PHILOSOPHY SECTION (THE "ESSAY" CONTENT) */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp} className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#c2f21f]/20 rounded-full blur-3xl"></div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                Mendorong Ekonomi Lokal Melalui <span className="text-slate-400">Inovasi Kuliner.</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  <strong>CV Maha Niaga Artha</strong> hadir sebagai solusi praktis bagi pengusaha pemula yang ingin memiliki usaha sendiri tanpa harus memulai dari nol. Kami memahami kendala utama calon pengusaha: kurangnya pengalaman, konsep, hingga sistem operasional.
                </p>
                <p>
                  Oleh karena itu, kami menghadirkan berbagai <strong>paket usaha makanan dan minuman</strong> siap jalan yang telah dirancang matang, mulai dari konsep brand, menu, hingga strategi penjualan yang efektif.
                </p>
              </div>
            </motion.div>

            {/* INTERACTIVE STATS CARD */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: <Store />, label: "Brand Aktif", val: "13+", color: "bg-blue-50" },
                { icon: <Users />, label: "Mitra", val: "500+", color: "bg-green-50" },
                { icon: <BarChart3 />, label: "ROI Cepat", val: "95%", color: "bg-yellow-50" },
                { icon: <CheckCircle2 />, label: "SOP Matang", val: "100%", color: "bg-purple-50" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}
                  className={`${item.color} p-8 rounded-[2.5rem] flex flex-col items-center text-center transition-all`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#132b26] mb-4">
                    {item.icon}
                  </div>
                  <div className="text-3xl font-black">{item.val}</div>
                  <div className="text-sm font-bold opacity-50 uppercase tracking-widest">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. INFINITE BRAND SCROLL */}
      <section className="py-20 bg-[#132b26] overflow-hidden">
        <div className="mb-12 text-center">
          <h3 className="text-white/40 font-bold uppercase tracking-[0.3em] text-sm">Portfolio Brand Kami</h3>
        </div>
        <div className="flex overflow-hidden whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 items-center"
          >
            {[...brands, ...brands].map((brand, i) => (
              <span key={i} className="text-white/20 text-4xl md:text-6xl font-black hover:text-[#c2f21f] transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. SUPPORT ECOSYSTEM (BENTO GRID) */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Dukungan Penuh Untuk Mitra</h2>
            <p className="text-slate-400 text-lg">Kami mendampingi Anda dari hari pertama hingga sukses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              {...fadeInUp}
              className="md:col-span-2 bg-slate-50 p-12 rounded-[3rem] border border-slate-100 flex flex-col justify-between group overflow-hidden relative"
            >
              <div>
                <HeartHandshake className="w-16 h-16 text-[#132b26] mb-8" />
                <h3 className="text-3xl font-bold mb-4">Konsultasi Bisnis Intensif</h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Tidak sekadar menjual paket, kami memberikan panduan operasional dan strategi pemasaran agar Anda menjalankan bisnis dengan percaya diri.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform">
                <HeartHandshake size={200} />
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              className="bg-[#c2f21f] p-12 rounded-[3rem] flex flex-col justify-between"
            >
              <Rocket className="w-16 h-16 text-[#132b26] mb-8" />
              <h3 className="text-2xl font-bold mb-4 text-[#132b26]">Inovasi Tiada Henti</h3>
              <p className="text-[#132b26]/60 font-medium">Kami selalu memperbarui menu dan konsep sesuai tren pasar terkini.</p>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              className="bg-white border-2 border-slate-100 p-12 rounded-[3rem] flex flex-col items-center text-center"
            >
              <ShieldCheck className="w-16 h-16 text-[#132b26] mb-8" />
              <h3 className="text-2xl font-bold mb-4">Sistem Teruji</h3>
              <p className="text-slate-500 leading-relaxed">SOP yang mudah dijalankan oleh siapa pun, bahkan tanpa latar belakang F&B.</p>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              className="md:col-span-2 bg-[#132b26] p-12 rounded-[3rem] text-white flex items-center justify-between"
            >
              <div className="max-w-md">
                <h3 className="text-3xl font-bold mb-4 leading-tight">Membangun Masa Depan <span className="text-[#c2f21f]">Bersama Kami.</span></h3>
                <p className="text-white/50">Wujudkan impian memiliki usaha kuliner sukses sekarang.</p>
              </div>
              <Link to="/kontak" className="w-16 h-16 bg-[#c2f21f] rounded-full flex items-center justify-center text-[#132b26] hover:scale-110 transition-transform">
                <ChevronRight size={32} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FOOTER CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="bg-slate-50 rounded-[4rem] p-12 md:p-24 text-center border border-slate-100 relative overflow-hidden"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to Start?</h2>
            <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
              Setiap orang memiliki peluang sukses dalam bisnis kuliner. Tugas kami adalah membantu mewujudkannya dengan sistem yang tepat.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/kontak" className="px-10 py-5 bg-[#132b26] text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all">
                Mulai Kemitraan
              </Link>
              <a href="https://wa.me/628..." className="px-10 py-5 bg-white border border-slate-200 text-[#132b26] rounded-full font-bold text-lg hover:bg-slate-50 transition-all">
                Chat dengan HRD
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;