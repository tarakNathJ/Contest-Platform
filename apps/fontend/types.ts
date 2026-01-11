
export type AppView = 
  | 'dashboard' 
  | 'challenge-details' 
  | 'code-editor' 
  | 'profile' 
  | 'live-contest'
  | 'admin-create-contest'
  | 'admin-live-leaderboard'
  | 'admin-final-leaderboard'
  | 'user-attempt-contest';

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  questions: MCQ[];
  startTime?: string;
  endTime?: string;
  status: 'draft' | 'live' | 'completed';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  tags: string[];
  estimatedTime: string;
  steps: Step[];
  progress: number;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  status: 'locked' | 'completed' | 'in-progress';
}

export interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
}

export interface PollOption {
  label: string;
  votes: number;
  color: string;
}

export interface ContestParticipant {
  id: string;
  username: string;
  rank: number;
  points: number;
  badge?: string;
  progressPercentage?: number;
  accuracy?: number;
}
