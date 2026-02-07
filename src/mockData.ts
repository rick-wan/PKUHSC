import type { Course, User, Group } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: '林逸凡',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  role: 'PKU', // 假设当前用户是 北大
};

const users: User[] = [
  { id: 'u2', name: '苏晓雨', role: 'PKU', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
  { id: 'u3', name: '张志强', role: 'BUAA', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
  { id: 'u4', name: '陈思思', role: 'BUAA', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie' },
  { id: 'u5', name: '王浩宇', role: 'PKU', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
];

const groups1: Group[] = [
  {
    id: 'g1',
    courseId: 'c1',
    name: '第 1 组',
    maxMembers: 3,
    members: [users[0], users[1]], // PKU, BUAA
  },
  {
    id: 'g2',
    courseId: 'c1',
    name: '第 2 组',
    maxMembers: 3,
    members: [users[0], users[3]], // PKU, PKU
  },
  {
    id: 'g3',
    courseId: 'c1',
    name: '第 3 组',
    maxMembers: 3,
    members: [users[0], users[1], users[2]], // Full
  },
  {
    id: 'g4',
    courseId: 'c1',
    name: '第 4 组',
    maxMembers: 3,
    members: [], // Empty
  },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: '认知神经科学导论',
    description: '探索大脑如何产生认知功能，涵盖感知、注意、记忆与决策的神经机制，结合 fMRI 与 EEG 实验案例分析。',
    coverImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    totalSpots: 30,
    occupiedSpots: 15,
    groups: groups1,
  },
  {
    id: 'c2',
    title: '计算神经科学与脑机接口',
    description: '利用数学模型模拟神经元活动与神经网络动态，深入研究 BCI 信号处理与解码算法，连接大脑与外部设备。',
    coverImage: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800',
    totalSpots: 20,
    occupiedSpots: 20,
    groups: [], // 假设满了
  },
  {
    id: 'c3',
    title: '神经心理学与临床行为分析',
    description: '关注脑损伤后的认知与行为改变，探讨失语症、失认症等临床表现及其康复策略，分析大脑可塑性机制。',
    coverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800',
    totalSpots: 15,
    occupiedSpots: 5,
    groups: [
      {
        id: 'g5',
        courseId: 'c3',
        name: '第 1 组',
        maxMembers: 3,
        members: [users[2]], // BUAA
      }
    ],
  },
];
