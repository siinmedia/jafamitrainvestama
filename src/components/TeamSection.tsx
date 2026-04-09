import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const teamMembers = [

    {
    name: "Livya Ayu",
    role: "Senior Sales Marketing",
    image: "/dm/dm%201.webp",
    phone: "6282124952606",
  },

    {
    name: "Berliiana",
    role: "Sales Marketing",
    image: "/dm/dm%202.webp",
    phone: "6285117276822",
  },

    {
    name: "Putri Sri",
    role: "Sales Marketing",
    image: "/dm/dm%203.webp",
    phone: "6281212126722",
  },

  {
    name: "Kristianti",
    role: "Sales Marketing",
    image: "/dm/dm%204.webp",
    phone: "6281234086100",
  },


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
              href="https://wa.me/6281234086100"
              target="_blank"
              className="inline-flex items-center px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium"
            >
              Hubungi Kami
            </a>
          </div>
        </div>

        {/* Team List */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => {
            const message = encodeURIComponent(
              `Halo ${member.name}, saya tertarik untuk memulai usaha. Bisa dibantu?`
            );

            const waLink = `https://wa.me/${member.phone}?text=${message}`;

            return (
              <motion.a
                href={waLink}
                target="_blank"
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group cursor-pointer block"
              >
                <div className="relative w-28 h-28 lg:w-32 lg:h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-border group-hover:border-accent transition-colors">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
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
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;