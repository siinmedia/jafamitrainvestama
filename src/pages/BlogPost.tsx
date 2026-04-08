import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogs } from "@/data/blogData";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = blogs.find((b) => b.slug === slug);

  // Auto scroll ke atas saat artikel dibuka
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h1 className="text-5xl font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground mb-6">Artikel yang Anda cari tidak ditemukan.</p>
        <button onClick={() => navigate("/blog")} className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all">
          Kembali ke Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20 lg:pt-36 bg-background">
        <article className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft size={16} /> Kembali ke Kumpulan Artikel
            </Link>

            {/* Header Artikel */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider mb-5">
                <Tag size={14} /> {post.category}
              </span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.2] tracking-tight mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y border-border py-4">
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <User size={16} />
                  </div>
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} /> {post.date}
                </span>
              </div>
            </div>

            {/* Gambar Utama */}
            <div className="w-full h-[250px] md:h-[400px] rounded-3xl overflow-hidden mb-10 border border-border shadow-sm">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>

            {/* Isi Artikel */}
            <div className="text-foreground/90">
              {post.content.map((paragraph, index) => (
                <p key={index} className="mb-6 leading-loose text-base md:text-lg text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share / Footer Artikel */}
            <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
              <p className="text-sm font-bold text-foreground">Maha Niaga Artha</p>
              <button onClick={() => window.scrollTo(0,0)} className="text-sm text-primary hover:underline font-medium">
                Kembali ke atas
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