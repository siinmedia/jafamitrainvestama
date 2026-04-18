import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useState } from "react";
import testimonialAvatar from "@/assets/testimonial-avatar.jpg";

const testimonials = [
  {
    quote:
      "Awalnya saya ragu mulai usaha, tapi setelah ambil paket dari Jafa Mitra Investama ternyata langsung bisa jualan. Alat dan bahan sudah lengkap, tinggal jalan saja.",
    name: "Rizky Pratama",
    role: "Mitra Mybestea",
    avatar: testimonialAvatar,
  },
  {
    quote:
      "Saya mulai dari nol tanpa pengalaman. Dibimbing dari awal sampai bisa jualan tiap hari. Sekarang sudah punya pelanggan tetap.",
    name: "Dewi Lestari",
    role: "Mitra Seblak Express",
    avatar: testimonialAvatar,
  },
  {
    quote:
      "Enaknya pakai sistem dari sini itu sudah siap semua. Brand sudah dikenal, jadi lebih mudah dapat pembeli dibanding mulai sendiri.",
    name: "Andi Saputra",
    role: "Mitra Kopi Ibukota",
    avatar: testimonialAvatar,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3 block">
              Testimoni Mitra
            </span>

            <h2 className="font-heading text-3xl lg:text-4xl text-foreground leading-tight mb-6">
              Cerita Nyata Mereka yang{" "}
              <span className="text-accent-foreground">
                Sudah Mulai Usaha
              </span>
            </h2>

            <div className="flex items-center gap-4">
              <a
                href="#testimonials"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium"
              >
                Lihat Semua Testimoni
              </a>

              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-foreground">4.9</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-accent fill-accent" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">
                  Review Mitra
                </span>
              </div>
            </div>
          </div>

          {/* Testimonial Card */}
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-2xl p-8 lg:p-10 border border-border"
          >
            <Quote size={32} className="text-primary/30 mb-4" />

            <p className="text-foreground leading-relaxed text-base lg:text-lg mb-8 font-heading italic">
              "{t.quote}"
            </p>

            <div className="flex items-center justify-between">
              
              {/* Profile */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                  width={40}
                  height={40}
                />
                <div>
                  <p className="font-medium text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;