import { motion } from "framer-motion";
import { 
  Zap, 
  FlaskConical, 
  Dna, 
  Calculator, 
  Globe, 
  History,
  Languages,
  PlayCircle,
  BookOpen,
  ChevronRight,
  Search,
  Filter,
  Clock,
  Eye
} from "lucide-react";
import { useState } from "react";

const subjects = [
  { id: 1, name: "Fizika", icon: Zap, color: "from-orange-400 to-red-500", glow: "shadow-orange-200", lessons: 24, progress: 65 },
  { id: 2, name: "Kimyo", icon: FlaskConical, color: "from-blue-400 to-indigo-500", glow: "shadow-blue-200", lessons: 18, progress: 40 },
  { id: 3, name: "Biologiya", icon: Dna, color: "from-emerald-400 to-teal-500", glow: "shadow-emerald-200", lessons: 32, progress: 85 },
  { id: 4, name: "Matematika", icon: Calculator, color: "from-indigo-400 to-purple-500", glow: "shadow-indigo-200", lessons: 45, progress: 90 },
  { id: 5, name: "Geografiya", icon: Globe, color: "from-cyan-400 to-blue-500", glow: "shadow-cyan-200", lessons: 15, progress: 20 },
  { id: 6, name: "Tarix", icon: History, color: "from-red-400 to-pink-500", glow: "shadow-red-200", lessons: 28, progress: 55 },
  { id: 7, name: "Ingliz tili", icon: Languages, color: "from-purple-400 to-fuchsia-500", glow: "shadow-purple-200", lessons: 40, progress: 70 },
  { id: 8, name: "O'zbek tili", icon: BookOpen, color: "from-amber-400 to-orange-500", glow: "shadow-amber-200", lessons: 35, progress: 95 },
  { id: 9, name: "Informatika", icon: Calculator, color: "from-blue-500 to-cyan-600", glow: "shadow-blue-200", lessons: 20, progress: 30 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

const lessonsData: Record<string, any[]> = {
  "Fizika": [
    { title: "Kuch. Nyutonning birinchi va ikkinchi qonunlari", duration: "12:45", views: "1.2k", status: "Bajarilgan", link: "https://youtu.be/dcXl0tksGaE" },
    { title: "Nyutonning uchinchi qonuni va gravitatsiya", duration: "15:20", views: "850", status: "Jarayonda", link: "https://youtu.be/dcXl0tksGaE" },
  ],
  "Kimyo": [
    { title: "Atom tuzilishi. Yadro va elektron qobiq", duration: "14:30", views: "1.1k", status: "Bajarilgan", link: "https://youtu.be/ViZNgU-Yt-Y" },
    { title: "Molekulalar orasidagi bog'lanish", duration: "16:45", views: "920", status: "Jarayonda", link: "https://youtu.be/ViZNgU-Yt-Y" },
  ],
  "Biologiya": [
    { title: "Hujayra – hayotning asosi", duration: "18:15", views: "2.3k", status: "Bajarilgan", link: "https://youtu.be/594GYQz3IE4" },
    { title: "Genetika va irsiyat qonunlari", duration: "22:10", views: "1.5k", status: "Boshlanmagan", link: "https://youtu.be/594GYQz3IE4" },
  ],
  "Matematika": [
    { title: "Funksiya tushunchasi va uning berilish usullari", duration: "25:00", views: "3.1k", status: "Bajarilgan", link: "https://youtu.be/ekUbBot8tDA" },
    { title: "Murakkab funksiyalarni o'rganish", duration: "19:40", views: "2.1k", status: "Jarayonda", link: "https://youtu.be/ekUbBot8tDA" },
  ],
  "Informatika": [
    { title: "Informatika va axborot texnologiyalari faniga kirish", duration: "30:00", views: "4.5k", status: "Bajarilgan", link: "https://youtu.be/U3zQEkIbyN8" },
    { title: "Dasturlash asoslari (Python)", duration: "28:15", views: "3.2k", status: "Boshlanmagan", link: "https://youtu.be/U3zQEkIbyN8" },
  ]
};

export default function Subjects() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<null | number>(null);
  const [search, setSearch] = useState("");

  const activeSubject = subjects.find(s => s.id === selectedSubjectId);
  const currentLessons = activeSubject ? (lessonsData[activeSubject.name] || [
    { title: "1-dars. Kirish va asosiy tushunchalar", duration: "12:45", views: "1.2k", status: "Bajarilgan" },
    { title: "2-dars. Nazariy asoslar va qonuniyatlar", duration: "15:20", views: "850", status: "Jarayonda" },
  ]) : [];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight">Fanlar va Video darslar</h1>
          <p className="text-text-secondary mt-2 font-medium">O'zingizga kerakli fanni tanlang va o'rganishni boshlang.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Fan qidirish..."
              className="w-full pl-11 pr-6 py-3 glass rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="p-3 glass rounded-2xl text-text-secondary hover:text-primary transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {subjects.filter(s => s.name.toLowerCase().includes(search.toLowerCase())).map((subject) => (
          <motion.div
            key={subject.id}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            onClick={() => setSelectedSubjectId(subject.id)}
            className={`cursor-pointer p-8 rounded-[40px] border transition-all duration-500 relative overflow-hidden group ${
              selectedSubjectId === subject.id 
                ? "glass border-primary ring-4 ring-primary/10 shadow-2xl shadow-primary/20" 
                : "glass border-transparent hover:border-primary/20"
            }`}
          >
            {/* Background Glow */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
            
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center mb-8 shadow-xl ${subject.glow} group-hover:scale-110 transition-transform duration-500`}>
              <subject.icon className="text-white w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-display font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">{subject.name}</h3>
            
            <div className="flex items-center justify-between text-xs font-bold text-text-secondary mb-6 uppercase tracking-widest">
              <span>{subject.lessons} ta dars</span>
              <span className="text-primary">{subject.progress}%</span>
            </div>
            
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${subject.progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full rounded-full bg-gradient-to-r ${subject.color}`}
              />
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              Darslarni ko'rish <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>

      {selectedSubjectId && activeSubject && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[48px] p-10 space-y-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-text-primary tracking-tight">{activeSubject.name} darslar ro'yxati</h2>
              <p className="text-text-secondary mt-1 font-medium">11-sinf • I-chorak darslari</p>
            </div>
            <div className="flex gap-3">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-2xl text-xs font-bold uppercase tracking-widest">Barcha darslar</span>
              <span className="px-4 py-2 bg-white/5 text-text-secondary border border-white/5 rounded-2xl text-xs font-bold uppercase tracking-widest">Bajarilgan</span>
            </div>
          </div>

          <div className="grid gap-6 relative z-10">
            {currentLessons.map((lesson, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[32px] hover:bg-white/5 transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                    <PlayCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">{lesson.title}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs font-bold text-text-secondary flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {lesson.duration}
                      </span>
                      <span className="text-xs font-bold text-text-secondary flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> {lesson.views}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                    lesson.status === "Bajarilgan" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_2px_10px_rgba(16,185,129,0.05)]" : 
                    lesson.status === "Jarayonda" ? "bg-primary/10 text-primary border border-primary/20" : "bg-white/5 text-text-secondary border border-white/5"
                  }`}>
                    {lesson.status}
                  </span>
                  <a 
                    href={lesson.link || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 flex items-center gap-2"
                  >
                    Ko'rish <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
