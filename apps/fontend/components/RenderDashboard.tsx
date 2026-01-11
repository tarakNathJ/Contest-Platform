import { Activity, BarChart3, Eye, Trophy } from "lucide-react";
import {
  MOCK_CHALLENGES,
  SKILLS_MATRIX,
  ACHIEVEMENTS,
  POLL_OPTIONS,
  LEADERBOARD,
  MOCK_CONTEST,
  MOCK_CONTESTS,
} from "../constants";
import { AppView } from "@/types";
import React, { useState, useEffect } from 'react';

const renderDashboard = () => {
  const [currentView, setCurrentView] = useState<AppView>("dashboard");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-10">
      {/* Admin Header Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">
            Total Contests
          </p>
          <p className="text-3xl font-black text-white">
            {MOCK_CONTESTS.length}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">
            Active Arenas
          </p>
          <p className="text-3xl font-black text-emerald-500">
            {MOCK_CONTESTS.filter((c) => c.status === "live").length}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">
            Total Participants
          </p>
          <p className="text-3xl font-black text-blue-500">4.2k</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">
            Server Health
          </p>
          <p className="text-3xl font-black text-white">99.9%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Live Contests */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Active Arenas
            </h2>
            <button
              onClick={() => setCurrentView("admin-create-contest")}
              className="text-xs font-bold text-blue-500 hover:underline"
            >
              Create New
            </button>
          </div>
          <div className="space-y-4">
            {MOCK_CONTESTS.filter((c) => c.status === "live").map((contest) => (
              <div
                key={contest.id}
                className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 hover:border-emerald-500/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
                      <Activity size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{contest.title}</h3>
                      <p className="text-xs text-slate-500">
                        842 Active Participants
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentView("admin-live-leaderboard")}
                    className="px-4 py-2 bg-slate-950 border border-slate-800 text-xs font-black rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2"
                  >
                    <Eye size={14} /> Monitor Live
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closed Contests */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <History size={20} className="text-slate-500" />
              Closed Arenas
            </h2>
          </div>
          <div className="space-y-4">
            {MOCK_CONTESTS.filter((c) => c.status === "completed").map(
              (contest) => (
                <div
                  key={contest.id}
                  className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 hover:border-slate-600 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-950 text-slate-500 rounded-2xl flex items-center justify-center">
                        <Trophy size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">
                          {contest.title}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Ended 2 days ago • 1.1k Results
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentView("admin-final-leaderboard")}
                      className="px-4 py-2 bg-slate-950 border border-slate-800 text-xs font-black rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      <BarChart3 size={14} /> View Analytics
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
