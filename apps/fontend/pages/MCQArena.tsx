
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Timer, 
  Trophy, 
  CheckCircle2, 
  LayoutGrid,
  Send,
  Users,
  Medal
} from 'lucide-react';
import { useStore } from '../store/useUserStore';
import { MCQQuestion, MCQAttempt } from '../types';

const MCQArena: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contests, mcqQuestions, mcqAttempts, currentUser, submitMCQAttempt } = useStore();
  
  const contest = contests.find(c => c.id === id);
  const questions = mcqQuestions.filter(q => q.contestId === id);
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!contest || questions.length === 0) return <div className="p-20 text-center font-bold text-slate-500">Contest not found or no questions.</div>;

  const currentQ = questions[currentIdx];
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelect = (option: string) => {
    setUserAnswers({ ...userAnswers, [currentQ.id]: option });
  };

  const handleSubmit = () => {
    if (!currentUser) return;
    
    let score = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.rightAns) score += 10;
    });

    const attempt: MCQAttempt = {
      contestId: contest.id,
      userId: currentUser.id,
      answers: userAnswers,
      score,
      startTime: Date.now() - (1800 - timeLeft) * 1000,
      endTime: Date.now()
    };

    submitMCQAttempt(attempt);
    navigate(`/mcq-result/${contest.id}`);
  };

  // Dynamic Leaderboard Logic
  const currentLiveScore = Object.keys(userAnswers).filter(qid => {
      const q = questions.find(question => question.id === qid);
      return q && userAnswers[qid] === q.rightAns;
  }).length * 10;

  const leaderboardEntries = [
      ...mcqAttempts.filter(a => a.contestId === id).map(a => ({ name: `User_${a.userId.slice(-2)}`, pts: a.score })),
      { name: currentUser?.username || 'You', pts: currentLiveScore }
  ].sort((a, b) => b.pts - a.pts).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#05070A] flex flex-col md:flex-row">
      {/* Sidebar: Progress & Leaderboard */}
      <aside className="w-full md:w-80 border-r border-white/5 bg-[#0A0D14] flex flex-col shrink-0 overflow-hidden">
        <div className="p-6 border-b border-white/5">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-600/10 rounded-lg"><Trophy className="w-5 h-5 text-blue-500" /></div>
              <h2 className="font-black text-white truncate">{contest.title}</h2>
           </div>
           <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase mb-2">
              <span>Overall Progress</span>
              <span>{Math.round((Object.keys(userAnswers).length / questions.length) * 100)}%</span>
           </div>
           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500 shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
                style={{ width: `${(Object.keys(userAnswers).length / questions.length) * 100}%` }} 
              />
           </div>
        </div>

        <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
           <section className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <LayoutGrid className="w-3.5 h-3.5" /> Navigation
              </h3>
              <div className="grid grid-cols-5 gap-2">
                 {questions.map((_, i) => (
                   <button 
                     key={i}
                     onClick={() => setCurrentIdx(i)}
                     className={`aspect-square rounded-lg text-xs font-bold transition-all border ${
                       currentIdx === i ? 'bg-blue-600 border-blue-500 text-white ring-2 ring-blue-500/20' : 
                       userAnswers[questions[i].id] ? 'bg-blue-600/10 border-blue-600/30 text-blue-400' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                     }`}
                   >
                     {i + 1}
                   </button>
                 ))}
              </div>
           </section>

           <section className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <Users className="w-3.5 h-3.5" /> Live Leaderboard
              </h3>
              <div className="space-y-2">
                 {leaderboardEntries.map((u, i) => (
                   <div key={i} className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                     u.name === (currentUser?.username || 'You') ? 'bg-blue-600/10 border-blue-500/30 ring-1 ring-blue-500/20' : 'bg-white/5 border-white/10'
                   } ${i === 0 ? 'shadow-[0_0_15px_rgba(234,179,8,0.05)]' : ''}`}>
                      <div className="flex items-center gap-2">
                         <div className="w-5 flex justify-center">
                            {i === 0 ? <Medal className="w-3.5 h-3.5 text-yellow-500" /> : 
                             i === 1 ? <Medal className="w-3.5 h-3.5 text-slate-300" /> :
                             i === 2 ? <Medal className="w-3.5 h-3.5 text-amber-700" /> :
                             <span className="text-[10px] font-black text-slate-500">#{i+1}</span>}
                         </div>
                         <span className="text-xs font-bold text-white truncate max-w-[100px]">{u.name}</span>
                      </div>
                      <span className="text-[10px] font-black text-blue-500 uppercase shrink-0">{u.pts} pts</span>
                   </div>
                 ))}
              </div>
           </section>
        </div>
      </aside>

      {/* Main: Question Surface */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-white/5 bg-[#0A0D14]/50 flex items-center justify-between px-8">
           <div className="flex items-center gap-4">
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Question {currentIdx + 1} of {questions.length}</span>
           </div>
           <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${timeLeft < 300 ? 'bg-red-500/10 border-red-500 text-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'bg-blue-500/10 border-blue-500 text-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.1)]'}`}>
              <Timer className="w-4 h-4" />
              <span className="font-black text-sm">{formatTime(timeLeft)}</span>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-20">
           <div className="max-w-3xl mx-auto space-y-12">
              <section className="space-y-4">
                 <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{currentQ.title}</h1>
                 <p className="text-lg text-slate-400 font-medium leading-relaxed">{currentQ.description}</p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[1, 2, 3, 4].map(num => {
                   const optKey = `option${num}` as keyof MCQQuestion;
                   const isSelected = userAnswers[currentQ.id] === optKey;
                   return (
                     <button 
                       key={num}
                       onClick={() => handleSelect(optKey)}
                       className={`p-6 rounded-3xl border text-left transition-all group flex items-start gap-4 ${
                         isSelected ? 'bg-blue-600 border-blue-500 shadow-[0_15px_30px_rgba(37,99,235,0.2)] scale-[1.02]' : 'bg-[#0A0D14] border-white/5 hover:border-white/20'
                       }`}
                     >
                       <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border font-black transition-colors ${
                         isSelected ? 'bg-white text-blue-600 border-white' : 'bg-white/5 border-white/10 text-slate-500 group-hover:text-white group-hover:bg-white/10'
                       }`}>
                          {String.fromCharCode(64 + num)}
                       </div>
                       <span className={`font-bold mt-1 text-lg ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {currentQ[optKey]}
                       </span>
                     </button>
                   );
                 })}
              </div>
           </div>
        </div>

        <footer className="h-24 border-t border-white/5 bg-[#0A0D14] flex items-center justify-between px-8 z-30">
           <button 
             onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
             disabled={currentIdx === 0}
             className="px-6 py-3 text-slate-400 font-black hover:text-white disabled:opacity-30 flex items-center gap-2 transition-colors"
           >
              <ChevronLeft className="w-5 h-5" /> Previous
           </button>
           
           <div className="flex gap-4">
              {currentIdx === questions.length - 1 ? (
                <button 
                  onClick={handleSubmit}
                  className="px-10 py-3 bg-green-600 hover:bg-green-500 rounded-2xl font-black text-sm text-white flex items-center gap-2 transition-all shadow-[0_10px_20px_rgba(34,197,94,0.3)] active:scale-95"
                >
                  <Send className="w-4 h-4" /> Final Submit
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                  className="px-10 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-sm text-white flex items-center gap-2 transition-all active:scale-95"
                >
                   Next Question <ChevronRight className="w-5 h-5" />
                </button>
              )}
           </div>
        </footer>
      </main>
    </div>
  );
};

export default MCQArena;
