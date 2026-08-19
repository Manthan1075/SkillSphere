import React from 'react';
import { Instructor } from '../../types';
import { Star, Users, BookOpen } from 'lucide-react';

interface InstructorCardProps {
  instructor: Instructor;
}

export const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={instructor.avatar}
          alt={instructor.name}
          referrerPolicy="no-referrer"
          className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/20"
        />
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white font-heading">{instructor.name}</h3>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium line-clamp-1">{instructor.role}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-slate-600 dark:text-slate-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-800 dark:text-slate-200">{instructor.rating.toFixed(2)}</span>
            <span className="text-[11px] text-slate-400">Instructor Rating</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-1">
        {instructor.bio}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          {instructor.studentsCount.toLocaleString()} Students
        </span>
        <span className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          {instructor.coursesCount} Courses
        </span>
      </div>
    </div>
  );
};
