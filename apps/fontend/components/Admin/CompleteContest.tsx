import { LEADERBOARD } from '@/constants';
import { Award, ChevronRight, Share2 } from 'lucide-react';
import React from 'react'

export default function CompleteContest() {
    function setCurrentView(arg0: string) {
        throw new Error('Function not implemented.');
    }

  return(
    <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col items-center text-center">
         <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-900/40 mb-6">
            <Award size={48} className="text-white" />
         </div>
         <h2 className="text-4xl font-black text-white mb-2">Contest Finished</h2>
         <p className="text-slate-500 max-w-lg mb-8">The final results are verified and published to participant profiles.</p>
         <div className="flex gap-4">
            <button className="px-8 py-4 bg-white text-black font-black rounded-2xl flex items-center gap-2 hover:bg-slate-200 transition-all">
               <Share2 size={18} /> Export Results
            </button>
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="px-8 py-4 bg-slate-800 text-white font-black rounded-2xl hover:bg-slate-700 transition-all"
            >
               Back to Arena List
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-xl font-bold text-white">Final Standings</h3>
           <div className="space-y-4">
              {LEADERBOARD.map((user, idx) => (
                <div key={user.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-center justify-between group hover:bg-slate-800/50 transition-all">
                   <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${
                        idx === 0 ? 'bg-amber-500 text-amber-950 shadow-lg shadow-amber-500/20' : 
                        idx === 1 ? 'bg-slate-400 text-slate-950' : 
                        idx === 2 ? 'bg-orange-700 text-orange-200' : 'bg-slate-950 text-slate-500'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800"></div>
                      <div>
                        <h4 className="font-black text-white text-lg">{user.username}</h4>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{user.points} XP • Accuracy: {user.accuracy}%</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      {idx === 0 && <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-black rounded-full border border-amber-500/20 uppercase">Winner</span>}
                      <ChevronRight className="text-slate-700 group-hover:text-blue-500 transition-colors" />
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-xl font-bold text-white">Insights</h3>
           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Hardest Question</p>
                 <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm italic text-slate-400">
                    "Which property of the CAP theorem states that every request receives..."
                    <p className="not-italic text-xs font-bold text-red-500 mt-2">Only 12% correct</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
