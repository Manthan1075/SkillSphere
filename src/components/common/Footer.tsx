import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, ShieldCheck, Sparkles, GraduationCap, Github, Twitter, Linkedin, Youtube } from 'lucide-react';
import { CATEGORIES } from '../../data/courses';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Banner / Project Context */}
      <div className="bg-indigo-950/60 border-b border-indigo-900/40 py-3 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 text-xs text-indigo-200">
          <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="font-semibold">Academic Showcase:</span>
          <span>College Digital Marketing & E-Learning Platform Project • Built with modern React & Local Persistence</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                Skill<span className="text-indigo-400">Sphere</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              SkillSphere is a next-generation online learning platform empowering students and professionals to master practical skills, build real projects, and accelerate their careers.
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">Explore Courses</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">Student Dashboard</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">My Wishlist</Link>
              </li>
            </ul>
          </div>

          {/* Learning Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Popular Tracks
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/courses?category=${encodeURIComponent(cat.name)}`}
                    className="hover:text-white transition-colors truncate block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Trust & Support
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Certificates</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Industry-Aligned Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Lifetime Course Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SkillSphere. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-slate-400 transition-colors">Digital Marketing Project</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
