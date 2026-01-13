
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Trophy, ChevronRight, Zap, Play, Code2, Flame, Star, TrendingUp, BookOpen } from 'lucide-react';
import { useStore } from '../store/useUserStore';

const Home: React.FC = () => {
  const { contests } = useStore();
  const liveContests = contests.filter(c => c.status === 'live');

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-7xl mx-auto pb-24 md:pb-10">
      {/* Dynamic Hero Section */}
      <section className="relative group rounded-[2.5rem] bg-gradient-to-br from-indigo-900/60 via-slate-900 to-black border border-white/10 p-10 md:p-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-8 border border-blue-500/20">
            <TrendingUp className="w-3.5 h-3.5" /> Platform Live Now
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-white">
            Forge Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Legend in Code.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
            Join 1.2M+ developers building high-performance systems and competing for global recognition.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black transition-all shadow-xl shadow-blue-600/30 active:scale-95">
              Enter Arena
            </button>
            <button className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black transition-all backdrop-blur-md">
              View Tracks
            </button>
          </div>
        </div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full group-hover:bg-blue-500/30 transition-all duration-700" />
      </section>

      {/* Bento Grid Discover */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {/* MCQ Highlight Card (New) */}
        {liveContests.find(c => c.type === 'mcq') && (
          <div className="md:col-span-4 lg:col-span-3 glass-card rounded-[2rem] p-8 border-purple-500/20 relative group overflow-hidden flex flex-col justify-between bg-gradient-to-br from-purple-900/10 to-transparent">
             <div className="absolute top-0 right-0 p-6">
                <span className="px-3 py-1 bg-purple-600 text-[10px] font-black text-white rounded-full flex items-center gap-1.5 animate-pulse">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" /> LIVE MCQ
                </span>
             </div>
             <div>
                <p className="text-purple-400 text-xs font-black uppercase tracking-widest mb-2">Technical Quiz</p>
                <h3 className="text-3xl font-black mb-4">JS Engine Internals</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">30 questions on V8 optimizations, JIT, and memory management. High stakes, live leaderboard.</p>
             </div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                   <div className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> 30 Qs</div>
                   <div className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-yellow-500" /> 500 Pts</div>
                </div>
                <NavLink 
                  to="/arena/mcq-demo" 
                  className="px-8 py-3 bg-purple-600 text-white rounded-xl font-black text-sm hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/20"
                >
                  Enter Arena
                </NavLink>
             </div>
          </div>
        )}

        {/* Community Poll */}
        <div className="md:col-span-2 lg:col-span-3 glass-card rounded-[2rem] p-8 flex flex-col justify-between bg-gradient-to-br from-white/5 to-transparent">
           <h4 className="text-xl font-bold mb-6">Community Pulse</h4>
           <div className="space-y-4">
              {[
                { label: 'Rust + Axum', v: 48 },
                { label: 'Go + Fiber', v: 32 },
                { label: 'Node + Hono', v: 20 }
              ].map(opt => (
                <div key={opt.label} className="space-y-2 group cursor-pointer">
                  <div className="flex justify-between text-xs font-bold text-slate-400 group-hover:text-blue-400 transition-colors">
                    <span>{opt.label}</span>
                    <span>{opt.v}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-1000 ease-out" style={{ width: `${opt.v}%` }} />
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Small Spotlight Cards */}
        <div className="md:col-span-2 lg:col-span-2 glass-card rounded-[2rem] p-6 hover:translate-y-[-5px] transition-all">
           <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-4">
              <Flame className="w-6 h-6 text-orange-500 fill-current" />
           </div>
           <h5 className="font-black text-lg mb-1">Daily Streak</h5>
           <p className="text-sm text-slate-500 mb-4">Maintain your multiplier.</p>
           <div className="text-2xl font-black text-white">45 Days</div>
        </div>

        <div className="md:col-span-2 lg:col-span-2 glass-card rounded-[2rem] p-6 hover:translate-y-[-5px] transition-all border-purple-500/20">
           <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-purple-500 fill-current" />
           </div>
           <h5 className="font-black text-lg mb-1">Dev of the Week</h5>
           <div className="flex items-center gap-3 mt-4">
              <img src="https://picsum.photos/seed/hero/40/40" className="w-10 h-10 rounded-full" alt="" />
              <div>
                 <p className="text-sm font-bold text-white">@zen_master</p>
                 <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Global Top 5</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
