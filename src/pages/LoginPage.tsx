import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { BookOpen, Sparkles, CheckCircle2, Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, seedDemoAccount } = useAuth();

  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const res = await login(email, password, rememberMe);
    setIsLoading(false);

    if (res.success) {
      navigate(redirectUrl);
    } else {
      setErrorMsg(res.message || 'Invalid email or password.');
    }
  };

  const handleDemoLogin = () => {
    seedDemoAccount();
    navigate(redirectUrl);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Left Column: Branding Showcase (5 cols) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-950 text-white p-10 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

          {/* Top Brand */}
          <div className="relative z-10 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white text-indigo-600 flex items-center justify-center shadow-md font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                SkillSphere
              </span>
            </Link>
            <p className="text-xs text-indigo-200 uppercase tracking-widest font-semibold">
              Learn Skills. Build Your Future.
            </p>
          </div>

          {/* Middle Value Props */}
          <div className="relative z-10 space-y-5 my-8">
            <h3 className="text-2xl font-bold font-heading leading-snug">
              Unlock hands-on courses taught by industry leads.
            </h3>
            <div className="space-y-3 text-xs text-indigo-100">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlimited lifetime access to enrolled content</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Industry-recognized verified certificates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Interactive code projects & digital marketing cases</span>
              </div>
            </div>
          </div>

          {/* Bottom Card */}
          <div className="relative z-10 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs">
            <p className="font-semibold text-white">🎓 Academic Presentation Demo</p>
            <p className="text-indigo-200 mt-0.5">
              Testing the project? Use the quick demo login button to explore without signup.
            </p>
          </div>
        </div>

        {/* Right Column: Login Form (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
                Welcome back 👋
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Enter your credentials to access your courses and dashboard.
              </p>
            </div>

            {/* Demo Helper Banner */}
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-bold text-indigo-900 dark:text-indigo-200">Demo Student Account</p>
                <p className="text-indigo-700 dark:text-indigo-400 text-[11px]">alex.morgan@skillsphere.com</p>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={handleDemoLogin}
                className="text-xs"
              >
                1-Click Demo Login
              </Button>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('For this student project, simply use "password123" or sign up a new account!')}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600 dark:text-slate-400 select-none">
                  Keep me signed in on this browser
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full font-bold text-sm shadow-md"
              >
                Log In to SkillSphere
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Don't have an account yet?{' '}
                <Link to="/signup" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                  Create Account Free →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
