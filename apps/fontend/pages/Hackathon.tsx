import React from 'react';
import { 
  Eye, 
  TrendingUp, 
  MessageSquare, 
  CheckCircle2, 
  Heart, 
  ThumbsUp, 
  UserPlus,
  // Fixed: Added ChevronRight to imports
  ChevronRight
} from 'lucide-react';
import { LeaderboardEntry } from '../types';

const Hackathon: React.FC = () => {
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, username: 'alex_codes', title: 'PRO', points: 2840, avatar: 'https://picsum.photos/seed/alex/100/100', isPro: true },
    { rank: 2, username: 'sarah_dev', title: 'Python Expert', points: 2715, avatar: 'https://picsum.photos/seed/sarah/100/100' },
    { rank: 3, username: 'jen_cloud', title: 'AWS Wizard', points: 2650, avatar: 'https://picsum.photos/seed/jen/100/100' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto pb-24 md:pb-8">
      {/* Live Header */}
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          <h1 className="text-2xl font-extrabold tracking-tight">Hackathon Finals</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-xs font-bold text-slate-400">
           <Eye className="w-4 h-4 text-blue-400" /> 1.2k
        </div>
      </section>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Hype Index Chart */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
               <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Hype Index</p>
                  <h2 className="text-4xl font-black text-blue-500">98%</h2>
               </div>
               <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-green-500 font-bold text-sm">
                    <TrendingUp className="w-4 h-4" /> +5.2%
                  </div>
                  <p className="text-[10px] text-slate-500">Real-time sentiment</p>
               </div>
            </div>
            
            <div className="flex items-end gap-2 h-40">
               {[0.4, 0.6, 0.3, 0.7, 0.5, 0.9, 0.8, 1, 0.7, 0.8].map((v, i) => (
                 <div key={i} className="flex-1 bg-blue-600/20 rounded-t-lg transition-all hover:bg-blue-600 cursor-pointer" style={{ height: `${v * 100}%` }} />
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="glass-card rounded-2xl p-6">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Top Score</p>
                <div className="text-2xl font-bold">2,840</div>
                <p className="text-[10px] text-green-500 font-bold">+120</p>
             </div>
             <div className="glass-card rounded-2xl p-6">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Participants</p>
                <div className="text-2xl font-bold">428</div>
                <p className="text-[10px] text-blue-400 font-bold">Live Now</p>
             </div>
             <div className="glass-card rounded-2xl p-6">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Avg. Completion</p>
                <div className="text-2xl font-bold">64%</div>
                <p className="text-[10px] text-green-500 font-bold">+2%</p>
             </div>
          </div>

          {/* Leaderboard */}
          <section className="space-y-6">
             <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex gap-8">
                   {['Leaderboard', 'Q&A', 'Submissions'].map((t, i) => (
                     <button key={t} className={`text-sm font-bold transition-colors ${i === 0 ? 'text-blue-500 border-b-2 border-blue-500 pb-2 -mb-2.5' : 'text-slate-500 hover:text-white'}`}>{t}</button>
                   ))}
                </div>
             </div>

             <div className="space-y-4">
                {leaderboard.map((user) => (
                  <div key={user.username} className={`p-4 rounded-2xl border flex items-center gap-4 transition-all hover:translate-x-1 ${user.rank === 1 ? 'bg-blue-900/10 border-blue-500/30' : 'bg-white/5 border-white/10'}`}>
                    <div className="relative">
                      <img src={user.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white/10" alt="" />
                      {user.rank === 1 && <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] text-black font-black">1</div>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                         <h3 className="font-bold">{user.username}</h3>
                         {user.isPro && <span className="px-1.5 py-0.5 bg-blue-600 rounded text-[8px] font-black text-white">PRO</span>}
                      </div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Rank #{user.rank} • {user.title}</p>
                    </div>
                    <div className="text-right">
                       <div className="text-xl font-bold text-blue-400">{user.points.toLocaleString()}</div>
                       <div className="text-[10px] font-bold text-slate-600 uppercase">pts</div>
                    </div>
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Live Q&A Section */}
        <div className="lg:col-span-4 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                Live Q&A
                <span className="text-[10px] font-bold text-blue-400 px-2 py-0.5 bg-blue-600/10 rounded">3 New</span>
              </h2>
           </div>

           <div className="glass-card rounded-3xl p-6 space-y-6">
              <div className="space-y-4">
                 {[1, 2].map(i => (
                   <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                      <div className="flex items-center gap-2">
                         <img src={`https://picsum.photos/seed/q${i}/24/24`} className="w-6 h-6 rounded-full" alt="" />
                         <span className="text-xs font-bold text-slate-400">dev_mindset</span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">How can we optimize the container's memory architecture more?</p>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                         <button className="flex items-center gap-1.5 hover:text-blue-400"><ThumbsUp className="w-3.5 h-3.5" /> 24</button>
                         <button className="hover:text-blue-400">Reply</button>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="pt-4 flex gap-3">
                 <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
                    <MessageSquare className="w-5 h-5" />
                    Ask Question
                 </button>
                 <button className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all text-slate-400 active:scale-95">
                    <Heart className="w-6 h-6" />
                 </button>
              </div>
           </div>

           {/* Quick Actions */}
           <div className="glass-card rounded-2xl p-6 flex items-center justify-between group cursor-pointer hover:border-blue-500/30 transition-all">
              <div className="flex items-center gap-4">
                 <div className="p-2 bg-blue-600/10 rounded-lg"><UserPlus className="w-5 h-5 text-blue-500" /></div>
                 <div>
                    <h4 className="text-sm font-bold">Invite to Team</h4>
                    <p className="text-[10px] text-slate-500">Collaborate with alex_codes</p>
                 </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hackathon;