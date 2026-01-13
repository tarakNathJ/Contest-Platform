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

interface userStore {
  user: User | null;
  allContestList: contestInfo[] | null;
  
  setUser: (admin: User) => void;
  clearUser: () => void;
  setAllContest: (list: contestInfo[]) => void;
  clearAllContest: () => void;
  
}

export const useAdminStore = create<AdminStore>((set) => ({
  user: null,
  allContestList: null,
  

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  setAllContest: (allContestList) => set({ allContestList }),
  clearAllContest: () => set({ allContestList: null }),

  
}));
