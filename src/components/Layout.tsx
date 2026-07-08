import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/kirish");
    } else {
      setIsAuth(true);
    }
  }, [navigate]);

  if (!isAuth) return null;

  return (
    <div className="min-h-screen bg-bg-light flex flex-col selection:bg-primary/10 selection:text-primary">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
