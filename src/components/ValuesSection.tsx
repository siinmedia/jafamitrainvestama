import { motion } from "framer-motion";
import { Shield, Users, TrendingUp, Award } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We uphold the highest ethical standards in every interaction, ensuring transparency, and trust in our work.",
  },
  {
    icon: Users,
    title: "Client Focus",
    description: "We uphold the highest ethical standards in every interaction, ensuring transparency, and trust in our work.",
  },
  {
    icon: TrendingUp,
    title: "Risk Resilience",
    description: "We uphold the highest ethical standards in every interaction, ensuring transparency, and trust in our work.",
  },
  {
    icon: Award,
    title: "Expertise",
    description: "We uphold the highest ethical standards in every interaction, ensuring transparency, and trust in our work.",
  },
];

const ValuesSection = () => {
  return (
    <section id="services" className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
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
              <h3 className="font-heading text-lg mb-2 text-foreground">{value.title}</h3>
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
