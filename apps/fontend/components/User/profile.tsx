import { ACHIEVEMENTS, SKILLS_MATRIX } from "@/constants";
import React from "react";
import SkillsRadar from "../RadarChart";

export default function profile() {
  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-12 flex items-center gap-12">
        <div className="w-48 h-48 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 shadow-2xl">
          <img
            src="https://picsum.photos/seed/alex/400"
            className="w-full h-full object-cover"
            alt="Profile"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-5xl font-black text-white">Alex Rivera</h2>
            <span className="px-4 py-1.5 bg-blue-600 text-white text-xs font-black rounded-full uppercase tracking-widest">
              Elite
            </span>
          </div>
          <p className="text-xl text-slate-500 font-medium mb-8">
            Full-stack Systems Engineer • SF, CA
          </p>
          <div className="flex gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-3">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                Total XP
              </p>
              <p className="text-2xl font-black text-blue-500">12,450</p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-3">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                Global Rank
              </p>
              <p className="text-2xl font-black text-white">#42</p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-3">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                Streak
              </p>
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
          <h3 className="text-xl font-bold text-white mb-6">
            Recent Achievements
          </h3>
          <div className="space-y-4">
            {ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.id}
                className="flex items-center gap-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl"
              >
                <div className="text-3xl">{ach.icon}</div>
                <div>
                  <p className="font-bold text-white">{ach.title}</p>
                  <p className="text-xs text-slate-500">{ach.description}</p>
                </div>
                <div className="ml-auto text-[10px] font-bold text-slate-600 uppercase">
                  {ach.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
