
import React from 'react';
import { 
  Plus, 
  Users, 
  Trophy, 
  Activity, 
  ExternalLink, 
  Settings,
  AlertCircle,
  BarChart3,
  PieChart
} from 'lucide-react';
import { useStore } from '../store/useUserStore';
import { NavLink } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
//   const { contests, problems, mcqAttempts } = useStore();

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-black mb-2 text-white">Admin Command Console</h1>
           <p className="text-slate-500 font-medium">Manage competitions, review results, and publish challenges.</p>
        </div>
        <div className="flex gap-4">
           <NavLink to="/admin/create" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-black text-sm flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20">
              <Plus className="w-4 h-4" /> Create Contest
           </NavLink>
        </div>
      </div>

      {/* Admin Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Total Active Users ', value: '45.2k', change: '+12%', icon: <Users /> },
           { label: 'Live Contests', value: contests.filter(c => c.status === 'live').length, change: 'Stable', icon: <Activity /> },
           { label: 'Platform Attempts', value: mcqAttempts.length, change: '+15%', icon: <AlertCircle /> },
           { label: 'Platform Health', value: '99.9%', change: 'Optimal', icon: <BarChart3 /> }
         ].map((stat, i) => (
           <div key={i} className="glass-card rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                 <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-slate-400">
                    {React.cloneElement(stat.icon as any, { className: 'w-5 h-5' })}
                 </div>
                 <span className={`text-[10px] font-bold ${stat.change.includes('+') ? 'text-green-500' : 'text-slate-500'}`}>{stat.change}</span>
              </div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="text-2xl font-black text-white">{stat.value}</div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Live Contest Table */}
         <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-bold text-white">Manage Contests</h2>
               <button className="text-sm font-bold text-blue-500 hover:underline transition-all">View All History</button>
            </div>
            <div className="glass-card rounded-3xl overflow-hidden border border-white/5">
               <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/10">
                     <tr>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Contest Name</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Participants</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {contests.map(c => {
                       const attemptCount = mcqAttempts.filter(a => a.contestId === c.id).length;
                       return (
                        <tr key={c.id} className="hover:bg-white/5 transition-colors group">
                           <td className="px-6 py-4">
                              <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{c.title}</p>
                              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">{c.startTime} • {c.duration}</p>
                           </td>
                           <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${c.status === 'live' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-slate-500/10 text-slate-500 border border-slate-500/20'}`}>
                                 {c.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-sm font-black text-slate-400">
                              {attemptCount > 0 ? attemptCount : c.participantCount}
                           </td>
                           <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                 {c.type === 'mcq' && (
                                   <NavLink 
                                     to={`/admin/results/${c.id}`} 
                                     className="p-2 hover:bg-blue-600/10 rounded-lg text-blue-500 transition-all flex items-center gap-1.5"
                                     title="View Analytics"
                                   >
                                      <PieChart className="w-4 h-4" />
                                      <span className="text-[10px] font-black uppercase">Results</span>
                                   </NavLink>
                                 )}
                                 <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-all"><Settings className="w-4 h-4" /></button>
                                 <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-all"><ExternalLink className="w-4 h-4" /></button>
                              </div>
                           </td>
                        </tr>
                       );
                     })}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Problem Spotlight */}
         <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-bold text-white">Recent Problems</h2>
               <NavLink to="/admin/problems" className="text-sm font-bold text-blue-500 hover:underline transition-all">Manage All</NavLink>
            </div>
            <div className="space-y-4">
               {problems.slice(0, 3).map(p => (
                 <div key={p.id} className="glass-card rounded-2xl p-5 hover:border-blue-500/30 transition-all cursor-pointer group border-white/5 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3 relative z-10">
                       <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${p.difficulty === 'Easy' ? 'border-green-500/30 text-green-500' : p.difficulty === 'Medium' ? 'border-orange-500/30 text-orange-500' : 'border-red-500/30 text-red-500'} uppercase tracking-tighter`}>
                          {p.difficulty}
                       </span>
                       <span className="text-[10px] font-bold text-slate-500">{p.acceptanceRate} ACC.</span>
                    </div>
                    <h4 className="font-bold text-sm mb-1 group-hover:text-blue-400 transition-colors relative z-10">{p.title}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-bold relative z-10 tracking-widest">{p.category}</p>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-[40px] rounded-full translate-x-12 -translate-y-12" />
                 </div>
               ))}
               <button className="w-full py-5 border border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-600/5 rounded-2xl text-[10px] font-black text-slate-500 hover:text-blue-400 transition-all uppercase tracking-[0.2em]">
                  + Create New Challenge
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
