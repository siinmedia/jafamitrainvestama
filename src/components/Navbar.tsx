import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#", route: "/" },
  { label: "Tentang", href: "#about", route: null },
  { label: "Produk", href: "/produk", route: null },
  { label: "Team Sales", href: "#team", route: null },
  { label: "Testimoni", href: "#testimonials", route: null },
  { label: "Karir", href: "/career", route: "/career" },
  { label: "Kontak", href: "#contact", route: null },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const renderLink = (
    link: typeof navLinks[0],
    className: string,
    onClick?: () => void
  ) => {
    if (link.route) {
      return (
        <Link
          key={link.label}
          to={link.route}
          className={className}
          onClick={onClick}
        >
          {link.label}
        </Link>
      );
    }

    const href = location.pathname !== "/" ? `/${link.href}` : link.href;

    return (
      <a key={link.label} href={href} className={className} onClick={onClick}>
        {link.label}
      </a>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="font-heading text-2xl tracking-tight leading-none"
        >
          <span className="font-bold text-foreground">Maha Niaga</span>{" "}
          <span className="font-extrabold text-primary">Artha</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            renderLink(
              link,
              "text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            )
          )}
        </div>

        {/* Desktop Actions (Login & CTA) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin-hrd"
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
          >
            Login
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Konsultasi Gratis
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) =>
                renderLink(
                  link,
                  "text-foreground/70 hover:text-primary font-medium",
                  () => setOpen(false)
                )
              )}

              {/* Mobile Actions (Login & CTA) */}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                <Link
                  to="/admin-hrd"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  onClick={() => setOpen(false)}
                >
                  Konsultasi Gratis
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;