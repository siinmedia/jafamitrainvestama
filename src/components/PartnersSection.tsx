const partners = [
  "Mybestea",
  "You Need Mie",
  "Mentoast",
  "Kopi Ibukota",
  "Esteh Ibukota",
  "Kentang Gantenk",
  "Raja Steak",
  "Nice Coffee",
  "Seblak Express",
  "Chick Ichick",
  "Merlumer",
  "Chickuruyuk",
  "Tahu Nyonyor",
];

const PartnersSection = () => {
  return (
    <section className="py-12 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Heading kecil biar lebih jelas */}
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
          Brand Usaha Kami
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {partners.map((partner) => (
            <span
              key={partner}
              className="text-sm lg:text-base font-heading text-muted-foreground/60 tracking-wide hover:text-primary transition-colors"
            >
              {partner}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PartnersSection;