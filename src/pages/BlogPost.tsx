import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Check } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogData";

const BlogPost = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  
  // Mencari data artikel berdasarkan ID di URL
  const post = blogPosts.find((p) => p.id === id);

  // EFEK SCROLL TO TOP: Mengembalikan layar ke atas saat halaman baru dimuat
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fungsi Copy Link
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Jika artikel tidak ditemukan
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <article className="container mx-auto px-4 max-w-4xl">
          
          {/* Header Artikel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors font-medium bg-muted/50 px-4 py-2 rounded-full"
            >
              <ArrowLeft size={16} />
              Kembali ke Blog
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-sm text-muted-foreground mb-6 font-medium">
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest text-[10px] font-bold">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={16} /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} /> {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-[1.2] mb-8 tracking-tight">
              {post.title}
            </h1>
          </motion.div>

          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 rounded-3xl overflow-hidden shadow-xl border border-border bg-muted"
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto max-h-[500px] object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Isi Konten Artikel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            {/* Styling Paragraf Mandiri tanpa butuh plugin tambahan */}
            <div className="space-y-6 text-base md:text-lg text-foreground/80 leading-relaxed md:leading-loose">
              {post.content.map((paragraph, index) => (
                <p key={index} className="text-justify md:text-left">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tombol Bagikan Artikel */}
            <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
              <p className="text-foreground font-bold text-lg tracking-tight">Bagikan wawasan ini</p>
              <button 
                onClick={handleShare}
                className="px-4 py-2.5 rounded-xl bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2 text-sm font-bold shadow-sm"
              >
                {copied ? <><Check size={18} /> Tersalin!</> : <><Share2 size={18} /> Salin Tautan</>}
              </button>
            </div>
          </motion.div>

        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;