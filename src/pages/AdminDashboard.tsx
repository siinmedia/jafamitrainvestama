import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, Eye, Trash2, Download, FileText, 
  User, Mail, Phone, ExternalLink, Calendar,
  Lock, LogOut, ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // === STATE AUTHENTICATION ===
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // === STATE DASHBOARD ===
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Cek sesi login saat halaman dimuat
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchApplications();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchApplications();
    });

    return () => subscription.unsubscribe();
  }, []);

  // === FUNGSI LOGIN & LOGOUT ===
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      alert("Login Gagal: Pastikan Email dan Password benar.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setApplications([]); // Kosongkan data setelah logout
  };

  // === FUNGSI CRUD DASHBOARD ===
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus lamaran ini secara permanen?")) return;
    try {
      const { error } = await supabase.from("applications").delete().eq("id", id);
      if (error) throw error;
      
      alert("Data berhasil dihapus!");
      fetchApplications();
    } catch (error: any) {
      alert("Gagal menghapus data: " + error.message);
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setUpdateLoading(true);
    
    const formData = new FormData(e.target);
    const updates = {
      status: formData.get("status"),
      score: formData.get("score") ? parseInt(formData.get("score") as string) : null,
      notes: formData.get("notes"),
      updated_at: new Date().toISOString() // Update waktu agar pelamar tahu kapan diproses
    };

    try {
      const { error } = await supabase
        .from("applications")
        .update(updates)
        .eq("id", selectedApp.id);

      if (error) throw error;
      
      alert("Status pelamar berhasil diperbarui!");
      setIsModalOpen(false);
      fetchApplications();
    } catch (error: any) {
      alert("Gagal mengupdate data: " + error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  // Helper UI
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "review": return "bg-blue-100 text-blue-800 border-blue-200";
      case "interview": return "bg-purple-100 text-purple-800 border-purple-200";
      case "accepted": return "bg-green-100 text-green-800 border-green-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  // ==========================================
  // TAMPILAN 1: FORM LOGIN (JIKA BELUM LOGIN)
  // ==========================================
  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition">
          <ArrowLeft size={16} /> Kembali ke Website
        </Link>

        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              <Lock size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Portal Admin HRD</h1>
          <p className="text-center text-gray-500 mb-8">Silakan login untuk mengelola lamaran.</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email HRD</label>
              <input 
                type="email" required 
                value={email} onChange={(e) => setEmail(e.target.value)} 
                placeholder="admin@perusahaan.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" required 
                value={password} onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" 
              />
            </div>
            <button 
              type="submit" disabled={loginLoading} 
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition flex justify-center items-center"
            >
              {loginLoading ? "Memeriksa Kredensial..." : "Masuk ke Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // TAMPILAN 2: DASHBOARD (JIKA SUDAH LOGIN)
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER KHUSUS ADMIN */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">HR</div>
          <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Maha Niaga Artha - Recruitment</h1>
        </div>
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition"
        >
          <LogOut size={16} /> Logout Sistem
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Daftar Pelamar Masuk</h2>
            <p className="text-gray-500 mt-1">Kelola dan review kandidat karyawan.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 flex items-center gap-2">
            <span className="text-sm text-gray-500">Total Data: </span>
            <span className="font-bold text-primary text-lg">{applications.length}</span>
          </div>
        </div>

        {/* TABEL DATA */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                  <th className="p-4 font-medium">Informasi Pelamar</th>
                  <th className="p-4 font-medium">Posisi</th>
                  <th className="p-4 font-medium">Waktu Masuk</th>
                  <th className="p-4 font-medium">Status Tahapan</th>
                  <th className="p-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-500">Memuat data pelamar...</td></tr>
                ) : applications.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-500">Belum ada lamaran masuk.</td></tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-gray-900">{app.nama}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-0.5"><Mail size={12}/> {app.email}</div>
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-700">{app.posisi}</td>
                      <td className="p-4 text-sm text-gray-500">{formatDate(app.created_at)}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}>
                          {app.status || "Pending"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => { setSelectedApp(app); setIsModalOpen(true); }}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition" title="Review Lamaran"
                          >
                            <Eye size={18} />
                          </button>
                          {app.cv_url && (
                            <a 
                              href={app.cv_url} target="_blank" rel="noopener noreferrer"
                              className="p-2 text-green-600 hover:bg-green-100 rounded-md transition" title="Download CV"
                            >
                              <Download size={18} />
                            </a>
                          )}
                          <button 
                            onClick={() => handleDelete(app.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-md transition" title="Hapus Data"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL REVIEW & UPDATE STATUS HRD */}
      {/* ========================================== */}
      {isModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Review Kandidat</h3>
                <p className="text-sm text-gray-500">ID: {selectedApp.id.split('-')[0]}...</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white rounded-full text-gray-500 hover:text-gray-900 shadow-sm border">✕</button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              {/* Info Dasar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mb-6">
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Nama Lengkap</p>
                  <p className="font-medium text-gray-900 flex items-center gap-2"><User size={16} className="text-primary"/> {selectedApp.nama}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Posisi Dilamar</p>
                  <p className="font-medium text-gray-900 flex items-center gap-2"><FileText size={16} className="text-primary"/> {selectedApp.posisi}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Kontak</p>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-800 flex items-center gap-2"><Mail size={14} className="text-gray-400"/> {selectedApp.email}</p>
                    <p className="text-sm text-gray-800 flex items-center gap-2"><Phone size={14} className="text-gray-400"/> {selectedApp.whatsapp}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Tautan / Link</p>
                  <div className="space-y-1">
                    {selectedApp.linkedin ? (
                      <a href={selectedApp.linkedin} target="_blank" className="text-sm text-blue-600 hover:underline flex items-center gap-1 font-medium">LinkedIn <ExternalLink size={12}/></a>
                    ) : <span className="text-sm text-gray-400">LinkedIn: -</span>}
                    {selectedApp.portfolio ? (
                      <a href={selectedApp.portfolio} target="_blank" className="text-sm text-blue-600 hover:underline flex items-center gap-1 font-medium">Portfolio <ExternalLink size={12}/></a>
                    ) : <span className="text-sm text-gray-400 block">Portfolio: -</span>}
                  </div>
                </div>
              </div>

              <div className="mb-8 bg-blue-50 border border-blue-100 p-4 rounded-xl">
                <p className="text-xs text-blue-500 font-bold uppercase tracking-wider mb-2">Pesan Singkat / Cover Letter</p>
                <p className="text-blue-900 text-sm whitespace-pre-wrap leading-relaxed">{selectedApp.pesan || "Pelamar tidak menyertakan pesan."}</p>
              </div>

              <hr className="my-6 border-gray-200 border-dashed" />

              {/* FORM PENILAIAN HR */}
              <form onSubmit={handleUpdate} className="space-y-5 bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">📝 Penilaian & Tindakan HRD</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Ubah Status</label>
                    <select 
                      name="status" 
                      defaultValue={selectedApp.status || "Pending"} 
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-800 font-medium"
                    >
                      <option value="Pending">Pending (Belum diproses)</option>
                      <option value="Review">Review (Sedang dipelajari)</option>
                      <option value="Interview">Interview (Panggilan Wawancara)</option>
                      <option value="Accepted">Accepted (Diterima Kerja)</option>
                      <option value="Rejected">Rejected (Ditolak)</option>
                    </select>
                    <p className="text-[11px] text-gray-500 mt-1">*Status ini bisa dilihat oleh pelamar</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Skor Kandidat</label>
                    <input 
                      type="number" 
                      name="score" 
                      min="0" max="100"
                      defaultValue={selectedApp.score || ""} 
                      placeholder="0 - 100"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Catatan Internal Rahasia</label>
                  <textarea 
                    name="notes" 
                    rows={3} 
                    defaultValue={selectedApp.notes || ""}
                    placeholder="Contoh: Kurang pengalaman di bidang pajak, tapi komunikasi bagus..."
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white resize-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex gap-3 justify-end">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-gray-600 font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    disabled={updateLoading}
                    className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition shadow-md"
                  >
                    {updateLoading ? "Menyimpan..." : "Simpan Keputusan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;