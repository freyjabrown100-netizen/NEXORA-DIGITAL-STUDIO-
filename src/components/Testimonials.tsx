import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, MessageSquare, Layers, Lock, FileCode } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const commitments = [
    {
      title: 'Direct Creator Collaboration',
      subtitle: 'Zero Middlemen or Communication Friction',
      description:
        'You interface directly with our digital creators and technical developers. We maintain active availability across US Eastern, Central, and Pacific time zones via Email, WhatsApp, and scheduled video conferences.',
      icon: MessageSquare,
      accent: 'from-[#7C3AED] to-[#A855F7]',
      badge: 'Direct Access',
    },
    {
      title: 'Structured Revision Rounds',
      subtitle: 'Clear Milestones & Focused Execution',
      description:
        'Every project includes dedicated, structured revision cycles (2 rounds for Starter, up to 4 for Professional, up to 6 for Premium) to ensure your feedback is systematically implemented without surprise hidden charges.',
      icon: Layers,
      accent: 'from-[#06B6D4] to-[#38BDF8]',
      badge: 'Defined Scope',
    },
    {
      title: '100% Commercial IP Rights',
      subtitle: 'Full Copyright Ownership Upon Final Settlement',
      description:
        'Upon final milestone payment, full intellectual property and commercial usage rights are transferred to you. All video renders, graphic project files, and website source code are yours to monetize without ongoing royalties.',
      icon: Lock,
      accent: 'from-[#10B981] to-[#06B6D4]',
      badge: 'Full Ownership',
    },
    {
      title: 'Ad Platform Compliance',
      subtitle: 'Engineered for Meta, TikTok & Web Standards',
      description:
        'All deliverables adhere strictly to ad platform specifications: vertical 9:16 high-bitrate video, clear typography safe zones for TikTok & Meta Reels, clean print-ready vector layouts, and modern semantic code.',
      icon: FileCode,
      accent: 'from-[#EC4899] to-[#8B5CF6]',
      badge: 'Platform Compliant',
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#0A0A14]/80">
      {/* Decorative glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#06B6D4] text-xs font-semibold tracking-wider uppercase font-space mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Standards & Ethics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight">
            Our Work <span className="gradient-text">Commitments</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8]">
            Built on transparency, rigorous craft standards, and genuine accountability for creators and businesses worldwide.
          </p>
        </div>

        {/* 4 Commitment Cards Grid (2x2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {commitments.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between relative group hover:border-[#7C3AED]/40 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.accent} p-0.5 shadow-md flex items-center justify-center`}>
                      <div className="w-full h-full bg-[#0A0A14] rounded-[14px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <span className="text-[11px] font-space font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#06B6D4]">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white font-poppins mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#06B6D4] font-space mb-4">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Footer Checkmark */}
                <div className="flex items-center gap-2 pt-6 mt-6 border-t border-white/10 text-xs text-[#94A3B8] font-space">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Standard on every Nexora contract & milestone</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Honest Testimonials & Review Policy Banner */}
        <div className="max-w-3xl mx-auto p-5 sm:p-6 rounded-2xl glass-card border border-white/10 text-center space-y-2 bg-white/[0.02]">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-space">
            <ShieldCheck className="w-4 h-4 text-[#06B6D4]" />
            <span>Honest Testimonials Policy</span>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            As an independent studio, we do not fabricate client testimonials or review numbers. Client feedback and case studies are published strictly with written consent. Partner with us to experience our transparent workflow firsthand.
          </p>
        </div>
      </div>
    </section>
  );
};
