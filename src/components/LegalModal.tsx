import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock, CheckCircle2 } from 'lucide-react';
import { STUDIO_EMAIL, STUDIO_PHONE } from '../utils/studio-helpers';

export type LegalTab = 'terms' | 'privacy';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'terms',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="glass-card max-w-3xl w-full rounded-3xl border border-white/20 p-6 sm:p-8 relative max-h-[85vh] overflow-hidden flex flex-col shadow-2xl shadow-[#7C3AED]/20 text-left bg-[#0E0E1B]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            {activeTab === 'terms' ? (
              <FileText className="w-5 h-5 text-[#06B6D4]" />
            ) : (
              <Lock className="w-5 h-5 text-[#7C3AED]" />
            )}
            <h3 id="legal-modal-title" className="text-xl sm:text-2xl font-bold text-white font-poppins">
              {activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 pt-4 pb-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-space transition-all ${
              activeTab === 'terms'
                ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/30'
                : 'bg-white/5 text-[#94A3B8] hover:text-white border border-white/10'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-space transition-all ${
              activeTab === 'privacy'
                ? 'bg-[#06B6D4] text-black shadow-md shadow-[#06B6D4]/30'
                : 'bg-white/5 text-[#94A3B8] hover:text-white border border-white/10'
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto pr-2 mt-4 space-y-6 text-sm text-[#94A3B8] leading-relaxed font-inter">
          {activeTab === 'terms' ? (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-xs uppercase font-space font-bold text-[#06B6D4] block mb-1">
                  Effective Date: January 2025 &bull; Nexora Digital Studio
                </span>
                <p className="text-slate-200 text-xs sm:text-sm">
                  Welcome to Nexora Digital Studio. By commissioning work, submitting a project brief, or engaging our digital production services, you agree to the following terms and operating standards.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-white font-poppins mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
                  1. Project Scope & Deliverables
                </h4>
                <p>
                  All project deliverables, specifications, aspect ratios (e.g. 9:16 vertical reels, 16:9 4K videos, print poster vectors, or web source code), and timelines are documented in the initial written brief or invoice. Any scope modifications requested after project kickoff will be quoted transparently before execution.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-white font-poppins mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
                  2. Milestone Payment Structure
                </h4>
                <p>
                  To ensure mutual accountability, standard engagements require a <strong>50% commencement deposit</strong> prior to project research and drafting. The remaining <strong>50% balance</strong> is due upon final deliverable approval before final unwatermarked assets and source files are released. Payments are accepted via Wise, International Wire Transfer, Payoneer, or local Pakistani methods (Raast, Bank Transfer, JazzCash, EasyPaisa).
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-white font-poppins mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
                  3. Defined Revision Rounds
                </h4>
                <p>
                  We are committed to quality and include structured revision rounds in all packages:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-300">
                  <li><strong>Starter Package:</strong> 2 dedicated revision rounds.</li>
                  <li><strong>Professional Package:</strong> Up to 4 iterative revision rounds.</li>
                  <li><strong>Premium Package:</strong> Up to 6 comprehensive revision rounds.</li>
                </ul>
                <p className="mt-2 text-xs">
                  Revisions encompass tweaks to cuts, visual grading, copy, pacing, and layout within original scope. Structural pivots or new scripts outside initial scope can be accommodated at agreed hourly or milestone rates.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-white font-poppins mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
                  4. Intellectual Property & Commercial Rights
                </h4>
                <p>
                  Upon final payment settlement, <strong>100% of commercial copyright and intellectual property</strong> in the custom final deliverables is transferred to the client. You are free to broadcast, publish, monetize, and distribute the assets globally without recurring royalties.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-white font-poppins mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
                  5. Non-Disclosure & Confidentiality
                </h4>
                <p>
                  Nexora treats all unreleased product briefs, scripts, brand assets, and marketing strategies as strictly confidential. Mutual Non-Disclosure Agreements (NDAs) are happily signed upon request prior to project briefing.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-xs uppercase font-space font-bold text-[#7C3AED] block mb-1">
                  Privacy Policy &bull; Last Updated: January 2025
                </span>
                <p className="text-slate-200 text-xs sm:text-sm">
                  At Nexora Digital Studio, we value your privacy and handle your project details with strict confidentiality.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-white font-poppins mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#06B6D4]" />
                  1. Information We Collect
                </h4>
                <p>
                  When you inquire through our contact form, email, or WhatsApp, we collect information you voluntarily provide: your name/company, email address, telephone/WhatsApp number, timezone, budget preference, and project description.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-white font-poppins mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#06B6D4]" />
                  2. How Your Information Is Used
                </h4>
                <p>
                  Your information is exclusively used to:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-300">
                  <li>Review your project requirements and prepare customized proposals or quotations.</li>
                  <li>Communicate with you regarding production milestones, previews, and revisions.</li>
                  <li>Send project invoices and delivery confirmation receipts.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-bold text-white font-poppins mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#06B6D4]" />
                  3. We Never Sell or Rent Your Data
                </h4>
                <p>
                  Nexora Digital Studio does not sell, rent, lease, or monetize client personal data or creative briefs with any third parties or advertising brokers under any circumstances.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-white font-poppins mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#06B6D4]" />
                  4. Direct Inquiries & Contact
                </h4>
                <p>
                  If you have any questions regarding your data or wish to have your details removed from our production records, contact our studio desk at <a href={`mailto:${STUDIO_EMAIL}`} className="text-[#06B6D4] hover:underline">{STUDIO_EMAIL}</a> or WhatsApp at <a href={`https://wa.me/${STUDIO_PHONE.replace(/[^0-9]/g, '')}`} className="text-[#06B6D4] hover:underline">{STUDIO_PHONE}</a>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-[#94A3B8]">
            Nexora Digital Studio &bull; Standard Operating Agreement
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors font-space"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
