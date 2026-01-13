
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  MoreHorizontal, 
  Play, 
  CheckCircle2, 
  XCircle,
  FileCode,
  Terminal,
  Settings,
  Zap,
  ChevronDown
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const EditorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'instructions' | 'code' | 'tests'>('code');
  
  const codeString = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your solution here
        prevMap = {} # val : index

        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i
        return`;

  return (
    <div className="flex flex-col h-screen bg-[#05070A] overflow-hidden">
      {/* Editor Navbar */}
      <header className="h-14 border-b border-white/5 bg-[#0A0D14] flex items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <NavLink to="/" className="text-slate-400 hover:text-white"><ChevronLeft className="w-5 h-5" /></NavLink>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold flex items-center gap-2">
              Two Sum Problem 
              <span className="text-[10px] font-bold text-blue-400 px-1.5 py-0.5 bg-blue-600/10 rounded uppercase tracking-wider">Easy</span>
            </h1>
            <p className="text-[10px] text-slate-500">LeetCode Challenge #1</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition-colors"><Settings className="w-5 h-5" /></button>
          <button className="text-slate-400 hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
        </div>
      </header>

      {/* Editor Tabs */}
      <div className="flex border-b border-white/5 bg-[#0A0D14] px-4">
        {['Instructions', 'Code', 'Tests'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase() as any)}
            className={`px-6 py-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === tab.toLowerCase() ? 'border-blue-500 text-blue-500 bg-blue-500/5' : 'border-transparent text-slate-500 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold hover:bg-white/10 transition-all">
            Python 3.10 <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Instructions (Optional view or smaller pane) */}
        {activeTab === 'instructions' && (
          <div className="flex-1 p-8 overflow-auto border-r border-white/5">
             <h2 className="text-xl font-bold mb-4">Problem Statement</h2>
             <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Given an array of integers <code className="bg-white/5 px-1 rounded text-blue-400 font-mono">nums</code> and an integer <code className="bg-white/5 px-1 rounded text-blue-400 font-mono">target</code>, return indices of the two numbers such that they add up to <code className="bg-white/5 px-1 rounded text-blue-400 font-mono">target</code>.
             </p>
             <h3 className="font-bold text-sm mb-2 text-slate-200 uppercase tracking-widest">Example 1:</h3>
             <pre className="p-4 bg-white/5 rounded-xl font-mono text-xs text-slate-400 mb-6 border border-white/5">
                Input: nums = [2,7,11,15], target = 9{"\n"}
                Output: [0,1]{"\n"}
                Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
             </pre>
          </div>
        )}

        {/* Center: Code Surface */}
        {(activeTab === 'code' || activeTab === 'tests') && (
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <div className="flex-1 overflow-auto bg-[#05070A] p-4 md:p-8 font-mono text-sm leading-relaxed selection:bg-blue-500/30">
              <div className="flex items-center gap-3 mb-6 text-slate-600 text-[10px] font-bold border-b border-white/5 pb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                <span>main.py</span>
              </div>
              {codeString.split('\n').map((line, i) => (
                <div key={i} className="group flex hover:bg-white/5 transition-colors">
                  <span className="w-10 text-right pr-4 text-slate-700 select-none group-hover:text-slate-500">{i + 1}</span>
                  <pre className="text-slate-300">
                    {line.includes('class') || line.includes('def') || line.includes('return') || line.includes('for') || line.includes('if') ? (
                      <span className="text-purple-400">{line}</span>
                    ) : line.includes('#') ? (
                      <span className="text-slate-600 italic">{line}</span>
                    ) : line.includes('nums') || line.includes('target') ? (
                      <span className="text-orange-300">{line}</span>
                    ) : line}
                  </pre>
                </div>
              ))}
              
              {/* Keyboard Shortcuts Overlay (Optional) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 p-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hidden md:flex">
                 {[':', '{', '}', '[', ']', '(', ')', 'tab'].map(key => (
                   <button key={key} className="px-3 py-1.5 hover:bg-white/10 rounded-lg text-slate-400 font-bold transition-all border border-transparent hover:border-white/5">{key}</button>
                 ))}
              </div>
            </div>

            {/* Bottom Panel: Output */}
            <div className="h-48 border-t border-white/5 bg-[#0A0D14] flex flex-col">
              <div className="px-4 h-10 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <Terminal className="w-3.5 h-3.5" /> Console Output
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> 3 Passed
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> 0 Failed
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4 font-mono text-xs text-slate-400 overflow-auto space-y-2">
                 <p><span className="text-slate-600">{'>>>'}</span> Running test cases...</p>
                 <p><span className="text-green-500">✓</span> Test 1: Passed <span className="text-slate-700">(0.04ms)</span></p>
                 <p><span className="text-green-500">✓</span> Test 2: Passed <span className="text-slate-700">(0.02ms)</span></p>
                 <p><span className="text-green-500">✓</span> Test 3: Passed <span className="text-slate-700">(0.05ms)</span></p>
                 <div className="pt-2 text-slate-600 flex items-center gap-2">
                    <Zap className="w-3 h-3 fill-current text-blue-500" /> 
                    All test cases passed. Ready for submission.
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Editor Footer Actions */}
      <footer className="h-20 bg-[#0A0D14] border-t border-white/10 px-6 flex items-center justify-between z-30">
        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-sm transition-all active:scale-95">
           <Play className="w-4 h-4 fill-current" /> Run Code
        </button>
        <button className="flex items-center gap-2 px-12 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/25 active:scale-95">
           <CheckCircle2 className="w-5 h-5" /> Submit Solution
        </button>
      </footer>
    </div>
  );
};

export default EditorPage;
