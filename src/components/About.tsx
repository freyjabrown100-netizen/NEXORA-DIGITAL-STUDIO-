import React from 'react';
import { Bot, Palette, Zap, Gem, CheckCircle, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  const features = [
    {
      icon: Bot,
      emoji: '🤖',
      title: 'AI-Powered Tools',
      desc: 'Harnessing the latest generative video, neural audio, and LLM algorithms to achieve cinematic visuals and accelerated workflows.',
      color: 'from-[#7C3AED] to-[#A855F7]',
      border: 'border-[#7C3AED]/30',
    },
    {
      icon: Palette,
      emoji: '🎨',
      title: 'Creative Excellence',
      desc: 'Human aesthetic mastery ensuring every video frame, poster layout, and UI interaction looks bespoke, polished, and unforgettable.',
      color: 'from-[#06B6D4] to-[#38BDF8]',
      border: 'border-[#06B6D4]/30',
    },
    {
      icon: Zap,
      emoji: '⚡',
      title: 'Fast Delivery',
      desc: 'Rapid 3-5 day project turnarounds without ever cutting corners, keeping your marketing pipeline agile and on schedule.',
      color: 'from-[#F59E0B] to-[#FBBF24]',
      border: 'border-amber-500/30',
    },
    {
      icon: Gem,
      emoji: '💎',
      title: 'Premium Quality',
      desc: 'Studio-grade 4K renders, vector asset exports, and mobile-optimized web builds that elevate your brand prestige.',
      color: 'from-[#EC4899] to-[#8B5CF6]',
      border: 'border-pink-500/30',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0A0A14]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#06B6D4] text-xs font-semibold tracking-wider uppercase font-space mb-4">
            <span>About Nexora</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight">
            Who We <span className="gradient-text">Are</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8]">
            Where human imagination and next-generation intelligence converge to forge market-leading brands.
          </p>
        </div>

        {/* Studio Workspace Visual Showcase Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 glass-card shadow-2xl mb-16 group">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden relative">
            <img
              src="/images/about-us.webp"
              alt="Nexora Digital Studio Headquarters & Creative Workspace"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 right-6 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-xl text-left">
                <span className="text-xs uppercase font-space font-bold tracking-widest text-[#06B6D4] px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md inline-block mb-2">
                  Headquarters & Production Suites
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-poppins drop-shadow-md">
                  Crafting Digital Brilliance at Global Standards
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-white/90 bg-black/60 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Workstation &bull; US & Global Production</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#7C3AED]/20 to-transparent rounded-bl-full pointer-events-none" />

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-poppins leading-snug">
                Pioneering the Future of Digital Content Creation
              </h3>

              <p className="text-[#94A3B8] leading-relaxed text-base sm:text-lg font-normal mb-6">
                Nexora Digital Studio is a modern creative agency specializing in AI-powered digital solutions. We blend
                cutting-edge artificial intelligence with human creativity to deliver exceptional results for businesses
                of all sizes. From viral AI videos to eye-catching graphic designs and fast websites — we do it all.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Bespoke visual concepts engineered for maximum viral engagement',
                  'High-converting print, packaging, and digital advertising assets',
                  'Ultra-responsive, lightning-fast modern websites built for conversion',
                  'Dedicated one-on-one communication and transparent pricing',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4]">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm sm:text-base text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#06B6D4] hover:text-white transition-colors group"
                >
                  <span>Learn how we can elevate your brand</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Feature Boxes Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feat, index) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={index}
                  className={`glass-card glass-card-hover p-6 rounded-2xl border ${feat.border} relative group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} p-0.5 flex items-center justify-center shadow-lg shadow-black/40`}>
                      <div className="w-full h-full bg-[#0A0A14] rounded-[10px] flex items-center justify-center">
                        <IconComp className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <span className="text-2xl" role="img" aria-label={feat.title}>
                      {feat.emoji}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 font-poppins">
                    {feat.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {feat.desc}
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
