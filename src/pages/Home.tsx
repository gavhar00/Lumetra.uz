import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  ArrowRight, 
  Star, 
  Users, 
  Sparkles, 
  Radio, 
  Globe, 
  Cpu, 
  Play, 
  Volume2, 
  Zap, 
  Layers, 
  Compass, 
  CheckCircle,
  Trophy,
  Flame,
  UserCheck,
  ShoppingBag,
  ExternalLink,
  Lock,
  Atom,
  Eye,
  Rocket
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function Home() {
  // States for interactive UI demos
  const [activeWorld, setActiveWorld] = useState(0);
  const [xpPoints, setXpPoints] = useState(1250);
  const [streakDays, setStreakDays] = useState(14);
  const [aiSpeechState, setAiSpeechState] = useState<"idle" | "listening" | "speaking">("idle");
  const [aiMessage, setAiMessage] = useState("Salom! Diqqat darajangiz mukammal. Bugun qaysi laboratoriya tajribasini o'rganamiz?");
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [activeCreatorFilter, setActiveCreatorFilter] = useState("all");
  const [liveClassroomMic, setLiveClassroomMic] = useState(false);

  // Live active student simulator
  const [activeStudents, setActiveStudents] = useState(12404);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStudents(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Interactive Lab Simulator states
  const [chemTemp, setChemTemp] = useState(298); // Kelvin starting temp
  const [isReacting, setIsReacting] = useState(false);
  const [particleSparks, setParticleSparks] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [atomCollisions, setAtomCollisions] = useState(0);
  const [neuralSpikes, setNeuralSpikes] = useState<{ id: number; x: number; y: number }[]>([]);
  const [neuronActiveIndex, setNeuronActiveIndex] = useState<number | null>(null);

  const increaseChemTemp = () => {
    setIsReacting(true);
    setChemTemp(prev => (prev >= 2000 ? 298 : prev + 350));
    setTimeout(() => {
      setIsReacting(false);
    }, 800);
  };

  const collisionTrigger = () => {
    setAtomCollisions(p => p + 1);
    const colors = ["#F472B6", "#38BDF8", "#34D399", "#FB7185", "#FBBF24"];
    const sparks = Array.from({ length: 14 }).map((_, i) => ({
      id: Math.random() + i,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 160,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticleSparks(sparks);
    setTimeout(() => {
      setParticleSparks([]);
    }, 1200);
  };

  const triggerNeuronSpike = (idx: number) => {
    setNeuronActiveIndex(idx);
    const spikes = Array.from({ length: 8 }).map((_, i) => ({
      id: Math.random() + i,
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 120
    }));
    setNeuralSpikes(spikes);
    setTimeout(() => {
      setNeuronActiveIndex(null);
      setNeuralSpikes([]);
    }, 900);
  };

  const claimBonusXP = () => {
    setXpPoints(p => p + 150);
    setUnlockedAchievements(prev => [...prev, "Lab-Researcher"]);
  };

  const handleAiInteract = (triggerType: "chemistry" | "astronomy" | "math") => {
    setAiSpeechState("listening");
    setTimeout(() => {
      setAiSpeechState("speaking");
      if (triggerType === "chemistry") {
        setAiMessage("Molekula reaksiyasini muvaffaqiyatli ishga tushirdingiz! Harorat 1400K ga ko'tarildi.");
      } else if (triggerType === "astronomy") {
        setAiMessage("Qora tuynukning tortishish kuchi bo'yicha nazariyangiz to'g'ri. XP balingiz oshdi!");
      } else {
        setAiMessage("Logarifmik tenglamani to'liq hisoblab berdingiz. Sinovga o'tishimiz mumkinmi?");
      }
    }, 2000);
  };

  const virtualWorlds = [
    {
      title: "Organik Kimyo Laboratoriyasi",
      subject: "Kimyo & VR",
      desc: "Molekulalarni qo'lingiz bilan ushlang, kimyoviy elementlar atomlarining termal xususiyatlarini xavfsiz holda kashf eting.",
      image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=600&auto=format&fit=crop",
      glowColor: "shadow-emerald-500/20 border-emerald-500/30",
      accentText: "text-emerald-400",
      badge: "Real-Time Simulyatsiya",
      details: ["Atom bog'lanishlari", "Mol miqdori visualizeri", "Gaz bosimi simulyatori"]
    },
    {
      title: "Yadro Fizikasi va Termodinamika Laboratoriyasi",
      subject: "Ilg'or Fizika & Simulyatsiya",
      desc: "Subatom zarralarni to'qnashtiring, molekulyar bog'lanish va termodinamik molekulalar harakatini sekundi mitsrida sekinlashtirib ko'ring.",
      image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=600&auto=format&fit=crop",
      glowColor: "shadow-cyan-500/20 border-cyan-500/30",
      accentText: "text-cyan-400",
      badge: "Vision Pro Rejimi",
      details: ["Subatomik to'qnashuvlar", "Termal dinamika 3D", "Noaniqlik prinsipi"]
    },
    {
      title: "Anatomiya Golosferasi",
      subject: "Biologiya & VR",
      desc: "Inson asab tizimi va qon-tomirlarida mikro-avbatar bilan virtual harakatlanib, hujayralar regeneratsiyasini kuzating.",
      image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?q=80&w=600&auto=format&fit=crop",
      glowColor: "shadow-purple-500/20 border-purple-500/30",
      accentText: "text-purple-400",
      badge: "Kollaborativ Metaklass",
      details: ["Nerv impulslari 3D", "DNK zanjiri o'zgarishi", "Yurak chap qorincha oqimi"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#04060d] text-text-primary selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans relative">
      
      {/* Cinematic Ambient Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[700px] h-[700px] bg-cyan-900/10 rounded-full blur-[180px] animate-pulse" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-25" />
      </div>

      {/* FLOATING GLASS NAVIGATION BAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
        <div className="glass backdrop-blur-2xl px-6 md:px-10 py-4 rounded-[28px] border-white/5 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-primary via-indigo-600 to-accent p-2.5 rounded-2xl group-hover:rotate-12 transition-all duration-300 shadow-md shadow-primary/20">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-primary-dark to-accent">
              Lumetra
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/5 text-sm">
            <a href="#worlds" className="text-text-secondary hover:text-primary font-bold transition-colors">VR Laboratoriyalar</a>
            <a href="#aitutor" className="text-text-secondary hover:text-accent font-bold transition-colors">AI Mentor</a>
            <a href="#gamification" className="text-text-secondary hover:text-secondary font-bold transition-colors">Gamifikatsiya</a>
            <a href="#social" className="text-text-secondary hover:text-emerald-400 font-bold transition-colors">Live Multiplayer</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/kirish" className="text-xs font-extrabold uppercase text-text-secondary hover:text-text-primary transition-all tracking-wider">
              Kirish
            </Link>
            <Link 
              to="/ro'yxatdan-o'tish" 
              className="px-6 py-3 bg-gradient-to-r from-primary via-indigo-600 to-accent text-white rounded-2xl text-xs font-extrabold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(129,140,248,0.4)] transition-all duration-300"
            >
              Tajribani Boshlash
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION - Premium Cinematic Virtual Universe */}
      <section className="relative min-h-screen pt-36 pb-20 px-6 flex items-center justify-center z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center w-full">
          
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-primary/10 to-indigo-500/10 text-white rounded-full border border-primary/25 shadow-[0_4px_15px_rgba(99,102,241,0.15)] text-xs font-extrabold uppercase tracking-widest w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-indigo-300">Nex-Gen Ta'lim Inqilobi</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-black leading-[1.05] tracking-tight text-white mb-2 max-w-4xl">
              Ta'limni tomosha <br />
              qilmang. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-cyan-400">Ichida yashang!</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl font-medium">
              Netflix kinematikasi, Roblox o'yin qudrati va Duolingo o'yin tizimlarining ideal uyg'unligi — virtual reallikda 3D metaverse sayohatlari!
            </p>

            {/* Glowing CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link 
                to="/ro'yxatdan-o'tish" 
                className="px-8 py-5 bg-gradient-to-r from-primary via-indigo-600 to-indigo-700 text-white font-extrabold uppercase tracking-widest rounded-2xl text-xs hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] transition-all duration-300 text-center"
              >
                Tadqiqotni Boshlash
              </Link>
              <a 
                href="#worlds" 
                className="px-8 py-5 bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/10 text-text-primary font-extrabold uppercase tracking-widest rounded-2xl text-xs transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                VR Laboratoriyani Ko'rish <Atom className="w-4 h-4 text-cyan-400" />
              </a>
            </div>

            {/* Floating Live statistics */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-white/5 self-start w-full max-w-lg">
              <div>
                <p className="text-2xl md:text-3xl font-mono font-black text-white">{activeStudents.toLocaleString()}</p>
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> O'quvchi Onlayn
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-mono font-black text-cyan-400">92 XP</p>
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mt-1">O'rtacha minut</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-mono font-black text-accent">98.4%</p>
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mt-1">Sinf reytingi</p>
              </div>
            </div>
          </div>

          {/* 3D Immersive Frame Simulator with Cyberpunk lighting & Holographic details */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent rounded-[50px] blur-[30px] opacity-75 z-0" />
            
            <div className="relative z-10 glass rounded-[44px] p-4 border border-white/5 shadow-2xl relative">
              <div className="absolute top-8 right-8 z-20 bg-slate-950/80 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-accent animate-pulse" />
                <span className="text-[9px] text-text-secondary font-bold uppercase tracking-widest">VR LAB FAOL</span>
              </div>

              <div className="relative rounded-[36px] overflow-hidden aspect-[4/5] bg-slate-900 group">
                <img 
                  src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=600&auto=format&fit=crop" 
                  alt="Students wearing VR" 
                  className="object-cover w-full h-full scale-105 group-hover:scale-110 transition-transform duration-700 opacity-80 brightness-[0.85]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hologram Card Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-8">
                  <div className="space-y-3">
                    <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/20 rounded-full text-[9px] font-bold uppercase tracking-widest w-fit block">
                      Molekulyar Reaksiyalar Gologrammasi
                    </span>
                    <h3 className="text-2xl font-display font-black text-white tracking-wide">
                      Nanotexnologiya va Ilg'or Fizika Laboratoriyasi
                    </h3>
                    <p className="text-xs text-text-secondary font-medium leading-relaxed">
                      Atom zarrachalarining termojuftlik bog'lanishini o'quvchi o'z avatarida boshdan kechiradi. Har bir vazifa Duolingo streaks tizimi orqali himoyalanadi.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing floating hardware chip cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-8 -left-8 z-20 glass p-5 rounded-3xl shadow-2xl border border-white/10 flex items-center gap-4"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl text-white">
                <Cpu className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <p className="text-[9px] text-text-secondary font-bold uppercase tracking-widest">Sinf Sifati</p>
                <p className="text-sm font-black text-white">AI Real Time Render</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -right-6 z-20 glass p-5 rounded-3xl shadow-2xl border border-white/10 flex items-center gap-4"
            >
              <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] text-text-secondary font-bold uppercase tracking-widest">O'rganish tezligi</p>
                <p className="text-sm font-black text-white">3x marta tezroq</p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. INTERACTIVE 3D EXPERIENCE SECTION - Selectable Worlds */}
      <section id="worlds" className="py-28 px-6 z-10 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-[0.25em] block mb-2">Interaktiv 3D Simulyatsiyalar</span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-tight">
                Super-simulyator laboratoriyalarga <br />vizual tajribalarga boy sayohat qiling
              </h2>
            </div>
            <p className="text-sm text-text-secondary max-w-md font-medium leading-relaxed">
              Darsi zerikarli kitoblardan emas, 3D simulyatsiyalar va VR muhitda amaliy tajribada qabul qiling. Maxsus asboblar ixtiyoriy.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* World Cards List */}
            <div className="lg:col-span-4 space-y-4">
              {virtualWorlds.map((world, index) => (
                <button
                  key={index}
                  onClick={() => setActiveWorld(index)}
                  className={`w-full text-left p-6 rounded-[32px] border transition-all duration-300 relative overflow-hidden flex items-center gap-5 cursor-pointer ${
                    activeWorld === index 
                      ? "bg-slate-900 border-indigo-500/40 shadow-xl" 
                      : "bg-white/5 border-white/5 hover:border-white/10 text-text-secondary"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white ${
                    activeWorld === index ? "bg-indigo-600" : "bg-white/5"
                  }`}>
                    {index === 0 ? <Atom className="w-5 h-5" /> : index === 1 ? <Rocket className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </div>
                  <div>
                    <span className="text-[9px] text-text-secondary uppercase tracking-widest font-extrabold">{world.subject}</span>
                    <h4 className={`text-base font-bold transition-colors ${activeWorld === index ? "text-white" : "text-text-secondary"}`}>{world.title}</h4>
                  </div>
                </button>
              ))}
            </div>

            {/* Showcase Visual Viewport */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWorld}
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -15 }}
                  className={`glass rounded-[40px] p-8 border ${virtualWorlds[activeWorld].glowColor} relative overflow-hidden`}
                >
                  <div className="grid md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-7 space-y-6">
                      <span className="px-3.5 py-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-[10px] font-extrabold uppercase tracking-widest w-fit block">
                        {virtualWorlds[activeWorld].badge}
                      </span>
                      
                      <h3 className="text-3xl font-display font-black text-white leading-tight">
                        {virtualWorlds[activeWorld].title}
                      </h3>
                      
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {virtualWorlds[activeWorld].desc}
                      </p>

                      <div className="space-y-2.5">
                        <span className="text-[9px] text-text-secondary uppercase tracking-widest font-extrabold block">Fokus rejalari:</span>
                        <div className="flex flex-wrap gap-2.5">
                          {virtualWorlds[activeWorld].details.map((detail, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white/5 border border-white/5 text-text-secondary rounded-xl text-xs font-bold">
                              • {detail}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <button 
                          onClick={() => handleAiInteract(activeWorld === 0 ? "chemistry" : activeWorld === 1 ? "astronomy" : "math")}
                          className="px-6 py-3 bg-gradient-to-r from-primary to-indigo-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95 cursor-pointer"
                        >
                          Simulyatsiya darsini yuklash
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-12 lg:col-span-5 relative">
                      <div className="rounded-[36px] bg-slate-950/85 p-6 border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative overflow-hidden aspect-square flex flex-col justify-between group">
                        
                        {/* Simulation Grid Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none" />
                        
                        {/* Header Status Bar */}
                        <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-3">
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full animate-ping ${activeWorld === 0 ? "bg-emerald-400" : activeWorld === 1 ? "bg-cyan-400" : "bg-purple-400"}`} />
                            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black">
                              SIMULATOR v4.12
                            </span>
                          </div>
                          <span className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-indigo-300 font-extrabold">
                            SENSORS: ONLINE
                          </span>
                        </div>

                        {/* Interactive Viewports */}
                        <div className="relative z-10 flex-1 flex items-center justify-center py-6">
                          
                          {/* CASE 0: CHEMISTRY THERMAL MOLECULE BUILDER */}
                          {activeWorld === 0 && (
                            <div className="w-full h-full flex flex-col items-center justify-center space-y-4 relative">
                              <svg className="w-48 h-48" viewBox="0 0 200 200">
                                {/* Orbit lines */}
                                <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                                <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1.5" />
                                
                                {/* Central Nucleus */}
                                <circle cx="100" cy="100" r="16" fill="url(#chemCenterGrad)" className="animate-pulse" />
                                
                                {/* Orbital Electrons / Atoms */}
                                <motion.circle 
                                  cx="100" 
                                  cy="100" 
                                  r="8" 
                                  fill="#10B981" 
                                  animate={{
                                    cx: [100 + 45 * Math.cos(0), 100 + 45 * Math.cos(2*Math.PI)],
                                    cy: [100 + 45 * Math.sin(0), 100 + 45 * Math.sin(2*Math.PI)]
                                  }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: isReacting ? 1.5 : (3000 / chemTemp),
                                    ease: "linear"
                                  }}
                                />
                                
                                <motion.g
                                  animate={{ rotate: 360 }}
                                  transition={{ repeat: Infinity, duration: isReacting ? 4 : (9000 / chemTemp), ease: "linear" }}
                                  style={{ transformOrigin: "100px 100px" }}
                                >
                                  {/* Compound molecule branches */}
                                  <line x1="100" y1="100" x2="100" y2="30" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                                  <circle cx="100" cy="30" r="12" fill="#F472B6" />
                                  <circle cx="100" cy="30" r="6" fill="#FFFFFF" />

                                  <line x1="100" y1="100" x2="39" y2="135" stroke="#38BDF8" strokeWidth="2" />
                                  <circle cx="39" cy="135" r="10" fill="#38BDF8" />

                                  <line x1="100" y1="100" x2="161" y2="135" stroke="#FBBF24" strokeWidth="2" />
                                  <circle cx="161" cy="135" r="10" fill="#FBBF24" />
                                </motion.g>

                                <defs>
                                  <radialGradient id="chemCenterGrad">
                                    <stop offset="0%" stopColor="#34D399" />
                                    <stop offset="100%" stopColor="#059669" />
                                  </radialGradient>
                                </defs>
                              </svg>

                              {/* Live telemetry feedback overlay */}
                              <div className="absolute top-0 right-2 text-right">
                                <span className="text-[10px] font-mono text-emerald-400 block font-black">ENERGY LEVEL: +{(chemTemp * 0.45).toFixed(0)} EV</span>
                                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-black uppercase ${isReacting ? "bg-red-500/20 text-red-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                                  {isReacting ? "REAKSIYA AMALGA OSHMOQDA!" : "STABIL HOLAT"}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* CASE 1: PARTICLE COLLIDER ENERGETIC CHAMBER */}
                          {activeWorld === 1 && (
                            <div className="w-full h-full flex flex-col items-center justify-center space-y-4 relative">
                              <div className="w-56 h-36 border border-cyan-500/20 rounded-2xl relative flex items-center justify-between px-4 overflow-hidden bg-slate-950">
                                <div className="absolute inset-0 bg-cyan-950/5 pointer-events-none" />
                                
                                {/* Collider paths */}
                                <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cyan-500/10 via-transparent to-rose-400/10 pointer-events-none" />
                                
                                {/* Left Gun */}
                                <div className="w-4 h-6 bg-cyan-600/30 rounded border border-cyan-400 flex items-center justify-center text-[8px] font-mono font-bold text-cyan-300 z-10">L</div>
                                
                                {/* Right Gun */}
                                <div className="w-4 h-6 bg-rose-600/30 rounded border border-rose-400 flex items-center justify-center text-[8px] font-mono font-bold text-rose-300 z-10 font-bold">R</div>
                                
                                {/* Interactive Particles */}
                                <motion.div 
                                  animate={{ x: [0, 85, 0] }}
                                  transition={{ repeat: Infinity, duration: 2.2, ease: "anticipate" }}
                                  className="w-3.5 h-3.5 bg-cyan-400 rounded-full blur-[1.5px] absolute left-10 top-[calc(50%-7px)] z-20"
                                />

                                <motion.div 
                                  animate={{ x: [0, -85, 0] }}
                                  transition={{ repeat: Infinity, duration: 2.2, ease: "anticipate" }}
                                  className="w-3.5 h-3.5 bg-rose-400 rounded-full blur-[1.5px] absolute right-10 top-[calc(50%-7px)] z-20"
                                />

                                {/* Explosion shockwave visual */}
                                {particleSparks.length > 0 && (
                                  <motion.div 
                                    initial={{ scale: 0, opacity: 1 }}
                                    animate={{ scale: 1.8, opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute w-24 h-24 rounded-full border-2 border-indigo-400 bg-indigo-500/15 left-[calc(50%-48px)] top-[calc(50%-48px)] z-20 mix-blend-screen pointer-events-none"
                                  />
                                )}

                                {/* Animated sparks scattering */}
                                {particleSparks.map(spark => (
                                  <motion.div
                                    key={spark.id}
                                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                                    animate={{ x: spark.x, y: spark.y, scale: 0, opacity: 0 }}
                                    transition={{ duration: 1.1, ease: "easeOut" }}
                                    className="absolute w-2 h-2 rounded-full left-[calc(50%-4px)] top-[calc(50%-4px)] z-30 shadow-lg shadow-white"
                                    style={{ backgroundColor: spark.color }}
                                  />
                                ))}

                                <div className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-zinc-500 uppercase font-black tracking-widest text-center">
                                  Kollayziya Havzasi
                                </div>
                              </div>

                              <div className="absolute top-0 right-2 text-right">
                                <span className="text-[10px] font-mono text-cyan-400 block font-black">KOLLIZIYA SONI: {atomCollisions}</span>
                                <span className="text-[9px] font-mono text-rose-400 block font-black">MATERIYA: SUPERFLUID</span>
                              </div>
                            </div>
                          )}

                          {/* CASE 2: BIOLOGY GLOWING BRAIN SYNAPSE NETWORK */}
                          {activeWorld === 2 && (
                            <div className="w-full h-full flex flex-col items-center justify-center space-y-4 relative">
                              <div className="relative w-48 h-48 bg-slate-900/40 rounded-full border border-purple-500/10 flex items-center justify-center">
                                {/* Synthetic circular brain orbit connections */}
                                <div className="absolute inset-4 border border-dashed border-purple-500/15 rounded-full animate-spin-slow" />
                                
                                {/* Synapse node dots */}
                                {[
                                  { name: "CORTEX D-1", cx: 40, cy: 60, col: "from-purple-500 to-indigo-600" },
                                  { name: "AKSON S-2", cx: 154, cy: 54, col: "from-pink-500 to-rose-600" },
                                  { name: "NEURON B-9", cx: 96, cy: 150, col: "from-purple-400 to-pink-500" },
                                  { name: "SINAPS K-3", cx: 96, cy: 84, col: "from-indigo-400 to-cyan-500" }
                                ].map((node, i) => (
                                  <button
                                    key={i}
                                    onClick={() => triggerNeuronSpike(i)}
                                    className="absolute p-0.5 rounded-xl bg-slate-950 border border-white/10 hover:border-purple-400 transition-all cursor-pointer group/node"
                                    style={{ left: `${node.cx - 16}px`, top: `${node.cy - 16}px` }}
                                  >
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${node.col} flex items-center justify-center text-white font-black text-[9px] relative shadow-lg`}>
                                      {neuronActiveIndex === i ? (
                                        <Sparkles className="w-4 h-4 text-white animate-spin" />
                                      ) : (
                                        `S${i+1}`
                                      )}
                                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 scale-0 group-hover/node:scale-100 transition-all text-[8px] bg-slate-950 border border-white/10 px-1 rounded text-pink-300 font-mono tracking-widest uppercase font-bold whitespace-nowrap z-50">
                                        {node.name}
                                      </span>
                                    </div>
                                  </button>
                                ))}

                                {/* Wave impulse trails */}
                                {neuralSpikes.map(spike => (
                                  <motion.div
                                    key={spike.id}
                                    initial={{ x: 0, y: 0, opacity: 1, scale: 1.5 }}
                                    animate={{ x: spike.x, y: spike.y, opacity: 0, scale: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="absolute w-2 h-2 rounded-full bg-pink-400 blur-[0.5px] z-20 pointer-events-none"
                                    style={{ left: "96px", top: "96px" }}
                                  />
                                ))}
                              </div>

                              <div className="absolute top-0 right-2 text-right">
                                <span className="text-[10px] font-mono text-purple-400 block font-black">STIMULATOR: ACTIVE</span>
                                <span className="text-[9px] font-mono text-pink-400 block font-black">SYNAPSE RATE: 94 Hz</span>
                              </div>
                            </div>
                          )}

                        </div>

                        {/* Interactive Footer Controls Dashboard */}
                        <div className="relative z-10 border-t border-white/5 pt-3 flex items-center justify-between">
                          <div className="text-left font-mono text-[10px]">
                            {activeWorld === 0 && (
                              <p className="text-slate-400 uppercase font-black uppercase">
                                Harorat: <span className="text-emerald-400 font-bold">{chemTemp} K</span>
                              </p>
                            )}
                            {activeWorld === 1 && (
                              <p className="text-slate-400 uppercase font-black uppercase">
                                Massa: <span className="text-cyan-400 font-bold">1.008 AMU</span>
                              </p>
                            )}
                            {activeWorld === 2 && (
                              <p className="text-slate-400 uppercase font-black uppercase">
                                Rezyum: <span className="text-purple-400 font-bold">98% FAOL</span>
                              </p>
                            )}
                          </div>

                          <div className="flex gap-2">
                            {activeWorld === 0 && (
                              <button
                                onClick={increaseChemTemp}
                                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95"
                              >
                                {isReacting ? "KO'TARILMOQDA..." : "Haroratni ko'tarish"}
                              </button>
                            )}
                            {activeWorld === 1 && (
                              <button
                                onClick={collisionTrigger}
                                className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-95 animate-pulse"
                              >
                                Kolliziya berish
                              </button>
                            )}
                            {activeWorld === 2 && (
                              <button
                                onClick={() => triggerNeuronSpike(3)}
                                className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-purple-500/20 active:scale-95"
                              >
                                Neyronni Qo'zg'atish
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AI TUTOR SECTION - Futuristic AI Classroom Assistant */}
      <section id="aitutor" className="py-28 px-6 bg-slate-950/40 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Audio holographic waveform visualizer */}
          <div className="lg:col-span-5 relative order-last lg:order-first">
            <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10 glass rounded-[44px] p-8 border border-white/10 text-center space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              
              {/* Hologram Avatar */}
              <div className="relative w-36 h-36 mx-auto">
                <div className="absolute inset-0 bg-purple-500/30 rounded-full animate-ping opacity-30" />
                <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-purple-600 space-x-1 to-pink-500 flex items-center justify-center text-white border-2 border-purple-400 overflow-hidden relative">
                  <div className="absolute bottom-0 w-full text-[8.5px] font-bold uppercase tracking-widest bg-slate-950/80 py-1 text-purple-300">
                    AI Mentor Live
                  </div>
                  <Sparkles className="w-14 h-14 animate-pulse text-pink-200" />
                </div>
              </div>

              {/* Dynamic Interactive dialog bubble */}
              <div className="bg-slate-900 border border-purple-500/20 p-5 rounded-3xl text-left shadow-inner relative">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rotate-45 border-l border-t border-purple-500/20" />
                <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 bg-purple-500 rounded-full animate-ping"></span> MENTOR OVOZI:
                </p>
                <p className="text-xs text-text-primary leading-relaxed font-semibold">
                  "{aiMessage}"
                </p>
              </div>

              {/* Animated audio voice waves */}
              <div className="flex justify-center items-center gap-1.5 h-10 w-full bg-white/5 rounded-2xl px-6">
                {[12, 28, 40, 24, 38, 16, 32, 45, 20, 36, 12].map((height, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ 
                      height: aiSpeechState === "speaking" 
                        ? [height * 0.4, height, height * 0.4] 
                        : aiSpeechState === "listening" 
                          ? [height * 0.9, height * 0.2, height * 0.9]
                          : 4 
                    }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: idx * 0.08 }}
                    className="w-1 rounded-full bg-gradient-to-t from-purple-500 to-pink-500"
                  />
                ))}
              </div>

              {/* Interaction triggers */}
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => handleAiInteract("chemistry")}
                  className="px-2 py-3 bg-white/5 border border-white/5 hover:border-purple-500/30 rounded-2xl text-[10px] font-bold text-text-secondary hover:text-white uppercase tracking-widest transition-all cursor-pointer"
                >
                  Kimyo Lab
                </button>
                <button 
                  onClick={() => handleAiInteract("astronomy")}
                  className="px-2 py-3 bg-white/5 border border-white/5 hover:border-pink-500/30 rounded-2xl text-[10px] font-bold text-text-secondary hover:text-white uppercase tracking-widest transition-all cursor-pointer"
                >
                  Gravitatsiya
                </button>
                <button 
                  onClick={() => handleAiInteract("math")}
                  className="px-2 py-3 bg-white/5 border border-white/5 hover:border-indigo-500/30 rounded-2xl text-[10px] font-bold text-text-secondary hover:text-white uppercase tracking-widest transition-all cursor-pointer"
                >
                  Matematika
                </button>
              </div>

            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <span className="text-[10px] text-purple-400 font-extrabold uppercase tracking-[0.25em] block">Sizning Shaxsiy Sun'iy Intellektingiz</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-tight">
              Aqlli AI dars ustozi har qadamda yordamlashadi
            </h2>
            <p className="text-base text-text-secondary leading-relaxed font-semibold">
              Aqlli AI o'quvchining stress va diqqat darajasini emotsional aniqlash tizimi orqali nazorat qiladi. U zerikarli yoki murakkab mavzularni avtomatik o'yinlashtirish (gamification) ssenariylariga aylantiradi.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5 bg-white/5 rounded-3xl border border-white/5 flex gap-4">
                <div className="bg-purple-500/10 p-3 rounded-2xl text-purple-400 h-11 w-11 flex items-center justify-center shrink-0">
                  <Volume2 className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Ovozli Haqiqiy Muloqot</h4>
                  <p className="text-xs text-text-secondary">Yozish shart emas! Ovoz bilan gapiring, u javob qaytaradi va yo'ldosh bo'ladi.</p>
                </div>
              </div>

              <div className="p-5 bg-white/5 rounded-3xl border border-white/5 flex gap-4">
                <div className="bg-pink-500/10 p-3 rounded-2xl text-pink-400 h-11 w-11 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Interaktiv Quizz Generator</h4>
                  <p className="text-xs text-text-secondary">Siz o'rgangan mavzudan testlar va unutilmas mukofotlarni reallashitradi.</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link 
                to="/ro'yxatdan-o'tish" 
                className="inline-flex items-center gap-2 px-8 py-4.5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl font-extrabold text-xs uppercase tracking-widest text-white shadow-lg shadow-purple-500/20"
              >
                AI Mentor bilan suhbatlashish <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. GAMIFICATION SECTION - Duolingo-style XP skill tree */}
      <section id="gamification" className="py-28 px-6 z-10 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-[0.25em] block mb-2">Asrab Olingan Bilim Tizimi</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-tight">
              Duolingo kabi qiziqarli <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Streak va XP</span> reytinglari
            </h2>
            <p className="text-sm text-text-secondary mt-4">
              Har kuni vazifalarni o'z vaqtida yakunlang, yetakchilik reytingining yuqori pog'onalarini egallang va real sovg'alarni yutib oling.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* XP progress bars and achievement card */}
            <div className="lg:col-span-7 space-y-6">
              <div className="glass rounded-[40px] p-8 border border-cyan-500/25 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[50px]" />
                
                <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-cyan-500/10 p-3 rounded-2xl text-cyan-400">
                      <Flame className="w-5 h-5 fill-cyan-400 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white">{streakDays} Kunlik Streak!</h4>
                      <p className="text-xs text-text-secondary">Bugungi darslarni yakunlash rejasidaman</p>
                    </div>
                  </div>
                  <span className="px-3.5 py-1 bg-cyan-500/15 text-cyan-400 rounded-full text-xs font-black uppercase tracking-wider">
                    Oltin Liga
                  </span>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-text-secondary uppercase tracking-widest">
                      <span>Laboratoriya tajribasi (XP)</span>
                      <span className="text-cyan-400 font-bold">{xpPoints} / 2500 XP</span>
                    </div>
                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: "30%" }}
                        animate={{ width: `${(xpPoints / 2500) * 100}%` }}
                        className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-primary rounded-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                      <p className="text-xs text-slate-400 uppercase font-black tracking-widest">Kurs yakunlanishi</p>
                      <p className="text-2xl font-mono font-black text-white mt-1">12/16</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                      <p className="text-xs text-slate-400 uppercase font-black tracking-widest">Haftalik maqsad</p>
                      <p className="text-2xl font-mono font-black text-white mt-1">75%</p>
                    </div>
                  </div>

                  {unlockedAchievements.includes("Lab-Researcher") ? (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-4.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Trophy className="w-5 h-5 fill-emerald-500/20 mr-1" />
                        <span className="text-xs font-bold text-white">Yangi achievement ochildi: <strong>Lab-Researcher!</strong></span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/20 px-2 py-0.5 rounded-md">Yutuq faol</span>
                    </motion.div>
                  ) : (
                    <div className="flex justify-between items-center bg-white/5 border border-white/5 p-4 rounded-3xl">
                      <span className="text-xs text-text-secondary font-bold">Maxsus bonus laboratoriya tajribalarini faollashtiring</span>
                      <button 
                        onClick={claimBonusXP}
                        className="px-5 py-2.5 bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 text-slate-950 font-extrabold text-[10.5px] uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                      >
                        +150 XP Olish
                      </button>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Gamification visual showcases: Skill tree and milestones */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-slate-900 border border-white/5 rounded-[36px] flex gap-5 items-center">
                <div className="bg-amber-500/10 text-amber-500 p-4 rounded-[20px] shrink-0 border border-amber-500/10">
                  <Star className="w-6 h-6 fill-amber-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Klublararo Haftalik Musobaqalar</h4>
                  <p className="text-xs text-text-secondary mt-1">Har yakshanba o'quvchilar live-musobaqada eng yaxshi ilmiy ixtirochi kubogi uchun kvestlarni bajarishadi.</p>
                </div>
              </div>

              <div className="p-6 bg-slate-900 border border-white/5 rounded-[36px] flex gap-5 items-center">
                <div className="bg-cyan-500/10 text-cyan-400 p-4 rounded-[20px] shrink-0 border border-cyan-500/10">
                  <Flame className="w-6 h-6 fill-cyan-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Super Streaks Xavfsizligi</h4>
                  <p className="text-xs text-text-secondary mt-1">Agar kvest darslarni kelishilgan vaqtda yakunlamasangiz, AI mentor sizni maxsus simulyatsiya bilan saqlaydi.</p>
                </div>
              </div>

              <div className="p-6 bg-slate-900 border border-white/5 rounded-[36px] flex gap-5 items-center">
                <div className="bg-rose-500/10 text-rose-400 p-4 rounded-[20px] shrink-0 border border-rose-500/10">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Metamarket Sovg'alari</h4>
                  <p className="text-xs text-text-secondary mt-1">To'plangan XP ballarni real dunyo mukofotlariga (VR darslik, quloqchin, kitoblar) almashtiring.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. METAVERSE CAMPUS SECTION - Future Spatial Playground */}
      <section className="py-28 px-6 bg-[#060913] relative overflow-hidden border-t border-white/5 z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-950/40 via-transparent to-transparent opacity-60" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] text-accent font-extrabold uppercase tracking-[0.25em] block">Sarguzashtli Universitet</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white">
              Roblox uslubidagi Metaverse virtual laboratoriya hududi
            </h2>
            <p className="text-sm text-text-secondary max-w-2xl mx-auto bg-slate-950/20 p-2 rounded-2xl">
              Virtual ilmiy laboratoriyaning dars zaliga avatar orqali o'ting, tushuntirishlarni zamonaviy o'quv zonalari va spatial dars zallarida tajriba qiling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Interaktiv Kodlash Arenasi",
                desc: "Siz yozgan kod real-world 3D robotning harakatlarini visual boshqaradi.",
                icon: Cpu,
                cover: "https://images.unsplash.com/photo-1627399270231-7d36245355a9?q=80&w=400&auto=format&fit=crop"
              },
              {
                title: "Golografik Fizika Kutubxonasi",
                desc: "Fizika qonunlari golografik tushuntirishlar va o'yin ko'rinishida taqdim etiladi.",
                icon: Globe,
                cover: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=400&auto=format&fit=crop"
              },
              {
                title: "Biologik Laboratoriya maydoni",
                desc: "Inson tanasida sayohat, mitti hujayralar mikroskop ostida ulkan o'lchamga keladi.",
                icon: Layers,
                cover: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=400&auto=format&fit=crop"
              }
            ].map((campus, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="glass rounded-[40px] overflow-hidden border border-white/5 shadow-2xl relative group"
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={campus.cover} 
                    alt={campus.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115 opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                  <div className="absolute top-6 left-6 bg-slate-950/80 p-3.5 border border-white/10 rounded-2xl text-accent">
                    <campus.icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-8 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                    {campus.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {campus.desc}
                  </p>
                  
                  <div className="pt-4 flex items-center justify-between text-xs font-bold text-accent">
                    <span>Virtual Hududga o'tish</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CREATOR MARKETPLACE SECTION - Modern Creator Hub */}
      <section className="py-28 px-6 z-10 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-[0.25em] block mb-2">Ustozlar va Loyihalar Bozorlari</span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white">
                VR darslar ijodkorlar bozori
              </h2>
            </div>
            
            <div className="flex gap-2.5 bg-white/5 p-1.5 rounded-2xl border border-white/5">
              {["all", "premium", "top-rated"].map(filt => (
                <button
                  key={filt}
                  onClick={() => setActiveCreatorFilter(filt)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeCreatorFilter === filt ? "bg-primary text-white" : "text-text-secondary hover:text-white"
                  }`}
                >
                  {filt === "all" ? "Barchasi" : filt === "premium" ? "Premium" : "Eng mashhurlar"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Golografik Fizika dars to'plami",
                creator: "Farrux R. (Ph.D Fizika)",
                price: "$19",
                rating: "4.9",
                sales: "1,200",
                badge: "Premium",
                tag: "premium",
                img: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=400&auto=format&fit=crop"
              },
              {
                title: "Kimyoviy Elementlar 3D Laboratoriya to'plami",
                creator: "Zilola S. (VR Tajriba Lab Rahbari)",
                price: "Bepul",
                rating: "5.0",
                sales: "3,100",
                badge: "Top-Rated",
                tag: "top-rated",
                img: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?q=80&w=400&auto=format&fit=crop"
              },
              {
                title: "3D Geometrik Fazoviy darslar laboratoriyasi",
                creator: "Akmal Sh. (AI Arxitext)",
                price: "$9",
                rating: "4.8",
                sales: "850",
                badge: "Featured",
                tag: "all",
                img: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop"
              }
            ].filter(item => activeCreatorFilter === "all" || item.tag === activeCreatorFilter || activeCreatorFilter === "all").map((course, idx) => (
              <motion.div
                key={idx}
                layout
                className="glass rounded-[36px] overflow-hidden border border-white/5 relative group hover:shadow-[0_20px_45px_rgba(99,102,241,0.15)] transition-all duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={course.img} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-slate-950/80 border border-white/10 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase text-cyan-400 tracking-wider">
                    {course.badge}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-xs text-text-secondary font-bold uppercase tracking-widest">{course.creator}</h4>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors leading-snug">
                      {course.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span className="text-xs font-bold text-white">{course.rating}</span>
                      <span className="text-[10px] text-text-secondary">({course.sales}+ o'quvchi)</span>
                    </div>
                    <span className="text-sm font-black text-white">{course.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. REAL-TIME SOCIAL LEARNING - Team Quest Simulators */}
      <section id="social" className="py-28 px-6 bg-slate-950/40 relative border-t border-white/5 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-[0.25em] block">Hamkorlikdagi Koshona</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-tight">
              Sinfdoshlar bilan multiplayer live jamoaviy dars kvestlari
            </h2>
            <p className="text-base text-text-secondary leading-relaxed font-semibold">
              Kollaborativ guruh vazifalari orqali jamoa bo'lib ishlang. Zoom darslaridan farqli ravishda, bu yerda darslar interaktiv virtual stol ustidagi 3D modellar ko'rinishida taqdim etiladi.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-5 rounded-3xl">
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs text-text-secondary font-semibold">
                  Sizning sinfingizda hozirda <strong>4 ta fan laboratoriyasi kvesti</strong> faol.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLiveClassroomMic(prev => !prev)}
                  className={`px-6 py-3.5 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    liveClassroomMic ? "bg-emerald-600 text-white" : "bg-white/5 border-white/5 text-text-secondary hover:bg-white/10"
                  }`}
                >
                  {liveClassroomMic ? "Mikrofon Yoqiq (Live)" : "Ovozli Xonaga ulanish"}
                </button>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(v => (
                    <img
                      key={v}
                      src={`https://picsum.photos/seed/stud${v}/100/100`}
                      alt="Student"
                      className="w-10 h-10 rounded-full border border-slate-900 shadow-md"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white border border-slate-900 shadow-md">
                    +12
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[80px]" />
            <div className="relative z-10 glass rounded-[44px] p-6 border border-emerald-500/20 shadow-2xl relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-sm font-bold text-white">Live Multiplayer Arena</h4>
                  <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest mt-0.5">Musobaqa darsi</p>
                </div>
                <div className="px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Faol o'yin
                </div>
              </div>

              {/* Chat bubble simulator */}
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex gap-3.5 items-start">
                  <img src="https://picsum.photos/seed/user55/100/100" alt="avatar" className="w-9 h-9 rounded-xl border border-white/10 shrink-0" referrerPolicy="no-referrer" />
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Madina O. <span className="text-[9px] text-cyan-400 normal-case ml-2">Darajasi: 4</span></h5>
                    <p className="text-xs text-text-secondary mt-1">Kimyo elementlarini menda yig'ilgan formulasini tasdiqlashingiz kerak!</p>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex gap-3.5 items-start">
                  <img src="https://picsum.photos/seed/user74/100/100" alt="avatar" className="w-9 h-9 rounded-xl border border-white/10 shrink-0" referrerPolicy="no-referrer" />
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Jasur B. <span className="text-[9px] text-cyan-400 normal-case ml-2">Darajasi: 6</span></h5>
                    <p className="text-xs text-text-secondary mt-1">Men tasdiqladim, guruh sifatida birgalikda +200 XP bonusiga ega bo'lamiz!</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-2xl text-center">
                🔥 Hamkorlik balansi: Yoshlar birgalikda 1,450 XP balini yig'ishdi!
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 8. FUTURE OF EDUCATION SECTION - Cinematic / Emotional Messages */}
      <section className="relative py-36 px-6 overflow-hidden z-10 text-center flex flex-col justify-center items-center bg-gradient-to-b from-transparent to-[#04060d]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-transparent to-transparent opacity-80" />
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className="text-xs text-accent font-extrabold uppercase tracking-[0.3em] block">Ilg'or Ilmiy Kashfiyotlar Epoxasi</span>
          
          <h2 className="text-4xl md:text-7xl font-display font-black text-white leading-[1.1] tracking-tight">
            “Kashfiyot qilish hamisha sarguzasht bo'lishi lozim”
          </h2>
          
          <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto">
            Hamma narsa interaktiv! Biz asrlar davomida o'zgarmagan zerikarli o'qitish standartlarini to'xtatib, o'quvchilarda ichki qiziquvchanlikni uyg'otamiz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center">
              <h4 className="text-lg font-black text-white">VR Laboratoriya turi</h4>
              <p className="text-xs text-text-secondary mt-2">Darsni 3D simulyatsiyalar ichida to'liq his eting.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center">
              <h4 className="text-lg font-black text-white">Sinflararo musobaqa</h4>
              <p className="text-xs text-text-secondary mt-2">Duolingo tajriba o'sishida har kunlik faollik oling.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center">
              <h4 className="text-lg font-black text-white">AI Mentor Hamrohligi</h4>
              <p className="text-xs text-text-secondary mt-2">Butun dunyo bo'ylab eng yangi tushunchalar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS - Glowing feedback & Metrics */}
      <section className="py-24 px-6 z-10 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] text-accent font-extrabold uppercase tracking-[0.25em] block">Muvaffaqiyatli Yoshlarimiz</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white">
              O'quvchilar va Ota-onalar fikrlari
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "O'g'lim Fizika va Kimyo darslarini bizning o'quv dasturimizdan ko'ra ko'proq bu yerda VR simulyatsiyalar bilan kechalari kashf etadigan bo'ldi. Streak tizimi ajoyib o'yin!",
                user: "Shahnoza K. (Ona)",
                loc: "Toshkent",
                metric: "Tajriba o'sishi: +140%"
              },
              {
                text: "Men darslarni boshidan Roblox o'yini o'ynayotgandek his qilaman. Aqlli AI ustozim menga o'g'il bolalarga xos darslarni o'rgatdi. XP uchun hamma narsaga tayyorman!",
                user: "Diyorbek A. (10-sinf o'quvchisi)",
                loc: "Andijon",
                metric: "Bajarilgan darslar: 48 ta"
              },
              {
                text: "Ilm.Hub tufayli chekka tumanda o'tirib fizika va kimyo laboratoriyalarini to'liq tajribadan o'tkazib tushunib oldim. Maktabda deyarli barcha ishlarni birinchilardan bajaryapman.",
                user: "Madina O. (11-sinf o'quvchisi)",
                loc: "Samarqand",
                metric: "O'rtacha baho: 98/100"
              }
            ].map((testi, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="glass rounded-[36px] p-8 border border-white/5 relative flex flex-col justify-between"
              >
                <p className="text-xs text-text-primary leading-relaxed font-medium italic">
                  "{testi.text}"
                </p>

                <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{testi.user}</h4>
                    <p className="text-[10px] text-text-secondary">{testi.loc}</p>
                  </div>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 rounded-lg text-[10px] font-bold">
                    {testi.metric}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION - Immersive Education City Callout */}
      <section className="relative py-32 px-6 z-10 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent opacity-80" />
        
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <div className="inline-flex items-center justify-center p-3.5 bg-gradient-to-br from-primary to-accent rounded-3xl text-white shadow-xl shadow-primary/20 animate-bounce">
            <Sparkles className="w-7 h-7" />
          </div>
          
          <h2 className="text-5xl md:text-8xl font-display font-black text-white leading-none tracking-tight">
            Kelajak ilmiy <br />
            laboratoriyasiga kiring!
          </h2>
          
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mx-auto font-semibold">
            Eng kuchli va qiziqarli ta'lim simulyatsiyasi sizni kutmoqda. Hech qanday murakkab shartlarsiz hoziroq bepul tajribalarni boshlang.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              to="/ro'yxatdan-o'tish" 
              className="px-10 py-5.5 bg-gradient-to-r from-primary via-indigo-600 to-indigo-700 text-white font-extrabold uppercase tracking-widest rounded-3xl text-xs hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] transition-all duration-300 transform hover:-translate-y-1"
            >
              Uyg'unlashuvni Boshlash
            </Link>
            <Link 
              to="/kirish" 
              className="px-10 py-5.5 bg-white/5 border border-white/5 hover:bg-white/10 text-white font-extrabold uppercase tracking-widest rounded-3xl text-xs transition-all duration-300"
            >
              Demo kabinet
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 relative z-10 border-t border-white/5 bg-[#03050a]/90 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-left">
          <div className="col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-indigo-600 p-2 rounded-xl shadow-lg shadow-primary/25">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="font-display font-black text-2xl tracking-wider text-text-primary">Lumetra</span>
            </Link>
            <p className="text-text-secondary max-w-sm leading-relaxed text-sm font-medium">
              Netflix qiziqarliligi, Roblox mustaqil simulyatsiyalari, Duolingo streak tizimlari va Sun'iy intellekt mentorining yagona ta'lim laboratoriyasi.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-text-primary mb-6 text-sm uppercase tracking-widest">Laboratoriya Bo'limlari</h4>
            <ul className="space-y-4 text-xs font-semibold text-text-secondary">
              <li><a href="#worlds" className="hover:text-primary transition-colors">VR Laboratoriyalar</a></li>
              <li><a href="#aitutor" className="hover:text-amber-400 transition-colors">AI Mentor darslari</a></li>
              <li><a href="#gamification" className="hover:text-cyan-400 transition-colors">Yutuq va Streaks</a></li>
              <li><Link to="/kabinet" className="hover:text-accent transition-colors">Shaxsiy kabinet</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-6 text-sm uppercase tracking-widest">Yordam & Ko'mak</h4>
            <ul className="space-y-4 text-xs font-semibold text-text-secondary">
              <li><a href="#" className="hover:text-primary transition-colors">Aloqa va Qo'llab quvvatlash</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Maxfiylik va Xavfsizlik</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Siyosati</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-text-secondary font-semibold">© 2026 Lumetra. Kelajak ta'lim makoni. Barcha huquqlar kafolatlangan.</p>
          <div className="flex gap-6">
            <span className="text-[10px] text-text-secondary/60">Tizim holati: 100% onlayn</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
