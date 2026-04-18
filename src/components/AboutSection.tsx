import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import aboutImage from "@/assets/about-meeting.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden min-h-[350px]"
          >
            <img
              src={aboutImage}
              alt="Mitra usaha makanan dan minuman"
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy"
              width={960}
              height={640}
            />

            {/* Badge */}
            <div className="absolute bottom-6 right-6 bg-card rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3">
              <BadgeCheck size={24} className="text-primary" />
              <span className="font-heading text-lg text-foreground">
                4500+ Mitra
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between"
          >
            
            {/* Highlight */}
            <div className="bg-accent rounded-2xl p-8 lg:p-10 mb-4">
              <span className="text-xs font-semibold tracking-widest text-accent-foreground/70 uppercase mb-3 block">
                Partner Usaha Terpercaya
              </span>
              <h2 className="font-heading text-3xl lg:text-4xl text-accent-foreground leading-tight">
                Solusi Lengkap
                <br />
                Paket Usaha Siap Jalan
              </h2>
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl p-8 lg:p-10 border border-border">
              <p className="text-muted-foreground leading-relaxed mb-6">
                CV Jafa Mitra Investama membantu Anda memulai usaha makanan dan minuman tanpa ribet. 
                Mulai dari brand, bahan baku, hingga sistem penjualan sudah kami siapkan, 
                sehingga Anda bisa langsung fokus menjalankan dan mengembangkan usaha.
              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Konsultasi Gratis
                <span className="w-7 h-7 rounded-full bg-accent-foreground/10 flex items-center justify-center">
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;