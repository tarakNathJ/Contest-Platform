
import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { 
  ChevronLeft, 
  Search, 
  Download, 
  Filter, 
  BarChart3, 
  Users, 
  Trophy, 
  Clock, 
  ArrowUpRight,
  User as UserIcon
} from 'lucide-react';
import { useStore } from '../store/useUserStore';

const AdminContestResults: React.FC = () => {
  const { id } = useParams();
  const { contests, mcqAttempts, mcqQuestions } = useStore();
  
  const contest = contests.find(c => c.id === id);
  const attempts = mcqAttempts.filter(a => a.contestId === id);
  const questions = mcqQuestions.filter(q => q.contestId === id);

  if (!contest) return <div className="p-20 text-center text-slate-500 font-bold">Contest not found.</div>;

  const totalParticipants = attempts.length;
  const avgScore = totalParticipants > 0 
    ? (attempts.reduce((sum, a) => sum + a.score, 0) / totalParticipants).toFixed(1) 
    : 0;
  const maxScore = questions.length * 10;
  const topScore = totalParticipants > 0 ? Math.max(...attempts.map(a => a.score)) : 0;

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <NavLink to="/admin" className="p-2 hover:bg-white/5 rounded-xl text-slate-400 transition-all">
            <ChevronLeft className="w-6 h-6" />
          </NavLink>
          <div>
            <h1 className="text-3xl font-black text-white">{contest.title} Results</h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
               Admin Analytics <span className="w-1 h-1 rounded-full bg-slate-700" /> {totalParticipants} Participants
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-white/10 transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20">
            <Filter className="w-4 h-4" /> Segment
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Avg. Accuracy', value: `${totalParticipants > 0 ? ((Number(avgScore) / maxScore) * 100).toFixed(0) : 0}%`, icon: <BarChart3 />, color: 'text-blue-500' },
          { label: 'Highest Score', value: `${topScore}/${maxScore}`, icon: <Trophy />, color: 'text-yellow-500' },
          { label: 'Total Participated', value: totalParticipants, icon: <Users />, color: 'text-purple-500' },
          { label: 'Avg. Time', value: '14m 2s', icon: <Clock />, color: 'text-green-500' }
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
            <div className="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
               {React.cloneElement(stat.icon as any, { className: 'w-24 h-24' })}
            </div>
            <div className={`w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
              {React.cloneElement(stat.icon as any, { className: 'w-5 h-5' })}
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="text-2xl font-black text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Table Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Participant Rankings</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Filter by name..." 
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs w-64 focus:border-blue-500/50 outline-none transition-all"
            />
          </div>
        </div>

        <div className="glass-card rounded-[2rem] overflow-hidden border border-white/5">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Rank</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">User</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Score</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Accuracy</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Time Taken</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {attempts.sort((a,b) => b.score - a.score).map((a, i) => (
                <tr key={a.userId} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                      i === 0 ? 'bg-yellow-500/20 text-yellow-500' : 
                      i === 1 ? 'bg-slate-300/20 text-slate-300' : 
                      i === 2 ? 'bg-amber-700/20 text-amber-700' : 'bg-white/5 text-slate-500'
                    }`}>
                      #{i + 1}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center border border-white/10 overflow-hidden">
                        <UserIcon className="w-5 h-5 text-white/50" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">User_{a.userId.slice(-4)}</p>
                        <p className="text-[10px] text-slate-500 font-medium">Joined {new Date(a.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-black text-blue-500">{a.score}</span>
                    <span className="text-slate-600 font-bold text-xs ml-1">/ {maxScore}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${a.score >= maxScore * 0.8 ? 'bg-green-500' : a.score >= maxScore * 0.5 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ width: `${(a.score / maxScore) * 100}%` }} 
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-400">{((a.score / maxScore) * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-slate-500">
                    {Math.floor((a.endTime! - a.startTime) / 60000)}m {Math.floor(((a.endTime! - a.startTime) % 60000) / 1000)}s
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2.5 bg-white/5 hover:bg-blue-600/10 hover:text-blue-500 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {attempts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-slate-600 font-bold italic">No participants yet for this contest.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminContestResults;
