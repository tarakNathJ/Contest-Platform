
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Compass, 
  Trophy, 
  User as UserIcon, 
  Settings, 
  Code2, 
  Search, 
  Bell, 
  LayoutDashboard,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useStore } from '../store/useUserStore';

const Layout: React.FC = () => {
  const { currentUser, setRole } = useStore();
  const location = useLocation();
  const isEditor = location.pathname.includes('/practice/');
  const isAdmin = currentUser?.role === 'admin';

  const navItems = true ? [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Admin Dashboard', path: '/admin' },
    { icon: <ShieldCheck className="w-5 h-5" />, label: 'Create Contest', path: '/admin/create' },
    { icon: <Zap className="w-5 h-5" />, label: 'Manage Problems', path: '/admin/problems' },
  ] : [
    { icon: <Compass className="w-5 h-5" />, label: 'Discover', path: '/' },
    { icon: <Trophy className="w-5 h-5" />, label: 'Contests', path: '/hackathon/1' },
    { icon: <Code2 className="w-5 h-5" />, label: 'Practice Problems', path: '/problems' },
    // @ts-ignore
    { icon: <UserIcon className="w-5 h-5" />, label: 'Profile', path: `/profile/${currentUser?.username}` },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#05070A] text-slate-200">
      {!isEditor && (
        <aside className="hidden md:flex flex-col w-64 border-r border-white/5 bg-[#0A0D14] sticky top-0 h-screen">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Contest Hub</span>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 mt-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.05)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>
/*
<div className="p-4 mt-auto border-t border-white/5">
             {/* Role Switcher Demo */}
             {/* <div className="mb-4 px-2 py-2 bg-white/5 rounded-lg border border-white/10">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2">Access Control</p>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setRole('user')} 
                    className={`flex-1 py-1 text-[10px] font-bold rounded ${currentUser?.role === 'user' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-white/5'}`}
                  >
                    USER
                  </button>
                  <button 
                    onClick={() => setRole('admin')} 
                    className={`flex-1 py-1 text-[10px] font-bold rounded ${currentUser?.role === 'admin' ? 'bg-red-600 text-white' : 'text-slate-500 hover:bg-white/5'}`}
                  >
                    ADMIN
                  </button>
                </div>
             </div>
            <NavLink to="/settings" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </NavLink> */}
          </div>


          
        </aside>
      )}

      <main className={`flex-1 flex flex-col relative ${isEditor ? 'w-full' : ''}`}>
        {!isEditor && (
          <header className="hidden md:flex h-16 items-center justify-between px-8 border-b border-white/5 bg-[#0A0D14]/50 backdrop-blur-md sticky top-0 z-30">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search challenges, users, or tags..." 
                className="w-full bg-[#111827] border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-slate-400">Live Status</span>
              </div>
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#05070A]" />
              </button>
              <div className="flex items-center gap-3">
                 <div className="text-right">
                    <p className="text-xs font-bold text-white leading-none">{currentUser?.name}</p>
                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">{currentUser?.role}</p>
                 </div>
                 <img src={currentUser?.avatar} alt="Profile" className="w-9 h-9 rounded-full object-cover border-2 border-white/10" />
              </div>
            </div>
          </header>
        )}

        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;


/**
 * 
//  * <div className="p-4 mt-auto border-t border-white/5">
             {/* Role Switcher Demo */
//              <div className="mb-4 px-2 py-2 bg-white/5 rounded-lg border border-white/10">
//                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2">Access Control</p>
//                 <div className="flex gap-1">
//                   <button 
//                     onClick={() => setRole('user')} 
//                     className={`flex-1 py-1 text-[10px] font-bold rounded ${currentUser?.role === 'user' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-white/5'}`}
//                   >
//                     USER
//                   </button>
//                   <button 
//                     onClick={() => setRole('admin')} 
//                     className={`flex-1 py-1 text-[10px] font-bold rounded ${currentUser?.role === 'admin' ? 'bg-red-600 text-white' : 'text-slate-500 hover:bg-white/5'}`}
//                   >
//                     ADMIN
//                   </button>
//                 </div>
//              </div>
//             <NavLink to="/settings" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors">
//               <Settings className="w-5 h-5" />
//               <span className="font-medium">Settings</span>
//             </NavLink>
//           </div>


 