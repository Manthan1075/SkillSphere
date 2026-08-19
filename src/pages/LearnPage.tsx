import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import { Lesson, CourseModule } from '../types';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { CertificateModal } from '../components/common/CertificateModal';
import { EmptyState } from '../components/common/EmptyState';
import {
  ArrowLeft,
  CheckCircle2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  FileText,
  Code2,
  Download,
  MessageSquare,
  Award,
  ChevronRight,
  ChevronDown,
  Volume2,
  Maximize2,
  Sparkles,
  Send,
  HelpCircle,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '../context/ToastContext';

export const LearnPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses, isEnrolled, getProgress, markLessonCompleted } = useCourses();
  const { user } = useAuth();
  const { showSuccess } = useToast();

  const course = courses.find((c) => c.id === id || c.slug === id);

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeModule, setActiveModule] = useState<CourseModule | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'code' | 'resources' | 'qa'>('notes');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);

  // Local Q&A state for this classroom
  const [questions, setQuestions] = useState([
    {
      id: '1',
      author: 'David K.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      time: '2 days ago',
      question: 'How should I structure the folder hierarchy for production deployment?',
      answer: 'Instructor Answer: We recommend grouping by feature module rather than technical layer for large scalable codebases.',
    },
    {
      id: '2',
      author: 'Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      time: 'Yesterday',
      question: 'Will this code example work with the latest Node v22 LTS release?',
      answer: 'Yes! All code snippets in this module have been verified against Node 20 and Node 22 LTS.',
    }
  ]);
  const [newQuestion, setNewQuestion] = useState('');

  // Code Sandbox State
  const [userCode, setUserCode] = useState(
    `// Interactive Classroom Sandbox
function calculateGrowth(current, target) {
  const diff = target - current;
  const growthRate = ((diff / current) * 100).toFixed(1);
  return \`Growth required: \${growthRate}%\`;
}

console.log(calculateGrowth(1200, 3500));`
  );
  const [codeOutput, setCodeOutput] = useState('Click "Run Code" to execute interactive JavaScript sandbox in browser.');

  // Set initial lesson
  useEffect(() => {
    if (course && course.modules.length > 0) {
      const firstMod = course.modules[0];
      const progress = getProgress(course.id);
      const firstIncompleteLesson = course.modules
        .flatMap((m) => m.lessons)
        .find((l) => !progress?.completedLessonIds.includes(l.id));

      if (firstIncompleteLesson) {
        setActiveLesson(firstIncompleteLesson);
        const parentMod = course.modules.find((m) =>
          m.lessons.some((l) => l.id === firstIncompleteLesson.id)
        );
        if (parentMod) setActiveModule(parentMod);
      } else {
        setActiveLesson(firstMod.lessons[0] || null);
        setActiveModule(firstMod);
      }
    }
  }, [course]);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          icon="error"
          title="Course Not Found"
          description="Could not locate the course classroom."
          actionText="Back to Dashboard"
          onAction={() => navigate('/dashboard')}
        />
      </div>
    );
  }

  const progress = getProgress(course.id);
  const isLessonCompleted = activeLesson
    ? progress?.completedLessonIds.includes(activeLesson.id)
    : false;

  // Flattened lessons list for next/prev navigation
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentLessonIndex = activeLesson
    ? allLessons.findIndex((l) => l.id === activeLesson.id)
    : -1;

  const handleNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      const nextL = allLessons[currentLessonIndex + 1];
      setActiveLesson(nextL);
      const pMod = course.modules.find((m) => m.lessons.some((l) => l.id === nextL.id));
      if (pMod) setActiveModule(pMod);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      const prevL = allLessons[currentLessonIndex - 1];
      setActiveLesson(prevL);
      const pMod = course.modules.find((m) => m.lessons.some((l) => l.id === prevL.id));
      if (pMod) setActiveModule(pMod);
    }
  };

  const handleToggleComplete = () => {
    if (activeLesson) {
      const newCompletion = markLessonCompleted(course.id, activeLesson.id);
      if (newCompletion) {
        showSuccess('Lesson Completed! 🚀', `Great job completing "${activeLesson.title}"!`);
        // If course is 100% complete, fire confetti
        const updatedProgress = getProgress(course.id);
        if (updatedProgress?.isCompleted) {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
        }
      }
    }
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setQuestions([
      {
        id: String(Date.now()),
        author: user?.name || 'You',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        time: 'Just now',
        question: newQuestion.trim(),
        answer: 'Instructor Response: Thanks for posting your question! Our teaching assistants respond within 12 hours.',
      },
      ...questions,
    ]);
    setNewQuestion('');
    showSuccess('Question Submitted', 'Your question has been posted to the classroom discussion.');
  };

  const handleRunCode = () => {
    try {
      // Safe sandbox console capture
      const logs: string[] = [];
      const customConsole = {
        log: (...args: any[]) => logs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')),
        error: (...args: any[]) => logs.push('Error: ' + args.join(' ')),
        warn: (...args: any[]) => logs.push('Warning: ' + args.join(' ')),
      };
      const runFn = new Function('console', userCode);
      runFn(customConsole);
      setCodeOutput(logs.length > 0 ? logs.join('\n') : 'Code executed with no log output.');
    } catch (err: any) {
      setCodeOutput(`Execution Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Classroom Navigation Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-3 py-1.5 rounded-lg shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exit to Dashboard</span>
          </Link>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold text-white truncate font-heading">
              {course.title}
            </h1>
            <p className="text-[11px] text-slate-400 truncate">
              {activeModule?.title || 'Course Module'} • {activeLesson?.title || 'Lesson'}
            </p>
          </div>
        </div>

        {/* Progress & Certificate */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:flex flex-col items-end gap-1 w-36">
            <div className="flex justify-between w-full text-[11px] text-slate-400 font-semibold">
              <span>Your Progress</span>
              <span className="text-indigo-400">{progress?.completedPercentage || 0}%</span>
            </div>
            <ProgressBar value={progress?.completedPercentage || 0} size="sm" className="w-full" />
          </div>

          {progress?.isCompleted && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCertificateModalOpen(true)}
              leftIcon={<Award className="w-4 h-4 text-amber-400" />}
              className="bg-amber-400/10 text-amber-300 border-amber-400/30 text-xs"
            >
              Certificate
            </Button>
          )}

          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
            title="Toggle Curriculum Sidebar"
          >
            {sidebarOpen ? 'Hide Syllabus' : 'Show Syllabus'}
          </button>
        </div>
      </header>

      {/* Main Workspace (Player + Content Tabs + Curriculum Sidebar) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left / Center Area: Player + Interactive Tabs */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {/* 1. Video Player Screen */}
          <div className="w-full bg-black relative aspect-video max-h-[52vh] flex items-center justify-center group">
            {/* Custom Video Stage Canvas */}
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
              <img
                src={course.thumbnail}
                alt={activeLesson?.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover opacity-60 transition-all ${isPlaying ? 'scale-105 filter blur-xs' : ''}`}
              />

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl transition-transform transform hover:scale-110"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 fill-current" />
                  ) : (
                    <Play className="w-8 h-8 fill-current translate-x-0.5" />
                  )}
                </button>

                <div className="text-center px-4">
                  <p className="text-xs uppercase tracking-widest text-indigo-300 font-bold">
                    {isPlaying ? 'Lecture Streaming' : 'Interactive Lecture Preview'}
                  </p>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 font-heading">
                    {activeLesson?.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Video Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={handlePrevLesson}
                    disabled={currentLessonIndex <= 0}
                    className="hover:text-indigo-400 disabled:opacity-30"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextLesson}
                    disabled={currentLessonIndex >= allLessons.length - 1}
                    className="hover:text-indigo-400 disabled:opacity-30"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                  <Volume2 className="w-4 h-4 text-slate-400" />
                  <span className="font-mono text-[11px] text-slate-400">
                    {activeLesson?.duration || '12:00'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                    1080p HD
                  </span>
                  <Maximize2 className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Lesson Title & Completion Controls */}
          <div className="p-4 sm:p-6 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                {activeModule?.title}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white font-heading">
                {activeLesson?.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={isLessonCompleted ? 'outline' : 'primary'}
                size="sm"
                onClick={handleToggleComplete}
                leftIcon={<CheckCircle2 className={`w-4 h-4 ${isLessonCompleted ? 'text-emerald-400' : ''}`} />}
                className={isLessonCompleted ? 'border-emerald-500/40 text-emerald-400' : ''}
              >
                {isLessonCompleted ? 'Completed ✓' : 'Mark as Completed'}
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={handleNextLesson}
                disabled={currentLessonIndex >= allLessons.length - 1}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Next Lesson
              </Button>
            </div>
          </div>

          {/* 3. Interactive Content Tabs (Notes, Sandbox, Resources, Q&A) */}
          <div className="flex-1 bg-slate-950 p-4 sm:p-6 space-y-6">
            {/* Tab Headers */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'notes'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Lesson Notes & Key Concepts</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'code'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Code Sandbox</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('resources')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'resources'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resources & Downloads ({activeLesson?.resources?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('qa')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'qa'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Q&A Discussion ({questions.length})</span>
              </button>
            </div>

            {/* TAB 1: NOTES */}
            {activeTab === 'notes' && (
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <h3 className="text-base font-bold text-white font-heading">
                  Lecture Summary: {activeLesson?.title}
                </h3>
                <p>
                  In this lesson, we explore foundational architectures, practical workflow setups, and best practices tailored for real-world projects.
                </p>
                <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <p className="font-bold text-indigo-400">💡 Key Takeaways:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li>Maintain modular architecture and single-responsibility code components.</li>
                    <li>Always sanitize user inputs and handle loading/empty state gracefully.</li>
                    <li>Test edge cases with browser storage before pushing to production.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: CODE SANDBOX */}
            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    Interactive In-Browser JS Sandbox
                  </span>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleRunCode}
                    leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                  >
                    Run Code
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Editor */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-emerald-400 space-y-2">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Editor</div>
                    <textarea
                      rows={10}
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full bg-transparent font-mono text-xs text-slate-200 focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  {/* Output */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 font-mono text-xs space-y-2">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Console Output</div>
                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                      {codeOutput}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: RESOURCES */}
            {activeTab === 'resources' && (
              <div className="space-y-3">
                {activeLesson?.resources && activeLesson.resources.length > 0 ? (
                  activeLesson.resources.map((res, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-indigo-400" />
                        <div>
                          <p className="font-bold text-white">{res.title}</p>
                          <p className="text-[10px] text-slate-400 font-mono uppercase">{res.type} Resource</p>
                        </div>
                      </div>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 py-4">No additional downloadable assets for this lecture.</p>
                )}
              </div>
            )}

            {/* TAB 4: Q&A */}
            {activeTab === 'qa' && (
              <div className="space-y-6">
                <form onSubmit={handleAddQuestion} className="space-y-3">
                  <textarea
                    rows={2}
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Ask a question about this lecture..."
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      size="sm"
                      variant="primary"
                      rightIcon={<Send className="w-3.5 h-3.5" />}
                    >
                      Post Question
                    </Button>
                  </div>
                </form>

                <div className="space-y-4">
                  {questions.map((q) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={q.avatar}
                          alt={q.author}
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-white">{q.author}</p>
                          <p className="text-[10px] text-slate-500">{q.time}</p>
                        </div>
                      </div>
                      <p className="text-slate-200 font-medium">{q.question}</p>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-300 text-[11px] leading-relaxed">
                        {q.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar: Complete Syllabus / Modules */}
        {sidebarOpen && (
          <aside className="w-80 sm:w-96 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0 overflow-y-auto">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300 font-heading">
                Course Syllabus
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lectures
              </span>
            </div>

            <div className="divide-y divide-slate-800/60">
              {course.modules.map((mod, modIdx) => (
                <div key={mod.id} className="p-3 space-y-2">
                  <div className="flex items-center justify-between px-2 py-1">
                    <span className="text-xs font-bold text-slate-300 truncate">
                      {modIdx + 1}. {mod.title}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {mod.lessons.length}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {mod.lessons.map((les) => {
                      const isSelected = activeLesson?.id === les.id;
                      const isDone = progress?.completedLessonIds.includes(les.id);

                      return (
                        <button
                          key={les.id}
                          type="button"
                          onClick={() => {
                            setActiveLesson(les);
                            setActiveModule(mod);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors ${
                            isSelected
                              ? 'bg-indigo-600 text-white font-semibold'
                              : 'hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            {isDone ? (
                              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
                            ) : (
                              <Play className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                            )}
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] opacity-70 font-mono shrink-0">
                            {les.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* Certificate Modal */}
      {certificateModalOpen && (
        <CertificateModal
          isOpen={certificateModalOpen}
          onClose={() => setCertificateModalOpen(false)}
          course={course}
        />
      )}
    </div>
  );
};
