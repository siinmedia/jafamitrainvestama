import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, Eye, Trash2, Download, FileText, 
  User, Mail, Phone, ExternalLink, Calendar,
  Lock, LogOut, ArrowLeft, Users, Clock, CheckCircle, XCircle
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
    setApplications([]); 
  };

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
      updated_at: new Date().toISOString() 
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

  // Kalkulasi Statistik
  const totalApps = applications.length;
  const pendingApps = applications.filter(a => !a.status || a.status.toLowerCase() === 'pending').length;
  const acceptedApps = applications.filter(a => a.status?.toLowerCase() === 'accepted').length;

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition">
          <ArrowLeft size={16} /> Kembali ke Website
        </Link>

        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              <Lock size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Portal Admin HRD</h1>
          <p className="text-center text-gray-500 mb-8 text-sm">Silakan login untuk mengelola lamaran masuk.</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email HRD</label>
              <input 
                type="email" required 
                value={email} onChange={(e) => setEmail(e.target.value)} 
                placeholder="admin@perusahaan.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input 
                type="password" required 
                value={password} onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" 
              />
            </div>
            <button 
              type="submit" disabled={loginLoading} 
              className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-primary/20"
            >
              {loginLoading ? "Memeriksa Kredensial..." : "Masuk ke Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER KHUSUS ADMIN */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-primary/20">HR</div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-none">Maha Niaga Artha</h1>
            <p className="text-xs text-gray-500 mt-1 font-medium tracking-wide uppercase">Recruitment Dashboard</p>
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 text-sm font-bold text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl transition"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Users size={24}/></div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Pelamar</p>
              <p className="text-2xl font-bold text-gray-900">{totalApps}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center"><Clock size={24}/></div>
            <div>
              <p className="text-sm font-medium text-gray-500">Menunggu Review</p>
              <p className="text-2xl font-bold text-gray-900">{pendingApps}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><CheckCircle size={24}/></div>
            <div>
              <p className="text-sm font-medium text-gray-500">Kandidat Diterima</p>
              <p className="text-2xl font-bold text-gray-900">{acceptedApps}</p>
            </div>
          </div>
        </div>

        {/* TABEL DATA */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
            <h2 className="text-lg font-bold text-gray-900">Data Pelamar Terbaru</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Cari nama/posisi..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64 bg-gray-50"/>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
                  <th className="p-4 font-semibold">Informasi Pelamar</th>
                  <th className="p-4 font-semibold">Posisi Dilamar</th>
                  <th className="p-4 font-semibold">Waktu Apply</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-500">Memuat data pelamar...</td></tr>
                ) : applications.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-500">Belum ada lamaran masuk.</td></tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{app.nama}</div>
                        <div className="text-sm text-gray-500 mt-0.5">{app.email}</div>
                      </td>
                      <td className="p-4 text-sm font-bold text-gray-700">{app.posisi}</td>
                      <td className="p-4 text-sm text-gray-500">{formatDate(app.created_at)}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(app.status)}`}>
                          {app.status || "Pending"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => { setSelectedApp(app); setIsModalOpen(true); }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 rounded-lg text-sm font-semibold transition"
                          >
                            <Eye size={16} /> Review
                          </button>
                          <button 
                            onClick={() => handleDelete(app.id)}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Hapus Data"
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
      {/* MODAL REVIEW SPLIT-SCREEN (DETAIL & PREVIEW) */}
      {/* ========================================== */}
      {isModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm p-4 md:p-8">
          <div className="bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white z-10 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Review Kandidat: {selectedApp.nama}</h3>
                <p className="text-sm text-primary font-semibold mt-0.5">{selectedApp.posisi}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition">
                <XCircle size={24} />
              </button>
            </div>

            {/* Modal Body (2 Columns) */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
              
              {/* Kolom Kiri: Data & Form */}
              <div className="w-full lg:w-1/2 p-6 overflow-y-auto custom-scrollbar bg-gray-50">
                
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Informasi Kontak & Tautan</h4>
                  <div className="space-y-3">
                    <p className="flex justify-between text-sm"><span className="text-gray-500">Email:</span> <span className="font-semibold text-gray-900">{selectedApp.email}</span></p>
                    <p className="flex justify-between text-sm"><span className="text-gray-500">WhatsApp:</span> <span className="font-semibold text-gray-900">{selectedApp.whatsapp}</span></p>
                    <p className="flex justify-between text-sm">
                      <span className="text-gray-500">LinkedIn:</span> 
                      {selectedApp.linkedin ? <a href={selectedApp.linkedin} target="_blank" className="text-blue-600 font-semibold hover:underline">Buka Profil</a> : <span>-</span>}
                    </p>
                    <p className="flex justify-between text-sm">
                      <span className="text-gray-500">Portfolio:</span> 
                      {selectedApp.portfolio ? <a href={selectedApp.portfolio} target="_blank" className="text-blue-600 font-semibold hover:underline">Buka Link</a> : <span>-</span>}
                    </p>
                  </div>
                </div>

                {selectedApp.pesan && (
                  <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl mb-6">
                    <h4 className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">Cover Letter / Pesan</h4>
                    <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">{selectedApp.pesan}</p>
                  </div>
                )}

                {/* Form Keputusan HR */}
                <form onSubmit={handleUpdate} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">Keputusan HRD</h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Update Status</label>
                      <select 
                        name="status" 
                        defaultValue={selectedApp.status || "Pending"} 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-semibold text-gray-800 bg-gray-50"
                      >
                        <option value="Pending">Pending (Belum Proses)</option>
                        <option value="Review">Review (Sedang Dipelajari)</option>
                        <option value="Interview">Interview (Panggilan)</option>
                        <option value="Accepted">Accepted (Diterima)</option>
                        <option value="Rejected">Rejected (Ditolak)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Skor Penilaian</label>
                      <input 
                        type="number" name="score" min="0" max="100"
                        defaultValue={selectedApp.score || ""} placeholder="0-100"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent font-semibold text-gray-800 bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Catatan Internal (Rahasia)</label>
                    <textarea 
                      name="notes" rows={3} defaultValue={selectedApp.notes || ""}
                      placeholder="Catatan hasil wawancara atau kualifikasi..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-50 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" disabled={updateLoading}
                    className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition shadow-lg shadow-primary/20"
                  >
                    {updateLoading ? "Menyimpan Data..." : "Simpan Keputusan"}
                  </button>
                </form>
              </div>

              {/* Kolom Kanan: PREVIEW DOKUMEN CV */}
              <div className="w-full lg:w-1/2 bg-gray-200 flex flex-col border-l border-gray-200">
                <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
                  <h4 className="font-bold text-gray-800 flex items-center gap-2"><FileText size={18}/> Preview Dokumen CV</h4>
                  {selectedApp.cv_url && (
                    <a 
                      href={selectedApp.cv_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition shadow-md"
                    >
                      <Download size={16} /> Download
                    </a>
                  )}
                </div>
                
                <div className="flex-1 w-full bg-gray-100 relative">
                  {selectedApp.cv_url ? (
                    // Iframe untuk memunculkan PDF langsung di website
                    <iframe 
                      src={selectedApp.cv_url} 
                      className="w-full h-full border-0 absolute inset-0"
                      title="CV Preview"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <FileText size={48} className="mb-3 opacity-50"/>
                      <p className="font-semibold">Kandidat tidak menyertakan file CV</p>
                    </div>
                  )}
                </div>
                
                {/* Note kecil jika browser tidak support embed docx */}
                <div className="bg-yellow-50 p-2 text-center border-t border-yellow-200 text-xs text-yellow-700">
                  *Jika file berformat DOCX dan tidak muncul di atas, silakan klik tombol Download.
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;