
import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  Globe, 
  Share2, 
  MoreHorizontal, 
  Trophy, 
  Target, 
  Zap, 
  Flame,
  FileCode
} from 'lucide-react';
import { useStore } from '../store/useUserStore';

const Profile: React.FC = () => {
  const { username } = useParams();
  const { currentUser } = useStore();

  if (!currentUser) return null;

  // Mock skills radar path calculation
  const getRadarPath = () => {
    const points = currentUser.skills.map((skill, i) => {
      const angle = (i * 2 * Math.PI) / currentUser.skills.length - Math.PI / 2;
      const x = 150 + (skill.value / 100) * 120 * Math.cos(angle);
      const y = 150 + (skill.value / 100) * 120 * Math.sin(angle);
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')} Z`;
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto pb-24 md:pb-8">
      {/* Header Profile Section */}
      <section className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="relative">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-600/20"
          />
          {currentUser.isVerified && (
            <div className="absolute bottom-2 right-2 p-1 bg-[#05070A] rounded-full">
              <CheckCircle2 className="w-6 h-6 text-blue-500 fill-current" />
            </div>
          )}
        </div>

        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">{currentUser.name}</h1>
            <p className="text-slate-400 font-medium">{currentUser.role}</p>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-bold">
            <Globe className="w-4 h-4" />
            Global Rank: #{currentUser.rank}
          </div>

          <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/25">
              Compare Skills
            </button>
            <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
              <MoreHorizontal className="w-6 h-6" />
            </button>
          </div>
        </div>

        <button className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </section>

      {/* Main Grid: Skills Matrix & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Skills Matrix */}
        <section className="lg:col-span-5 glass-card rounded-3xl p-8 flex flex-col items-center">
          <h2 className="text-xl font-bold self-start mb-8 tracking-tight">Skills Matrix</h2>
          <div className="relative w-[300px] h-[300px]">
            {/* Hexagon Grid Layers */}
            <svg viewBox="0 0 300 300" className="w-full h-full opacity-20">
              {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => {
                const points = currentUser.skills.map((_, i) => {
                  const angle = (i * 2 * Math.PI) / currentUser.skills.length - Math.PI / 2;
                  return `${150 + 120 * scale * Math.cos(angle)},${150 + 120 * scale * Math.sin(angle)}`;
                });
                return <polygon key={scale} points={points.join(' ')} fill="none" stroke="white" strokeWidth="1" />;
              })}
              {/* Radial Lines */}
              {currentUser.skills.map((_, i) => {
                const angle = (i * 2 * Math.PI) / currentUser.skills.length - Math.PI / 2;
                return <line key={i} x1="150" y1="150" x2={150 + 120 * Math.cos(angle)} y2={150 + 120 * Math.sin(angle)} stroke="white" strokeWidth="1" />;
              })}
            </svg>
            {/* Data Polygon */}
            <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full">
              <polygon 
                points={getRadarPath().replace('M ', '').replace(' Z', '')} 
                fill="rgba(37, 99, 235, 0.2)" 
                stroke="#2563EB" 
                strokeWidth="2" 
              />
              {/* Text Labels */}
              {currentUser.skills.map((skill, i) => {
                const angle = (i * 2 * Math.PI) / currentUser.skills.length - Math.PI / 2;
                const x = 150 + 140 * Math.cos(angle);
                const y = 150 + 140 * Math.sin(angle);
                return (
                  <text 
                    key={skill.label} 
                    x={x} 
                    y={y} 
                    textAnchor="middle" 
                    alignmentBaseline="middle" 
                    fill="#94A3B8" 
                    className="text-[10px] font-bold uppercase tracking-wider"
                  >
                    {skill.label}
                  </text>
                );
              })}
            </svg>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold">L8 Rustacean</span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-400 text-xs font-bold">L6 Go Gopher</span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-400 text-xs font-bold">L5 Pythonic</span>
          </div>
        </section>

        {/* Stats and Heatmap */}
        <section className="lg:col-span-7 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Contests Won</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold">{currentUser.stats.contestsWon}</span>
                <span className="text-[10px] text-green-500 font-bold flex items-center"><Zap className="w-3 h-3 fill-current" /> +2</span>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Problems Solved</p>
              <span className="text-2xl font-bold">{currentUser.stats.problemsSolved}</span>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Global Percentile</p>
              <span className="text-2xl font-bold text-blue-400">{currentUser.stats.globalPercentile}</span>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Streak Days</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold">{currentUser.stats.streakDays}</span>
                <Flame className="w-5 h-5 text-orange-500 fill-current" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Activity Heatmap</h2>
              <span className="text-xs text-slate-500">Last 6 Months</span>
            </div>
            <div className="flex gap-1 overflow-x-auto pb-4 no-scrollbar">
              {Array.from({ length: 24 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1 shrink-0">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const intensity = Math.random();
                    const opacity = intensity > 0.8 ? 'bg-blue-600' : intensity > 0.5 ? 'bg-blue-600/60' : intensity > 0.2 ? 'bg-blue-600/20' : 'bg-white/5';
                    return <div key={dayIndex} className={`w-3 h-3 rounded-[2px] ${opacity}`} />;
                  })}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4 text-[10px] font-bold text-slate-600 uppercase">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-[2px] bg-white/5" />
                <div className="w-3 h-3 rounded-[2px] bg-blue-600/20" />
                <div className="w-3 h-3 rounded-[2px] bg-blue-600/60" />
                <div className="w-3 h-3 rounded-[2px] bg-blue-600" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Achievements */}
          <section className="space-y-4">
             <h2 className="text-xl font-bold">Achievements & Trophies</h2>
             <div className="grid grid-cols-3 gap-4">
                <div className="glass-card rounded-2xl p-6 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/30">
                    <Trophy className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xs font-bold">Contest Champ</h3>
                    <p className="text-[10px] text-slate-500">Top 10 Global</p>
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-6 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <Target className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xs font-bold">System Master</h3>
                    <p className="text-[10px] text-slate-500">OS Core Expert</p>
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-6 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                    <Zap className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xs font-bold">Speed Coder</h3>
                    <p className="text-[10px] text-slate-500">Sub 10m Solves</p>
                  </div>
                </div>
             </div>
          </section>

          {/* Recent Milestone */}
          <section className="glass-card rounded-3xl p-6 flex items-center gap-5">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/30">
              <FileCode className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Solved "Build Your Own Redis" in Rust</h3>
              <p className="text-xs text-slate-500">2 hours ago • CodeCrafters Track</p>
              <div className="mt-2 flex gap-3 text-[10px] font-bold uppercase tracking-wider">
                <span className="text-green-500">+150 XP</span>
                <span className="text-blue-400">Mastery +2%</span>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Profile;
