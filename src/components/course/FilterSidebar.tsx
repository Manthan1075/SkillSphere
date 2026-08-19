import React from 'react';
import { FilterState, CourseCategory, CourseLevel } from '../../types';
import { CATEGORIES } from '../../data/courses';
import { Button } from '../common/Button';
import { RotateCcw, Star, Check } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalCoursesCount: number;
  filteredCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  filteredCount,
}) => {
  const levels: CourseLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
  const ratingOptions = [
    { value: 4.5, label: '4.5 & up' },
    { value: 4.0, label: '4.0 & up' },
    { value: 3.5, label: '3.5 & up' }
  ];
  const durationOptions = [
    { value: 'all', label: 'All Durations' },
    { value: 'short', label: 'Short (Under 10 hours)' },
    { value: 'medium', label: 'Medium (10 – 25 hours)' },
    { value: 'long', label: 'In-Depth (25+ hours)' }
  ];

  const handleCategoryToggle = (categoryName: CourseCategory | '') => {
    onFilterChange({
      ...filters,
      category: filters.category === categoryName ? '' : categoryName
    });
  };

  const handleLevelToggle = (lvl: CourseLevel) => {
    onFilterChange({
      ...filters,
      level: filters.level === lvl ? '' : lvl
    });
  };

  const handlePriceChange = (price: 'all' | 'free' | 'paid') => {
    onFilterChange({
      ...filters,
      price
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? 0 : rating
    });
  };

  const handleDurationChange = (dur: string) => {
    onFilterChange({
      ...filters,
      duration: dur
    });
  };

  const hasActiveFilters =
    filters.category !== '' ||
    filters.level !== '' ||
    filters.price !== 'all' ||
    filters.minRating > 0 ||
    filters.duration !== 'all';

  return (
    <aside className="w-full space-y-6">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider font-heading">
            Filter Courses
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Showing <span className="font-semibold text-indigo-600 dark:text-indigo-400">{filteredCount}</span> results
          </p>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:underline font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            Reset all
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
          Category
        </label>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.name;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryToggle(cat.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Level Filter */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
          Difficulty Level
        </label>
        <div className="flex flex-wrap gap-1.5">
          {levels.map((lvl) => {
            const isSelected = filters.level === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => handleLevelToggle(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Filter */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
          Price
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          {(['all', 'free', 'paid'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handlePriceChange(p)}
              className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                filters.price === p
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
          Ratings
        </label>
        <div className="space-y-1.5">
          {ratingOptions.map((r) => {
            const isSelected = filters.minRating === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => handleRatingChange(r.value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                  isSelected
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <span>{r.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration Filter */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
          Duration
        </label>
        <div className="space-y-1">
          {durationOptions.map((d) => {
            const isSelected = filters.duration === d.value;
            return (
              <button
                key={d.value}
                type="button"
                onClick={() => handleDurationChange(d.value)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${
                  isSelected
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{d.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="pt-2">
          <Button onClick={onReset} variant="outline" size="sm" className="w-full">
            Clear All Filters
          </Button>
        </div>
      )}
    </aside>
  );
};
