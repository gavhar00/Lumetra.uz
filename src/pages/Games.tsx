import { motion } from "framer-motion";
import { Gamepad2, Trophy, Star, Play, Users, Timer, Target, Sparkles, ChevronRight, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";

export default function Games() {
  const handlePlay = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#4F46E5', '#06B6D4', '#A855F7']
    });
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight">Ta'limiy O'yinlar</h1>
          <p className="text-text-secondary mt-2 font-medium">O'ynab o'rganing va bilimingizni interaktiv tarzda sinab ko'ring.</p>
        </div>
        <div className="flex items-center gap-6 glass p-4 rounded-[28px]">
          <div className="flex items-center gap-3 pr-6 border-r border-white/5">
            <div className="bg-amber-500/10 p-2.5 rounded-2xl text-amber-500">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Top Reyting</p>
              <p className="text-xl font-bold text-text-primary">#12</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-2xl text-primary">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Yutuqlar</p>
              <p className="text-xl font-bold text-text-primary">24 ta</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 glass rounded-[48px] border-white/40 shadow-2xl overflow-hidden group flex flex-col md:flex-row h-auto md:h-[400px]"
        >
          <div className="w-full md:w-1/2 relative overflow-hidden h-[300px] md:h-full">
            <img 
              src="https://picsum.photos/seed/blooket/1200/800" 
              alt="Blooket"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent hidden md:block"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
          </div>
          <div className="p-12 flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-primary/20 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                Tavsiya etiladi
              </span>
              <span className="px-4 py-1.5 bg-amber-500/10 text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-500/25">
                Mashhur
              </span>
            </div>
            <h2 className="text-4xl font-display font-bold text-text-primary mb-4 tracking-tight">Blooket</h2>
            <p className="text-text-secondary leading-relaxed mb-8 text-lg font-medium">
              Dunyoga mashhur ta'limiy o'yinlar platformasi. Viktorinalar, musobaqalar va qiziqarli personajlar bilan o'rganishni boshlang.
            </p>
            <a 
              href="https://www.blooket.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary self-start flex items-center gap-3"
            >
              Blooket-ga o'tish <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {[
          { 
            title: "Matematik Poyga", 
            desc: "Misollarni tez va aniq yechib marraga birinchi bo'lib yetib boring. Do'stlaringiz bilan musobaqalashing!",
            image: "https://picsum.photos/seed/math-game/1200/600",
            players: "1.2k",
            rating: 4.8,
            tags: ["Matematika", "Tezkorlik"],
            color: "from-blue-500 to-indigo-600"
          },
          { 
            title: "Kimyoviy Elementlar", 
            desc: "Davriy jadvaldagi elementlarni toping va o'z laboratoriyangizni quring. Yangi moddalarni kashf eting.",
            image: "https://picsum.photos/seed/chem-game/1200/600",
            players: "850",
            rating: 4.9,
            tags: ["Kimyo", "Mantiq"],
            color: "from-emerald-500 to-teal-600"
          },
          { 
            title: "Imlo Ustasi", 
            desc: "So'zlarni to'g'ri yozish orqali yangi darajalarni oching va ona tilingizni mukammal o'rganing.",
            image: "https://picsum.photos/seed/word-game/1200/600",
            players: "2.5k",
            rating: 4.7,
            tags: ["O'zbek tili", "Xotira"],
            color: "from-amber-500 to-orange-600"
          },
          { 
            title: "Tarixiy Sayohat", 
            desc: "Vaqt mashinasida o'tmishga qayting va buyuk ajdodlarimiz hayotini o'rganing.",
            image: "https://picsum.photos/seed/history-game/1200/600",
            players: "600",
            rating: 4.6,
            tags: ["Tarix", "Sayohat"],
            color: "from-red-500 to-pink-600"
          }
        ].map((game, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -12 }}
            className="glass rounded-[48px] border-white/40 shadow-2xl overflow-hidden group flex flex-col h-full"
          >
            <div className="h-72 relative overflow-hidden m-4 rounded-[40px] shadow-xl">
              <img 
                src={game.image} 
                alt={game.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute top-6 left-6 flex gap-2">
                {game.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <Users className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-bold">{game.players}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold">{game.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 pt-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl font-display font-bold text-text-primary group-hover:text-primary transition-colors tracking-tight">{game.title}</h3>
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center shadow-lg`}
                >
                  <Gamepad2 className="text-white w-6 h-6" />
                </motion.div>
              </div>
              <p className="text-text-secondary leading-relaxed mb-10 text-lg font-medium">{game.desc}</p>
              
              <div className="mt-auto flex gap-4">
                <button 
                  onClick={handlePlay}
                  className="flex-1 py-5 bg-primary text-white font-bold rounded-[24px] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all flex items-center justify-center gap-3 group/btn active:scale-95"
                >
                  <div className="bg-white/20 p-1.5 rounded-lg group-hover/btn:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                  O'yinni boshlash
                </button>
                <button className="p-5 glass rounded-[24px] text-text-secondary hover:text-primary transition-all active:scale-95">
                  <Target className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leaderboard Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-[48px] p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-[100px]" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 relative z-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-text-primary tracking-tight">Haftalik peshqadamlar</h2>
            <p className="text-text-secondary mt-1 font-medium">Eng ko'p ball to'plagan o'quvchilar ro'yxati.</p>
          </div>
          <button className="text-sm font-bold text-primary flex items-center gap-2 hover:underline group">
            To'liq ro'yxat <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {[
            { rank: 2, name: "Azizbek K.", score: "4,850", avatar: "https://picsum.photos/seed/user1/100/100", color: "bg-slate-800/80 border border-white/5" },
            { rank: 1, name: "Madina O.", score: "5,200", avatar: "https://picsum.photos/seed/user2/100/100", color: "bg-amber-500/10 ring-4 ring-amber-500/10" },
            { rank: 3, name: "Jasur B.", score: "4,120", avatar: "https://picsum.photos/seed/user3/100/100", color: "bg-orange-500/10 border border-orange-500/10" },
          ].sort((a, b) => a.rank - b.rank).map((user, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-8 rounded-[40px] flex flex-col items-center text-center ${user.rank === 1 ? 'glass border-amber-500/30 shadow-[0_12px_36px_rgba(245,158,11,0.08)]' : 'glass border-white/5'}`}
            >
              <div className="relative mb-6">
                <div className={`w-24 h-24 rounded-[32px] overflow-hidden ${user.color}`}>
                  <img src={user.avatar} alt={user.name} referrerPolicy="no-referrer" />
                </div>
                <div className={`absolute -bottom-3 -right-3 w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg ${
                  user.rank === 1 ? 'bg-amber-500' : user.rank === 2 ? 'bg-slate-400' : 'bg-orange-500'
                }`}>
                  {user.rank}
                </div>
              </div>
              <h4 className="text-xl font-bold text-text-primary mb-1">{user.name}</h4>
              <p className="text-sm font-bold text-primary">{user.score} ball</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
