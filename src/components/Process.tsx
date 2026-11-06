import React from 'react';
import { ClipboardList, MessageSquare, Wand2, Rocket } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      icon: ClipboardList,
      emoji: '📋',
      title: 'Tell Us Your Idea',
      description: 'Share your project requirements, brand guidelines, and creative vision with our team.',
      accent: 'from-[#7C3AED] to-[#A855F7]',
      color: '#7C3AED',
    },
    {
      stepNumber: '02',
      icon: MessageSquare,
      emoji: '💬',
      title: 'We Plan Together',
      description: 'We discuss and finalize the optimal creative approach, script storyboard, and timeline.',
      accent: 'from-[#06B6D4] to-[#38BDF8]',
      color: '#06B6D4',
    },
    {
      stepNumber: '03',
      icon: Wand2,
      emoji: '🛠️',
      title: 'We Create Magic',
      description: 'Our team harnesses state-of-the-art AI engines and human artistic precision to craft your assets.',
      accent: 'from-[#A855F7] to-[#EC4899]',
      color: '#A855F7',
    },
    {
      stepNumber: '04',
      icon: Rocket,
      emoji: '🚀',
      title: 'You Get Results',
      description: 'Swift delivery in 3-7 days with structured revision rounds included for your final deliverable sign-off.',
      accent: 'from-[#10B981] to-[#06B6D4]',
      color: '#10B981',
    },
  ];

  return (
    <section id="work" className="py-24 relative overflow-hidden bg-[#0A0A14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#06B6D4] text-xs font-semibold tracking-wider uppercase font-space mb-4">
            <span>Seamless Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8]">
            A transparent 4-step creative pipeline built for velocity, clarity, and uncompromising excellence.
          </p>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 -translate-y-12 bg-gradient-to-r from-[#7C3AED]/30 via-[#06B6D4]/40 to-[#10B981]/30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.stepNumber}
                  className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 relative flex flex-col items-center text-center group hover:border-white/20 transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#12121F] border border-white/15 text-[11px] font-bold font-space text-[#94A3B8] uppercase tracking-wider group-hover:text-white group-hover:border-[#06B6D4] transition-colors">
                    Step {step.stepNumber}
                  </div>

                  {/* Icon Circle */}
                  <div className={`mt-3 mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.accent} p-0.5 shadow-lg shadow-black/50`}>
                    <div className="w-full h-full bg-[#0A0A14] rounded-[14px] flex items-center justify-center relative">
                      <IconComp className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                      <span className="absolute -bottom-2 -right-2 text-base">
                        {step.emoji}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-2.5 font-poppins">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
