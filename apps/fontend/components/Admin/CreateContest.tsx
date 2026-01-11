import { Contest } from "@/types";
import { PlusCircle, Save, Trash2, Zap } from "lucide-react";
import React from "react";
import {useState} from "react"
export default function CreateContest() {
  const [newContest, setNewContest] = useState<Contest>({
    id: "",
    title: "",
    description: "",
    status: "draft",
    questions: [
      {
        id: "1",
        question: "",
        options: ["", "", "", ""],
        correctAnswerIndex: 0,
      },
    ],
  });
  return (
    <div className="animate-in slide-in-from-right-4 duration-500 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white">
            Create New MCQ Contest
          </h2>
          <p className="text-slate-500">
            Design the challenge, set the answers, and go live.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-slate-900 border border-slate-800 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
            <Save size={18} /> Save Draft
          </button>
          <button className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-black flex items-center gap-2 shadow-xl shadow-amber-900/20 transition-all">
            <Zap size={18} fill="currentColor" /> Publish Contest
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-black uppercase text-slate-500 tracking-widest">
              Contest Info
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Title
              </label>
              <input
                type="text"
                placeholder="e.g. Docker Masterclass Quiz"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all"
                value={newContest.title}
                onChange={(e) =>
                  setNewContest({ ...newContest, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="What should participants expect?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all resize-none"
                value={newContest.description}
                onChange={(e) =>
                  setNewContest({ ...newContest, description: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white">Questions</h3>
            <button
              onClick={() =>
                setNewContest({
                  ...newContest,
                  questions: [
                    ...newContest.questions,
                    {
                      id: Date.now().toString(),
                      question: "",
                      options: ["", "", "", ""],
                      correctAnswerIndex: 0,
                    },
                  ],
                })
              }
              className="px-4 py-2 bg-blue-600/10 text-blue-500 text-xs font-black rounded-lg hover:bg-blue-600/20 transition-all flex items-center gap-2"
            >
              <PlusCircle size={14} /> Add Question
            </button>
          </div>

          <div className="space-y-6">
            {newContest.questions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 relative group"
              >
                <div className="absolute -left-3 top-8 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black text-slate-400">
                  {idx + 1}
                </div>
                <div className="flex items-center justify-between mb-6">
                  <input
                    type="text"
                    placeholder="Enter your question here..."
                    className="flex-1 bg-transparent border-b border-slate-800 pb-2 text-lg font-bold text-white focus:outline-none focus:border-blue-600 transition-all"
                    value={q.question}
                    onChange={(e) => {
                      const updated = [...newContest.questions];
                      updated[idx].question = e.target.value;
                      setNewContest({ ...newContest, questions: updated });
                    }}
                  />
                  <button className="ml-4 p-2 text-slate-600 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${q.correctAnswerIndex === oIdx ? "bg-emerald-500/10 border-emerald-500/30" : "bg-slate-950 border-slate-800"}`}
                    >
                      <button
                        onClick={() => {
                          const updated = [...newContest.questions];
                          updated[idx].correctAnswerIndex = oIdx;
                          setNewContest({ ...newContest, questions: updated });
                        }}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${q.correctAnswerIndex === oIdx ? "bg-emerald-500 border-emerald-500" : "border-slate-700"}`}
                      >
                        {q.correctAnswerIndex === oIdx && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </button>
                      <input
                        type="text"
                        placeholder={`Option ${oIdx + 1}`}
                        className="bg-transparent border-none text-sm text-slate-300 focus:outline-none flex-1"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...newContest.questions];
                          updated[idx].options[oIdx] = e.target.value;
                          setNewContest({ ...newContest, questions: updated });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
