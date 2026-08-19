import React, { useState } from 'react';
import { CourseModule, Lesson } from '../../types';
import { ChevronDown, PlayCircle, Lock, CheckCircle2, FileText } from 'lucide-react';

interface CurriculumAccordionProps {
  modules: CourseModule[];
  completedLessonIds?: string[];
  currentLessonId?: string;
  onSelectLesson?: (lesson: Lesson, module: CourseModule) => void;
  isEnrolled?: boolean;
}

export const CurriculumAccordion: React.FC<CurriculumAccordionProps> = ({
  modules,
  completedLessonIds = [],
  currentLessonId,
  onSelectLesson,
  isEnrolled = false,
}) => {
  // Expand first module by default
  const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>([modules[0]?.id || '']);

  const toggleModule = (id: string) => {
    setExpandedModuleIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedModuleIds(modules.map((m) => m.id));
  };

  const collapseAll = () => {
    setExpandedModuleIds([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
        <span>{modules.length} Modules • {modules.reduce((acc, m) => acc + m.lessons.length, 0)} Total Lessons</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={expandAll}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
          >
            Expand all
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={collapseAll}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
          >
            Collapse all
          </button>
        </div>
      </div>

      {modules.map((module, modIdx) => {
        const isExpanded = expandedModuleIds.includes(module.id);
        const moduleCompletedLessons = module.lessons.filter((l) =>
          completedLessonIds.includes(l.id)
        ).length;

        return (
          <div
            key={module.id}
            className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 transition-all shadow-2xs"
          >
            {/* Module Accordion Header */}
            <button
              type="button"
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {modIdx + 1}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white font-heading">
                    {module.title}
                  </h4>
                  {module.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {module.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                  {isEnrolled ? `${moduleCompletedLessons}/${module.lessons.length} done` : `${module.lessons.length} lessons`}
                </span>
                <div
                  className={`p-1 rounded-lg text-slate-400 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </button>

            {/* Lessons List */}
            {isExpanded && (
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80 border-t border-slate-100 dark:border-slate-800">
                {module.lessons.map((lesson) => {
                  const isCompleted = completedLessonIds.includes(lesson.id);
                  const isCurrent = currentLessonId === lesson.id;
                  const isAccessible = isEnrolled || lesson.previewFree;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => isAccessible && onSelectLesson && onSelectLesson(lesson, module)}
                      className={`flex items-center justify-between p-3.5 sm:px-5 text-xs transition-colors ${
                        isCurrent
                          ? 'bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                      } ${isAccessible && onSelectLesson ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : isAccessible ? (
                          <PlayCircle className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                        ) : (
                          <Lock className="w-4 h-4 text-slate-400 dark:text-slate-600 shrink-0" />
                        )}

                        <span className={`truncate font-medium ${isCurrent ? 'text-indigo-700 dark:text-indigo-300 font-semibold' : ''}`}>
                          {lesson.title}
                        </span>

                        {lesson.previewFree && !isEnrolled && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold shrink-0">
                            Free Preview
                          </span>
                        )}

                        {lesson.resources && lesson.resources.length > 0 && (
                          <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-slate-400 shrink-0">
                            <FileText className="w-3 h-3" />
                            {lesson.resources.length} file
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] text-slate-400 shrink-0 font-mono">
                        {lesson.duration}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
