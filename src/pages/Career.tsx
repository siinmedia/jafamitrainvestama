import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  TrendingUp,
  Users,
  MapPin,
  Clock,
  ArrowLeft,
  X,
  Search,
  CheckCircle2,
  XCircle,
  UserX,
  UploadCloud,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const careers = [
  {
    icon: Users,
    title: "Manager Operasional",
    type: "Full-time",
    location: "Jepara, Jawa Tengah",
    description:
      "Bertanggung jawab mengelola operasional usaha secara keseluruhan, memastikan semua outlet berjalan lancar dan sesuai standar. Peluang karir terbaik di Jepara untuk profesional F&B.",
    responsibilities: [
      "Usia maksimal 35 tahun",
      "Pendidikan minimal S1 Manajemen, Bisnis atau bidang terkait",
      "Pengalaman minimal 5 tahun manajerial waralaba & 3 tahun di industri F&B",
      "Memiliki kemampuan komunikasi, negosiasi, dan kepemimpinan yang kuat",
      "Menguasai operasional F&B, analisa bisnis, forecasting, dan budgeting",
      "Mampu menganalisis strategi pertumbuhan perusahaan",
      "Memahami product knowledge dan quality management",
      "Bersedia ditempatkan di Jepara",
    ],
  },
  {
    icon: TrendingUp,
    title: "Staff Logistik",
    type: "Full-time",
    location: "Jepara, Jawa Tengah",
    description:
      "Mengelola pengadaan dan distribusi bahan baku agar operasional usaha berjalan lancar tanpa hambatan. Cocok untuk Anda yang mencari loker logistik di area Jepara.",
    responsibilities: [
      "Jujur, ulet, dan enerjik",
      "Berjenis kelamin Laki-laki dan Belum menikah",
      "Usia maksimal 28 tahun",
      "Lulusan minimal SMA/sederajat",
      "Memiliki dedikasi tinggi dan pekerja keras",
    ],
  },
];

// FUNGSI HIGHLIGHT TEKS BOLD (Disesuaikan dengan warna Slate Gelap)
const highlightText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-extrabold text-[#132b26] tracking-wide">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

// SCHEMA MARKUP UNTUK GOOGLE JOBS
const generateJobSchema = () => {
  const jobSchemas = careers.map((job) => ({
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    hiringOrganization: {
      "@type": "Organization",
      name: "Maha Niaga Artha",
      logo: "https://mahaniagaartha.com/logo.png", 
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jepara",
        addressRegion: "Jawa Tengah",
        addressCountry: "ID",
      },
    },
    employmentType: "FULL_TIME",
    datePosted: new Date().toISOString().split("T")[0],
    validThrough: new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split("T")[0], 
  }));

  return JSON.stringify(jobSchemas);
};

const Career = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [statusLoading, setStatusLoading] = useState(false);
  const [statusResult, setStatusResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [fileName, setFileName] = useState<string | null>(null);

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setIsOpen(true);
    setFileName(null);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedJob(null);
      setFileName(null);
    }, 300);
  };

  const handleSubmitApply = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const file = formData.get("cv_file") as File;

    try {
      if (!file || file.size === 0) throw new Error("CV wajib diupload");
      if (file.size > 5 * 1024 * 1024) throw new Error("Ukuran file CV maksimal 5MB");

      const fileExt = file.name.split(".").pop();
      const randomString = Math.random().toString(36).substring(2, 8);
      const safeFileName = `cv-${Date.now()}-${randomString}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("mahastorage")
        .upload(safeFileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("mahastorage")
        .getPublicUrl(safeFileName);
      const cvUrl = urlData.publicUrl;

      const { error: insertError } = await supabase.from("applications").insert([
        {
          posisi: formData.get("posisi"),
          nama: formData.get("nama"),
          email: formData.get("email"),
          whatsapp: formData.get("whatsapp"),
          linkedin: formData.get("linkedin") || null,
          portfolio: formData.get("portfolio") || null,
          pesan: formData.get("pesan") || null,
          cv_url: cvUrl,
          status: "Pending",
          source: "Website",
        },
      ]);

      if (insertError) throw insertError;

      const noWa = formData.get("whatsapp") as string;
      const namaUser = formData.get("nama") as string;
      const posisiLamar = formData.get("posisi") as string;
      const emailUser = formData.get("email") as string;

      const waMessageApplicant = `Halo *${namaUser}*! 👋\n\nTerima kasih telah mengirimkan lamaran untuk posisi *${posisiLamar}* di *Maha Niaga Artha*.\n\nData dan CV Anda telah berhasil kami terima ke dalam sistem. Tim HRD kami akan segera melakukan review terhadap kualifikasi Anda.\n\nAnda dapat mengecek status lamaran secara berkala melalui menu "Karir" di website kami dengan menggunakan Email dan Nomor WhatsApp ini.\n\nSemoga sukses!\n\nSalam Hangat,\n*Tim HRD Maha Niaga Artha*`;

      try {
        const applicantData = new FormData();
        applicantData.append("target", noWa);
        applicantData.append("message", waMessageApplicant);
        applicantData.append("countryCode", "62");

        await fetch("https://api.fonnte.com/send", {
          method: "POST",
          headers: { Authorization: "xA1xMamR1TvejGxqXCS8" },
          body: applicantData,
        });
      } catch (err) {
        console.error("Gagal WA Pelamar:", err);
      }

      const hrPhone = "085155145788";
      const hrMessage = `🚨 *LAMARAN BARU MASUK* 🚨\n\nHalo Tim HRD,\nAda lamaran baru masuk melalui website dengan rincian:\n\n👤 *Nama*: ${namaUser}\n💼 *Posisi*: ${posisiLamar}\n📞 *WhatsApp*: ${noWa}\n✉️ *Email*: ${emailUser}\n\nSilakan login ke *Admin Dashboard* untuk melihat CV dan melakukan review pelamar.\n\nSemangat kerjanya! 💪`;

      try {
        const hrData = new FormData();
        hrData.append("target", hrPhone);
        hrData.append("message", hrMessage);
        hrData.append("countryCode", "62");

        await fetch("https://api.fonnte.com/send", {
          method: "POST",
          headers: { Authorization: "xA1xMamR1TvejGxqXCS8" },
          body: hrData,
        });
      } catch (err) {
        console.error("Gagal WA HRD:", err);
      }

      alert("Lamaran berhasil dikirim 🚀 Silakan cek WhatsApp Anda.");
      e.target.reset();
      closeModal();
    } catch (error: any) {
      console.error("Error submitting application:", error);
      alert(error.message || "Terjadi kesalahan saat mengirim lamaran.");
    } finally {
      setLoading(false);
    }
  };

  const handleCekStatus = async (e: any) => {
    e.preventDefault();
    setStatusLoading(true);
    setHasSearched(false);

    const email = e.target.status_email.value;
    const whatsapp = e.target.status_whatsapp.value;

    try {
      const { data, error } = await supabase.rpc("cek_status_lamaran", {
        p_email: email,
        p_whatsapp: whatsapp,
      });

      if (error) throw error;

      setStatusResult(data && data.length > 0 ? data[0] : null);
      setHasSearched(true);
    } catch (error: any) {
      alert("Terjadi kesalahan sistem: " + error.message);
    } finally {
      setStatusLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return <CheckCircle2 className="w-12 h-12 text-[#c2f21f] mb-2" />;
      case "rejected":
        return <XCircle className="w-12 h-12 text-red-500 mb-2" />;
      default:
        return <Clock className="w-12 h-12 text-[#132b26] mb-2" />;
    }
  };

  return (
    // KODE BARU:
<div className="min-h-screen bg-white text-[#132b26]">
      <Helmet>
        <title>Lowongan Kerja Jepara Terupdate | Karir Maha Niaga Artha</title>
        <meta 
          name="description" 
          content="Cari lowongan kerja terbaru di Jepara? Maha Niaga Artha membuka kesempatan karir untuk Manager Operasional, Staff Logistik, dan posisi F&B lainnya. Lamar online sekarang!" 
        />
        <meta name="keywords" content="Lowongan kerja Jepara, Loker Jepara terbaru, karir Maha Niaga Artha, lowongan manager operasional jepara, loker F&B jepara, lowongan staff logistik" />
        
        <meta property="og:title" content="Lowongan Kerja di Maha Niaga Artha Jepara" />
        <meta property="og:description" content="Temukan peluang karir profesional di bidang manajerial dan operasional bersama kami di Jepara." />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {generateJobSchema()}
        </script>
      </Helmet>

      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#c2f21f] text-[#132b26] font-bold text-xs md:text-sm tracking-wide uppercase">
              Tumbuh Bersama Kami
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold mb-6 tracking-tight leading-[1.1] text-[#132b26]">
              Peluang Karir Terbaik <br className="hidden md:block"/> di Maha Niaga Artha
            </h1>

            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto font-medium">
              Bergabunglah dengan tim profesional kami di Jepara. Kami mencari individu berbakat yang bersemangat untuk berkembang bersama di industri bisnis dan manajemen operasional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHY JOIN SECTION */}
      <section className="py-16 lg:py-24 bg-slate-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#132b26]">
              Mengapa Berkarir Bersama Kami?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Pertumbuhan Karir", desc: "Jalur karir yang jelas dengan mentorship dan pelatihan berkelanjutan di bidang operasional." },
              { title: "Budaya Kolaboratif", desc: "Lingkungan kerja yang mendukung inovasi, produktivitas, dan kerja sama tim yang solid." },
              { title: "Kompensasi Kompetitif", desc: "Paket gaji bulanan dan benefit yang menarik sesuai standar industri di Jepara." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-white border border-slate-200/60 text-center hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-[#c2f21f] transition-all duration-300"
              >
                <h3 className="text-xl mb-3 text-[#132b26] font-extrabold">{item.title}</h3>
                <p className="text-[15px] text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CEK STATUS LAMARAN SECTION */}
      <section className="py-16 lg:py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="bg-slate-50 border border-slate-200/60 rounded-[2rem] p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#132b26] mb-3">Cek Status Lamaran Anda</h2>
              <p className="text-slate-500">
                Masukkan Email dan Nomor WhatsApp yang digunakan saat melamar lowongan.
              </p>
            </div>

            <form onSubmit={handleCekStatus} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="md:col-span-2">
                <input
                  type="email" name="status_email" required placeholder="Alamat Email"
                  className="w-full px-5 py-3.5 rounded-full border border-slate-200 bg-white text-[#132b26] focus:border-[#c2f21f] focus:ring-2 focus:ring-[#c2f21f]/20 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <input
                  type="text" name="status_whatsapp" required placeholder="Nomor WhatsApp"
                  className="w-full px-5 py-3.5 rounded-full border border-slate-200 bg-white text-[#132b26] focus:border-[#c2f21f] focus:ring-2 focus:ring-[#c2f21f]/20 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-1">
                <button
                  type="submit" disabled={statusLoading}
                  aria-label="Cek status lamaran"
                  className="w-full h-full min-h-[52px] bg-[#132b26] text-white rounded-full font-bold hover:bg-[#1a3a33] transition-all flex items-center justify-center gap-2"
                >
                  {statusLoading ? "..." : <><Search size={18} /> Cek</>}
                </button>
              </div>
            </form>

            {hasSearched && (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-slate-200 rounded-[1.5rem] p-8 text-center mt-8">
                {statusResult ? (
                  <div className="flex flex-col items-center">
                    {getStatusIcon(statusResult.status_lamaran)}
                    <h3 className="text-xl font-extrabold text-[#132b26] mb-2">{statusResult.posisi_dilamar}</h3>
                    <div className="mt-2 px-5 py-2 rounded-full bg-[#c2f21f]/20 text-[#132b26]">
                      <span className="text-sm font-bold uppercase tracking-wider">{statusResult.status_lamaran}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-5 uppercase tracking-widest font-bold">
                      Update Terakhir: {new Date(statusResult.tanggal_update).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <UserX className="w-12 h-12 text-slate-300 mb-4" />
                    <p className="text-[#132b26] font-extrabold text-lg">Data Pelamar Tidak Ditemukan</p>
                    <p className="text-[15px] text-slate-500 mt-1">Pastikan data yang dimasukkan sudah benar sesuai formulir lamaran.</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* POSISI TERBUKA SECTION */}
      <section className="py-20 lg:py-28 bg-slate-50/50" id="daftar-lowongan">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#132b26] tracking-tight">Daftar Lowongan Tersedia</h2>
              <p className="text-slate-500 mt-2 text-lg">Temukan peran yang sesuai dengan passion dan kualifikasi Anda.</p>
            </div>
            <div className="px-5 py-2.5 bg-[#c2f21f] rounded-full">
              <span className="text-sm font-bold text-[#132b26]">{careers.length} Posisi Terbuka</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {careers.map((career, index) => (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-[2rem] bg-white border border-slate-200/60 hover:border-[#c2f21f] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-[#c2f21f]/20 text-[#132b26] flex items-center justify-center group-hover:bg-[#c2f21f] transition-colors duration-300">
                    <career.icon size={28} />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-2xl font-extrabold text-[#132b26]">{career.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm font-medium text-slate-500">
                      <span className="flex items-center gap-1.5"><Clock size={16} className="text-[#132b26]" /> {career.type}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={16} className="text-[#132b26]" /> {career.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-[15px] text-slate-500 mb-8 leading-relaxed">{career.description}</p>

                <ul className="space-y-4 mb-10 flex-grow" aria-label={`Tanggung Jawab ${career.title}`}>
                  {career.responsibilities.map((r, i) => (
                    <li key={i} className="text-[15px] text-slate-500 flex items-start gap-4 leading-relaxed">
                      <div className="w-2 h-2 rounded-full bg-[#c2f21f] mt-2 shrink-0" />
                      <div>{highlightText(r)}</div>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleApply(career)}
                  className="w-full mt-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c2f21f] text-[#132b26] text-sm font-bold hover:bg-[#b5e519] transition-all duration-300"
                >
                  Lamar Posisi Ini Sekarang
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL FORM LAMARAN */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-xl bg-white rounded-[2rem] shadow-2xl relative flex flex-col my-auto border border-slate-100"
            >
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-[2rem]">
                <div>
                  <h3 className="text-2xl font-extrabold text-[#132b26] tracking-tight">Kirim Lamaran</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">{selectedJob?.title || "Posisi Pekerjaan"}</p>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Tutup form"
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-[#132b26] rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-8 py-8 overflow-y-auto custom-scrollbar max-h-[70vh]">
                <form onSubmit={handleSubmitApply} className="space-y-6">
                  
                  <input type="hidden" name="posisi" value={selectedJob?.title || ""} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="nama" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Lengkap *</label>
                      <input 
                        id="nama" name="nama" required placeholder="Budi Santoso" 
                        className="w-full px-5 py-3.5 rounded-[1rem] border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#c2f21f] focus:border-[#c2f21f] outline-none transition-all text-sm font-medium text-[#132b26]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email *</label>
                      <input 
                        id="email" name="email" type="email" required placeholder="budi@email.com" 
                        className="w-full px-5 py-3.5 rounded-[1rem] border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#c2f21f] focus:border-[#c2f21f] outline-none transition-all text-sm font-medium text-[#132b26]" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                      <span>Nomor WhatsApp *</span>
                      <span className="text-[10px] text-[#c2f21f] bg-[#132b26] px-2 py-0.5 rounded-full lowercase normal-case">Notifikasi Aktif</span>
                    </label>
                    <input 
                      id="whatsapp" name="whatsapp" type="tel" required placeholder="08123456789" 
                      className="w-full px-5 py-3.5 rounded-[1rem] border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#c2f21f] focus:border-[#c2f21f] outline-none transition-all text-sm font-medium text-[#132b26]" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="linkedin" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profil LinkedIn</label>
                      <input 
                        id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." 
                        className="w-full px-5 py-3.5 rounded-[1rem] border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#c2f21f] focus:border-[#c2f21f] outline-none transition-all text-sm font-medium text-[#132b26]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="portfolio" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Link Portofolio</label>
                      <input 
                        id="portfolio" name="portfolio" type="url" placeholder="https://..." 
                        className="w-full px-5 py-3.5 rounded-[1rem] border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#c2f21f] focus:border-[#c2f21f] outline-none transition-all text-sm font-medium text-[#132b26]" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Upload CV (PDF/DOCX) *</label>
                    <div className="relative group">
                      <div className={`w-full border-2 border-dashed rounded-[1rem] p-8 flex flex-col items-center justify-center transition-all ${fileName ? 'border-[#c2f21f] bg-[#c2f21f]/5' : 'border-slate-300 bg-slate-50 group-hover:border-[#c2f21f] group-hover:bg-slate-50/80'}`}>
                        <UploadCloud size={32} className={`mb-3 ${fileName ? 'text-[#132b26]' : 'text-slate-400'}`} />
                        <p className="text-sm font-bold text-[#132b26] text-center">
                          {fileName ? fileName : "Klik untuk mencari file CV"}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">Maksimal ukuran file 5MB</p>
                      </div>
                      <input
                        name="cv_file" type="file" accept=".pdf,.doc,.docx" required
                        onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        aria-label="Upload Curriculum Vitae"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="pesan" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cover Letter Singkat</label>
                    <textarea 
                      id="pesan" name="pesan" rows={3} placeholder="Ceritakan singkat mengapa Anda cocok untuk posisi ini..." 
                      className="w-full px-5 py-3.5 rounded-[1rem] border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#c2f21f] focus:border-[#c2f21f] outline-none transition-all text-sm font-medium text-[#132b26] resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-6 pb-2">
                    <button 
                      type="submit" disabled={loading} 
                      className={`w-full py-4 rounded-full bg-[#132b26] text-white text-[15px] font-bold hover:bg-[#1a3a33] transition-all flex justify-center items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                      {loading ? "Memproses Data..." : "Kirim Lamaran Sekarang"}
                    </button>
                  </div>

                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Career;