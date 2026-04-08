import { motion } from "framer-motion";
import { TrendingUp, Users, GraduationCap, Heart, MapPin, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const careers = [
  {
    icon: TrendingUp,
    title: "Financial Analyst",
    type: "Full-time",
    location: "Jakarta, Indonesia",
    description: "Join our team to analyze market trends and help clients make informed investment decisions.",
    responsibilities: [
      "Menganalisis data keuangan dan tren pasar",
      "Menyusun laporan investasi untuk klien",
      "Berkolaborasi dengan tim advisory",
    ],
  },
  {
    icon: Users,
    title: "Client Relations Manager",
    type: "Full-time",
    location: "Jakarta, Indonesia",
    description: "Build and maintain strong client relationships while delivering exceptional financial advisory services.",
    responsibilities: [
      "Mengelola portofolio klien eksisting",
      "Mengidentifikasi kebutuhan finansial klien",
      "Menjaga tingkat kepuasan klien",
    ],
  },
  {
    icon: GraduationCap,
    title: "Junior Advisor Intern",
    type: "Internship",
    location: "Remote / Jakarta",
    description: "Kickstart your career in financial planning with hands-on mentorship from seasoned professionals.",
    responsibilities: [
      "Mendukung tim senior dalam riset pasar",
      "Belajar langsung dari advisor berpengalaman",
      "Menyusun presentasi untuk klien",
    ],
  },
  {
    icon: Heart,
    title: "Wealth Planning Specialist",
    type: "Full-time",
    location: "Jakarta, Indonesia",
    description: "Design comprehensive wealth strategies tailored to high-net-worth individuals and families.",
    responsibilities: [
      "Merancang strategi perencanaan kekayaan",
      "Konsultasi langsung dengan klien HNW",
      "Mengoptimalkan portofolio investasi jangka panjang",
    ],
  },
];

const Career = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
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
            <h1 className="font-heading text-4xl lg:text-5xl mb-4">
              Karir di Finovate
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Bergabunglah dengan tim kami dan bantu ribuan klien meraih masa depan finansial yang lebih cerah. Kami mencari individu berbakat yang bersemangat dalam dunia keuangan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 lg:py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3 block">
              Mengapa Finovate
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl text-foreground">
              Alasan Bergabung dengan Kami
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Pertumbuhan Karir", desc: "Jalur karir yang jelas dengan mentorship dan pelatihan berkelanjutan." },
              { title: "Budaya Kolaboratif", desc: "Lingkungan kerja yang mendukung inovasi dan kerja sama tim." },
              { title: "Kompensasi Kompetitif", desc: "Paket gaji dan benefit yang menarik sesuai standar industri." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl bg-background border border-border text-center"
              >
                <h3 className="font-heading text-xl mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3 block">
              Posisi Terbuka
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl text-foreground">
              Temukan Peran yang Tepat
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {careers.map((career, index) => (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                    <career.icon size={22} className="text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-foreground">{career.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} /> {career.type}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} /> {career.location}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{career.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {career.responsibilities.map((r) => (
                    <li key={r} className="text-sm text-foreground/70 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:careers@finovate.com"
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Lamar Sekarang
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Career;
