import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { CurriculumAccordion } from '../components/course/CurriculumAccordion';
import { InstructorCard } from '../components/course/InstructorCard';
import { EmptyState } from '../components/common/EmptyState';
import {
  Star,
  Clock,
  BookOpen,
  Globe,
  Award,
  Calendar,
  CheckCircle2,
  Heart,
  Play,
  Share2,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Users
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const CourseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses, isEnrolled, enrollInCourse, isInWishlist, toggleWishlist, getProgress } = useCourses();
  const { isAuthenticated } = useAuth();
  const { showSuccess } = useToast();

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const course = courses.find((c) => c.id === id || c.slug === id);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          icon="error"
          title="Course Not Found"
          description="The course you are looking for does not exist or may have been updated."
          actionText="Back to Courses"
          onAction={() => navigate('/courses')}
        />
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const wishlisted = isInWishlist(course.id);
  const progress = getProgress(course.id);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(`/courses/${course.id}`)}`);
      return;
    }

    if (enrolled) {
      navigate(`/learn/${course.id}`);
      return;
    }

    const success = enrollInCourse(course.id);
    if (success) {
      navigate(`/learn/${course.id}`);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showSuccess('Link Copied', 'Course link copied to clipboard!');
  };

  return (
    <div className="pb-20">
      {/* Top Banner / Hero Header */}
      <section className="bg-slate-900 text-white pt-8 pb-12 sm:pb-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/courses" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Courses
            </Link>
            <span>/</span>
            <Link to={`/courses?category=${encodeURIComponent(course.category)}`} className="hover:text-white transition-colors">
              {course.category}
            </Link>
            <span>/</span>
            <span className="text-slate-200 truncate max-w-xs">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Header Details (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                  {course.level}
                </span>
                {course.bestseller && (
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-xs">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Title & Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight font-heading">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {course.headline}
              </p>

              {/* Meta Metrics Bar */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white text-sm">{course.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({course.ratingCount.toLocaleString()} ratings)</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{course.studentsCount.toLocaleString()} students</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{course.duration}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span>{course.language}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Updated {course.lastUpdated}</span>
                </div>
              </div>

              {/* Instructor Lead */}
              <div className="flex items-center gap-3 pt-1">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40"
                />
                <div>
                  <p className="text-xs text-slate-400">Created by</p>
                  <p className="text-sm font-bold text-white hover:underline cursor-pointer">
                    {course.instructor.name} • {course.instructor.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sticky Card (4 cols on desktop) */}
            <div className="lg:col-span-4 w-full">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden p-6 text-slate-900 dark:text-white space-y-6">
                {/* Media Preview */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 group">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg transition-transform transform group-hover:scale-110"
                      aria-label="Play course preview"
                    >
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </button>
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-mono">
                    Preview Course
                  </span>
                </div>

                {/* Price Section */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3">
                    {course.price === 0 ? (
                      <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-heading">
                        Free
                      </span>
                    ) : (
                      <>
                        <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
                          ₹{course.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-slate-400 line-through">
                          ₹{course.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-bold">
                          {course.discountPercentage}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-rose-500 font-semibold">
                    ⚡ Special promotional pricing available for limited enrollment!
                  </p>
                </div>

                {/* Main Action Buttons */}
                <div className="space-y-2.5">
                  <Button
                    variant={enrolled ? 'secondary' : 'primary'}
                    size="lg"
                    className="w-full text-base font-bold shadow-md"
                    onClick={handleEnroll}
                  >
                    {enrolled ? 'Continue Learning →' : course.price === 0 ? 'Enroll for Free' : 'Enroll Now'}
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleWishlist(course.id)}
                      leftIcon={<Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />}
                    >
                      {wishlisted ? 'Saved' : 'Wishlist'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                      leftIcon={<Share2 className="w-4 h-4" />}
                    >
                      Share
                    </Button>
                  </div>
                </div>

                {/* Course Inclusions Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  <p className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                    This course includes:
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>{course.duration} on-demand video</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>{course.totalLessons} downloadable practical lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Full lifetime access across devices</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Verified Certificate of Completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area (What you'll learn, Curriculum, Instructor, Reviews) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. What you'll learn */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                What you'll learn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Skills Covered */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Skills you will gain
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200/60 dark:border-indigo-800/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Course Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                Course Overview
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* 4. Course Curriculum Accordion */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  Course Curriculum
                </h2>
                <span className="text-xs text-slate-500">
                  {course.modules.length} modules • {course.totalLessons} lectures • {course.duration} total length
                </span>
              </div>
              <CurriculumAccordion
                modules={course.modules}
                completedLessonIds={progress?.completedLessonIds || []}
                isEnrolled={enrolled}
              />
            </div>

            {/* 5. Requirements & Target Audience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-100/70 dark:bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-heading">
                  Requirements
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  {course.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-heading">
                  Who is this course for?
                </h3>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  {course.targetAudience.map((aud, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{aud}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 6. Instructor Bio */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                About the Instructor
              </h2>
              <InstructorCard instructor={course.instructor} />
            </div>

            {/* 7. Student Reviews */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  Student Feedback
                </h2>
                <div className="flex items-center gap-1.5">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{course.rating.toFixed(1)}</span>
                  <span className="text-xs text-slate-400">course rating</span>
                </div>
              </div>

              <div className="space-y-4">
                {course.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.userAvatar}
                          alt={rev.userName}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white font-heading">
                            {rev.userName}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <div className="flex items-center">
                              {Array.from({ length: rev.rating }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <span>• {rev.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
