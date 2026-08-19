import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { CourseCard } from '../components/course/CourseCard';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import { CertificateModal } from '../components/common/CertificateModal';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  ArrowRight,
  Heart,
  User,
  Settings,
  LogOut,
  Sparkles,
  Play,
  Share2,
  Calendar
} from 'lucide-react';
import { Course } from '../types';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const { getEnrolledCourses, getWishlistCourses, getStats, activities } = useCourses();

  const [activeTab, setActiveTab] = useState<'continue' | 'all' | 'in_progress' | 'completed' | 'wishlist' | 'activity'>('continue');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedCertCourse, setSelectedCertCourse] = useState<Course | null>(null);

  // Profile Form state
  const [editName, setEditName] = useState(user?.name || '');
  const [editHeadline, setEditHeadline] = useState(user?.headline || '');
  const [editBio, setEditBio] = useState(user?.bio || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const stats = getStats();
  const enrolledCourses = getEnrolledCourses();
  const wishlistCourses = getWishlistCourses();

  const inProgressCourses = enrolledCourses.filter((c) => !c.progress.isCompleted);
  const completedCourses = enrolledCourses.filter((c) => c.progress.isCompleted);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    await updateProfile({
      name: editName,
      headline: editHeadline,
      bio: editBio,
      avatar: editAvatar,
    });
    setIsUpdatingProfile(false);
    setProfileModalOpen(false);
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-700/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 sm:gap-6 relative z-10">
          <div className="relative">
            <img
              src={user?.avatar || sampleAvatars[0]}
              alt={user?.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
            />
            <button
              type="button"
              onClick={() => setProfileModalOpen(true)}
              className="absolute -bottom-1 -right-1 p-1.5 bg-white text-indigo-600 rounded-lg shadow-md hover:scale-110 transition-transform"
              aria-label="Edit avatar"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
                Welcome back, {user?.name.split(' ')[0] || 'Learner'}! 👋
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-indigo-200">
              {user?.headline || 'Continue learning and keep building your future skills.'}
            </p>
            <p className="text-[11px] text-indigo-300/80 font-mono">
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '2026'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setProfileModalOpen(true)}
            leftIcon={<User className="w-4 h-4" />}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            Edit Profile
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              logout();
              navigate('/');
            }}
            leftIcon={<LogOut className="w-4 h-4" />}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Log Out
          </Button>
        </div>
      </div>

      {/* Stats Cards (4 Key Metrics) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Enrolled */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              {stats.enrolledCount}
            </p>
            <p className="text-xs text-slate-500 font-medium">Courses Enrolled</p>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              {stats.completedCount}
            </p>
            <p className="text-xs text-slate-500 font-medium">Courses Completed</p>
          </div>
        </div>

        {/* Learning Hours */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              {stats.learningHours} hrs
            </p>
            <p className="text-xs text-slate-500 font-medium">Learning Hours</p>
          </div>
        </div>

        {/* Streak */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              {stats.currentStreak} Days
            </p>
            <p className="text-xs text-slate-500 font-medium">Current Streak 🔥</p>
          </div>
        </div>
      </div>

      {/* Dashboard Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('continue')}
          className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap rounded-t-xl transition-all border-b-2 ${
            activeTab === 'continue'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Continue Learning ({inProgressCourses.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap rounded-t-xl transition-all border-b-2 ${
            activeTab === 'all'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          All Enrolled ({enrolledCourses.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap rounded-t-xl transition-all border-b-2 ${
            activeTab === 'completed'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Completed & Certificates ({completedCourses.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('wishlist')}
          className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap rounded-t-xl transition-all border-b-2 ${
            activeTab === 'wishlist'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Wishlist ({wishlistCourses.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap rounded-t-xl transition-all border-b-2 ${
            activeTab === 'activity'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Recent Activity
        </button>
      </div>

      {/* TAB CONTENT 1: CONTINUE LEARNING */}
      {activeTab === 'continue' && (
        <div className="space-y-6">
          {inProgressCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inProgressCourses.map((course) => {
                const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
                const completedLessons = course.progress.completedLessonIds.length;

                return (
                  <div
                    key={course.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div className="flex gap-4">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        referrerPolicy="no-referrer"
                        className="w-24 h-20 sm:w-28 sm:h-24 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
                          {course.category}
                        </span>
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 font-heading">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-500">Instructor: {course.instructor.name}</p>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-semibold">
                          <span>{course.progress.completedPercentage}% Complete</span>
                          <span>{completedLessons} of {totalLessons} lessons done</span>
                        </div>
                        <ProgressBar value={course.progress.completedPercentage} size="sm" />
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        onClick={() => navigate(`/learn/${course.id}`)}
                        leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                      >
                        Continue Learning →
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon="course"
              title="No courses in progress"
              description="You have no active courses currently in progress. Explore our catalog and start learning a new skill today."
              actionText="Browse Courses"
              onAction={() => navigate('/courses')}
            />
          )}
        </div>
      )}

      {/* TAB CONTENT 2: ALL ENROLLED */}
      {activeTab === 'all' && (
        <div>
          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.id} course={course} showProgress />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="course"
              title="No courses enrolled yet"
              description="You haven't enrolled in any courses yet. Choose a track and start building practical skills."
              actionText="Explore Course Catalog"
              onAction={() => navigate('/courses')}
            />
          )}
        </div>
      )}

      {/* TAB CONTENT 3: COMPLETED COURSES & CERTIFICATES */}
      {activeTab === 'completed' && (
        <div>
          {completedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-500/30 p-6 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed 100%
                      </span>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white font-heading">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500">Instructor: {course.instructor.name}</p>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-amber-400/10 text-amber-500">
                      <Award className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/learn/${course.id}`)}
                    >
                      Review Course
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSelectedCertCourse(course)}
                      leftIcon={<Award className="w-3.5 h-3.5" />}
                    >
                      View Certificate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon="award"
              title="No certificates earned yet"
              description="Complete all required lessons and projects in an enrolled course to unlock your verified Certificate of Completion."
              actionText="Continue Learning"
              onAction={() => setActiveTab('continue')}
            />
          )}
        </div>
      )}

      {/* TAB CONTENT 4: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistCourses.map((course) => (
                <CourseCard key={course.id} course={course} showProgress={false} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="bookmark"
              title="Your wishlist is empty"
              description="Bookmark interesting courses by clicking the heart icon on any course card to save them for later."
              actionText="Browse Courses"
              onAction={() => navigate('/courses')}
            />
          )}
        </div>
      )}

      {/* TAB CONTENT 5: RECENT ACTIVITY */}
      {activeTab === 'activity' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white font-heading">
            Recent Learning Activity
          </h3>

          <div className="relative pl-6 space-y-6 border-l-2 border-slate-100 dark:border-slate-800">
            {activities.map((act) => (
              <div key={act.id} className="relative space-y-1">
                <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-indigo-600 ring-4 ring-white dark:ring-slate-900" />
                <p className="text-sm font-bold text-slate-900 dark:text-white">{act.title}</p>
                {act.subtitle && <p className="text-xs text-slate-500 dark:text-slate-400">{act.subtitle}</p>}
                <p className="text-[10px] text-slate-400 font-mono">
                  {new Date(act.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      <Modal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        title="Edit Student Profile"
        maxWidth="md"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          {/* Avatar Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Choose Avatar
            </label>
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {sampleAvatars.map((av, i) => (
                <img
                  key={i}
                  src={av}
                  alt={`Avatar ${i}`}
                  referrerPolicy="no-referrer"
                  onClick={() => setEditAvatar(av)}
                  className={`w-12 h-12 rounded-xl object-cover cursor-pointer transition-all ${
                    editAvatar === av ? 'ring-3 ring-indigo-600 scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Full Name
            </label>
            <input
              type="text"
              required
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Headline */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Headline / Career Goal
            </label>
            <input
              type="text"
              value={editHeadline}
              onChange={(e) => setEditHeadline(e.target.value)}
              placeholder="e.g. Aspiring Full-Stack Engineer"
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Bio
            </label>
            <textarea
              rows={3}
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder="Tell instructors and fellow students about your goals..."
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setProfileModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isUpdatingProfile}
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Certificate Modal */}
      {selectedCertCourse && (
        <CertificateModal
          isOpen={!!selectedCertCourse}
          onClose={() => setSelectedCertCourse(null)}
          course={selectedCertCourse}
        />
      )}
    </div>
  );
};
