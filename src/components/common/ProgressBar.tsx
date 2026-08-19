import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  showLabel = false,
  size = 'md',
  variant = 'primary',
  className = ''
}) => {
  const clampedValue = Math.min(100, Math.max(0, Math.round(value)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4 text-xs'
  };

  const barColors = {
    primary: 'bg-indigo-600 dark:bg-indigo-500',
    success: 'bg-emerald-600 dark:bg-emerald-500',
    warning: 'bg-amber-500 dark:bg-amber-400'
  };

  const autoVariant = clampedValue === 100 ? 'success' : variant;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <span>Progress</span>
          <span className={clampedValue === 100 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
            {clampedValue}% {clampedValue === 100 && '• Complete 🎉'}
          </span>
        </div>
      )}
      <div className={`w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} ${barColors[autoVariant]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};
