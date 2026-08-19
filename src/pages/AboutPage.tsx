import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import {
  BookOpen,
  GraduationCap,
  Target,
  Sparkles,
  ShieldCheck,
  Users,
  Award,
  Laptop,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { INSTRUCTORS } from '../data/courses';

export const AboutPage: React.FC = () => {
  const faqs = [
    {
      q: 'What is SkillSphere?',
      a: 'SkillSphere is a next-generation online learning platform built as a college Digital Marketing capstone project. It showcases practical e-learning methodologies, high-converting UI/UX design, and modular web architecture.'
    },
    {
      q: 'Do I get a certificate upon course completion?',
      a: 'Yes! Every course on SkillSphere offers a verified digital Certificate of Completion upon finishing all modules and practical lessons. You can download and share it on LinkedIn or your portfolio.'
    },
    {
      q: 'How does data persistence work?',
      a: 'SkillSphere operates entirely in the browser using modern HTML5 Local Storage. Your user account, enrolled courses, progress bars, wishlist bookmarks, and profile customizations persist across browser sessions.'
    },
    {
      q: 'Can I test the platform without registering?',
      a: 'Absolutely! Use the 1-click "Quick Demo Login" button on the Login page or Hero banner to instantly sign into the Alex Morgan demo account.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero / Project Overview */}
      <section className="pt-10 pb-14 bg-gradient-to-b from-indigo-50/40 via-white to-transparent dark:from-indigo-950/20 dark:via-slate-950 dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <GraduationCap className="w-4 h-4" />
            <span>Digital Marketing & EdTech Project</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading max-w-3xl mx-auto leading-tight">
            Empowering Next-Generation Learners with Practical Skills
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            SkillSphere was developed to demonstrate how modern educational design, responsive frontend architecture, and gamified progress tracking can revolutionize online student engagement.
          </p>
        </div>
      </section>

      {/* 2. Mission & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Bridge the divide between academic theory and practical industry requirements through interactive project-based learning.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 w-fit">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Project-First Curriculum</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every course is built around tangible portfolio milestones, providing students with real code repos and marketing campaigns.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 w-fit">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">Verified Credentials</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Equip students with verifiable digital certificates suitable for presentation in job interviews, internships, and LinkedIn profiles.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Featured Mentors & Instructors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Meet Our Industry Mentors
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Learn from seasoned practitioners from leading tech companies and marketing agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(INSTRUCTORS).map((inst) => (
            <div
              key={inst.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 text-center space-y-3 shadow-xs"
            >
              <img
                src={inst.avatar}
                alt={inst.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover mx-auto ring-4 ring-indigo-500/20"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white font-heading">{inst.name}</h4>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{inst.role}</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {inst.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2"
            >
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{faq.q}</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-indigo-600 text-white space-y-6 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
            Ready to explore the SkillSphere course catalog?
          </h3>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-xl mx-auto">
            Browse our full range of Web Development, Digital Marketing, and UI/UX Design tracks.
          </p>
          <Link to="/courses" className="inline-block">
            <Button size="lg" variant="secondary" className="bg-white text-indigo-900 hover:bg-slate-100 font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore All Courses
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
