import React from 'react';
import { BookOpen, SearchX, BookmarkX, Award, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: 'search' | 'bookmark' | 'course' | 'award' | 'error';
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'course',
  title,
  description,
  actionText,
  onAction,
  className = ''
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'search':
        return <SearchX className="w-8 h-8 text-indigo-500" />;
      case 'bookmark':
        return <BookmarkX className="w-8 h-8 text-rose-500" />;
      case 'award':
        return <Award className="w-8 h-8 text-amber-500" />;
      case 'error':
        return <AlertCircle className="w-8 h-8 text-rose-500" />;
      case 'course':
      default:
        return <BookOpen className="w-8 h-8 text-indigo-500" />;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-slate-800/80 flex items-center justify-center mb-4 shadow-xs">
        {getIcon()}
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionText}
        </Button>
      )}
    </div>
  );
};
