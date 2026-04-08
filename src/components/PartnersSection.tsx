const partners = [
  { name: "Mybestea", logo: "/logos/1.webp" },
  { name: "You Need Mie", logo: "/logos/2.webp" },
  { name: "Mentoast", logo: "/logos/3.webp" },
  { name: "Kopi Ibukota", logo: "/logos/4.webp" },
  { name: "Esteh Ibukota", logo: "/logos/5.webp" },
  { name: "Kentang Gantenk", logo: "/logos/6.webp" },
  { name: "Raja Steak", logo: "/logos/7.webp" },
  { name: "Nice Coffee", logo: "/logos/8.webp" },
  { name: "Seblak Express", logo: "/logos/9.webp" },
];

const row1 = partners.slice(0, Math.ceil(partners.length / 2));
const row2 = partners.slice(Math.ceil(partners.length / 2));

const PartnersSection = () => {
  return (
    <section className="py-14 border-t border-border bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
          Brand Usaha Kami
        </p>

        {/* ROW 1 */}
        <div className="overflow-hidden mb-6">
          <div className="flex gap-5 w-max marquee">
            {[...row1, ...row1].map((partner, i) => (
              <div
                key={i}
                className="h-24 w-40 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted/40"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2 */}
        <div className="overflow-hidden">
          <div className="flex gap-5 w-max marquee-reverse">
            {[...row2, ...row2].map((partner, i) => (
              <div
                key={i}
                className="h-24 w-40 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted/40"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* INLINE CSS */}
      <style jsx>{`
        .marquee {
          animation: marquee 25s linear infinite;
        }

        .marquee-reverse {
          animation: marqueeReverse 25s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeReverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;