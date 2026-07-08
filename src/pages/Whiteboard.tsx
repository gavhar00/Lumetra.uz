import { motion } from "framer-motion";
import { Sparkles, Box, Zap } from "lucide-react";

export default function Whiteboard() {
  return (
    <div className="h-[calc(100vh-160px)] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full glass rounded-[60px] p-16 text-center relative overflow-hidden border-white/40 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full blur-[80px]" />
        </div>

        <motion.div 
          animate={{ 
            rotate: [0, 10, -10, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="w-32 h-32 bg-gradient-to-br from-primary to-indigo-600 rounded-[40px] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-primary/30"
        >
          <Box className="text-white w-16 h-16" />
        </motion.div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/20">
          <Sparkles className="w-4 h-4" />
          Tez kunda platformada
        </div>

        <h1 className="text-5xl font-display font-bold text-text-primary mb-6 tracking-tight">
          Virtual Achki (VR)
        </h1>
        
        <p className="text-xl text-text-secondary leading-relaxed mb-10 max-w-lg mx-auto font-medium">
          Darslarni 3D formatda, virtual reallik ko'zoynaklari orqali o'rganish imkoniyati. Biz ta'limni yangi bosqichga olib chiqmoqdamiz.
        </p>

        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: Box, label: "3D Modellar" },
            { icon: Zap, label: "Interaktiv" },
            { icon: Sparkles, label: "VR Tajriba" }
          ].map((item, i) => (
            <div key={i} className="p-6 glass rounded-3xl border-white/20">
              <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-xs font-bold text-text-primary uppercase tracking-widest">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

