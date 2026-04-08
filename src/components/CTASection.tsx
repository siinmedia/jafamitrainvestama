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
          <h2 className="font-heading text-3xl lg:text-5xl text-primary-foreground mb-4">
            Ready to Secure Your Financial Future?
          </h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8 text-base lg:text-lg">
            Let's discuss your goals and create a personalized financial strategy that works for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Get Started Today
              <ArrowRight size={16} />
            </a>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-primary-foreground/20 text-primary-foreground font-medium text-sm hover:bg-primary-foreground/10 transition-colors"
            >
              <Phone size={16} />
              Call Us Now
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-primary-foreground/60 text-sm">
            <span className="flex items-center gap-2">
              <Mail size={14} />
              info@finovate.com
            </span>
            <span className="flex items-center gap-2">
              <Phone size={14} />
              (555) 123-4567
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
