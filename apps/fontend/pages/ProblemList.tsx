
import React from 'react';
import { useStore } from '../store/useUserStore';
import { NavLink } from 'react-router-dom';
import { Search, Filter, CheckCircle2, ChevronRight, Play } from 'lucide-react';

const ProblemList: React.FC = () => {
  const { problems } = useStore();

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-xl">
           <h1 className="text-4xl font-black mb-4">Practice Grounds</h1>
           <p className="text-slate-500 font-medium">Hone your skills with 2,000+ curated problems ranging from simple algorithms to complex systems architecture.</p>
        </div>
        <div className="flex gap-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" placeholder="Search problems..." className="w-full md:w-80 bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-blue-500/50 transition-all" />
           </div>
           <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all">
              <Filter className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
         {/* Categories Sidebar */}
         <div className="lg:col-span-3 space-y-6">
            <div className="glass-card rounded-3xl p-6 space-y-6">
               <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-white/5 pb-4">Categories</h4>
               <nav className="space-y-1">
                  {['All Problems', 'Data Structures', 'Algorithms', 'Systems', 'Networking', 'Security'].map(cat => (
                    <button key={cat} className={`w-full text-left px-4 py-2 text-sm font-bold rounded-xl transition-all ${cat === 'All Problems' ? 'bg-blue-600/10 text-blue-400' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
                       {cat}
                    </button>
                  ))}
               </nav>
            </div>

            <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-indigo-900/20 to-transparent">
               <h4 className="text-sm font-black text-white mb-2">Pro Mastery</h4>
               <p className="text-xs text-slate-500 mb-4">Unlock 200+ exclusive systems design problems.</p>
               <button className="w-full py-2.5 bg-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest">Upgrade to Pro</button>
            </div>
         </div>

         {/* Problem Grid */}
         <div className="lg:col-span-9 space-y-4">
            {problems.map(p => (
              <NavLink 
                key={p.id} 
                to={`/practice/${p.id}`}
                className="block glass-card rounded-2xl p-6 hover:translate-x-1 hover:border-blue-500/30 transition-all border border-white/5 group"
              >
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-blue-600/20 transition-all">
                      <Play className="w-5 h-5 text-slate-500 group-hover:text-blue-400" />
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                         <h3 className="font-bold text-lg">{p.title}</h3>
                         <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${p.difficulty === 'Easy' ? 'text-green-500 bg-green-500/10' : p.difficulty === 'Medium' ? 'text-orange-500 bg-orange-500/10' : 'text-red-500 bg-red-500/10'}`}>
                            {p.difficulty}
                         </span>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                            {p.tags.map(tag => <span key={tag} className="px-2 py-0.5 bg-white/5 rounded border border-white/10">{tag}</span>)}
                         </div>
                         <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{p.solvedCount.toLocaleString()} Solves</span>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-xl font-black text-blue-500">{p.acceptanceRate}</div>
                      <p className="text-[10px] font-bold text-slate-600 uppercase">Acceptance</p>
                   </div>
                   <div className="pl-4">
                      <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
                   </div>
                </div>
              </NavLink>
            ))}
         </div>
      </div>
    </div>
  );
};

export default ProblemList;
