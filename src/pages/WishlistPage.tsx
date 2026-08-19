import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { CourseCard } from '../components/course/CourseCard';
import { EmptyState } from '../components/common/EmptyState';
import { Heart, BookOpen } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { getWishlistCourses } = useCourses();
  const wishlistCourses = getWishlistCourses();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Saved Courses</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
          My Wishlist ({wishlistCourses.length})
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Courses you've bookmarked to learn at your convenience.
        </p>
      </div>

      {wishlistCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {wishlistCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="bookmark"
          title="Your wishlist is empty"
          description="Explore our course catalog and click the heart icon on any course card to bookmark it for later."
          actionText="Browse Courses"
          onAction={() => navigate('/courses')}
        />
      )}
    </div>
  );
};
