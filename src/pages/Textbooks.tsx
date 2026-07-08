import { motion, AnimatePresence } from "framer-motion";
import { Book, Search, Filter, Download, ExternalLink, Bookmark, ChevronRight, BookOpen, Clock, Star, Grid, List } from "lucide-react";
import { useState } from "react";

const books = [
  { id: 1, title: "Fizika", grade: 11, author: "P. Habibullayev", year: 2021, cover: "https://picsum.photos/seed/physics-book/400/600", rating: 4.8, pages: 256 },
  { id: 2, title: "Kimyo", grade: 11, author: "I. Asqarov", year: 2020, cover: "https://picsum.photos/seed/chemistry-book/400/600", rating: 4.9, pages: 312 },
  { id: 3, title: "Biologiya", grade: 11, author: "A. Zikiryayev", year: 2021, cover: "https://picsum.photos/seed/biology-book/400/600", rating: 4.7, pages: 288 },
  { id: 4, title: "Algebra", grade: 11, author: "Sh. Alimov", year: 2020, cover: "https://picsum.photos/seed/math-book/400/600", rating: 4.9, pages: 340 },
  { id: 5, title: "O'zbekiston tarixi", grade: 11, author: "Q. Usmonov", year: 2021, cover: "https://picsum.photos/seed/history-book/400/600", rating: 4.6, pages: 220 },
  { id: 6, title: "Ingliz tili", grade: 11, author: "L. Jo'rayev", year: 2020, cover: "https://picsum.photos/seed/english-book/400/600", rating: 4.8, pages: 196 },
  { id: 7, title: "Geometriya", grade: 11, author: "A. Azamov", year: 2021, cover: "https://picsum.photos/seed/geometry-book/400/600", rating: 4.7, pages: 180 },
  { id: 8, title: "Informatika", grade: 11, author: "M. Aripov", year: 2020, cover: "https://picsum.photos/seed/computer-book/400/600", rating: 4.9, pages: 160 },
];

export default function Textbooks() {
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("11");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(search.toLowerCase()) && 
    (selectedGrade === "all" || book.grade.toString() === selectedGrade)
  );

  return (
    <div className="space-y-10">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight">Raqamli Darsliklar</h1>
          <p className="text-text-secondary mt-2 font-medium">1-11 sinf darsliklarining to'liq va interaktiv to'plami.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-3xl">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Kitob nomini yoki muallifni yozing..."
              className="w-full pl-12 pr-6 py-4 glass rounded-[24px] text-sm outline-none focus:ring-4 focus:ring-primary/10 transition-all border-white/40"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select 
              className="px-6 py-4 glass rounded-[24px] outline-none focus:ring-4 focus:ring-primary/10 appearance-none min-w-[160px] text-sm font-bold text-text-primary border-white/40"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="all">Barcha sinflar</option>
              {[...Array(11)].map((_, i) => (
                <option key={i+1} value={i+1}>{i+1}-sinf</option>
              ))}
            </select>
            <div className="glass p-1.5 rounded-[20px] flex gap-1 border-white/40">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-2xl transition-all ${viewMode === "grid" ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-text-secondary hover:bg-white"}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-2xl transition-all ${viewMode === "list" ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-text-secondary hover:bg-white"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div 
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10" 
            : "space-y-6"
          }
        >
          {filteredBooks.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -10 }}
              className={viewMode === "grid" 
                ? "glass rounded-[40px] border-white/40 shadow-xl overflow-hidden group flex flex-col h-full"
                : "glass rounded-[32px] border-white/40 p-6 flex items-center gap-8 group hover:border-primary/30 transition-all"
              }
            >
              <div className={viewMode === "grid" 
                ? "aspect-[3/4.5] relative overflow-hidden m-4 rounded-[32px] shadow-2xl" 
                : "w-32 h-44 relative overflow-hidden rounded-2xl shadow-xl shrink-0"
              }>
                <img 
                  src={book.cover} 
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6 gap-4">
                  <button className="p-3.5 bg-white rounded-2xl text-primary hover:scale-110 transition-transform shadow-xl">
                    <BookOpen className="w-6 h-6" />
                  </button>
                  <button className="p-3.5 bg-white rounded-2xl text-text-primary hover:scale-110 transition-transform shadow-xl">
                    <Download className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold rounded-full shadow-lg uppercase tracking-widest">
                    {book.grade}-sinf
                  </span>
                </div>
              </div>
              
              <div className={viewMode === "grid" ? "p-8 pt-2 flex-1 flex flex-col" : "flex-1 flex flex-col"}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl font-display font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">{book.title}</h3>
                  <button className="text-text-secondary hover:text-primary transition-colors">
                    <Bookmark className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-sm font-medium text-text-secondary mb-6">{book.author}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-xs font-bold text-text-secondary uppercase tracking-widest">
                    <Clock className="w-4 h-4 text-primary" /> {book.pages} bet
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-text-secondary uppercase tracking-widest">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {book.rating}
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{book.year}-yil nashri</span>
                  <button className="text-primary font-bold text-sm flex items-center gap-2 group/btn">
                    O'qish <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredBooks.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32 glass rounded-[48px] border-2 border-dashed border-slate-200"
        >
          <div className="bg-slate-50 w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-8">
            <Search className="text-slate-300 w-12 h-12" />
          </div>
          <h3 className="text-3xl font-display font-bold text-text-primary mb-4 tracking-tight">Kitob topilmadi</h3>
          <p className="text-text-secondary max-w-sm mx-auto text-lg">
            Qidiruv so'rovini o'zgartirib ko'ring yoki boshqa sinfni tanlang.
          </p>
        </motion.div>
      )}
    </div>
  );
}
