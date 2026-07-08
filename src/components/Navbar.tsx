import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, User, LogOut, Bell, Search, Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/kirish");
  };

  return (
    <nav className="glass sticky top-0 z-50 h-20 flex items-center justify-between px-8 border-b border-white/5">
      <div className="flex items-center gap-8">
        <Link to="/kabinet" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-primary to-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-text-primary hidden sm:block">Lumetra</span>
        </Link>
 
        <div className="hidden lg:flex items-center relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Qidirish..."
            className="pl-11 pr-6 py-2.5 bg-white/5 border border-white/5 focus:border-primary/40 focus:bg-white/10 rounded-2xl text-sm w-80 text-text-primary placeholder:text-text-secondary/60 outline-none transition-all duration-300"
          />
        </div>
      </div>
 
      <div className="flex items-center gap-6">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 text-text-secondary hover:bg-white/5 hover:text-primary rounded-2xl transition-all relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </motion.button>
        
        <div className="flex items-center gap-4 pl-6 border-l border-white/5">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-text-primary">{user.name || "O'quvchi"}</p>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{user.grade || "11"}-sinf</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 p-[2px] cursor-pointer"
          >
            <div className="w-full h-full rounded-[14px] bg-slate-900 overflow-hidden">
              <img src={`https://picsum.photos/seed/${user.name}/100/100`} alt="avatar" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
          <button 
            onClick={handleLogout}
            className="p-3 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all cursor-pointer"
            title="Chiqish"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
