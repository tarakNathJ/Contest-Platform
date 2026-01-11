
import React from 'react';
import { Challenge, Achievement, SkillData, PollOption, ContestParticipant, Contest } from './types';
import { Database, Terminal, Zap, Trophy, Cpu, Code2 } from 'lucide-react';

export const MOCK_CONTESTS: Contest[] = [
  {
    id: 'contest-001',
    title: 'Advanced Systems Architecture Quiz',
    description: 'Test your knowledge on distributed systems, CAP theorem, and kernel internals.',
    status: 'live',
    questions: [
      {
        id: 'q1',
        question: 'Which property of the CAP theorem states that every request receives a (non-error) response?',
        options: ['Consistency', 'Availability', 'Partition Tolerance', 'Durability'],
        correctAnswerIndex: 1
      },
      {
        id: 'q2',
        question: 'In Linux, which syscall is used to create a new process by duplicating the calling process?',
        options: ['execve', 'wait', 'fork', 'pipe'],
        correctAnswerIndex: 2
      }
    ]
  },
  {
    id: 'contest-002',
    title: 'Rust Memory Safety Challenge',
    description: 'Deep dive into ownership, borrowing, and lifetimes.',
    status: 'completed',
    questions: []
  },
  {
    id: 'contest-003',
    title: 'Postgres Indexing Workshop',
    description: 'Optimize queries using B-Tree, GIN, and GiST indexes.',
    status: 'completed',
    questions: []
  },
  {
    id: 'contest-004',
    title: 'Cloud Native Security',
    description: 'Securing K8s clusters and container runtimes.',
    status: 'live',
    questions: []
  }
];

export const MOCK_CONTEST: Contest = MOCK_CONTESTS[0];

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'docker-1',
    title: 'Build your own Docker',
    description: 'Master Linux namespaces, cgroups, and container runtimes from scratch.',
    difficulty: 'Hard',
    tags: ['Go', 'C', 'Systems'],
    estimatedTime: '~12 Hours',
    progress: 3,
    steps: [
      { id: 1, title: "Handle the 'run' command", description: 'Implement the basic skeleton to parse arguments.', status: 'completed' },
      { id: 2, title: "Process Isolation", description: 'Use CLONE_NEWUTS to isolate the hostname.', status: 'in-progress' },
      { id: 3, title: "Isolation with Chroot", description: 'Learn to restrict process file system access.', status: 'locked' },
    ]
  },
  {
    id: 'redis-1',
    title: 'Build Your Own Redis',
    description: 'Learn RDB persistence and networking by building a Redis-compatible server.',
    difficulty: 'Expert',
    tags: ['Rust', 'Systems'],
    estimatedTime: '~8 Hours',
    progress: 7,
    steps: []
  }
];

export const SKILLS_MATRIX: SkillData[] = [
  { subject: 'RUST', A: 120, fullMark: 150 },
  { subject: 'GO', A: 98, fullMark: 150 },
  { subject: 'PYTHON', A: 86, fullMark: 150 },
  { subject: 'C++', A: 65, fullMark: 150 },
  { subject: 'RIPT', A: 110, fullMark: 150 },
  { subject: 'SQL', A: 130, fullMark: 150 },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'Contest Champ', description: 'Top 10 Global Ranking', icon: '🏆', date: '2 days ago' },
  { id: '2', title: 'System Master', description: 'OS Core Expert', icon: '💻', date: '1 week ago' },
  { id: '3', title: 'Speed Coder', description: 'Solved under 5 mins', icon: '⚡', date: '3 weeks ago' },
];

export const POLL_OPTIONS: PollOption[] = [
  { label: 'Rust + Axum', votes: 42, color: 'bg-blue-600' },
  { label: 'Go + Fiber', votes: 38, color: 'bg-gray-600' },
  { label: 'TypeScript + Elysia', votes: 20, color: 'bg-gray-700' },
];

export const LEADERBOARD: ContestParticipant[] = [
  { id: '1', username: 'alex_codes', rank: 1, points: 2840, badge: 'PRO', progressPercentage: 100, accuracy: 95 },
  { id: '2', username: 'sarah_dev', rank: 2, points: 2715, badge: 'PYTHON EXPERT', progressPercentage: 85, accuracy: 88 },
  { id: '3', username: 'jen_cloud', rank: 3, points: 2650, badge: 'AWS WIZARD', progressPercentage: 60, accuracy: 92 },
];
