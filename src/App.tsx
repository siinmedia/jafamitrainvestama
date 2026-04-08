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
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

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
          <Route path="/blog" element={<Blog />} />
<Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;