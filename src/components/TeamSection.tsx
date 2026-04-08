import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";

const teamMembers = [
  { name: "Andi Saputra", role: "Sales Executive", image: team1 },
  { name: "Rina Lestari", role: "Konsultan Usaha", image: team2 },
  { name: "Fajar Nugroho", role: "Sales Manager", image: team3 },
  { name: "Dewi Kartika", role: "Customer Support", image: team4 },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3 block">
              Team Sales Kami
            </span>

            <h2 className="font-heading text-3xl lg:text-4xl text-foreground leading-tight">
              Siap Membantu Anda{" "}
              <span className="text-accent-foreground">
                Memulai Usaha
              </span>
              <br />
              dari Nol Hingga Jalan
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">
              Konsultasi Gratis
            </span>
            <a
              href="#contact"
              className="inline-flex items-center px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium"
            >
              Hubungi Kami
            </a>
          </div>
        </div>

        {/* Team List */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="relative w-28 h-28 lg:w-32 lg:h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-border group-hover:border-accent transition-colors">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={512}
                  height={512}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-base text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {member.role}
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground group-hover:text-accent-foreground transition-colors"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;