import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Course } from '../../types';
import { Star, Clock, BookOpen, Heart, Award, ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import { useCourses } from '../../context/CourseContext';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, showProgress = true }) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist, isEnrolled, getProgress } = useCourses();

  const enrolled = isEnrolled(course.id);
  const progress = getProgress(course.id);
  const isWishlisted = isInWishlist(course.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(course.id);
  };

  const handleCardClick = () => {
    if (enrolled && showProgress) {
      navigate(`/learn/${course.id}`);
    } else {
      navigate(`/courses/${course.id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={course.thumbnail}
          alt={course.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {course.bestseller && (
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold text-[11px] uppercase tracking-wider shadow-sm">
              Bestseller
            </span>
          )}
          {course.featured && !course.bestseller && (
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white font-semibold text-[11px] shadow-sm">
              Featured
            </span>
          )}
          <Badge variant="neutral" size="sm" className="bg-slate-900/80 text-white border-none backdrop-blur-md">
            {course.level}
          </Badge>
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${isWishlisted
            ? 'bg-rose-500 text-white shadow-md'
            : 'bg-slate-900/60 text-white hover:bg-rose-500 hover:text-white'
            }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Category Pill on bottom of thumbnail */}
        <div className="absolute bottom-2.5 left-3">
          <span className="px-2 py-0.5 rounded-md bg-slate-950/70 text-slate-200 text-[11px] font-medium backdrop-blur-md">
            {course.category}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Title */}
          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug font-heading">
            {course.title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              referrerPolicy="no-referrer"
              className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <span className="truncate font-medium">{course.instructor.name}</span>
          </div>

          {/* Metrics */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800 dark:text-slate-200">{course.rating.toFixed(1)}</span>
              <span className="text-[11px]">({course.ratingCount.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-slate-400" />
                {course.totalLessons} lessons
              </span>
            </div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80">
          {enrolled && showProgress && progress ? (
            <div className="space-y-2">
              <ProgressBar value={progress.completedPercentage} showLabel size="sm" />
              <div className="flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 pt-0.5">
                <span>{progress.completedPercentage === 100 ? 'Review Course' : 'Continue Learning'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                {course.price === 0 ? (
                  <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                    Free
                  </span>
                ) : (
                  <>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white font-heading">
                      ₹{course.price.toLocaleString('en-IN')}
                    </span>
                    {course.originalPrice > course.price && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{course.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
