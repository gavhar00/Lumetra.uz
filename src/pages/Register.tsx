import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, User, ArrowRight, Loader2, BookOpen, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    grade: "11"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({
        name: formData.name,
        email: formData.email,
        grade: formData.grade,
        id: "123"
      }));
      toast.success("Ro'yxatdan o'tish muvaffaqiyatli yakunlandi! Xush kelibsiz.");
      navigate("/kabinet");
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
              <CircleGraduationCap className="text-white w-7 h-7" />
            </div>
            <span className="font-display font-bold text-3xl tracking-tight text-text-primary">Lumetra</span>
          </Link>
          <h2 className="text-3xl font-display font-bold text-text-primary tracking-tight">Ro'yxatdan o'tish</h2>
          <p className="text-text-secondary mt-2 font-medium">Platformamizga qo'shiling</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Ism va familiyangiz</label>
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                required
                className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-200 rounded-[24px] focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:bg-white outline-none transition-all duration-300 font-medium"
                placeholder="Azizbek Karimov"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

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
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Sinfingiz</label>
            <div className="relative group">
              <BookOpen className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" />
              <select 
                className="w-full pl-14 pr-10 py-4 bg-slate-50/50 border border-slate-200 rounded-[24px] focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:bg-white outline-none transition-all duration-300 font-bold text-text-primary appearance-none"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              >
                {[...Array(11)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}-sinf</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Parol yarating</label>
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

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                Ro'yxatdan o'tish <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-text-secondary font-medium text-sm">
            Hisobingiz bormi?{" "}
            <Link to="/kirish" className="font-bold text-primary hover:underline flex items-center justify-center gap-2 mt-2">
              Kirish <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

const CircleGraduationCap = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);
