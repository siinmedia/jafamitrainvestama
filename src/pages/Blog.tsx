import { motion } from "framer-motion";
import { ArrowLeft, Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogData";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION BLOG */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <ArrowLeft size={16} />
                Kembali ke Beranda
              </Link>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              Wawasan & Berita Terbaru
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
              Temukan berbagai artikel menarik seputar karir, budaya kerja, dan berita terbaru dari tim Jafa Mitra Investama.
            </p>
          </motion.div>
        </div>
      </section>

      {/* DAFTAR ARTIKEL (GRID) */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Jika tidak ada artikel */}
          {blogPosts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">Belum ada artikel yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300"
                >
                  {/* Gambar Artikel */}
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-border shadow-sm">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Konten Text */}
                  <div className="p-6 flex flex-col flex-grow">
                    <Link to={`/blog/${post.id}`}>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    
                    {/* line-clamp-3 membatasi teks maksimal 3 baris */}
                    <p className="text-sm text-muted-foreground mb-6 flex-grow leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <Calendar size={14} className="text-primary/70" /> 
                        {post.date}
                      </div>
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center text-sm font-bold text-primary hover:gap-1.5 transition-all gap-1 group-hover:text-primary/80"
                      >
                        Baca <ChevronRight size={16} />
                      </Link>
                    </div>
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