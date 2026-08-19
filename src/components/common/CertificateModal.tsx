import React, { useRef } from 'react';
import { Course } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Modal } from './Modal';
import { Button } from './Button';
import { Award, Download, Share2, CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  completedDate?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  course,
  completedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}) => {
  const { user } = useAuth();
  const { showSuccess } = useToast();
  const certificateRef = useRef<HTMLDivElement>(null);

  const studentName = user?.name || 'SkillSphere Scholar';
  const certId = `SS-CERT-${course.id.substring(0, 4).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showSuccess('Link Copied', 'Certificate share link copied to clipboard!');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl" title="Certificate of Completion">
      <div className="flex flex-col items-center">
        {/* Certificate Card */}
        <div
          ref={certificateRef}
          className="w-full relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 rounded-2xl border-4 border-amber-400/40 shadow-2xl overflow-hidden my-2"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#4338ca_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Certificate Header */}
          <div className="relative z-10 text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Official Verification
            </div>
            <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                S
              </span>
              SkillSphere
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-300">
              Certificate of Completion
            </p>
          </div>

          {/* Recipient */}
          <div className="relative z-10 text-center my-8">
            <p className="text-xs text-slate-300 uppercase tracking-wider mb-2">This is proudly presented to</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200 py-1 font-heading">
              {studentName}
            </h2>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
          </div>

          {/* Details */}
          <div className="relative z-10 text-center max-w-xl mx-auto space-y-2">
            <p className="text-xs text-slate-300 leading-relaxed">
              for successfully completing all required practical modules, projects, and assessments in
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-indigo-200 font-heading">
              {course.title}
            </h3>
            <p className="text-xs text-slate-400">
              Total Duration: {course.duration} • Curriculum: {course.modules.length} Modules & {course.totalLessons} Lessons
            </p>
          </div>

          {/* Signatures & Seal */}
          <div className="relative z-10 mt-10 pt-6 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center">
            {/* Instructor Signature */}
            <div className="space-y-1">
              <p className="font-serif italic text-base text-amber-200">{course.instructor.name}</p>
              <div className="h-0.5 w-24 bg-slate-600 mx-auto" />
              <p className="text-[11px] text-slate-400">Course Lead Instructor</p>
            </div>

            {/* Seal */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-dashed border-amber-900/40 bg-amber-500/90 flex flex-col items-center justify-center text-slate-950 font-bold text-[9px] uppercase tracking-wider text-center">
                  <Award className="w-6 h-6 text-slate-950" />
                  Verified
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 font-mono">{certId}</p>
            </div>

            {/* Date */}
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-200">{completedDate}</p>
              <div className="h-0.5 w-24 bg-slate-600 mx-auto" />
              <p className="text-[11px] text-slate-400">Date Issued</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between w-full mt-6 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            Permanent digital credential recorded on SkillSphere.
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" leftIcon={<Share2 className="w-3.5 h-3.5" />} onClick={handleShare}>
              Share
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />} onClick={handlePrint}>
              Print / Save PDF
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
