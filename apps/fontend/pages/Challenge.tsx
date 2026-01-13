
import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { 
  ChevronLeft, 
  Share2, 
  Bookmark, 
  Clock, 
  Code2, 
  AlertTriangle,
  LayoutGrid,
  Rocket,
  Copy,
  CheckCircle2,
  Lock,
  MessageCircle
} from 'lucide-react';
import { Milestone } from '../types';

const Challenge: React.FC = () => {
  const { id } = useParams();

  const milestones: Milestone[] = [
    { id: 1, title: "1. Handle the 'run' command", description: "Implement the basic skeleton to parse arguments.", status: 'completed' },
    { id: 2, title: "2. Process Isolation", description: "Use CLONE_NEWUTS to isolate the hostname.", status: 'in-progress' },
    { id: 3, title: "3. Isolation with Chroot", description: "Learn to restrict process file system access.", status: 'locked' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#05070A] h-screen overflow-hidden">
      {/* Top Header */}
      <div className="h-14 border-b border-white/5 bg-[#0A0D14] flex items-center justify-between px-4 shrink-0">
        <NavLink to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium text-sm">Challenge Details</span>
        </NavLink>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></button>
          <button className="text-blue-500"><Bookmark className="w-5 h-5 fill-current" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Banner Section */}
        <div className="relative h-64 md:h-80 bg-[#0B0E14] overflow-hidden flex items-center px-8 md:px-12 border-b border-white/5">
           {/* Background decorative element */}
           <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 L50 0 L100 100" fill="none" stroke="currentColor" strokeWidth="0.1" />
                <path d="M0 80 L50 20 L100 80" fill="none" stroke="currentColor" strokeWidth="0.1" />
              </svg>
           </div>
           
           <div className="relative z-10 space-y-4 max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Build your own Docker</h1>
              <p className="text-slate-400 md:text-lg">Master Linux namespaces, cgroups, and container runtimes from scratch.</p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded flex items-center gap-2 text-orange-400 text-xs font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" /> Hard
                </div>
                <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded flex items-center gap-2 text-blue-400 text-xs font-bold">
                  <Code2 className="w-3.5 h-3.5" /> Go / C
                </div>
                <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded flex items-center gap-2 text-green-400 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> ~12 Hours
                </div>
                <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded flex items-center gap-2 text-purple-400 text-xs font-bold">
                  <LayoutGrid className="w-3.5 h-3.5" /> Systems
                </div>
              </div>
           </div>
        </div>

        {/* Content Tabs Header */}
        <div className="sticky top-0 z-20 bg-[#0A0D14] border-b border-white/5 px-8 flex gap-8">
          {['Overview', 'Requirements', 'Leaderboard'].map((tab, i) => (
            <button 
              key={tab} 
              className={`py-4 text-sm font-bold border-b-2 transition-colors ${i === 0 ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-500 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Split Content View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="p-8 md:p-12 border-r border-white/5 space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-extrabold">The Challenge</h2>
              <p className="text-slate-400 leading-relaxed">
                In this project, you'll build a simplified version of Docker from scratch. You'll learn how to use Linux kernel features like namespaces and container runtimes from scratch. This hands-on lab will guide you through the internals of process isolation.
              </p>
              
              <div className="p-4 bg-[#111827] border border-white/5 rounded-xl flex items-center justify-between group">
                <code className="text-sm text-blue-400 font-mono">git clone codecrafters.io/docker-go</code>
                <button className="p-2 text-slate-500 hover:text-white transition-colors"><Copy className="w-4 h-4" /></button>
              </div>

              <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/25 flex items-center justify-center gap-3 active:scale-[0.98]">
                <Rocket className="w-5 h-5" />
                Start Lab Environment
              </button>
            </section>

            <section className="space-y-8">
               <h2 className="text-xl font-bold">Project Roadmap</h2>
               <div className="space-y-1">
                 {milestones.map((step, i) => (
                   <div key={step.id} className="group flex gap-6 pb-8 last:pb-0 relative">
                     {i < milestones.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-white/5 group-last:hidden" />
                     )}
                     <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 border transition-all duration-300 ${
                        step.status === 'completed' ? 'bg-green-600/20 border-green-500/50 text-green-500' : 
                        step.status === 'in-progress' ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 
                        'bg-white/5 border-white/10 text-slate-600'
                     }`}>
                        {step.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : 
                         step.status === 'locked' ? <Lock className="w-5 h-5" /> : 
                         <span className="font-bold">{step.id}</span>}
                     </div>
                     <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-bold ${step.status === 'locked' ? 'text-slate-600' : 'text-slate-200'}`}>{step.title}</h3>
                          <div className="flex gap-2">
                             <button className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all"><MessageCircle className="w-4 h-4" /></button>
                             <button className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all"><Share2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                        <p className={`text-sm ${step.status === 'locked' ? 'text-slate-700' : 'text-slate-500'}`}>{step.description}</p>
                        {step.status === 'in-progress' && (
                          <span className="inline-block mt-3 px-2 py-0.5 bg-blue-600/20 text-blue-400 text-[10px] font-bold uppercase rounded">In Progress</span>
                        )}
                     </div>
                   </div>
                 ))}
               </div>
            </section>
          </div>

          <div className="hidden lg:block bg-[#0A0D14] p-8 space-y-8">
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-slate-300">Current Progress</h3>
              <div className="flex justify-between text-sm font-bold">
                 <span className="text-blue-500">3 / 12 Steps</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-600" style={{ width: '25%' }} />
              </div>
              <p className="text-xs text-slate-500">Next: <span className="text-slate-300 font-medium">Isolation with Chroot</span></p>
            </div>
            {/* Add more desktop-only content like leaderboard snippets or documentation previews here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
