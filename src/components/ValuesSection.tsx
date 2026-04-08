import { motion } from "framer-motion";
import { Shield, Users, TrendingUp, Award } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    description:
      "Konsep usaha sudah teruji dan digunakan oleh banyak mitra, sehingga lebih aman untuk memulai bisnis.",
  },
  {
    icon: Users,
    title: "Cocok untuk Pemula",
    description:
      "Tanpa pengalaman pun bisa mulai. Sistem dibuat sederhana dan mudah dijalankan sehari-hari.",
  },
  {
    icon: TrendingUp,
    title: "Potensi Berkembang",
    description:
      "Produk mengikuti tren pasar dan memiliki peluang berkembang seiring meningkatnya permintaan.",
  },
  {
    icon: Award,
    title: "Brand Siap Pakai",
    description:
      "Tidak perlu bangun dari nol. Anda langsung menggunakan brand yang sudah siap jual dan dikenal.",
  },
];

const ValuesSection = () => {
  return (
    <section id="services" className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Optional heading biar lebih jelas */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Kenapa Pilih Kami
          </p>
          <h2 className="font-heading text-2xl lg:text-3xl text-foreground">
            Dibuat untuk Memudahkan Anda Memulai Usaha
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <value.icon size={16} className="text-accent-foreground" />
              </div>

              <h3 className="font-heading text-lg mb-2 text-foreground">
                {value.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ValuesSection;