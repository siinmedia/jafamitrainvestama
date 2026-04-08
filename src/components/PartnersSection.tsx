const partners = [
  "HEX Fund",
  "MTGox",
  "Saven Bank",
  "Coinbosee",
  "Rose Martin",
  "Meta Mex",
];

const PartnersSection = () => {
  return (
    <section className="py-12 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-8">
          {partners.map((partner) => (
            <span
              key={partner}
              className="text-sm lg:text-base font-heading text-muted-foreground/60 tracking-wide"
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
