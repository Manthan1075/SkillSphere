import React from 'react';

export const CourseCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs animate-pulse">
      <div className="h-48 bg-slate-200 dark:bg-slate-800 w-full" />
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>
          <div className="h-6 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const LoadingGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
};
