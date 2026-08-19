export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export type CourseCategory = 
  | 'Web Development'
  | 'Data Science'
  | 'UI/UX Design'
  | 'Digital Marketing'
  | 'Business'
  | 'Programming'
  | 'Cloud Computing'
  | 'AI & Machine Learning';

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "12:40"
  durationMinutes: number;
  videoUrl?: string;
  description: string;
  resources?: { name: string; url: string; size?: string }[];
  previewFree?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  headline: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  language: string;
  instructor: Instructor;
  rating: number;
  ratingCount: number;
  studentsCount: number;
  duration: string;
  totalLessons: number;
  price: number; // 0 for free
  originalPrice: number;
  discountPercentage: number;
  thumbnail: string;
  previewVideo?: string;
  featured?: boolean;
  bestseller?: boolean;
  trending?: boolean;
  skills: string[];
  learningOutcomes: string[];
  requirements: string[];
  targetAudience: string[];
  modules: CourseModule[];
  reviews: Review[];
  lastUpdated: string;
  certificateOffered: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  headline?: string;
  bio?: string;
  createdAt: string;
  enrolledCourses: string[]; // Course IDs
  wishlist: string[]; // Course IDs
  progress: Record<string, CourseProgress>; // courseId -> progress object
}

export interface CourseProgress {
  courseId: string;
  completedLessonIds: string[];
  lastAccessedLessonId?: string;
  lastAccessedAt: string;
  completedPercentage: number;
  isCompleted: boolean;
  completedAt?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  type: 'enroll' | 'lesson_complete' | 'course_complete' | 'wishlist_add' | 'profile_update';
  title: string;
  subtitle?: string;
  timestamp: string;
  courseId?: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  level: string;
  price: 'all' | 'free' | 'paid';
  minRating: number;
  duration: string; // 'all' | 'short' (<3h) | 'medium' (3-10h) | 'long' (>10h)
  sortBy: 'popular' | 'rating' | 'newest' | 'price-low' | 'price-high';
}

export interface CategoryInfo {
  id: string;
  name: CourseCategory;
  iconName: string;
  description: string;
  courseCount: number;
  color: string;
  accentColor: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}
