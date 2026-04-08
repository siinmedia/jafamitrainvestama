import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Calendar, User, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogs } from "@/data/blogData";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION (Selaras dengan halaman Career) */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft size={16} />
              Kembali ke Beranda
            </Link>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              Kabar & Wawasan
            </h1>

            <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-2xl mb-8">
              Temukan berbagai artikel, tips, dan wawasan terbaru seputar bisnis, keuangan, dan informasi dari Maha Niaga Artha.
            </p>

            {/* SEARCH BAR */}
            <div className="relative max-w-md text-foreground">
              <input
                type="text"
                placeholder="Cari artikel atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-none outline-none focus:ring-4 focus:ring-background/20 shadow-lg bg-background text-foreground"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* BLOG GRID SECTION */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
              Artikel Terbaru
            </h2>
            <p className="text-muted-foreground mt-2">Pilih bacaan menarik untuk hari ini.</p>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border rounded-2xl">
              <h3 className="text-xl font-bold text-foreground">Artikel tidak ditemukan</h3>
              <p className="text-muted-foreground mt-2">Coba gunakan kata kunci pencarian yang lain.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <img 
                      src={blog.imageUrl} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1.5 rounded-full border border-border">
                      {blog.category}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary"/> {blog.date}</span>
                      <span className="flex items-center gap-1.5"><User size={14} className="text-primary"/> {blog.author}</span>
                    </div>

                    <Link to={`/blog/${blog.slug}`}>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-grow leading-relaxed">
                      {blog.excerpt}
                    </p>

                    <Link 
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:opacity-80 transition-opacity mt-auto"
                    >
                      Baca Selengkapnya <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;