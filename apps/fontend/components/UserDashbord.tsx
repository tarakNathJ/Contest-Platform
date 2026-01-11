import React from "react";

export default function UserDashbord() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-10">
      {/* User Profile Stats Header */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">
            Arenas Attempted
          </p>
          <p className="text-3xl font-black text-white">12</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">
            Average Rank
          </p>
          <p className="text-3xl font-black text-blue-500">#42</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">
            Total Points
          </p>
          <p className="text-3xl font-black text-orange-500">2,840</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">
            Daily Streak
          </p>
          <p className="text-3xl font-black text-white">12 Days</p>
        </div>
      </div>

      <div className="flex gap-10">
        <div className="flex-1 space-y-10">
          {/* Live Contests For Users */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white">
                Available Contests
              </h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Join Now
              </div>
            </div>
            {/* <div className="space-y-4">
              {MOCK_CONTESTS.filter((c) => c.status === "live").map(
                (contest) => (
                  <div
                    key={contest.id}
                    onClick={() => setCurrentView("user-attempt-contest")}
                    className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex items-center justify-between group hover:border-blue-500/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/40 group-hover:scale-105 transition-transform">
                        <Trophy size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">
                          {contest.title}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1 max-w-md line-clamp-1">
                          {contest.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">
                          <Timer size={14} /> 15 Mins
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users size={14} /> 842
                        </span>
                      </div>
                      <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-sm shadow-xl shadow-blue-900/20 transition-all">
                        Attempt Now
                      </button>
                    </div>
                  </div>
                )
              )}
            </div> */}
          </section>

          {/* Participation History */}
          <section>
            <h2 className="text-2xl font-black text-white mb-6">
              Recent Participation
            </h2>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-950/30 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  <tr>
                    <th className="px-8 py-4">Arena Name</th>
                    <th className="px-8 py-4">Rank</th>
                    <th className="px-8 py-4">Accuracy</th>
                    <th className="px-8 py-4 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {/* {MOCK_CONTESTS.filter((c) => c.status === "completed").map(
                    (c, idx) => (
                      <tr
                        key={c.id}
                        className="hover:bg-slate-800/20 transition-colors group cursor-pointer"
                        onClick={() =>
                          setCurrentView("admin-final-leaderboard")
                        }
                      >
                        <td className="px-8 py-5">
                          <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                            {c.title}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            Completed Oct {idx + 12}, 2024
                          </p>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-sm font-black text-white">
                            #{idx * 12 + 42}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-16 bg-slate-950 h-1.5 rounded-full">
                              <div
                                className="bg-blue-600 h-full rounded-full"
                                style={{ width: `${88 - idx * 5}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold text-slate-400">
                              {88 - idx * 5}%
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right font-black text-blue-500">
                          + {250 - idx * 40} XP
                        </td>
                      </tr>
                    )
                  )} */}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="w-80 space-y-6 hidden 2xl:block">
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
            {/* <h3 className="font-bold mb-4 flex items-center gap-2">
              <Zap size={18} className="text-blue-500" /> Mastery Progress
            </h3>
            <div className="space-y-6">
              {MOCK_CHALLENGES.map((ch) => (
                <div key={ch.id} className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold uppercase">
                    <span className="text-slate-300">{ch.title}</span>
                    <span className="text-blue-500">{ch.progress}/12</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${(ch.progress / 12) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
