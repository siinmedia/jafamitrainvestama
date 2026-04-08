import { motion } from "framer-motion";
import { BarChart3, PiggyBank, LineChart, Briefcase } from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "Wealth Management",
    description: "Comprehensive strategies tailored to grow, preserve, and transfer your wealth across generations.",
  },
  {
    icon: PiggyBank,
    title: "Retirement Planning",
    description: "Personalized retirement solutions ensuring financial security and peace of mind for your future.",
  },
  {
    icon: LineChart,
    title: "Investment Strategy",
    description: "Data-driven investment approaches designed to maximize returns while managing risk effectively.",
  },
  {
    icon: Briefcase,
    title: "Tax Optimization",
    description: "Strategic tax planning to minimize liabilities and maximize your after-tax wealth accumulation.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3 block">
            Our Services
          </span>
          <h2 className="font-heading text-3xl lg:text-4xl text-foreground">
            Comprehensive Financial Solutions
          </h2>
        </div>

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
              <h3 className="font-heading text-xl mb-3 text-foreground">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
