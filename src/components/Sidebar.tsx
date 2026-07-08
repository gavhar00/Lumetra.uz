import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  FlaskConical, 
  Presentation, 
  Gamepad2, 
  Video,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Bosh sahifa", path: "/kabinet" },
  { icon: Video, label: "Fanlar", path: "/fanlar" },
  { icon: FlaskConical, label: "Laboratoriya", path: "/laboratoriya" },
  { icon: BookOpen, label: "Darsliklar", path: "/darsliklar" },
  { icon: Gamepad2, label: "O'yinlar", path: "/o'yinlar" },
  { icon: Presentation, label: "Virtual Achki", path: "/doska" },
  { icon: User, label: "Profil", path: "/profil" },
  { icon: ShieldCheck, label: "Ustoz Paneli", path: "/admin" },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <motion.aside 
      initial={false}
      animate={{ width: isOpen ? 280 : 100 }}
      className="bg-slate-950/35 backdrop-blur-2xl border-r border-white/5 hidden md:flex flex-col py-8 px-4 gap-2 sticky top-20 h-[calc(100vh-80px)] transition-all duration-300 z-40"
    >
      <div className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden",
              isActive 
                ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg shadow-primary/25" 
                : "text-text-secondary hover:bg-white/5 hover:text-primary hover:shadow-[0_4px_12px_rgba(99,102,241,0.1)] hover:border-white/5 border border-transparent"
            )}
          >
            <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110 shrink-0", isOpen ? "" : "mx-auto")} />
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="truncate"
              >
                {item.label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </div>
      
      <div className="pt-6 border-t border-white/5 space-y-2">
        <NavLink
          to="/sozlamalar"
          className={({ isActive }) => cn(
            "flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 group border border-transparent",
            isActive 
              ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg shadow-primary/25" 
              : "text-text-secondary hover:bg-white/5 hover:text-primary hover:shadow-[0_4px_12px_rgba(99,102,241,0.1)]"
          )}
        >
          <Settings className={cn("w-5 h-5 shrink-0", isOpen ? "" : "mx-auto")} />
          {isOpen && <span className="truncate">Sozlamalar</span>}
        </NavLink>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-text-secondary hover:bg-white/5 hover:text-primary hover:shadow-[0_4px_12px_rgba(99,102,241,0.1)] border border-transparent transition-all duration-300 text-left cursor-pointer"
        >
          {isOpen ? (
            <>
              <ChevronLeft className="w-5 h-5 shrink-0" />
              <span className="truncate">Yopish</span>
            </>
          ) : (
            <ChevronRight className="w-5 h-5 mx-auto shrink-0" />
          )}
        </button>
      </div>
    </motion.aside>
  );
}
