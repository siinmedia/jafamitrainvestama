import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  GraduationCap,
  Heart,
  MapPin,
  Clock,
  ArrowLeft,
  X,
  Search,
  CheckCircle2,
  XCircle,
  UserX,
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
      "Bertanggung jawab mengelola operasional usaha secara keseluruhan, memastikan semua outlet berjalan lancar dan sesuai standar.",
    responsibilities: [
      "Mengawasi operasional harian outlet",
      "Mengelola tim dan memastikan kinerja optimal",
      "Menjaga kualitas produk dan layanan",
      "Menyusun strategi operasional agar usaha berkembang",
    ],
  },
  {
    icon: TrendingUp,
    title: "Staff Logistik",
    type: "Full-time",
    location: "Jepara, Jawa Tengah",
    description:
      "Mengelola pengadaan dan distribusi bahan baku agar operasional usaha berjalan lancar tanpa hambatan.",
    responsibilities: [
      "Mengatur stok dan ketersediaan bahan baku",
      "Mengelola pengiriman ke outlet atau mitra",
      "Berkoordinasi dengan supplier",
      "Memastikan distribusi tepat waktu dan efisien",
    ],
  },
];


const Career = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); 

  const [statusLoading, setStatusLoading] = useState(false);
  const [statusResult, setStatusResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  const handleSubmitApply = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const file = formData.get("cv_file") as File;

    try {
      if (!file || file.size === 0) throw new Error("CV wajib diupload");
      if (file.size > 5 * 1024 * 1024) throw new Error("Ukuran file CV maksimal 5MB");

      const fileExt = file.name.split('.').pop();
      const randomString = Math.random().toString(36).substring(2, 8);
      const safeFileName = `cv-${Date.now()}-${randomString}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("mahastorage")
        .upload(safeFileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("mahastorage").getPublicUrl(safeFileName);
      const cvUrl = urlData.publicUrl;

      const { error: insertError } = await supabase
        .from("applications")
        .insert([
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

      alert("Lamaran berhasil dikirim 🚀");
      e.target.reset(); 
      closeModal(); 
    } catch (error: any) {
      console.error("Error submitting application:", error);
      alert(error.message || "Terjadi kesalahan saat mengirim lamaran. Silakan coba lagi.");
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
      case "accepted": return <CheckCircle2 className="w-12 h-12 text-green-500 mb-2" />;
      case "rejected": return <XCircle className="w-12 h-12 text-red-500 mb-2" />;
      default: return <Clock className="w-12 h-12 text-blue-500 mb-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft size={16} />
              Kembali ke Beranda
            </Link>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              Karir di Maha Niaga Artha
            </h1>

            <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-2xl">
              Bergabunglah dengan tim kami dan bantu ribuan klien meraih masa depan finansial yang lebih cerah. Kami mencari individu berbakat yang bersemangat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHY JOIN SECTION */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-primary uppercase mb-3 block">
              Work With Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Alasan Bergabung dengan Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Pertumbuhan Karir",
                desc: "Jalur karir yang jelas dengan mentorship dan pelatihan berkelanjutan.",
              },
              {
                title: "Budaya Kolaboratif",
                desc: "Lingkungan kerja yang mendukung inovasi dan kerja sama tim.",
              },
              {
                title: "Kompensasi Kompetitif",
                desc: "Paket gaji dan benefit yang menarik sesuai standar industri.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-background border border-border text-center hover:border-primary/50 transition-colors"
              >
                <h3 className="text-xl mb-3 text-foreground font-bold">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CEK STATUS LAMARAN SECTION */}
      <section className="py-16 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="bg-background border border-border rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Sudah Melamar? Cek Status Anda
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Masukkan Email dan Nomor WhatsApp yang Anda gunakan saat mendaftar.
              </p>
            </div>

            <form onSubmit={handleCekStatus} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="md:col-span-2">
                <input
                  type="email"
                  name="status_email"
                  required
                  placeholder="Alamat Email"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <input
                  type="text"
                  name="status_whatsapp"
                  required
                  placeholder="Nomor WhatsApp"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-1">
                <button
                  type="submit"
                  disabled={statusLoading}
                  className="w-full h-full min-h-[50px] bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  {statusLoading ? "..." : <><Search size={18} /> Cek</>}
                </button>
              </div>
            </form>

            {hasSearched && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-muted/50 border border-border rounded-2xl p-6 text-center"
              >
                {statusResult ? (
                  <div className="flex flex-col items-center">
                    {getStatusIcon(statusResult.status_lamaran)}
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {statusResult.posisi_dilamar}
                    </h3>
                    <div className="mt-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                      <span className="text-sm font-semibold text-primary uppercase tracking-wider">{statusResult.status_lamaran}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-4 uppercase tracking-widest font-medium">
                      Update Terakhir: {new Date(statusResult.tanggal_update).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <UserX className="w-12 h-12 text-muted-foreground/50 mb-3" />
                    <p className="text-foreground font-bold">Data Tidak Ditemukan</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Pastikan data yang dimasukkan sudah benar.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* POSISI TERBUKA SECTION */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                Posisi Terbuka
              </h2>
              <p className="text-muted-foreground mt-2">Temukan peran yang sesuai dengan passion Anda.</p>
            </div>
            <div className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg">
              <span className="text-sm font-bold text-accent">{careers.length} Posisi Tersedia</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {careers.map((career, index) => (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all"
              >
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <career.icon size={26} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {career.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-xs font-medium text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-primary" /> {career.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-primary" /> {career.location}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {career.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {career.responsibilities.map((r) => (
                    <li key={r} className="text-sm text-foreground/80 flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleApply(career)}
                  className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                >
                  Lamar Posisi Ini
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL FORM LAMARAN */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-background rounded-3xl shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden border border-border"
          >
            {/* Header Modal */}
            <div className="p-6 border-b border-border flex justify-between items-center bg-background">
              <div>
                <h3 className="text-xl font-bold text-foreground">Formulir Lamaran</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Silakan isi data dengan benar</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleSubmitApply} className="space-y-5">
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Posisi yang Dilamar</label>
                  <select
                    name="posisi"
                    required
                    value={selectedJob?.title || ""}
                    onChange={(e) => {
                      const job = careers.find(c => c.title === e.target.value);
                      setSelectedJob(job);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="" disabled>-- Pilih Posisi --</option>
                    {careers.map((c) => (
                      <option key={c.title} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Nama Lengkap</label>
                    <input name="nama" required placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Email</label>
                    <input name="email" type="email" required placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Nomor WhatsApp</label>
                  <input name="whatsapp" type="tel" required placeholder="0812..." className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">LinkedIn (URL)</label>
                    <input name="linkedin" type="url" placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Portofolio (URL)</label>
                    <input name="portfolio" type="url" placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Upload CV (PDF/DOCX)</label>
                  <input
                    name="cv_file" type="file" accept=".pdf,.doc,.docx" required
                    className="w-full text-sm text-muted-foreground file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-primary-foreground hover:file:opacity-90 cursor-pointer border border-border rounded-xl p-1"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Pesan Tambahan</label>
                  <textarea name="pesan" rows={3} placeholder="Tuliskan sesuatu..." className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none resize-none"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading} 
                  className={`w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Sedang Mengirim..." : "Kirim Lamaran Sekarang"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Career;