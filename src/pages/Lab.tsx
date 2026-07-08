import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Play, Info, RotateCcw, Thermometer, Droplets, Zap, ChevronRight, Beaker, AlertCircle, Globe, ExternalLink, Search, Filter } from "lucide-react";
import { useState } from "react";
import { experiments, Experiment } from "../data/experiments";

type Language = "uz" | "ru" | "en";

export default function Lab() {
  const [selectedLang, setSelectedLang] = useState<Language>("uz");
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Barchasi");
  const [activeLab, setActiveLab] = useState<Experiment | null>(null);

  const subjects = ["Barchasi", ...new Set(experiments.map(e => e.subject))];

  const filteredExperiments = experiments.filter(exp => {
    const titleMatch = exp.titles[selectedLang].toLowerCase().includes(search.toLowerCase());
    const subjectMatch = selectedSubject === "Barchasi" || exp.subject === selectedSubject;
    return titleMatch && subjectMatch;
  });

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case "Fizika": return Zap;
      case "Kimyo": return FlaskConical;
      case "Biologiya": return Beaker;
      default: return Info;
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight">
            {selectedLang === "uz" ? "Virtual Laboratoriya" : selectedLang === "ru" ? "Виртуальная Лаборатория" : "Virtual Laboratory"}
          </h1>
          <p className="text-text-secondary mt-2 font-medium">
            {selectedLang === "uz" ? "Xavfsiz va interaktiv muhitda ilmiy tajribalar o'tkazing." : 
             selectedLang === "ru" ? "Проводите научные эксперименты в безопасной и интерактивной среде." : 
             "Conduct scientific experiments in a safe and interactive environment."}
          </p>
        </div>
        
        <div className="flex items-center gap-4 glass p-2 rounded-2xl border-white/40">
          {(["uz", "ru", "en"] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedLang === lang ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-text-secondary hover:bg-white/10"
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Filters */}
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder={selectedLang === "uz" ? "Qidirish..." : selectedLang === "ru" ? "Поиск..." : "Search..."}
                className="w-full pl-11 pr-4 py-3.5 glass rounded-2xl text-sm outline-none border-white/40 focus:ring-4 focus:ring-primary/10 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] ml-2">Fanlar</label>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedSubject === subject 
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                        : "glass border-white/20 text-text-secondary hover:border-primary/30"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-[32px] bg-gradient-to-br from-primary/5 to-transparent border-white/40">
            <div className="flex items-center gap-3 text-primary mb-3">
              <AlertCircle className="w-5 h-5" />
              <h4 className="font-bold text-sm">Eslatma</h4>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed font-medium mb-4">
              Tajribalar PhET va Labster platformalari orqali taqdim etiladi. Ba'zi tajribalar uchun internet aloqasi talab qilinadi.
            </p>
            <a 
              href="https://phet.colorado.edu/en/simulations/browse" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-xs font-bold text-primary transition-all"
            >
              Barcha PhET simulyatsiyalari <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Experiments Grid */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {activeLab ? (
              <motion.div 
                key="simulation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass rounded-[48px] border-white/40 shadow-2xl overflow-hidden flex flex-col h-[700px] relative"
              >
                <div className="p-6 border-b border-white/20 flex items-center justify-between bg-white/30 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setActiveLab(null)}
                      className="p-2 hover:bg-white/10 rounded-xl transition-all"
                    >
                      <ChevronRight className="w-6 h-6 rotate-180 text-text-secondary" />
                    </button>
                    <div>
                      <h3 className="font-bold text-text-primary text-lg">{activeLab.titles[selectedLang]}</h3>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{activeLab.subject}</span>
                    </div>
                  </div>
                  <a 
                    href={activeLab.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/30 transition-all"
                  >
                    To'liq ekranda ochish <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <iframe 
                  src={activeLab.link} 
                  className="flex-1 w-full border-none bg-slate-950"
                  title={activeLab.titles[selectedLang]}
                  allowFullScreen
                />
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredExperiments.map((exp, i) => {
                  const Icon = getSubjectIcon(exp.subject);
                  return (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -8 }}
                      onClick={() => setActiveLab(exp)}
                      className="glass p-6 rounded-[32px] border-white/40 shadow-xl cursor-pointer group hover:border-primary/30 transition-all flex flex-col h-full"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className={`p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-500`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                          {exp.provider}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors leading-tight">
                        {exp.titles[selectedLang]}
                      </h3>
                      <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-6">
                        {exp.subject}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interaktiv</span>
                        <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          <Play className="w-4 h-4 fill-current" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
