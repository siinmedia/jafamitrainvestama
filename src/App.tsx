import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index.tsx";
import Career from "./pages/Career.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import CekStatus from "./pages/CekStatus.tsx";

// 🔥 1. TAMBAHKAN IMPORT UNTUK HALAMAN BLOG DI SINI
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/career" element={<Career />} />
          
          {/* 🔥 ROUTE UNTUK CEK STATUS PELAMAR */}
          <Route path="/cek-status" element={<CekStatus />} />
          
          {/* 🔥 ROUTE UNTUK DASHBOARD ADMIN HRD */}
          <Route path="/admin-hrd" element={<AdminDashboard />} />

          {/* 🔥 2. TAMBAHKAN ROUTE UNTUK BLOG DI SINI */}
          {/* Ini untuk halaman daftar artikel */}
          <Route path="/blog" element={<Blog />} />
          {/* Ini untuk halaman isi artikel (detail) */}
          <Route path="/blog/:id" element={<BlogPost />} />
          
          {/* ⚠️ PENTING: Route NotFound (*) harus selalu berada di paling BAWAH */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;