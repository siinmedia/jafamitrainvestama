import { motion } from "framer-motion";
import { BarChart3, PiggyBank, LineChart, Briefcase } from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "Paket Usaha Siap Jual",
    description:
      "Semua sudah disiapkan dari konsep, bahan baku, hingga branding. Anda tinggal mulai jualan tanpa ribet.",
  },
  {
    icon: PiggyBank,
    title: "Modal Terjangkau",
    description:
      "Mulai usaha dengan biaya yang realistis dan terukur, cocok untuk pemula hingga yang ingin ekspansi bisnis.",
  },
  {
    icon: LineChart,
    title: "Potensi Cuan Harian",
    description:
      "Produk sudah terbukti laku di pasaran dengan peluang penjualan harian yang stabil dan menjanjikan.",
  },
  {
    icon: Briefcase,
    title: "Pendampingan Usaha",
    description:
      "Dapatkan panduan mulai dari awal hingga berjalan, agar usaha Anda berkembang dengan lebih terarah.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3 block">
            Solusi Kami
          </span>
          <h2 className="font-heading text-3xl lg:text-4xl text-foreground">
            Semua yang Anda Butuhkan untuk Memulai Usaha
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent transition-colors">
                <service.icon size={22} className="text-accent-foreground" />
              </div>

              <h3 className="font-heading text-xl mb-3 text-foreground">
                {service.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;