import { create } from "zustand";

interface User {
  name: string;
  email: string;
  role: string;
}
interface contestInfo {
  id: string;
  title: string;
  description: string;
}

interface AdminStore {
  admin: User | null;
  allContestList: contestInfo[] | null;
  leaderBord: any;
  setAdmin: (admin: User) => void;
  clearAdmin: () => void;
  setAllContest: (list: contestInfo[]) => void;
  clearAllContest: () => void;
  setLeaderBord: (data: any) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  admin: null,
  allContestList: null,
  leaderBord: null,

  setAdmin: (admin) => set({ admin }),
  clearAdmin: () => set({ admin: null }),

  setAllContest: (allContestList) => set({ allContestList }),
  clearAllContest: () => set({ allContestList: null }),

  setLeaderBord: (leaderBord) => set({ leaderBord }),
}));
