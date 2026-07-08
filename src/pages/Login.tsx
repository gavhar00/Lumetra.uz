import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (formData.email && formData.password) {
        localStorage.setItem("user", JSON.stringify({
          name: "Azizbek",
          email: formData.email,
          grade: "11",
          id: "123"
        }));
        toast.success("Xush kelibsiz! O'qishni davom ettiramiz.");
        navigate("/kabinet");
      } else {
        toast.error("Iltimos, barcha maydonlarni to'ldiring");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-primary rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary rounded-full blur-[100px]" 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full glass rounded-[48px] p-12 relative z-10 border-white/40 shadow-2xl"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="bg-primary p-2.5 rounded-2xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/30">
              <GraduationCap className="text-white w-7 h-7" />
            </div>
            <span className="font-display font-bold text-3xl tracking-tight text-text-primary">Lumetra</span>
          </Link>
          <h2 className="text-3xl font-display font-bold text-text-primary tracking-tight">Xush kelibsiz!</h2>
          <p className="text-text-secondary mt-2 font-medium">O'qishni davom ettirish uchun kiring</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Email manzilingiz</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
              <input 
                type="email" 
                required
                className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-200 rounded-[24px] focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:bg-white outline-none transition-all duration-300 font-medium"
                placeholder="misol@mail.uz"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Parol</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
              <input 
                type="password" 
                required
                className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-200 rounded-[24px] focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:bg-white outline-none transition-all duration-300 font-medium"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded-lg border-slate-300 text-primary focus:ring-primary/20 transition-all" />
              <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">Eslab qolish</span>
            </label>
            <a href="#" className="text-sm font-bold text-primary hover:underline">Parolni unutdingizmi?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                Kirish <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-text-secondary font-medium text-sm">
            Hisobingiz yo'qmi?{" "}
            <Link to="/ro'yxatdan-o'tish" className="font-bold text-primary hover:underline flex items-center justify-center gap-2 mt-2">
              <Sparkles className="w-4 h-4" /> Bepul ro'yxatdan o'ting
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
