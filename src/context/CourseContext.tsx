import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Course, CourseProgress, ActivityLog } from '../types';
import { COURSES_DATA } from '../data/courses';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import confetti from 'canvas-confetti';

interface CourseContextType {
  courses: Course[];
  enrolledCourseIds: string[];
  wishlistCourseIds: string[];
  courseProgress: Record<string, CourseProgress>;
  activities: ActivityLog[];
  isEnrolled: (courseId: string) => boolean;
  isInWishlist: (courseId: string) => boolean;
  enrollInCourse: (courseId: string) => boolean;
  toggleWishlist: (courseId: string) => void;
  getProgress: (courseId: string) => CourseProgress | null;
  toggleLessonCompletion: (courseId: string, lessonId: string) => { isCompleted: boolean; percentage: number };
  getEnrolledCourses: () => (Course & { progress: CourseProgress })[];
  getWishlistCourses: () => Course[];
  getStats: () => {
    enrolledCount: number;
    completedCount: number;
    learningHours: number;
    currentStreak: number;
  };
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const { showSuccess, showInfo } = useToast();

  const [courses] = useState<Course[]>(COURSES_DATA);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [wishlistCourseIds, setWishlistCourseIds] = useState<string[]>([]);
  const [courseProgress, setCourseProgress] = useState<Record<string, CourseProgress>>({});
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  // Sync state with current authenticated user
  useEffect(() => {
    if (user) {
      setEnrolledCourseIds(user.enrolledCourses || []);
      setWishlistCourseIds(user.wishlist || []);
      setCourseProgress(user.progress || {});
    } else {
      // Unauthenticated fallback: check guest storage
      const guestEnrollments = getFromStorage<string[]>(STORAGE_KEYS.ENROLLMENTS, []);
      const guestWishlist = getFromStorage<string[]>(STORAGE_KEYS.WISHLIST, []);
      const guestProgress = getFromStorage<Record<string, CourseProgress>>(STORAGE_KEYS.PROGRESS, {});
      setEnrolledCourseIds(guestEnrollments);
      setWishlistCourseIds(guestWishlist);
      setCourseProgress(guestProgress);
    }

    const loadedActivities = getFromStorage<ActivityLog[]>(STORAGE_KEYS.ACTIVITIES, [
      {
        id: 'act-init-1',
        userId: user?.id || 'guest',
        type: 'enroll',
        title: 'Enrolled in Complete MERN Stack Development',
        subtitle: 'Started foundations and backend modules',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        courseId: 'mern-stack-development'
      },
      {
        id: 'act-init-2',
        userId: user?.id || 'guest',
        type: 'course_complete',
        title: 'Completed UI/UX Design Masterclass 🎉',
        subtitle: 'Earned Certificate of Completion',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        courseId: 'ui-ux-design-figma'
      }
    ]);
    setActivities(loadedActivities);
  }, [user]);

  const logActivity = useCallback((type: ActivityLog['type'], title: string, subtitle?: string, courseId?: string) => {
    const newActivity: ActivityLog = {
      id: `act_${Date.now()}`,
      userId: user?.id || 'guest',
      type,
      title,
      subtitle,
      timestamp: new Date().toISOString(),
      courseId
    };

    setActivities((prev) => {
      const updated = [newActivity, ...prev].slice(0, 20); // Keep last 20
      saveToStorage(STORAGE_KEYS.ACTIVITIES, updated);
      return updated;
    });
  }, [user?.id]);

  const isEnrolled = useCallback((courseId: string) => {
    return enrolledCourseIds.includes(courseId);
  }, [enrolledCourseIds]);

  const isInWishlist = useCallback((courseId: string) => {
    return wishlistCourseIds.includes(courseId);
  }, [wishlistCourseIds]);

  const getProgress = useCallback((courseId: string): CourseProgress | null => {
    return courseProgress[courseId] || null;
  }, [courseProgress]);

  const enrollInCourse = useCallback((courseId: string): boolean => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return false;

    if (enrolledCourseIds.includes(courseId)) {
      showInfo('Already Enrolled', `You are already learning "${course.title}".`);
      return true;
    }

    const updatedEnrolled = [...enrolledCourseIds, courseId];
    const initialProgress: CourseProgress = {
      courseId,
      completedLessonIds: [],
      lastAccessedLessonId: course.modules[0]?.lessons[0]?.id,
      lastAccessedAt: new Date().toISOString(),
      completedPercentage: 0,
      isCompleted: false
    };

    const updatedProgressMap = {
      ...courseProgress,
      [courseId]: initialProgress
    };

    setEnrolledCourseIds(updatedEnrolled);
    setCourseProgress(updatedProgressMap);

    // Persist to user or storage
    if (user && isAuthenticated) {
      updateProfile({
        ...user,
        enrolledCourses: updatedEnrolled,
        progress: updatedProgressMap
      } as any);
    } else {
      saveToStorage(STORAGE_KEYS.ENROLLMENTS, updatedEnrolled);
      saveToStorage(STORAGE_KEYS.PROGRESS, updatedProgressMap);
    }

    logActivity('enroll', `Enrolled in ${course.title}`, `Course duration: ${course.duration}`, courseId);
    showSuccess('Enrolled Successfully! 🎓', `You now have full access to ${course.title}`);

    // Trigger subtle celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.85 }
      });
    } catch {
      // ignore
    }

    return true;
  }, [courses, enrolledCourseIds, courseProgress, user, isAuthenticated, updateProfile, logActivity, showInfo, showSuccess]);

  const toggleWishlist = useCallback((courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    let updatedWishlist: string[];
    const isCurrentlyIn = wishlistCourseIds.includes(courseId);

    if (isCurrentlyIn) {
      updatedWishlist = wishlistCourseIds.filter((id) => id !== courseId);
      showInfo('Removed from Wishlist', `"${course.title}" was removed.`);
    } else {
      updatedWishlist = [...wishlistCourseIds, courseId];
      logActivity('wishlist_add', `Added "${course.title}" to wishlist`, undefined, courseId);
      showSuccess('Saved to Wishlist', `"${course.title}" was added.`);
    }

    setWishlistCourseIds(updatedWishlist);

    if (user && isAuthenticated) {
      updateProfile({
        ...user,
        wishlist: updatedWishlist
      } as any);
    } else {
      saveToStorage(STORAGE_KEYS.WISHLIST, updatedWishlist);
    }
  }, [courses, wishlistCourseIds, user, isAuthenticated, updateProfile, logActivity, showInfo, showSuccess]);

  const toggleLessonCompletion = useCallback((courseId: string, lessonId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return { isCompleted: false, percentage: 0 };

    // Calculate total lessons in course
    let totalLessonsCount = 0;
    course.modules.forEach((mod) => {
      totalLessonsCount += mod.lessons.length;
    });
    if (totalLessonsCount === 0) totalLessonsCount = 1;

    const currentProg = courseProgress[courseId] || {
      courseId,
      completedLessonIds: [],
      lastAccessedLessonId: lessonId,
      lastAccessedAt: new Date().toISOString(),
      completedPercentage: 0,
      isCompleted: false
    };

    const isAlreadyCompleted = currentProg.completedLessonIds.includes(lessonId);
    let newCompletedLessonIds: string[];

    if (isAlreadyCompleted) {
      newCompletedLessonIds = currentProg.completedLessonIds.filter((id) => id !== lessonId);
    } else {
      newCompletedLessonIds = [...currentProg.completedLessonIds, lessonId];
    }

    const newPercentage = Math.round((newCompletedLessonIds.length / totalLessonsCount) * 100);
    const isCourseFinished = newPercentage >= 100;

    const updatedProg: CourseProgress = {
      ...currentProg,
      completedLessonIds: newCompletedLessonIds,
      lastAccessedLessonId: lessonId,
      lastAccessedAt: new Date().toISOString(),
      completedPercentage: Math.min(100, newPercentage),
      isCompleted: isCourseFinished,
      completedAt: isCourseFinished ? (currentProg.completedAt || new Date().toISOString()) : undefined
    };

    const updatedProgressMap = {
      ...courseProgress,
      [courseId]: updatedProg
    };

    setCourseProgress(updatedProgressMap);

    if (user && isAuthenticated) {
      updateProfile({
        ...user,
        progress: updatedProgressMap
      } as any);
    } else {
      saveToStorage(STORAGE_KEYS.PROGRESS, updatedProgressMap);
    }

    if (!isAlreadyCompleted) {
      logActivity('lesson_complete', `Completed a lesson in ${course.title}`, undefined, courseId);
    }

    if (isCourseFinished && !currentProg.isCompleted) {
      logActivity('course_complete', `Completed ${course.title} 🎉`, 'Earned SkillSphere Certificate', courseId);
      showSuccess('Course Completed! 🎉', `Congratulations! You have completed all lessons in ${course.title}!`);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }

    return {
      isCompleted: !isAlreadyCompleted,
      percentage: updatedProg.completedPercentage
    };
  }, [courses, courseProgress, user, isAuthenticated, updateProfile, logActivity, showSuccess]);

  const getEnrolledCourses = useCallback(() => {
    return enrolledCourseIds
      .map((id) => {
        const course = courses.find((c) => c.id === id);
        if (!course) return null;
        const prog = courseProgress[id] || {
          courseId: id,
          completedLessonIds: [],
          completedPercentage: 0,
          lastAccessedAt: new Date().toISOString(),
          isCompleted: false
        };
        return { ...course, progress: prog };
      })
      .filter((item): item is Course & { progress: CourseProgress } => item !== null);
  }, [courses, enrolledCourseIds, courseProgress]);

  const getWishlistCourses = useCallback(() => {
    return wishlistCourseIds
      .map((id) => courses.find((c) => c.id === id))
      .filter((c): c is Course => c !== undefined);
  }, [courses, wishlistCourseIds]);

  const getStats = useCallback(() => {
    const enrolled = getEnrolledCourses();
    const completedCount = enrolled.filter((c) => c.progress.isCompleted).length;

    // Estimate completed learning hours
    let completedMinutes = 0;
    enrolled.forEach((c) => {
      c.modules.forEach((mod) => {
        mod.lessons.forEach((les) => {
          if (c.progress.completedLessonIds.includes(les.id)) {
            completedMinutes += les.durationMinutes || 15;
          }
        });
      });
    });

    const learningHours = Math.round((completedMinutes / 60) * 10) / 10;

    return {
      enrolledCount: enrolled.length,
      completedCount,
      learningHours: Math.max(2.5, learningHours), // fallback aesthetic minimum
      currentStreak: 5 // 5-day active learning streak
    };
  }, [getEnrolledCourses]);

  return (
    <CourseContext.Provider
      value={{
        courses,
        enrolledCourseIds,
        wishlistCourseIds,
        courseProgress,
        activities,
        isEnrolled,
        isInWishlist,
        enrollInCourse,
        toggleWishlist,
        getProgress,
        toggleLessonCompletion,
        getEnrolledCourses,
        getWishlistCourses,
        getStats,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
