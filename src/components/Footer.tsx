const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-xl text-primary mb-3">
              Jafa Mitra Investama
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Partner terbaik untuk memulai usaha makanan & minuman. 
              Paket lengkap, siap jual, dan sudah terbukti menghasilkan.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-sm text-foreground mb-3">
              Perusahaan
            </h4>
            <ul className="space-y-2">
              {["Tentang Kami", "Tim Kami", "Karir", "Artikel & Tips"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-medium text-sm text-foreground mb-3">
              Produk Usaha
            </h4>
            <ul className="space-y-2">
              {[
                "Paket Minuman",
                "Paket Makanan",
                "Brand Kemitraan",
                "Paket Custom Usaha"
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Support */}
          <div>
            <h4 className="font-medium text-sm text-foreground mb-3">
              Bantuan
            </h4>
            <ul className="space-y-2">
              {[
                "Syarat & Ketentuan",
                "Kebijakan Privasi",
                "FAQ",
                "Kontak"
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 CV Jafa Mitra Investama. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Solusi Paket Usaha Siap Jalan untuk Semua
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;