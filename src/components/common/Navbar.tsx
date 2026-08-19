import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './Button';
import { Modal } from './Modal';
import { SearchBar } from './SearchBar';
import { CATEGORIES } from '../../data/courses';
import {
  BookOpen,
  Search,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Sparkles,
  Award
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, seedDemoAccount } = useAuth();
  const { wishlistCourseIds, courses } = useCourses();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCategoriesDropdownOpen(false);
    setSearchModalOpen(false);
  }, [location.pathname]);

  // Scroll listener for subtle glass navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(e.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter courses for quick modal search
  const filteredQuickCourses = searchQuery.trim()
    ? courses.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 5)
    : [];

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchModalOpen(false);
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors py-1 ${
      isActive
        ? 'text-indigo-600 dark:text-indigo-400'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs'
            : 'bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Brand Logo & Navigation */}
            <div className="flex items-center gap-8">
              {/* Brand Logo */}
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
                    Skill<span className="text-indigo-600 dark:text-indigo-400">Sphere</span>
                  </span>
                  <span className="hidden lg:block text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wide uppercase">
                    EdTech Learning Hub
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-6">
                <NavLink to="/" className={navLinkClasses} end>
                  Home
                </NavLink>
                <NavLink to="/courses" className={navLinkClasses}>
                  Courses
                </NavLink>

                {/* Categories Dropdown */}
                <div className="relative" ref={categoriesDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                    className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors py-1"
                  >
                    <span>Categories</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${categoriesDropdownOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                  </button>

                  {categoriesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase px-3 py-1.5">
                        Browse Tracks
                      </div>
                      <div className="space-y-0.5">
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/courses?category=${encodeURIComponent(cat.name)}`}
                            onClick={() => setCategoriesDropdownOpen(false)}
                            className="flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <span>{cat.name}</span>
                            <span className="text-[10px] text-slate-400">{cat.courseCount}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <NavLink to="/about" className={navLinkClasses}>
                  About
                </NavLink>
              </nav>
            </div>

            {/* Right: Actions (Search, Wishlist, Theme, Auth) */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Quick Search Button */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 rounded-xl transition-colors"
                aria-label="Search courses"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span className="hidden lg:inline-block">Search courses...</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-slate-400 shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative p-2.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCourseIds.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-950">
                    {wishlistCourseIds.length}
                  </span>
                )}
              </Link>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
              </button>

              {/* Auth Controls */}
              {isAuthenticated && user ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 p-1 pl-1.5 pr-2.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500/30"
                    />
                    <span className="hidden sm:inline-block text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                        Dashboard
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        My Wishlist ({wishlistCourseIds.length})
                      </Link>

                      <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="primary" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-1">
              <NavLink to="/" className={navLinkClasses} end>
                Home
              </NavLink>
              <NavLink to="/courses" className={navLinkClasses}>
                Courses Marketplace
              </NavLink>
              <NavLink to="/about" className={navLinkClasses}>
                About SkillSphere
              </NavLink>
              <NavLink to="/wishlist" className={navLinkClasses}>
                Wishlist ({wishlistCourseIds.length})
              </NavLink>
              {isAuthenticated && (
                <NavLink to="/dashboard" className={navLinkClasses}>
                  Student Dashboard
                </NavLink>
              )}
            </nav>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              {isAuthenticated ? (
                <Button variant="outline" size="sm" onClick={logout} leftIcon={<LogOut className="w-4 h-4" />}>
                  Logout ({user?.name.split(' ')[0]})
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" className="w-full">
                    <Button variant="primary" size="sm" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      <Modal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        maxWidth="lg"
        title="Search SkillSphere"
      >
        <div className="space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            autoFocus
            onSubmit={handleQuickSearchSubmit}
            placeholder="Search Web Dev, SEO, Figma, Python, AI..."
          />

          {searchQuery.trim() && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Matching Courses ({filteredQuickCourses.length})
              </p>
              {filteredQuickCourses.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredQuickCourses.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setSearchModalOpen(false);
                        navigate(`/courses/${c.id}`);
                      }}
                      className="flex items-center gap-3 py-2.5 px-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl cursor-pointer transition-colors"
                    >
                      <img
                        src={c.thumbnail}
                        alt={c.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-9 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">{c.title}</h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{c.category} • {c.instructor.name}</p>
                      </div>
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {c.price === 0 ? 'Free' : `₹${c.price}`}
                      </span>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleQuickSearchSubmit}
                    className="w-full text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-2"
                  >
                    View all matching results in course catalog →
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-500 text-center py-4">No courses match "{searchQuery}".</p>
              )}
            </div>
          )}

          {!searchQuery.trim() && (
            <div className="space-y-2 pt-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['MERN Stack', 'Digital Marketing', 'Figma Design', 'Python Free', 'Data Analytics', 'Generative AI'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 text-xs rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
