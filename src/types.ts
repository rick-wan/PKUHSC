export type UserRole = 'PKU' | 'BUAA';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
}

export interface Group {
  id: string;
  courseId: string;
  name: string;
  members: User[];
  maxMembers: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  totalSpots: number; // 总名额（比如所有组加起来的总名额，或者课程设定的总名额）
  occupiedSpots: number; // 已占名额
  groups: Group[]; // 包含的小组
}
