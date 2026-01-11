
import React, { useState, useEffect } from 'react';
import {
  Compass,
  BarChart3,
  Code2,
  User as UserIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  Share2,
  Bookmark,
  Terminal,
  Clock,
  CheckCircle2,
  Lock,
  Play,
  Zap,
  Trophy,
  Plus,
  Search,
  Bell,
  Layers,
  LayoutDashboard,
  Cpu,
  PlusCircle,
  Eye,
  Activity,
  Award,
  Trash2,
  Save,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  History,
  Timer,
  Users
} from 'lucide-react';
import Header from './components/Header';
import SkillsRadar from './components/RadarChart';
import { AppView, Challenge, MCQ, Contest, ContestParticipant } from './types';
import { MOCK_CHALLENGES, SKILLS_MATRIX, ACHIEVEMENTS, POLL_OPTIONS, LEADERBOARD, MOCK_CONTEST, MOCK_CONTESTS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [role, setRole] = useState<'user' | 'admin'>('user');

  // MCQ User State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isContestFinished, setIsContestFinished] = useState(false);

  // Admin Create State


  const NavItem = ({ icon: Icon, label, view }: { icon: any, label: string, view: AppView }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
        currentView === view 
          ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' 
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
      }`}
    >
      <Icon size={20} className={currentView === view ? 'text-blue-500' : 'group-hover:text-white'} />
      {!isSidebarCollapsed && <span className="text-sm font-semibold">{label}</span>}
    </button>
  );
    const currentQ = MOCK_CONTEST.questions[currentQuestionIndex];
    return (
      <div className="animate-in fade-in duration-500 max-w-4xl mx-auto py-12">
        <div className="flex items-center justify-between mb-12">
           <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center font-black text-xl">
                 {currentQuestionIndex + 1}
              </div>
              <div>
                 <h2 className="text-2xl font-black text-white">{MOCK_CONTEST.title}</h2>
                 <div className="flex gap-3 items-center mt-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {MOCK_CONTEST.questions.length}</span>
                 </div>
              </div>
           </div>
           <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl shadow-inner">
              <Clock size={18} className="text-blue-500" />
              <span className="text-xl font-black text-white tracking-tighter">14:28</span>
           </div>
        </div>

        <div className="w-full bg-slate-900 h-2 rounded-full mb-16 overflow-hidden">
           <div 
              className="bg-blue-600 h-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
              style={{ width: `${((currentQuestionIndex + 1) / MOCK_CONTEST.questions.length) * 100}%` }}
           ></div>
        </div>

        <div className="space-y-12">
           <h3 className="text-3xl font-black text-white leading-tight">{currentQ.question}</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentQ.options.map((opt, idx) => (
                <button 
                  key={idx}
                  onClick={() => {
                    const nextAnswers = [...userAnswers];
                    nextAnswers[currentQuestionIndex] = idx;
                    setUserAnswers(nextAnswers);
                  }}
                  className={`group p-8 rounded-[2.5rem] border-2 text-left transition-all relative overflow-hidden active:scale-[0.98] ${
                    userAnswers[currentQuestionIndex] === idx 
                      ? 'bg-blue-600 border-blue-600 shadow-2xl shadow-blue-600/20' 
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className={`text-xs font-black uppercase tracking-widest mb-4 ${
                    userAnswers[currentQuestionIndex] === idx ? 'text-blue-200' : 'text-slate-500'
                  }`}>
                    Option {String.fromCharCode(65 + idx)}
                  </div>
                  <div className={`text-xl font-bold leading-snug ${
                    userAnswers[currentQuestionIndex] === idx ? 'text-white' : 'text-slate-300'
                  }`}>
                    {opt}
                  </div>
                </button>
              ))}
           </div>

           <div className="flex items-center justify-between pt-8 border-t border-slate-800">
              <button 
                 disabled={currentQuestionIndex === 0}
                 onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                 className="px-8 py-4 text-slate-500 font-bold hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                 Previous Question
              </button>
              
              {currentQuestionIndex === MOCK_CONTEST.questions.length - 1 ? (
                <button 
                   onClick={() => setIsContestFinished(true)}
                   className="px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-3xl shadow-xl shadow-emerald-900/20 transition-all flex items-center gap-3 active:scale-95"
                >
                   Finish & Submit <ArrowRight size={20} />
                </button>
              ) : (
                <button 
                   onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                   className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-3xl shadow-xl shadow-blue-900/20 transition-all flex items-center gap-3 active:scale-95"
                >
                   Next Question <ArrowRight size={20} />
                </button>
              )}
           </div>
        </div>
      </div>
    );
  };

  const renderCodeEditor = () => (
    <div className="animate-in fade-in duration-500 bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">
      <Code2 size={48} className="text-blue-500 mx-auto mb-6" />
      <h2 className="text-3xl font-black text-white mb-4">Workspace Environment</h2>
      <p className="text-slate-400 max-w-lg mx-auto mb-8">
        Your integrated systems playground is being initialized. 
        Soon you'll be able to build kernel modules and distributed systems directly in the browser.
      </p>
      <button 
        onClick={() => setCurrentView('dashboard')}
        className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all"
      >
        Return to Dashboard
      </button>
    </div>
  );

  const renderProfile = () => (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-12 flex items-center gap-12">
        <div className="w-48 h-48 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 shadow-2xl">
          <img src="https://picsum.photos/seed/alex/400" className="w-full h-full object-cover" alt="Profile" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-5xl font-black text-white">Alex Rivera</h2>
            <span className="px-4 py-1.5 bg-blue-600 text-white text-xs font-black rounded-full uppercase tracking-widest">Elite</span>
          </div>
          <p className="text-xl text-slate-500 font-medium mb-8">Full-stack Systems Engineer • SF, CA</p>
          <div className="flex gap-4">
             <div className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-3">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total XP</p>
                <p className="text-2xl font-black text-blue-500">12,450</p>
             </div>
             <div className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-3">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Global Rank</p>
                <p className="text-2xl font-black text-white">#42</p>
             </div>
             <div className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-3">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Streak</p>
                <p className="text-2xl font-black text-orange-500">12 Days</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
           <h3 className="text-xl font-bold text-white mb-8">Skill Matrix</h3>
           <SkillsRadar data={SKILLS_MATRIX} />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
           <h3 className="text-xl font-bold text-white mb-6">Recent Achievements</h3>
           <div className="space-y-4">
              {ACHIEVEMENTS.map(ach => (
                <div key={ach.id} className="flex items-center gap-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                   <div className="text-3xl">{ach.icon}</div>
                   <div>
                      <p className="font-bold text-white">{ach.title}</p>
                      <p className="text-xs text-slate-500">{ach.description}</p>
                   </div>
                   <div className="ml-auto text-[10px] font-bold text-slate-600 uppercase">{ach.date}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#0b0e14] text-slate-200">
      <aside className={`sticky top-0 h-screen transition-all duration-300 border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl flex flex-col ${isSidebarCollapsed ? 'w-20' : 'w-72'}`}>
        <div className="p-6 flex items-center justify-between">
           {!isSidebarCollapsed && (
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                   <Zap size={18} fill="white" />
                </div>
                <h1 className="text-xl font-black text-white tracking-tighter">DevQuest</h1>
             </div>
           )}
           <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <ChevronLeft size={18} className={isSidebarCollapsed ? 'rotate-180' : ''} />
           </button>
        </div>

        <div className="px-4 py-2">
           <div className="bg-slate-900 rounded-2xl p-1.5 flex gap-1 border border-slate-800">
              <button 
                onClick={() => { setRole('user'); setCurrentView('dashboard'); }}
                className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${role === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                <UserCheck size={14} /> {!isSidebarCollapsed && 'User'}
              </button>
              <button 
                onClick={() => { setRole('admin'); setCurrentView('dashboard'); }}
                className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${role === 'admin' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                <ShieldCheck size={14} /> {!isSidebarCollapsed && 'Admin'}
              </button>
           </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-6">
          {role === 'user' ? (
            <>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 px-2">Main Menu</p>
              <NavItem icon={LayoutDashboard} label="Dashboard" view="dashboard" />
              <NavItem icon={Compass} label="Browse Projects" view="challenge-details" />
              <NavItem icon={Award} label="My Contests" view="user-attempt-contest" />
              <div className="h-px bg-slate-800/50 my-6 mx-2"></div>
              <NavItem icon={Code2} label="My Workspace" view="code-editor" />
              <NavItem icon={UserIcon} label="Developer Identity" view="profile" />
            </>
          ) : (
            <>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 px-2">Management</p>
              <NavItem icon={LayoutDashboard} label="Admin Dashboard" view="dashboard" />
              <NavItem icon={PlusCircle} label="Create Contest" view="admin-create-contest" />
              <NavItem icon={Activity} label="Live Monitoring" view="admin-live-leaderboard" />
              <NavItem icon={Award} label="Contest Results" view="admin-final-leaderboard" />
              <div className="h-px bg-slate-800/50 my-6 mx-2"></div>
              <NavItem icon={Settings} label="Global Settings" view="dashboard" />
            </>
          )}
        </nav>

        <div className="p-6">
           <div className={`p-4 rounded-3xl bg-slate-900 border border-slate-800 relative group transition-all hover:bg-slate-800 ${isSidebarCollapsed ? 'p-2' : ''}`}>
              {!isSidebarCollapsed && (
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-500 group-hover:text-blue-400">
                      <Settings size={20} />
                   </div>
                   <div>
                      <p className="text-xs font-bold text-white">Settings</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Preferences</p>
                   </div>
                </div>
              )}
           </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-10 z-30">
          <div className="flex items-center gap-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search resources, users..." 
                className="bg-slate-900/50 border border-slate-800 rounded-2xl pl-12 pr-6 py-3 text-sm text-slate-300 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all shadow-inner"
              />
            </div>
            {role === 'admin' && <div className="px-4 py-2 bg-amber-600/10 text-amber-500 border border-amber-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest">Administrator Mode Active</div>}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 bg-blue-600/10 border border-blue-500/20 px-3 py-1.5 rounded-full">
               <Trophy size={14} className="text-blue-500" />
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">2.4k XP</span>
            </div>
            <button className="relative p-2.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-2xl transition-all">
               <Bell size={22} />
               <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-4 border-slate-900"></div>
            </button>
            <div className="h-8 w-px bg-slate-800 mx-2"></div>
            <button onClick={() => setCurrentView('profile')} className="flex items-center gap-4 group">
               <div className="text-right">
                  <p className="text-sm font-black text-white leading-none">Alex Rivera</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1.5">Elite</p>
               </div>
               <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-slate-800 group-hover:border-blue-500 transition-all shadow-xl">
                  <img src="https://picsum.photos/seed/alex/120" className="w-full h-full object-cover" alt="User" />
               </div>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 no-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent">
          <div className="max-w-[1400px] mx-auto">
            {/* {currentView === 'dashboard' && renderDashboard()}
            {currentView === 'challenge-details' && renderDashboard()}  */}
            {currentView === 'code-editor' && renderCodeEditor()}
            {currentView === 'profile' && renderProfile()}
            {currentView === 'admin-create-contest' && renderAdminCreateContest()}
            {currentView === 'admin-live-leaderboard' && renderAdminLiveLeaderboard()}
            {currentView === 'admin-final-leaderboard' && renderAdminFinalLeaderboard()}
            {currentView === 'user-attempt-contest' && renderUserAttemptContest()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
