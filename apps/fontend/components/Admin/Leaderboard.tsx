import { LEADERBOARD } from '@/constants';
import React from 'react'

export default function Leaderboard() {
  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div className="flex items-center justify-between">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-black text-white">Live Dashboard</h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                 <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                 Live Monitoring
              </div>
           </div>
           <p className="text-slate-500">Tracking 1,240 active participants in real-time.</p>
        </div>
        <button className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-black transition-all">
           End Contest
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
         {[
           { label: 'Total Participants', val: '1,240', color: 'text-blue-500' },
           { label: 'Avg. Accuracy', val: '72%', color: 'text-emerald-500' },
           { label: 'Questions Completed', val: '8,421', color: 'text-orange-500' },
           { label: 'Time Remaining', val: '08:42', color: 'text-white' }
         ].map(stat => (
           <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">{stat.label}</p>
              <p className={`text-3xl font-black ${stat.color}`}>{stat.val}</p>
           </div>
         ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-800 bg-slate-950/30 flex justify-between items-center">
           <h3 className="font-bold">Real-time Ranking</h3>
           <div className="flex gap-4">
              <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Completing</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Working</div>
           </div>
        </div>
        <div className="p-0">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase text-slate-500 tracking-widest border-b border-slate-800">
                <th className="px-8 py-4">Participant</th>
                <th className="px-8 py-4">Progress</th>
                <th className="px-8 py-4">Points</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {LEADERBOARD.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700"></div>
                       <div>
                          <p className="text-sm font-bold text-white">{user.username}</p>
                          <p className="text-[10px] text-slate-500">Active for 4 mins</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                       <div className="flex-1 bg-slate-950 h-2 rounded-full overflow-hidden min-w-[120px]">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${user.progressPercentage}%` }}></div>
                       </div>
                       <span className="text-xs font-bold text-slate-400">{user.progressPercentage}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-black text-white">{user.points} XP</td>
                  <td className="px-8 py-5 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
