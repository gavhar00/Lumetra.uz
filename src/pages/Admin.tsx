import { motion } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  Video, 
  FlaskConical, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Award,
  Clock,
  Sparkles,
  FileText,
  Calendar,
  Send,
  Download,
  CheckCircle,
  ClipboardList,
  AlertCircle,
  Check
} from "lucide-react";
import { useState, useEffect } from "react";

const stats = [
  { label: "Jami o'quvchilar", value: "12,450", trend: "+12%", up: true, icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { label: "Darsliklar", value: "156 ta", trend: "+5%", up: true, icon: BookOpen, color: "text-secondary", bg: "bg-secondary/10" },
  { label: "Video darslar", value: "840 ta", trend: "+24%", up: true, icon: Video, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Lab. ishlari", value: "42 ta", trend: "-2%", up: false, icon: FlaskConical, color: "text-orange-500", bg: "bg-orange-50" },
];

const content = [
  { id: 1, title: "Fizika 11-sinf", type: "Darslik", author: "P. Habibullayev", date: "2024-03-10", status: "Faol" },
  { id: 2, title: "Mexanik harakat", type: "Video", author: "A. Karimov", date: "2024-03-12", status: "Faol" },
  { id: 3, title: "Kislota va ishqor", type: "Laboratoriya", author: "S. Aliyeva", date: "2024-03-15", status: "Tekshiruvda" },
  { id: 4, title: "Algebra 10-sinf", type: "Darslik", author: "Sh. Alimov", date: "2024-03-08", status: "Faol" },
  { id: 5, title: "Organik kimyo", type: "Video", author: "M. Toshmatov", date: "2024-03-14", status: "Faol" },
];

export default function Admin() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"content" | "assignments">("content");

  // Load and sync assignments
  const [assignments, setAssignments] = useState(() => {
    return JSON.parse(localStorage.getItem("ilmAssignments") || "[]");
  });

  // Load and sync submissions
  const [submissions, setSubmissions] = useState(() => {
    return JSON.parse(localStorage.getItem("ilmSubmissions") || "[]");
  });

  // Load list of defaults if empty when opening admin page
  useEffect(() => {
    const savedTasks = localStorage.getItem("ilmAssignments");
    if (!savedTasks) {
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
        }
      ];
      localStorage.setItem("ilmAssignments", JSON.stringify(defaults));
      setAssignments(defaults);
    } else {
      setAssignments(JSON.parse(savedTasks));
    }

    const savedSubs = localStorage.getItem("ilmSubmissions");
    if (!savedSubs) {
      const defaults = [
        {
          id: "sub-1",
          taskId: "task-1",
          studentName: "Diyorbek A.",
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
      setSubmissions(defaults);
    } else {
      setSubmissions(JSON.parse(savedSubs));
    }
  }, []);

  // Sync state actively
  useEffect(() => {
    const handleStorage = () => {
      const tasks = localStorage.getItem("ilmAssignments");
      if (tasks) setAssignments(JSON.parse(tasks));
      const subs = localStorage.getItem("ilmSubmissions");
      if (subs) setSubmissions(JSON.parse(subs));
    };
    window.addEventListener("storage", handleStorage);
    const interval = setInterval(handleStorage, 1000);
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  // Creation form states
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("Kimyo");
  const [newDueDate, setNewDueDate] = useState("2026-06-25");
  const [newFileName, setNewFileName] = useState("laboratoriya_yoriqnomasi.pdf");
  const [newDesc, setNewDesc] = useState("");

  // Grade form states
  const [gradingSubId, setGradingSubId] = useState<string | null>(null);
  const [gradeInput, setGradeInput] = useState("5 (A+)");
  const [feedbackInput, setFeedbackInput] = useState("");

  // Handle assignment creation
  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring!");
      return;
    }

    const newAss = {
      id: "task-" + Date.now(),
      title: newTitle,
      subject: newSubject,
      desc: newDesc,
      dueDate: newDueDate,
      fileUrl: newFileName || "yoriqnoma.pdf",
      teacherName: "Zilola S. (VR Tajriba Lab Rahbari)"
    };

    const updatedTasks = [newAss, ...assignments];
    setAssignments(updatedTasks);
    localStorage.setItem("ilmAssignments", JSON.stringify(updatedTasks));

    // Reset Form
    setNewTitle("");
    setNewSubject("Kimyo");
    setNewDueDate("2026-06-25");
    setNewFileName("laboratoriya_yoriqnomasi.pdf");
    setNewDesc("");
    
    alert("Yangi topshiriq muvaffaqiyatli e'lon qilindi va o'quvchilar panellariga yuborildi!");
  };

  // Handle grading submission
  const handleGradeSubmission = (e: React.FormEvent, subId: string) => {
    e.preventDefault();
    
    const updatedSubs = submissions.map((sub: any) => {
      if (sub.id === subId) {
        return {
          ...sub,
          status: "Baho berilgan",
          grade: gradeInput,
          feedback: feedbackInput
        };
      }
      return sub;
    });

    setSubmissions(updatedSubs);
    localStorage.setItem("ilmSubmissions", JSON.stringify(updatedSubs));

    setGradingSubId(null);
    setGradeInput("5 (A+)");
    setFeedbackInput("");

    alert("Baho va izoh muvaffaqiyatli saqlandi! O'quvchi hisobiga ballar yozildi.");
  };

  // Delete assignment
  const handleDeleteAssignment = (id: string) => {
    if (confirm("Ushbu topshiriqni o'chirib tashlamoqchimisiz?")) {
      const filtered = assignments.filter((a: any) => a.id !== id);
      setAssignments(filtered);
      localStorage.setItem("ilmAssignments", JSON.stringify(filtered));
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-extrabold text-text-primary tracking-tight">Ustoz & Mentor boshqaruvi</h1>
          <p className="text-text-secondary mt-2 font-medium font-display">Tizimdagi topshiriqlarni yaratish va uyga vazifalarni baholash tizimi.</p>
        </div>
        <div className="flex bg-slate-200/40 p-1 rounded-2xl border border-white/30 self-start md:self-auto shadow-sm">
          <button 
            onClick={() => setActiveTab("content")}
            className={`px-5 py-3 text-sm font-extrabold rounded-xl transition-all ${
              activeTab === "content" 
                ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/10" 
                : "text-text-secondary hover:text-text-primary cursor-pointer"
            }`}
          >
            Mavzular & Kontent
          </button>
          <button 
            onClick={() => setActiveTab("assignments")}
            className={`px-5 py-3 text-sm font-extrabold rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === "assignments" 
                ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/10" 
                : "text-text-secondary hover:text-text-primary cursor-pointer"
            }`}
          >
            Topshiriqlar & Uyga Vazifalar
            {submissions.filter((s: any) => s.status === "Kutilmoqda").length > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center animate-bounce">
                {submissions.filter((s: any) => s.status === "Kutilmoqda").length}
              </span>
            )}
          </button>
        </div>
      </header>

      {activeTab === "content" ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeIn">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[32px] card-hover"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.trend} {stat.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  </div>
                </div>
                <p className="text-sm font-bold text-text-secondary uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-display font-bold text-text-primary mt-1">{stat.value}</h3>
              </motion.div>
            ))}
          </div>

          {/* Content Management */}
          <div className="glass rounded-[48px] overflow-hidden border-white/40 shadow-2xl animate-fadeIn">
            <div className="p-8 border-b border-white/20 bg-white/30 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h2 className="text-2xl font-display font-bold text-text-primary tracking-tight">Kontent boshqaruvi</h2>
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Qidirish..."
                    className="pl-11 pr-6 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm w-64 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button className="p-3 glass rounded-2xl text-text-secondary hover:text-primary transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-5 text-xs font-bold text-text-secondary uppercase tracking-widest">Nomi</th>
                    <th className="px-8 py-5 text-xs font-bold text-text-secondary uppercase tracking-widest">Turi</th>
                    <th className="px-8 py-5 text-xs font-bold text-text-secondary uppercase tracking-widest">Muallif</th>
                    <th className="px-8 py-5 text-xs font-bold text-text-secondary uppercase tracking-widest">Sana</th>
                    <th className="px-8 py-5 text-xs font-bold text-text-secondary uppercase tracking-widest">Holat</th>
                    <th className="px-8 py-5 text-xs font-bold text-text-secondary uppercase tracking-widest">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {content.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).map((item) => (
                    <tr key={item.id} className="hover:bg-white/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-text-secondary group-hover:bg-primary/10 group-hover:text-primary transition-all">
                            {item.type === "Darslik" ? <BookOpen className="w-5 h-5" /> : item.type === "Video" ? <Video className="w-5 h-5" /> : <FlaskConical className="w-5 h-5" />}
                          </div>
                          <span className="font-bold text-text-primary">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-medium text-text-secondary">{item.type}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-medium text-text-secondary">{item.author}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-medium text-text-secondary">{item.date}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          item.status === "Faol" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-xl transition-all">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-8 bg-slate-50/50 flex items-center justify-between">
              <p className="text-sm font-medium text-text-secondary">Jami 156 tadan 1-5 gacha ko'rsatilmoqda</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 glass rounded-xl text-sm font-bold text-text-secondary hover:text-primary disabled:opacity-50" disabled>Oldingi</button>
                <button className="px-4 py-2 glass rounded-xl text-sm font-bold text-text-primary hover:text-primary">Keyingi</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-10 animate-fadeIn pl-1">
          {/* Dual Panel Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Create Assignment Form */}
            <div className="lg:col-span-2 glass p-8 rounded-[40px] border-white/60 shadow-xl space-y-6 self-start">
              <div className="flex items-center gap-3 border-b border-slate-200/50 pb-4">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-black text-text-primary">Yangi Kvest / Topshiriq</h3>
                  <p className="text-[10px] text-text-secondary mt-0.5">O'quvchilar uchun yangi vazifa yuborish.</p>
                </div>
              </div>

              <form onSubmit={handleCreateAssignment} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-text-secondary uppercase tracking-wider">Topshiriq nomi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Optik refraksiya laboratoriyasi"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs p-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-text-primary placeholder:text-text-secondary/40 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-text-secondary uppercase tracking-wider">Fan sohasi *</label>
                    <select
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="w-full text-xs p-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-text-primary font-semibold"
                    >
                      <option value="Kimyo">Kimyo</option>
                      <option value="Fizika">Fizika</option>
                      <option value="Matematika">Matematika</option>
                      <option value="Informatika">Informatika</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-text-secondary uppercase tracking-wider">Muddati *</label>
                    <input
                      type="date"
                      required
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      className="w-full text-xs p-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-text-primary font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-text-secondary uppercase tracking-wider">Ilova qilinadigan qo'llanma nomi (ixtiyoriy)</label>
                  <input
                    type="text"
                    placeholder="Masalan: Laboratoriya_Yol_Xaritasi.pdf"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    className="w-full text-xs p-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-text-primary placeholder:text-text-secondary/40 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-text-secondary uppercase tracking-wider">Yo'riqnoma & Batafsil topshiriq shartlari *</label>
                  <textarea
                    required
                    placeholder="O'quvchiga bajarilishi kerak bo'lgan simulyatsiya bosqichlari va kutilayotgan ilmiy hisobot talablarini tushuntiring..."
                    rows={5}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full text-xs p-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-text-primary placeholder:text-text-secondary/40 font-medium leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-primary to-indigo-600 text-white font-extrabold text-xs rounded-2xl hover:opacity-95 shadow-lg shadow-primary/20 cursor-pointer flex items-center justify-center gap-2 transition-all"
                >
                  <Plus className="w-4 h-4" /> Topshiriqni e'lon qilish
                </button>
              </form>
            </div>

            {/* Active Assignments List in Teacher panel */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-display font-black text-text-primary">Faol Kvestlar ({assignments.length} ta)</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Hozirda faol va o'quvchilar ko'rib turgan topshiriqlar ro'yxati.</p>
                </div>
              </div>

              {assignments.length === 0 ? (
                <div className="glass p-10 text-center text-text-secondary text-sm font-medium rounded-[32px]">
                  Hozircha faol topshiriqlar mavjud emas. Yuqoridagi formadan birinchi topshiriqni yarating!
                </div>
              ) : (
                <div className="grid gap-4">
                  {assignments.map((task: any) => {
                    const taskSubmissions = submissions.filter((s: any) => s.taskId === task.id);
                    const gradedCount = taskSubmissions.filter((s: any) => s.status === "Baho berilgan").length;
                    return (
                      <div key={task.id} className="glass p-6 rounded-[34px] border-white/60 hover:shadow-lg transition-all relative overflow-hidden group">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500" />
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-2 flex-1 pl-2">
                            <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 border border-indigo-100 px-2.5 py-0.5 rounded-md">
                              {task.subject}
                            </span>
                            <h4 className="font-extrabold text-text-primary text-base leading-snug group-hover:text-primary transition-colors">
                              {task.title}
                            </h4>
                            <p className="text-text-secondary text-xs line-clamp-2 leading-relaxed">
                              {task.desc}
                            </p>
                            <div className="flex items-center gap-4 text-[10px] text-text-secondary font-bold pt-1.5">
                              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Muddati: {task.dueDate}</span>
                              <span className="text-primary uppercase bg-primary/5 px-2 py-0.5 rounded">
                                Javoblar: {taskSubmissions.length} tadan {gradedCount} baholandi
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteAssignment(task.id)}
                            className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                            title="Topshiriqni o'chirish"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Student Submissions section / Review Center */}
          <div className="glass p-8 rounded-[40px] border-white/60 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-5">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-black text-text-primary">O'quvchilar topshirgan uy vazifalari</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Topshirilgan fayllarni ko'rib chiqish va baho berish markazi.</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/10">
                Kutilmoqda: {submissions.filter((s: any) => s.status === "Kutilmoqda").length} ta vazifa
              </span>
            </div>

            {submissions.length === 0 ? (
              <div className="p-12 text-center text-text-secondary text-sm font-medium rounded-3xl">
                O'quvchilardan hozircha hech qanday uy vazifalari kelib tushmadi.
              </div>
            ) : (
              <div className="grid gap-6">
                {submissions.map((sub: any) => {
                  const relatedTask = assignments.find((t: any) => t.id === sub.taskId) || {
                    title: "Mustaqil dars topshirig'i",
                    subject: "Umumiy"
                  };
                  return (
                    <div
                      key={sub.id}
                      className="p-6 rounded-[32px] bg-white/20 border border-white/40 hover:bg-white/50 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6 relative"
                    >
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-[10px] font-black uppercase tracking-widest bg-slate-150 px-2 py-0.5 rounded text-slate-500 bg-slate-100">
                            {relatedTask.subject}
                          </span>
                          <span className="text-xs text-text-secondary flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Jo'natilgan sana: {sub.submittedAt}
                          </span>
                          <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                            sub.status === "Baho berilgan" 
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/15" 
                              : "bg-amber-500/10 text-amber-600 border border-amber-500/15 animate-pulse"
                          }`}>
                            {sub.status === "Baho berilgan" ? "Baholangan" : "Baholash kutilmoqda"}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">Topshiriq nomi:</p>
                          <h4 className="font-extrabold text-text-primary text-lg">{relatedTask.title}</h4>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 bg-white/40 p-4 rounded-2xl border border-white/60">
                          <div>
                            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider mb-1">O'quvchi ma'lumoti:</p>
                            <p className="text-xs font-black text-text-primary">{sub.studentName}</p>
                            <p className="text-[11px] text-slate-500 font-medium font-mono">{sub.studentEmail}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider mb-1">Ilova qilingan fayl:</p>
                            <button
                              onClick={() => alert(`"${sub.fileName}" fayli tekshirish uchun tizimda yuklab olinmoqda...`)}
                              className="text-xs font-black text-primary hover:underline flex items-center gap-1 text-left cursor-pointer transition-all"
                            >
                              <FileText className="w-4 h-4" /> {sub.fileName}
                            </button>
                          </div>
                        </div>

                        {sub.comment && (
                          <div className="space-y-1 bg-white/20 p-3.5 rounded-2xl border border-slate-100 italic">
                            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest not-italic">O'quvchi izohi:</p>
                            <p className="text-xs text-slate-650 font-semibold">" {sub.comment} "</p>
                          </div>
                        )}

                        {sub.status === "Baho berilgan" && (
                          <div className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10 space-y-2 animate-fadeIn">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-extrabold text-emerald-800 flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" /> QO'YILGAN BAHO:
                              </span>
                              <span className="text-sm font-black text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-lg">
                                {sub.grade}
                              </span>
                            </div>
                            {sub.feedback && (
                              <p className="text-xs font-semibold text-slate-600 leading-relaxed bg-white/40 p-2.5 rounded-xl">
                                <span className="font-extrabold text-emerald-700 block text-[10px] uppercase">Ustozning munosabati:</span>
                                {sub.feedback}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 flex items-end justify-end self-center">
                        {sub.status !== "Baho berilgan" ? (
                          gradingSubId !== sub.id ? (
                            <button
                              onClick={() => {
                                setGradingSubId(sub.id);
                                setGradeInput("5 (A+)");
                                setFeedbackInput("");
                              }}
                              className="flex items-center gap-1.5 px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-2xl shadow-md shadow-emerald-500/20 cursor-pointer transition-all"
                            >
                              <Award className="w-4 h-4" /> Vazifani baholash
                            </button>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4 max-w-sm w-full md:w-80"
                            >
                              <h5 className="font-black text-xs text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                                <Award className="w-4 h-4 text-emerald-500" /> Vazifaga baho qo'yish
                              </h5>

                              <form onSubmit={(e) => handleGradeSubmission(e, sub.id)} className="space-y-3">
                                <div className="space-y-1 text-left">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Baho tanlang:</label>
                                  <select
                                    value={gradeInput}
                                    onChange={(e) => setGradeInput(e.target.value)}
                                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 text-text-primary font-bold"
                                  >
                                    <option value="5 (A+)">5 (A+) - Mukammal</option>
                                    <option value="4 (A)">4 (A) - Yaxshi</option>
                                    <option value="3 (B)">3 (B) - Qoniqarli</option>
                                    <option value="Qayta ishlash">Qayta ishlash lozim</option>
                                  </select>
                                </div>

                                <div className="space-y-1 text-left">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">O'quvchiga taqriz (futzbek / tavsiya):</label>
                                  <textarea
                                    required
                                    placeholder="Juda yaxshi natija! Harorat hisob-kitoblarida reaksiyani deyarli 100% to'g'ri ko'rsatibsan."
                                    rows={3}
                                    value={feedbackInput}
                                    onChange={(e) => setFeedbackInput(e.target.value)}
                                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 text-text-primary placeholder:text-text-secondary/30 font-medium leading-relaxed"
                                  />
                                </div>

                                <div className="flex gap-2 justify-end pt-1">
                                  <button
                                    type="button"
                                    onClick={() => setGradingSubId(null)}
                                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded-xl transition-all cursor-pointer"
                                  >
                                    Bekor qilish
                                  </button>
                                  <button
                                    type="submit"
                                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] rounded-xl shadow-md shadow-emerald-500/15 cursor-pointer transition-all flex items-center gap-1"
                                  >
                                    <Send className="w-3 h-3" /> Baholash
                                  </button>
                                </div>
                              </form>
                            </motion.div>
                          )
                        ) : (
                          <div className="flex items-center gap-1.5 text-slate-400 bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-2xl text-xs font-bold font-display">
                            <Check className="w-4 h-4" /> Baholangan
                          </div>
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
  );
}
