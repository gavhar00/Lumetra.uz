import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  FlaskConical, 
  Trophy, 
  Clock, 
  ChevronRight, 
  TrendingUp, 
  Star, 
  Play, 
  Calendar, 
  Target,
  Upload,
  FileText,
  CheckCircle,
  MessageSquare,
  Download,
  Send,
  AlertCircle,
  Sparkles,
  ClipboardList,
  Check
} from "lucide-react";
import { Link } from "react-router-dom";
import FocusLounge from "../components/FocusLounge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Tab control: 'lessons' | 'assignments'
  const [activeMainTab, setActiveMainTab] = useState<"lessons" | "assignments">("lessons");

  // Load and initialize assignments from localStorage
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("ilmAssignments");
    if (saved) return JSON.parse(saved);
    const defaults = [
      {
        id: "task-1",
        title: "Kimyoviy Elementlar 3D Laboratoriya Tajribasi",
        subject: "Kimyo",
        desc: "3D virtual laboratoriyaga kiring, kimyoviy elementlarning o'zaro reaktsiyalarini hosil qiling va hisobot tayyorlang. Reaktsiyadagi harorat qiymatlari va ajralib chiqqan energiyani PDF formatida ilova qiling.",
        dueDate: "2026-06-12",
        fileUrl: "3D_Kimyo_Tajriba_Yoriqnomasi.pdf",
        teacherName: "Zilola S. (VR Tajriba Lab Rahbari)"
      },
      {
        id: "task-2",
        title: "Yadro Fizikasi Kolliziya Koeffitsiyentlari",
        subject: "Fizika",
        desc: "Yadro kollayderida zarralar to'qnashuvi natijasida hosil bo'lgan energiya darajalarini hisoblang. To'qnashish natijalari kvestidagi formulasini tahlil qiling va Excel yoki PDF-da yuboring.",
        dueDate: "2026-06-18",
        fileUrl: "Kolliziya_Hisoblash_Mavzulari.pdf",
        teacherName: "Akmal Sh. (Ilg'or Fizika Ustasi)"
      },
      {
        id: "task-3",
        title: "Golografik Optika tajriba tahlili",
        subject: "Fizika",
        desc: "Optik linzalar va yorug'lik sinishi burchaklarini o'rganish bo'yicha mustaqil laboratoriya hisoboti tayyorlang. Chizmalarni rasm yoki pdf shaklida biriktiring.",
        dueDate: "2026-06-20",
        fileUrl: "Optika_Tajriba_Asoslari.pdf",
        teacherName: "Hamdam M. (Katta Ma'ruzachi)"
      }
    ];
    localStorage.setItem("ilmAssignments", JSON.stringify(defaults));
    return defaults;
  });

  // Load submissions
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem("ilmSubmissions");
    if (saved) return JSON.parse(saved);
    const defaults = [
      {
        id: "sub-1",
        taskId: "task-1",
        studentName: user.name || "Diyorbek A.",
        studentEmail: "gsayfillayeva@gmail.com",
        comment: "Kimyoviy elementlar bilan tajribani to'liq bajardim. Suv molekulalarining bog'lanishida harorat ko'tarilishini simulyatsiya qilib ko'rsatdim.",
        fileName: "diyorbek_kimyo_reaksiya_hisoboti.pdf",
        submittedAt: "2026-06-07 10:15",
        status: "Baho berilgan",
        grade: "5 (A+)",
        feedback: "Ajoyib o'zlashtirish, Diyorbek! Harorat o'zgarishini judayam aniq grafiklar bilan ifodalab bergansan. Ofarin!"
      }
    ];
    localStorage.setItem("ilmSubmissions", JSON.stringify(defaults));
    return defaults;
  });

  // Listen for changes from Admin View
  useEffect(() => {
    const handleStorageChange = () => {
      const savedTasks = localStorage.getItem("ilmAssignments");
      if (savedTasks) setAssignments(JSON.parse(savedTasks));
      
      const savedSubs = localStorage.getItem("ilmSubmissions");
      if (savedSubs) setSubmissions(JSON.parse(savedSubs));

      const savedXp = localStorage.getItem("userXp");
      if (savedXp) setUserXp(parseInt(savedXp, 10));
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Submission form states
  const [submittingTaskId, setSubmittingTaskId] = useState<string | null>(null);
  const [submitComment, setSubmitComment] = useState("");
  const [submitFileName, setSubmitFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Stats
  const [userXp, setUserXp] = useState(() => {
    return parseInt(localStorage.getItem("userXp") || "1250", 10);
  });

  // Function to handle simulated file upload
  const startSimulatedUpload = (name: string) => {
    if (!name) return;
    setSubmitFileName(name);
    setIsUploading(true);
    setUploadProgress(10);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  // Submit Homework function
  const handleHomeworkSubmit = (e: React.FormEvent, taskId: string) => {
    e.preventDefault();
    if (!submitFileName) {
      alert("Iltimos, avval uy vazifasi faylini biriktiring/yuklang!");
      return;
    }

    const newSubmission = {
      id: "sub-" + Date.now(),
      taskId: taskId,
      studentName: user.name || "Diyorbek A.",
      studentEmail: "gsayfillayeva@gmail.com",
      comment: submitComment,
      fileName: submitFileName,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "Kutilmoqda",
      grade: "",
      feedback: ""
    };

    const updatedSubmissions = [newSubmission, ...submissions];
    setSubmissions(updatedSubmissions);
    localStorage.setItem("ilmSubmissions", JSON.stringify(updatedSubmissions));

    // Award XP
    const newXp = userXp + 150;
    setUserXp(newXp);
    localStorage.setItem("userXp", newXp.toString());

    // Reset Form
    setSubmittingTaskId(null);
    setSubmitComment("");
    setSubmitFileName("");
    setUploadProgress(0);

    alert(`Muvaffaqiyatli topshirildi! Uyga vazifa ustozga yuborildi. Sizga +150 XP berildi!`);
  };

  // Simulated download
  const downloadResource = (fileName: string) => {
    alert(`"${fileName}" nomli dars materiali yuklab olinmoqda... (Simulyatsiya qilingan fayl yuklanishi)`);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-200/40">
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Tizim yoniq • Faol darslar</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-text-primary tracking-tight">
            Salom, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{user.name || "O'quvchi"}</span>! 👋
          </h1>
          <p className="text-text-secondary mt-2 font-medium">Bugun yangi bilimlar va marralarni zabt etish vaqti keldi.</p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-6 glass p-4 rounded-[32px] shadow-[0_12px_36px_rgba(0,0,0,0.03)] border-white/80"
        >
          <div className="flex items-center gap-3 pr-6 border-r border-slate-200/60">
            <div className="bg-amber-500/10 p-3 rounded-2xl text-amber-500">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Ballar</p>
              <p className="text-xl font-extrabold text-text-primary">{userXp}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-2xl text-primary">
              <Star className="w-5 h-5 fill-primary" />
            </div>
            <div>
              <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Daraja</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_2px_10px_rgba(245,158,11,0.1)]">
                Oltin Liga
              </span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "O'qilgan kitoblar", value: "12 ta", icon: BookOpen, color: "text-primary", bg: "bg-primary/10", glow: "shadow-primary/10", progress: 75 },
          { label: "Bajarilgan tajribalar", value: "8 ta", icon: FlaskConical, color: "text-secondary", bg: "bg-secondary/10", glow: "shadow-secondary/10", progress: 40 },
          { label: "O'rtacha o'zlashtirish", value: "92%", icon: TrendingUp, color: "text-accent", bg: "bg-accent/10", glow: "shadow-accent/10", progress: 92 },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="glass p-8 rounded-[40px] card-hover relative overflow-hidden group border-white/60"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-[22px] group-hover:scale-110 transition-transform duration-500 shadow-md ${stat.glow}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-xs text-text-secondary font-bold uppercase tracking-widest">{stat.label}</p>
                <p className="text-4xl font-display font-black text-text-primary mt-1.5">{stat.value}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold text-text-secondary">
                <span>Haftalik reja</span>
                <span className={`${stat.color}`}>{stat.progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Navigation Tabs */}
          <div className="flex bg-slate-200/40 p-1 rounded-2xl border border-white/40 shadow-sm">
            <button
              onClick={() => setActiveMainTab("lessons")}
              className={`flex-1 py-3 text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeMainTab === "lessons"
                  ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/10"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5 cursor-pointer"
              }`}
            >
              <BookOpen className="w-4 h-4" /> Darslarim & Mavzular
            </button>
            <button
              onClick={() => setActiveMainTab("assignments")}
              className={`flex-1 py-3 text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 relative ${
                activeMainTab === "assignments"
                  ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/10"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5 cursor-pointer"
              }`}
            >
              <ClipboardList className="w-4 h-4" /> Mentor Topshiriqlari
              {assignments.length > 0 && (
                <span className="absolute top-2.5 right-4 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-black animate-bounce shadow">
                  {assignments.length}
                </span>
              )}
            </button>
          </div>

          {activeMainTab === "lessons" ? (
            <>
              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold text-text-primary tracking-tight">O'qishni davom ettiring</h2>
                <Link to="/fanlar" className="text-xs font-extrabold text-primary hover:text-primary-dark flex items-center gap-1 group/link bg-primary/5 px-4 py-2 rounded-xl transition-all">
                  Barcha darslar <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <div className="grid gap-6">
                {[
                  { title: "Mexanik harakat va uning turlari", subject: "Fizika", time: "2 soat oldin", progress: 80, icon: Zap, gradient: "from-blue-500 to-indigo-600" },
                  { title: "Organik birikmalarning tuzilishi", subject: "Kimyo", time: "Kecha", progress: 45, icon: FlaskConical, gradient: "from-purple-500 to-pink-600" },
                  { title: "Logarifmik funksiyalar va grafiklar", subject: "Matematika", time: "2 kun oldin", progress: 100, icon: Target, gradient: "from-amber-500 to-red-600" },
                ].map((lesson, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVariants}
                    whileHover={{ x: 8 }}
                    className="glass p-6 rounded-[36px] card-hover group cursor-pointer border-l-4 border-l-transparent hover:border-l-primary/80"
                  >
                    <div className="flex items-center justify-between gap-6 flex-wrap sm:flex-nowrap">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-text-secondary group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500 shrink-0 border border-white/5">
                          <lesson.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-text-primary text-lg group-hover:text-primary transition-colors leading-tight">{lesson.title}</h3>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded-md">{lesson.subject}</span>
                            <span className="text-xs text-text-secondary flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {lesson.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 min-w-[120px] w-full sm:w-auto">
                        <span className="text-sm font-extrabold text-text-primary">{lesson.progress}%</span>
                        <div className="w-full sm:w-28 h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${lesson.progress}%` }}
                            className={`h-full bg-gradient-to-r ${lesson.gradient} rounded-full`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold text-text-primary tracking-tight">Mentor Topshiriqlari</h2>
                  <p className="text-text-secondary text-xs mt-1">Ushbu vazifalar ustozingiz tomonidan sizga biriktirilgan.</p>
                </div>
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-500" /> +150 XP har bir vazifaga
                </span>
              </div>

              {/* Assignment list */}
              <div className="grid gap-6">
                {assignments.map((task: any) => {
                  const hasSubmitted = submissions.find((sub: any) => sub.taskId === task.id);
                  return (
                    <motion.div
                      key={task.id}
                      variants={itemVariants}
                      className="glass p-7 rounded-[38px] border-white/60 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all"
                    >
                      {/* Active theme bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-2 ${
                        task.subject === "Kimyo" ? "bg-purple-500" : task.subject === "Fizika" ? "bg-cyan-500" : "bg-primary"
                      }`} />

                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-3 flex-1 pl-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                              task.subject === "Kimyo" 
                                ? "bg-purple-500/10 text-purple-600 border border-purple-500/20" 
                                : "bg-cyan-500/10 text-cyan-600 border border-cyan-500/20"
                            }`}>
                              {task.subject}
                            </span>
                            <span className="text-xs text-text-secondary flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> Muddati: {task.dueDate}
                            </span>
                          </div>

                          <h3 className="font-extrabold text-xl text-text-primary group-hover:text-primary transition-colors leading-snug">
                            {task.title}
                          </h3>

                          <p className="text-text-secondary text-xs leading-relaxed font-medium">
                            {task.desc}
                          </p>

                          <div className="flex items-center gap-2 pt-2 text-xs text-slate-500 font-bold bg-white/40 p-2.5 rounded-2xl w-fit">
                            <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[10px]">MENTOR:</span>
                            {task.teacherName}
                          </div>
                        </div>

                        <div className="shrink-0 flex md:flex-col gap-2 w-full md:w-auto mt-4 md:mt-0 justify-end">
                          {task.fileUrl && (
                            <button
                              onClick={() => downloadResource(task.fileUrl)}
                              className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100/80 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-all cursor-pointer border border-slate-200"
                            >
                              <Download className="w-3.5 h-3.5 text-primary" /> Qo'llanma.pdf
                            </button>
                          )}

                          {hasSubmitted ? (
                            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-2xl text-xs font-bold">
                              <Check className="w-4 h-4" /> Topshirilgan
                            </div>
                          ) : (
                            <button
                              onClick={() => setSubmittingTaskId(submittingTaskId === task.id ? null : task.id)}
                              className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-primary to-indigo-600 hover:opacity-95 text-white text-xs font-extrabold rounded-2xl transition-all shadow-md shadow-primary/20 cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" /> Vazifani topshirish
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expandable submit zone */}
                      {submittingTaskId === task.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-6 pt-6 border-t border-slate-200/60 overflow-hidden pl-3"
                        >
                          <form onSubmit={(e) => handleHomeworkSubmit(e, task.id)} className="space-y-4">
                            <h4 className="font-extrabold text-sm text-text-primary flex items-center gap-1.5">
                              <Upload className="w-4 h-4 text-primary" /> Uy vazifasi faylini jo'natish
                            </h4>

                            <div className="grid md:grid-cols-2 gap-4">
                              {/* File drag zone simulation */}
                              <div className="border-2 border-dashed border-slate-300 rounded-3xl p-6 bg-slate-50/50 flex flex-col items-center justify-center text-center hover:border-primary transition-all relative">
                                <input
                                  type="file"
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      startSimulatedUpload(file.name);
                                    } else {
                                      // Or select a simulated sample
                                      startSimulatedUpload(`${user.name || "Diyorbek"}_uy_vazifasi_${task.subject.toLowerCase()}.pdf`);
                                    }
                                  }}
                                />
                                
                                {isUploading ? (
                                  <div className="w-full space-y-2">
                                    <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-500 px-2">
                                      <span>Yuklanmoqda...</span>
                                      <span>{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                      <div className="h-full bg-primary" style={{ width: `${uploadProgress}%` }} />
                                    </div>
                                  </div>
                                ) : submitFileName ? (
                                  <div className="space-y-2">
                                    <div className="bg-primary/10 text-primary w-12 h-12 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                                      <FileText className="w-6 h-6" />
                                    </div>
                                    <p className="text-xs font-extrabold text-text-primary">{submitFileName}</p>
                                    <p className="text-[10px] text-emerald-600 font-bold">✓ Fayl biriktirildi</p>
                                  </div>
                                ) : (
                                  <>
                                    <div className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 group-hover:text-primary transition-colors mb-2.5">
                                      <Upload className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <p className="text-xs font-extrabold text-text-primary">Faylni tanlang yoki shu yerga topshiriqni sudrab keling</p>
                                    <p className="text-[10px] text-text-secondary mt-1 font-medium">PDF, DOCX, ZIP yoki rasmlar (max 10MB)</p>
                                  </>
                                )}
                              </div>

                              <div className="space-y-4">
                                <textarea
                                  placeholder="Vazifa bo'yicha ustoza qo'shimcha izoh yoki savollaringiz..."
                                  rows={4}
                                  value={submitComment}
                                  onChange={(e) => setSubmitComment(e.target.value)}
                                  className="w-full text-xs p-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-text-primary placeholder:text-text-secondary/50 font-medium"
                                />

                                <div className="flex gap-2 justify-end">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSubmittingTaskId(null);
                                      setSubmitFileName("");
                                      setUploadProgress(0);
                                    }}
                                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-all cursor-pointer"
                                  >
                                    Bekor qilish
                                  </button>
                                  <button
                                    type="submit"
                                    disabled={!submitFileName || isUploading}
                                    className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-extrabold rounded-2xl transition-all shadow-md shadow-emerald-500/15 cursor-pointer"
                                  >
                                    <Send className="w-3.5 h-3.5" /> Ustozga jo'natish
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* History Submissions */}
              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-display font-black text-text-primary tracking-tight">Yuborilgan vazifalar tarixi</h3>
                {submissions.length === 0 ? (
                  <div className="glass p-8 text-center text-text-secondary rounded-[32px] text-xs font-medium">
                    Siz hali vazifalar yubormagansiz.
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {submissions.map((sub: any) => {
                      const relatedTask = assignments.find((a: any) => a.id === sub.taskId) || {
                        title: "Mustaqil dars topshirig'i",
                        subject: "Umumiy"
                      };
                      return (
                        <div key={sub.id} className="glass p-5 rounded-[30px] border-white/50 bg-white/20 hover:bg-white/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                                {relatedTask.subject}
                              </span>
                              <span className="text-[10px] text-text-secondary font-mono">{sub.submittedAt}</span>
                            </div>
                            <h4 className="font-extrabold text-text-primary text-base">{relatedTask.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-text-secondary">
                              <FileText className="w-3.5 h-3.5 text-primary" />
                              <span className="font-mono text-slate-600 truncate max-w-xs">{sub.fileName}</span>
                            </div>
                            {sub.comment && (
                              <p className="text-xs italic text-slate-500 bg-white/30 p-2 rounded-xl mt-1 font-medium">
                                " {sub.comment} "
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col items-end gap-2 shrink-0 bg-white/50 p-3 rounded-2xl border border-white/80 min-w-[200px]">
                            <div className="flex items-center gap-1.5 justify-between w-full">
                              <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Holati:</span>
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                                sub.status === "Baho berilgan" 
                                  ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" 
                                  : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                              }`}>
                                {sub.status === "Baho berilgan" ? "Baholandi" : "Kutilmoqda"}
                              </span>
                            </div>

                            {sub.status === "Baho berilgan" ? (
                              <div className="space-y-1 text-right w-full">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs text-text-secondary font-bold">Olingan Baho:</span>
                                  <span className="font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded text-xs">{sub.grade}</span>
                                </div>
                                {sub.feedback && (
                                  <p className="text-[11px] text-slate-600 font-semibold leading-relaxed border-t border-slate-200/50 mt-1.5 pt-1.5 text-left bg-emerald-500/5 p-1.5 rounded-lg">
                                    <span className="font-extrabold text-emerald-700 block text-[10px] uppercase">Ustoz munosabati:</span>
                                    {sub.feedback}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-400 font-medium block text-right mt-1">Tekshiruv jarayonida...</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          <FocusLounge />

          <motion.div 
            variants={itemVariants} 
            className="glass p-8 rounded-[40px] relative overflow-hidden group border-white/80 shadow-md"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/30 transition-colors" />
            <div className="relative z-10">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-[18px] flex items-center justify-center mb-6 shadow-md border border-white">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-extrabold text-text-primary mb-3">Kunlik Maqsad</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6 font-medium">
                Bugun 3 ta video dars ko'rish va 1 ta laboratoriya ishini bajarishni rejalashtirgansiz.
              </p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Erishilgan progress</span>
                <span className="text-xs font-extrabold text-primary bg-primary/5 px-2 py-0.5 rounded">2 ta dars qoldi</span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-gradient-to-r from-primary to-accent rounded-full" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="p-8 rounded-[40px] bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.25)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-secondary w-5 h-5" />
                <h3 className="font-extrabold text-lg">Bugungi dars jadvali</h3>
              </div>
              <div className="space-y-4">
                {[
                  { time: "09:00", subject: "Matematika", room: "102-xona", color: "border-secondary" },
                  { time: "10:30", subject: "Fizika", room: "Fizika lab", color: "border-primary" },
                  { time: "12:00", subject: "Ingliz tili", room: "ZOOM aloqasi", color: "border-accent" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border-l-2 ${item.color} hover:bg-white/10 transition-all cursor-pointer group`}>
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-extrabold text-secondary bg-secondary/10 px-2.5 py-1 rounded-lg">{item.time}</div>
                      <div>
                        <p className="text-sm font-bold group-hover:text-secondary transition-colors">{item.subject}</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">{item.room}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const Zap = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
