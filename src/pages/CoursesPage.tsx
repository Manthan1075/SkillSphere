import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { FilterState, Course } from '../types';
import { CourseCard } from '../components/course/CourseCard';
import { FilterSidebar } from '../components/course/FilterSidebar';
import { SearchBar } from '../components/common/SearchBar';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { SlidersHorizontal, ArrowUpDown, X, BookOpen } from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const CoursesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { courses } = useCourses();

  // Read initial params
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const initialFilters: FilterState = {
    searchQuery: initialSearch,
    category: initialCategory,
    level: '',
    price: 'all',
    minRating: 0,
    duration: 'all',
    sortBy: 'popular',
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // Sync URL query params if they change externally (e.g. from navbar or categories card)
  useEffect(() => {
    const urlCategory = searchParams.get('category') || '';
    const urlSearch = searchParams.get('search') || '';

    setFilters((prev) => ({
      ...prev,
      category: urlCategory,
      searchQuery: urlSearch,
    }));
  }, [searchParams]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setVisibleCount(6); // reset pagination on filter change

    // Update query params cleanly
    const params = new URLSearchParams();
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.searchQuery) params.set('search', newFilters.searchQuery);
    setSearchParams(params, { replace: true });
  };

  const handleResetFilters = () => {
    const reset: FilterState = {
      searchQuery: '',
      category: '',
      level: '',
      price: 'all',
      minRating: 0,
      duration: 'all',
      sortBy: 'popular',
    };
    setFilters(reset);
    setVisibleCount(6);
    setSearchParams({}, { replace: true });
  };

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    return courses
      .filter((course) => {
        // Search query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = course.title.toLowerCase().includes(q);
          const matchInstructor = course.instructor.name.toLowerCase().includes(q);
          const matchCat = course.category.toLowerCase().includes(q);
          const matchSkills = course.skills.some((s) => s.toLowerCase().includes(q));
          if (!matchTitle && !matchInstructor && !matchCat && !matchSkills) {
            return false;
          }
        }

        // Category
        if (filters.category && course.category !== filters.category) {
          return false;
        }

        // Level
        if (filters.level && course.level !== filters.level) {
          return false;
        }

        // Price
        if (filters.price === 'free' && course.price > 0) return false;
        if (filters.price === 'paid' && course.price === 0) return false;

        // Rating
        if (filters.minRating > 0 && course.rating < filters.minRating) {
          return false;
        }

        // Duration (parse hours roughly from duration string e.g. "38h 15m")
        if (filters.duration !== 'all') {
          const hoursMatch = course.duration.match(/(\d+)h/);
          const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 10;
          if (filters.duration === 'short' && hours >= 10) return false;
          if (filters.duration === 'medium' && (hours < 10 || hours > 25)) return false;
          if (filters.duration === 'long' && hours <= 25) return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return b.id.localeCompare(a.id);
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'popular':
          default:
            return b.studentsCount - a.studentsCount;
        }
      });
  }, [courses, filters]);

  const visibleCourses = filteredAndSortedCourses.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedCourses.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Course Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
          Explore Courses
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
          Discover courses designed to help you build practical and career-ready skills.
        </p>
      </div>

      {/* Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <SearchBar
            value={filters.searchQuery}
            onChange={(val) => handleFilterChange({ ...filters, searchQuery: val })}
            placeholder="Search by course title, skill, instructor..."
          />
        </div>

        {/* Controls: Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {(filters.category || filters.level || filters.price !== 'all' || filters.minRating > 0) && (
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
            )}
          </button>

          {/* Sort Select */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 px-3 py-1.5 rounded-xl text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline text-slate-500 font-medium">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
              className="bg-transparent text-slate-900 dark:text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="popular" className="dark:bg-slate-900">Most Popular</option>
              <option value="rating" className="dark:bg-slate-900">Highest Rated</option>
              <option value="newest" className="dark:bg-slate-900">Newest</option>
              <option value="price-low" className="dark:bg-slate-900">Price: Low to High</option>
              <option value="price-high" className="dark:bg-slate-900">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(filters.category || filters.level || filters.price !== 'all' || filters.minRating > 0 || filters.searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-400 font-medium mr-1">Active filters:</span>
          {filters.category && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200 dark:border-indigo-800">
              Category: {filters.category}
              <button
                type="button"
                onClick={() => handleFilterChange({ ...filters, category: '' })}
                className="hover:text-indigo-900 dark:hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.level && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
              Level: {filters.level}
              <button
                type="button"
                onClick={() => handleFilterChange({ ...filters, level: '' })}
                className="hover:text-slate-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.price !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold capitalize">
              Price: {filters.price}
              <button
                type="button"
                onClick={() => handleFilterChange({ ...filters, price: 'all' })}
                className="hover:text-slate-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.minRating > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-semibold border border-amber-200 dark:border-amber-800">
              ★ {filters.minRating}+ Rating
              <button
                type="button"
                onClick={() => handleFilterChange({ ...filters, minRating: 0 })}
                className="hover:text-amber-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
              Query: "{filters.searchQuery}"
              <button
                type="button"
                onClick={() => handleFilterChange({ ...filters, searchQuery: '' })}
                className="hover:text-slate-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Catalog Layout (Sidebar + Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar (3 cols) */}
        <div className="hidden lg:block lg:col-span-3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs sticky top-24">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            totalCoursesCount={courses.length}
            filteredCount={filteredAndSortedCourses.length}
          />
        </div>

        {/* Course Grid Area (9 cols) */}
        <div className="lg:col-span-9 space-y-8">
          {visibleCourses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>

              {/* Load More Pagination */}
              {hasMore && (
                <div className="text-center pt-6">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                  >
                    Load More Courses ({filteredAndSortedCourses.length - visibleCount} remaining)
                  </Button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon="search"
              title="No courses found"
              description="We couldn't find any courses matching your selected search keywords and filter parameters."
              actionText="Reset Filters"
              onAction={handleResetFilters}
            />
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer / Modal */}
      <Modal
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Filter Courses"
        maxWidth="md"
      >
        <FilterSidebar
          filters={filters}
          onFilterChange={(newF) => {
            handleFilterChange(newF);
          }}
          onReset={() => {
            handleResetFilters();
            setMobileFiltersOpen(false);
          }}
          totalCoursesCount={courses.length}
          filteredCount={filteredAndSortedCourses.length}
        />
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={() => setMobileFiltersOpen(false)}
          >
            Apply Filters ({filteredAndSortedCourses.length} results)
          </Button>
        </div>
      </Modal>
    </div>
  );
};
