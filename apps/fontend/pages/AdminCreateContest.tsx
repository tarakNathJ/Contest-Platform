
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Settings2,
  ListTodo,
  AlertCircle,
  Save,
  Edit2
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useUserStore';
import { Contest, MCQQuestion } from '../types';

const AdminCreateContest: React.FC = () => {
  const navigate = useNavigate();
  const { addContest, addMCQQuestion } = useStore();
  
  const [contestData, setContestData] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    status: 'upcoming' as const,
    difficulty: 'Medium' as const
  });

  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<MCQQuestion>>({
    title: '',
    description: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    rightAns: 'option1'
  });

  const handleStageQuestion = () => {
    if (!currentQuestion.title || !currentQuestion.option1 || !currentQuestion.option2) {
      alert("Required fields missing.");
      return;
    }
    const newQ = { 
      ...currentQuestion as MCQQuestion, 
      id: Math.random().toString(36).substr(2, 9),
      contestId: 'temp'
    };
    setQuestions([...questions, newQ]);
    setCurrentQuestion({
      title: '', description: '', option1: '', option2: '', option3: '', option4: '', rightAns: 'option1'
    });
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleEditQuestion = (q: MCQQuestion) => {
    setCurrentQuestion(q);
    handleDeleteQuestion(q.id);
  };

  const handlePublish = () => {
    if (!contestData.name || questions.length === 0) {
      alert("Incomplete contest data.");
      return;
    }

    const contestId = Math.random().toString(36).substr(2, 9);
    const newContest: Contest = {
      id: contestId,
      title: contestData.name,
      description: contestData.description,
      status: contestData.status,
      participantCount: 0,
      startTime: contestData.startTime,
      endTime: contestData.endTime,
      duration: '30m',
      difficulty: contestData.difficulty,
      type: 'mcq'
    };

    addContest(newContest);
    questions.forEach(q => addMCQQuestion({ ...q, contestId }));
    navigate('/admin');
  };

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto pb-32">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <NavLink to="/admin" className="p-2 hover:bg-white/5 rounded-xl text-slate-400 transition-all"><ChevronLeft className="w-6 h-6" /></NavLink>
          <div>
            <h1 className="text-3xl font-black text-white">Draft MCQ Contest</h1>
            <p className="text-slate-500 font-medium">Build multiple questions for a single event.</p>
          </div>
        </div>
        <button onClick={handlePublish} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-black text-sm flex items-center gap-2 transition-all shadow-xl shadow-blue-600/20">
          <Save className="w-4 h-4" /> Publish Contest
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <section className="glass-card rounded-3xl p-6 space-y-4">
            <h2 className="text-sm font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <Settings2 className="w-4 h-4" /> Global Config
            </h2>
            <input 
              type="text" 
              placeholder="Contest Title" 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm"
              value={contestData.name}
              onChange={e => setContestData({...contestData, name: e.target.value})}
            />
            <textarea 
              placeholder="Description" 
              rows={2} 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm"
              value={contestData.description}
              onChange={e => setContestData({...contestData, description: e.target.value})}
            />
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest px-2">Staged Questions ({questions.length})</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {questions.map((q, idx) => (
                <div key={q.id} className="glass-card rounded-2xl p-4 border border-white/5 group flex items-center justify-between">
                  <div className="flex-1 truncate mr-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter mb-0.5">Q#{idx+1}</p>
                    <p className="font-bold text-sm text-white truncate">{q.title}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEditQuestion(q)} className="p-2 text-slate-500 hover:text-blue-400"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDeleteQuestion(q.id)} className="p-2 text-slate-500 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-7">
          <section className="glass-card rounded-[2.5rem] p-8 md:p-12 border-blue-500/10">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-black text-white">Question Builder</h2>
               <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-600/20 flex items-center justify-center font-black text-blue-500">
                  {questions.length + 1}
               </div>
            </div>

            <div className="space-y-6">
              <input 
                type="text" 
                placeholder="Question Title (e.g., What is closure?)" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-bold focus:border-blue-500/50 outline-none"
                value={currentQuestion.title}
                onChange={e => setCurrentQuestion({...currentQuestion, title: e.target.value})}
              />
              <textarea 
                placeholder="Question context/details..." 
                rows={3} 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm"
                value={currentQuestion.description}
                onChange={e => setCurrentQuestion({...currentQuestion, description: e.target.value})}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(num => (
                  <div key={num} className={`relative p-1 rounded-2xl border transition-all ${currentQuestion.rightAns === `option${num}` ? 'border-green-500/50 bg-green-500/5' : 'border-white/5'}`}>
                    <div className="flex items-center justify-between px-3 py-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase">Option {num}</span>
                      <button 
                        onClick={() => setCurrentQuestion({...currentQuestion, rightAns: `option${num}`})}
                        className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${currentQuestion.rightAns === `option${num}` ? 'bg-green-600 text-white' : 'text-slate-600 hover:text-slate-400'}`}
                      >
                        Correct Ans
                      </button>
                    </div>
                    <input 
                      type="text" 
                      className="w-full bg-transparent p-3 text-sm outline-none" 
                      placeholder={`Choice ${num}...`}
                      value={(currentQuestion as any)[`option${num}`]}
                      onChange={e => setCurrentQuestion({...currentQuestion, [`option${num}`]: e.target.value})}
                    />
                  </div>
                ))}
              </div>

              <button 
                onClick={handleStageQuestion}
                className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-blue-400 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Plus className="w-5 h-5" /> Stage Question
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateContest;
