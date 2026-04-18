import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-3xl p-10 lg:p-16 text-center"
        >
          {/* Headline */}
          <h2 className="font-heading text-3xl lg:text-5xl text-primary-foreground mb-4">
            Mau Mulai Usaha Tapi Bingung Mulai Dari Mana?
          </h2>

          {/* Subheadline */}
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8 text-base lg:text-lg">
            Konsultasi gratis bersama tim kami dan temukan paket usaha yang cocok untuk Anda. 
            Semua sudah disiapkan, Anda tinggal mulai.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            {/* Primary CTA */}
            <a
href="https://wa.me/6281212126722?text=Halo%20Maha%20Niaga%20Artha,%20saya%20mendapatkan%20informasi%20dari%20website%20resmi%20dan%20tertarik%20untuk%20memulai%20usaha.%20Bisa%20dibantu%3F"              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Konsultasi via WhatsApp
              <ArrowRight size={16} />
            </a>

            {/* Secondary CTA */}
            <a
              href="tel:+6285155145788"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-primary-foreground/20 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10 transition-colors"
            >
              <Phone size={16} />
              Telepon Sekarang
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-primary-foreground/60 text-sm">
            
            <span className="flex items-center gap-2">
              <Mail size={14} />
              cvmahaniagaartha.hrd@gmail.com
            </span>

            <span className="flex items-center gap-2">
              <Phone size={14} />
              62 812-1212-6722
            </span>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;