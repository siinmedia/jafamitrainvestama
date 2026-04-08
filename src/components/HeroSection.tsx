import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-meeting.jpg";

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-8 lg:pt-28 lg:pb-12 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden min-h-[500px] lg:min-h-[600px]">
          <img
            src={heroImage}
            alt="Peluang usaha makanan dan minuman siap jual"
            className="absolute inset-0 w-full h-full object-cover"
            width={1280}
            height={720}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />

          <div className="relative z-10 flex flex-col justify-end h-full min-h-[500px] lg:min-h-[600px] p-8 lg:p-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground mb-6">
                <Sparkles size={12} className="text-accent" />
                <span>PELUANG USAHA</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-4xl lg:text-6xl text-primary-foreground leading-tight mb-4">
                Mulai Usaha Tanpa Ribet,{" "}
                <span className="inline-block bg-accent/90 text-accent-foreground px-3 py-1 rounded-lg">
                  Langsung Siap Jual
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-primary-foreground/80 text-base lg:text-lg mb-8 max-w-md">
                Paket usaha makanan & minuman lengkap dengan brand, bahan, dan sistem. 
                Tinggal jalan, langsung berpotensi cuan.
              </p>

              {/* CTA */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Konsultasi Gratis
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;