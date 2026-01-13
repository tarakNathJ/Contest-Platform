export type Role = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  rating?: number;
  problemsSolved?: number;
  contestsParticipated?: number;
  avatar?: string;
}

// Contest Types
export interface Contest {
  id: string;
  title: string;
  description: string;
  startTime: Date | string;
  endTime: Date | string;
  duration: number; // in minutes
  type: 'mcq' | 'coding' | 'hackathon';
  status: 'upcoming' | 'active' | 'completed';
  participants?: number;
  questions?: MCQQuestion[];
  problems?: Problem[];
}

// MCQ Types
export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  difficulty: 'easy' | 'medium' | 'hard';
  topic?: string;
  points?: number;
}

export interface MCQAttempt {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number; // in seconds
}

// Problem/Challenge Types
export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  likes?: number;
  submissions?: number;
  acceptanceRate?: number;
  solved?: boolean;
  testCases?: TestCase[];
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  score: number;
  timeSpent?: number;
  problemsSolved?: number;
  avatar?: string;
}

// Milestone Types
export interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  requiredScore?: number;
  reward?: string;
  icon?: string;
}

// Submission Types
export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  code: string;
  language: string;
  status: 'pending' | 'accepted' | 'wrong-answer' | 'runtime-error' | 'time-limit-exceeded';
  submittedAt: Date | string;
  executionTime?: number;
  memoryUsed?: number;
}

// Stats Types
export interface UserStats {
  totalProblems: number;
  problemsSolved: number;
  contestsParticipated: number;
  rating: number;
  streak: number;
  rank?: number;
}