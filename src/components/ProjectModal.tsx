import React from 'react';
import { X, Sparkles, ExternalLink, CheckCircle2, MessageCircle, ShieldCheck, TrendingUp } from 'lucide-react';
import { PortfolioItem, STUDIO_WHATSAPP_INTL } from '../utils/studio-helpers';

interface ProjectModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="glass-card max-w-2xl w-full rounded-3xl border border-white/20 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#7C3AED]/20 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors focus:outline-none border border-white/20"
          aria-label="Close Project Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Thumbnail preview banner */}
        <div
          className={`w-full h-48 sm:h-64 rounded-2xl ${project.gradient} mb-6 flex flex-col items-center justify-center relative overflow-hidden border border-white/10 shadow-inner`}
        >
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/35 backdrop-blur-[0.5px]" />
          <div className="relative z-10 text-center px-4">
            <span className="text-4xl mb-2 block">{project.icon}</span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs uppercase tracking-widest text-white/90 font-space font-bold px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/20">
                {project.categoryLabel} Showcase
              </span>
              {project.clientCountry && (
                <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-[#06B6D4]/30 text-[#06B6D4] border border-[#06B6D4]/40 backdrop-blur-md font-bold">
                  {project.clientCountry}
                </span>
              )}
            </div>
          </div>
          <div className="absolute bottom-3 right-3 text-xs text-white/90 bg-black/50 px-3 py-1 rounded-md font-mono border border-white/10">
            {project.stats}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white font-poppins">
              {project.title}
            </h3>
            <span className="px-3 py-1 rounded-full bg-[#7C3AED]/20 text-[#A855F7] text-xs font-semibold border border-[#7C3AED]/30 font-space">
              Verified Production Case Study
            </span>
          </div>

          <p className="text-[#94A3B8] text-base leading-relaxed">
            {project.description}
          </p>

          {/* Metric Highlight if available */}
          {project.metricsResult && (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#06B6D4]/15 to-[#7C3AED]/15 border border-[#06B6D4]/30 flex items-center gap-3 text-sm font-space text-white">
              <TrendingUp className="w-5 h-5 text-[#06B6D4] flex-shrink-0" />
              <div>
                <span className="text-xs text-[#94A3B8] block uppercase">Campaign Impact:</span>
                <span className="font-bold text-white">{project.metricsResult}</span>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-medium font-space"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Standards & Highlights */}
          <div className="glass-card p-4 rounded-xl border border-white/10 space-y-2 mt-4 bg-white/[0.02]">
            <span className="text-xs font-bold text-white uppercase tracking-wider block font-space">
              Production Standards & Guarantees:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
                <span>US Ad Platform Compliant (Meta & TikTok)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Commercial IP Rights Included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
                <span>Full Source Assets (Figma / Premiere)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
                <span>EST / PST Fast Turnaround</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${STUDIO_WHATSAPP_INTL}?text=${encodeURIComponent(`Hi Nexora! I saw the "${project.title}" case study on your website and want something similar for my US brand.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn px-6 py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 flex-1"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss Similar Project on WhatsApp</span>
            </a>
            <button
              onClick={onClose}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors font-space"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
