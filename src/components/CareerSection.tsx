import { motion } from "framer-motion";
import { TrendingUp, Users, GraduationCap, Heart } from "lucide-react";

const careers = [
  {
    icon: TrendingUp,
    title: "Financial Analyst",
    type: "Full-time",
    description: "Join our team to analyze market trends and help clients make informed investment decisions.",
  },
  {
    icon: Users,
    title: "Client Relations Manager",
    type: "Full-time",
    description: "Build and maintain strong client relationships while delivering exceptional financial advisory services.",
  },
  {
    icon: GraduationCap,
    title: "Junior Advisor Intern",
    type: "Internship",
    description: "Kickstart your career in financial planning with hands-on mentorship from seasoned professionals.",
  },
  {
    icon: Heart,
    title: "Wealth Planning Specialist",
    type: "Full-time",
    description: "Design comprehensive wealth strategies tailored to high-net-worth individuals and families.",
  },
];

const CareerSection = () => {
  return (
    <section id="career" className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3 block">
            Karir
          </span>
          <h2 className="font-heading text-3xl lg:text-4xl text-foreground">
            Bergabung Bersama Kami
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Temukan peluang karir di Finovate dan jadilah bagian dari tim yang berdedikasi membantu klien meraih masa depan finansial yang lebih baik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careers.map((career, index) => (
            <motion.div
              key={career.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow group flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent transition-colors">
                <career.icon size={22} className="text-accent-foreground" />
              </div>
              <span className="text-xs font-semibold tracking-wider text-primary uppercase mb-2">
                {career.type}
              </span>
              <h3 className="font-heading text-xl mb-3 text-foreground">{career.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{career.description}</p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                Lamar Sekarang →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
