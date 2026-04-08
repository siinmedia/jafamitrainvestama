import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import aboutImage from "@/assets/about-meeting.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden min-h-[350px]"
          >
            <img
              src={aboutImage}
              alt="Financial advisors collaborating"
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy"
              width={960}
              height={640}
            />
            {/* CPA Badge */}
            <div className="absolute bottom-6 right-6 bg-card rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3">
              <BadgeCheck size={24} className="text-primary" />
              <span className="font-heading text-lg text-foreground">CPA</span>
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
            <div className="bg-accent rounded-2xl p-8 lg:p-10 mb-4">
              <span className="text-xs font-semibold tracking-widest text-accent-foreground/70 uppercase mb-3 block">
                Trusted Partner
              </span>
              <h2 className="font-heading text-3xl lg:text-4xl text-accent-foreground leading-tight">
                SEC Registered
                <br />
                Investment Advisor
              </h2>
            </div>
            <div className="bg-card rounded-2xl p-8 lg:p-10 border border-border">
              <p className="text-muted-foreground leading-relaxed mb-6">
                We help you achieve your vision and cultivate confidence and peace of mind across your
                financial journey. Our team brings decades of experience in wealth management, retirement
                planning, and strategic investment guidance.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Free Consultation
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
