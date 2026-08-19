import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { CourseCard } from '../components/course/CourseCard';
import { CategoryCard } from '../components/course/CategoryCard';
import { TestimonialCard } from '../components/course/TestimonialCard';
import {
  CATEGORIES,
  TRUST_STATS,
  WHY_SKILLSPHERE,
  HOW_IT_WORKS_STEPS,
  TESTIMONIALS
} from '../data/courses';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Users,
  BookOpen,
  GraduationCap,
  Award,
  TrendingUp,
  Code2,
  Clock,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { courses } = useCourses();
  const { isAuthenticated, seedDemoAccount } = useAuth();

  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('All');

  // Filter 6 featured courses
  const featuredCourses = courses.filter((c) => {
    if (activeCategoryTab === 'All') return true;
    return c.category === activeCategoryTab;
  }).slice(0, 6);

  const whyIcons: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className="w-6 h-6 text-amber-500" />,
    Code2: <Code2 className="w-6 h-6 text-indigo-500" />,
    Clock: <Clock className="w-6 h-6 text-emerald-500" />,
    Briefcase: <Briefcase className="w-6 h-6 text-rose-500" />
  };

  const statIcons: Record<string, React.ReactNode> = {
    Users: <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    BookOpen: <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    GraduationCap: <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    Award: <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 bg-gradient-to-b from-indigo-50/40 via-white to-transparent dark:from-indigo-950/20 dark:via-slate-950 dark:to-transparent">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline & CTA */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Next-Gen Online Learning & Digital Marketing Platform</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] font-heading">
                Learn Skills.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500">
                  Build Your Future.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Master in-demand skills with practical courses designed to help you learn faster, build real projects, and grow your career.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-2">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => navigate('/courses')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Courses
                </Button>

                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    if (isAuthenticated) {
                      navigate('/dashboard');
                    } else {
                      navigate('/signup');
                    }
                  }}
                  leftIcon={<Play className="w-4 h-4 fill-current text-indigo-600 dark:text-indigo-400" />}
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Start Learning Free'}
                </Button>
              </div>

              {/* Quick Evaluation Helper */}
              {!isAuthenticated && (
                <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center lg:justify-start gap-2">
                  <span>Presenting to Professor?</span>
                  <button
                    type="button"
                    onClick={seedDemoAccount}
                    className="font-bold text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-700"
                  >
                    Quick-login demo account (Alex Morgan)
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Visual Learning Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Showcase Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                    alt="Students collaborating on SkillSphere"
                    referrerPolicy="no-referrer"
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                          JS
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                            Interactive Code Sandbox
                          </h4>
                          <p className="text-xs text-slate-500">Live project preview & feedback</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                        98% Active
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300 font-medium">
                        <span>Course Completion Rate</span>
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">84%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full w-[84%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Micro Card 1: Top Rated */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Top Rated</p>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">4.9 / 5.0 Rating</p>
                  </div>
                </div>

                {/* Floating Micro Card 2: Learners */}
                <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Certificates</p>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">Industry Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Statistics Strip */}
          <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TRUST_STATS.map((stat, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4">
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 shadow-2xs">
                  {statIcons[stat.icon]}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              Curated Skill Tracks
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
              Popular Categories
            </h2>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
          >
            <span>View All Tracks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. FEATURED COURSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              Top Rated Learning
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
              Featured Courses
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {['All', 'Web Development', 'Digital Marketing', 'UI/UX Design', 'Programming'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveCategoryTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategoryTab === tab
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/courses')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore All {courses.length}+ Courses
          </Button>
        </div>
      </section>

      {/* 4. WHY SKILLSPHERE? */}
      <section className="bg-slate-100/70 dark:bg-slate-900/50 py-16 sm:py-20 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              The SkillSphere Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
              Why Students & Professionals Choose SkillSphere
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              We design every curriculum around practical job competency, real portfolio artifacts, and high-impact mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_SKILLSPHERE.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {whyIcons[item.icon]}
                  </div>
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Step-by-Step Pathway
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            How It Works
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Your streamlined journey from absolute novice to certified, job-ready specialist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 font-heading">
                {step.step}
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                {step.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. STUDENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Real Student Stories
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Trusted by 10,000+ Ambitious Learners
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            See how SkillSphere helped students ace college coursework and transition into high-growth tech careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </section>

      {/* 7. HIGH-CONVERSION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-14 shadow-2xl border border-indigo-700/50 text-center space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Enroll Today & Start Free
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-tight">
              Ready to upgrade your skills?
            </h2>

            <p className="text-sm sm:text-base text-indigo-200 leading-relaxed">
              Start learning today and take the next step toward your career with hands-on projects, industry certifications, and guided mentorship.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                variant="primary"
                onClick={() => navigate('/courses')}
                className="bg-white text-indigo-900 hover:bg-slate-100 font-bold shadow-lg"
                rightIcon={<ArrowRight className="w-4 h-4 text-indigo-900" />}
              >
                Explore Courses
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
                className="border-indigo-300/40 text-white hover:bg-white/10"
              >
                {isAuthenticated ? 'My Dashboard' : 'Create Free Account'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
