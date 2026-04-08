const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-heading text-xl text-primary mb-3">Finovate</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner in financial planning and wealth management.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-foreground mb-3">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Our Team", "Careers", "News"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm text-foreground mb-3">Services</h4>
            <ul className="space-y-2">
              {["Wealth Management", "Retirement Planning", "Tax Optimization", "Investment Strategy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm text-foreground mb-3">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Disclosures", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Finovate Financial. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            SEC Registered Investment Advisor
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
