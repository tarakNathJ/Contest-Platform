
import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Trophy, Home, RotateCcw, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useStore } from '../store/useUserStore';

const MCQResult: React.FC = () => {
  const { id } = useParams();
  const { mcqAttempts, mcqQuestions, contests, currentUser } = useStore();
  
  const contest = contests.find(c => c.id === id);
  const attempt = mcqAttempts.find(a => a.contestId === id && a.userId === currentUser?.id);
  const questions = mcqQuestions.filter(q => q.contestId === id);

  if (!attempt || !contest) return <div className="p-20 text-center">No attempt found.</div>;

  const totalQuestions = questions.length;
  const correctCount = attempt.score / 10;
  const accuracy = (correctCount / totalQuestions) * 100;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10 py-20">
      <div className="text-center space-y-4">
         <div className="w-24 h-24 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-yellow-500" />
         </div>
         <h1 className="text-4xl font-black text-white">Contest Completed!</h1>
         <p className="text-slate-500 font-medium text-lg">You've finished <span className="text-white">{contest.title}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass-card rounded-[2rem] p-8 text-center space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Points</p>
            <div className="text-4xl font-black text-blue-500">{attempt.score}</div>
         </div>
         <div className="glass-card rounded-[2rem] p-8 text-center space-y-2 border-green-500/20">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Accuracy</p>
            <div className="text-4xl font-black text-green-500">{Math.round(accuracy)}%</div>
         </div>
         <div className="glass-card rounded-[2rem] p-8 text-center space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Time Taken</p>
            <div className="text-4xl font-black text-slate-200">12:42</div>
         </div>
      </div>

      <section className="space-y-6">
         <h2 className="text-xl font-bold border-b border-white/5 pb-4">Performance Breakdown</h2>
         <div className="space-y-4">
            {questions.map((q, i) => {
              const userAns = attempt.answers[q.id];
              const isCorrect = userAns === q.rightAns;
              return (
                <div key={q.id} className={`glass-card rounded-2xl p-6 border ${isCorrect ? 'border-green-500/10' : 'border-red-500/10'}`}>
                   <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-500 uppercase">Question {i+1}</p>
                        <h4 className="font-bold text-white">{q.title}</h4>
                      </div>
                      {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                   </div>
                   <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                         <p className="text-[8px] font-black text-slate-500 uppercase">Your Answer</p>
                         <p className={`text-sm font-bold ${isCorrect ? 'text-green-500' : 'text-red-400'}`}>{(q as any)[userAns] || 'Skipped'}</p>
                      </div>
                      {!isCorrect && (
                        <div className="px-4 py-2 bg-green-500/10 rounded-xl border border-green-500/20">
                           <p className="text-[8px] font-black text-green-500 uppercase">Correct Answer</p>
                           <p className="text-sm font-bold text-green-500">{(q as any)[q.rightAns]}</p>
                        </div>
                      )}
                   </div>
                </div>
              );
            })}
         </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-4 pt-10">
         <NavLink to="/" className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-center flex items-center justify-center gap-2">
            <Home className="w-4 h-4" /> Back to Dashboard
         </NavLink>
         <NavLink to={`/arena/${contest.id}`} className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-center text-white shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" /> Review Answers
         </NavLink>
      </div>
    </div>
  );
};

export default MCQResult;
