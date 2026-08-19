import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryInfo } from '../../types';
import {
  Code,
  TrendingUp,
  Figma,
  BarChart3,
  Brain,
  Terminal,
  Cloud,
  Briefcase,
  ArrowRight
} from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
}

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Figma: <Figma className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses?category=${encodeURIComponent(category.name)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-400 dark:hover:border-indigo-600 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3.5 rounded-xl bg-gradient-to-br ${category.color} border transition-transform duration-300 group-hover:scale-110`}>
          {iconMap[category.iconName] || <Code className="w-6 h-6" />}
        </div>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
          {category.courseCount} Courses
        </span>
      </div>

      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1 font-heading">
        {category.name}
      </h3>

      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed flex-1">
        {category.description}
      </p>

      <div className="mt-4 pt-3 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 border-t border-slate-100 dark:border-slate-800">
        <span>Explore Track</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
