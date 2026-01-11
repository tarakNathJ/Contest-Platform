import { CheckCircle2 } from "lucide-react";

const renderUserAttemptContest = () => {
    function setCurrentView(arg0: string): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
      <div className="w-24 h-24 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/20 mb-8">
        <CheckCircle2 size={48} className="text-white" />
      </div>
      <h2 className="text-4xl font-black text-white mb-4">
        Submission Received!
      </h2>
      <p className="text-slate-400 max-w-lg mb-8 text-lg">
        You've completed the contest. Our systems are now validating your
        answers. Results will be posted to the final leaderboard shortly.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => setCurrentView("dashboard")}
          className="px-10 py-5 bg-white text-black font-black rounded-3xl hover:bg-slate-200 transition-all active:scale-95 shadow-xl"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};
