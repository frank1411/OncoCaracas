export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  subscription: SubscriptionStatus;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  lessons: Lesson[];
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  duration: number;
  order: number;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'article';
  url: string;
}

export interface Progress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  lastAccessed: Date;
}

export type SubscriptionStatus = 'free' | 'basic' | 'premium' | 'none';