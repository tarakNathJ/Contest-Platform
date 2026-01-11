
export type Role = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  username: string;
  role: Role;
  rank: number;
  avatar: string;
  isVerified: boolean;
  skills: { label: string; value: number }[];
  stats: {
    contestsWon: number;
    problemsSolved: number;
    globalPercentile: string;
    streakDays: number;
  };
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  acceptanceRate: string;
  solvedCount: number;
  tags: string[];
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  status: 'upcoming' | 'live' | 'completed';
  participantCount: number;
  startTime: string;
  endTime?: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type?: 'coding' | 'mcq';
}

export interface MCQQuestion {
  id: string;
  contestId: string;
  title: string;
  description: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  rightAns: string;
}

export interface MCQAttempt {
  contestId: string;
  userId: string;
  answers: Record<string, string>; // questionId -> selectedOption
  score: number;
  startTime: number;
  endTime?: number;
}

// Fix for Challenge.tsx: Define the Milestone interface used for roadmap steps
export interface Milestone {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  avatar: string;
  isPro?: boolean;
  // Fix for Hackathon.tsx: Add title property to LeaderboardEntry
  title?: string;
}
