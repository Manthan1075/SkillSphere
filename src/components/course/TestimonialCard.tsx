import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    collegeOrCompany: string;
    rating: number;
    quote: string;
  };
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="flex flex-col justify-between p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 relative">
      <Quote className="absolute top-6 right-6 w-8 h-8 text-indigo-100 dark:text-slate-800/80 pointer-events-none" />

      <div>
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Student Profile */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          referrerPolicy="no-referrer"
          className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/20"
        />
        <div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white font-heading">{testimonial.name}</h4>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{testimonial.role}</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">{testimonial.collegeOrCompany}</p>
        </div>
      </div>
    </div>
  );
};
