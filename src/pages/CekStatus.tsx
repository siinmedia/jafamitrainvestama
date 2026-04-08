import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowLeft, CheckCircle2, Clock, XCircle, UserX } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

const CekStatus = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleCekStatus = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(false);
    
    const email = e.target.email.value;
    const whatsapp = e.target.whatsapp.value;

    try {
      // Memanggil fungsi aman yang kita buat di SQL tadi
      const { data, error } = await supabase.rpc("cek_status_lamaran", {
        p_email: email,
        p_whatsapp: whatsapp,
      });

      if (error) throw error;
      
      setResult(data && data.length > 0 ? data[0] : null);
      setHasSearched(true);
    } catch (error: any) {
      alert("Terjadi kesalahan sistem: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "accepted": return <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />;
      case "rejected": return <XCircle className="w-16 h-16 text-red-500 mb-4" />;
      default: return <Clock className="w-16 h-16 text-blue-500 mb-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cek Status Lamaran</h2>
          <p className="text-gray-500 text-sm mb-6">Masukkan email dan no. WA yang Anda gunakan saat melamar.</p>

          <form onSubmit={handleCekStatus} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" required placeholder="Email Anda" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp</label>
              <input type="text" name="whatsapp" required placeholder="No WA Anda" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 flex items-center justify-center gap-2">
              {loading ? "Mencari data..." : <><Search size={18}/> Cek Status Saya</>}
            </button>
          </form>

          {/* HASIL PENCARIAN */}
          {hasSearched && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
              {result ? (
                <div className="flex flex-col items-center">
                  {getStatusIcon(result.status_lamaran)}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{result.posisi_dilamar}</h3>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-white border shadow-sm mt-2">
                    <span className="font-semibold text-gray-700">Status: </span> 
                    <span className="font-bold text-primary">{result.status_lamaran}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-4">Update terakhir: {new Date(result.tanggal_update).toLocaleDateString('id-ID')}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <UserX className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-900 font-medium">Data tidak ditemukan.</p>
                  <p className="text-sm text-gray-500 mt-1">Pastikan Email dan No.WA sama persis dengan saat melamar.</p>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CekStatus;