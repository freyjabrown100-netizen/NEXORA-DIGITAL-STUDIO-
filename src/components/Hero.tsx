import React from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  CreditCard,
  Calendar,
  Play,
  Film,
  Palette,
  Code2,
  FileCheck,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const studioCapabilities = [
    {
      icon: Film,
      title: 'AI Video & Reels',
      highlight: 'TikTok & Meta 9:16 Ads',
      desc: '4K cinematic commercials and viral social clips tailored for US & global audience engagement.',
      border: 'hover:border-[#7C3AED]/40',
      iconColor: 'text-[#06B6D4]',
    },
    {
      icon: Palette,
      title: 'Graphic & Poster Design',
      highlight: 'High-Converting Visuals',
      desc: 'Print-ready event posters, digital banner suites, and complete brand design kits.',
      border: 'hover:border-[#06B6D4]/40',
      iconColor: 'text-[#7C3AED]',
    },
    {
      icon: Code2,
      title: 'Custom Web Development',
      highlight: 'Ultra-Fast Performance',
      desc: 'Modern, mobile-first responsive landing pages and custom websites engineered to convert.',
      border: 'hover:border-[#EC4899]/40',
      iconColor: 'text-[#EC4899]',
    },
    {
      icon: FileCheck,
      title: 'Commercial IP Rights',
      highlight: 'Transparent Milestone Terms',
      desc: 'Full intellectual property transfer upon final delivery with defined, structured revision rounds.',
      border: 'hover:border-emerald-500/40',
      iconColor: 'text-emerald-400',
    },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Animated Gradient Mesh Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Orb 1: Rich Violet */}
        <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-[#7C3AED]/25 rounded-full blur-[130px] animate-orb-1" />
        {/* Orb 2: Electric Cyan */}
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-[#06B6D4]/20 rounded-full blur-[140px] animate-orb-2" />
        {/* Orb 3: Purple Glow Accent */}
        <div className="absolute -bottom-20 left-1/3 w-[550px] h-[550px] bg-[#A855F7]/15 rounded-full blur-[150px] animate-orb-3" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Floating Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[#7C3AED]/40 mb-8 animate-pulse-glow shadow-lg shadow-[#7C3AED]/20">
          <Sparkles className="w-4 h-4 text-[#06B6D4] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-white uppercase font-space">
            ✨ AI-Powered Creative Studio &bull; US & Global Production Standards
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-ping" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6 font-poppins">
          Transform Your Brand with{' '}
          <span className="gradient-text drop-shadow-[0_4px_30px_rgba(124,58,237,0.4)]">
            AI-Powered Creativity
          </span>
        </h1>

        {/* Sub headline */}
        <p className="text-lg sm:text-xl lg:text-2xl text-[#94A3B8] max-w-3xl mb-10 font-normal leading-relaxed">
          Viral AI Videos <span className="text-[#06B6D4] mx-1.5">•</span> High-Converting Posters <span className="text-[#7C3AED] mx-1.5">•</span> Modern Custom Websites
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto glow-btn px-8 py-4 rounded-full text-white font-bold text-base flex items-center justify-center gap-3 group transition-transform active:scale-95 shadow-lg shadow-[#7C3AED]/30 font-space"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('portfolio')}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-base border border-white/15 backdrop-blur-sm transition-all hover:border-[#06B6D4]/50 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-[#06B6D4] fill-current" />
            <span>View Case Studies</span>
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#7C3AED]/15 hover:bg-[#7C3AED]/25 text-[#C084FC] hover:text-white font-semibold text-base border border-[#7C3AED]/30 transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#06B6D4]" />
            <span>Book 15-Min Briefing</span>
          </button>
        </div>

        {/* Featured Hero Studio Showcase Visual */}
        <div className="w-full max-w-5xl mb-14 relative group">
          {/* Subtle glow backdrop */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#7C3AED]/40 via-[#06B6D4]/30 to-[#EC4899]/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />

          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-white/20 shadow-2xl shadow-black/80">
            {/* Top decorative browser/window chrome bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs font-mono text-[#94A3B8] hidden sm:inline">nexora-digital-studio.com &bull; Luxury Creative Suite</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-space text-white/90 bg-[#7C3AED]/30 border border-[#7C3AED]/40 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-[#06B6D4]" />
                <span>Empowering Global Brands</span>
              </div>
            </div>

            {/* The Image */}
            <div className="relative aspect-[16/9] sm:aspect-[21/10] overflow-hidden bg-[#0A0A14]">
              <img
                src="/images/nexora-hero.png"
                alt="Nexora Digital Studio - Empowering Brands with AI Videos, Graphic Design & High-End Websites"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                loading="eager"
              />
              {/* Bottom gradient overlay with interactive chip */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-wrap items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-xs uppercase tracking-widest text-[#06B6D4] font-space font-bold block mb-1">
                    Bespoke Production
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-white font-poppins">
                    Next-Gen AI Video Production &bull; High-Converting Posters &bull; Custom Digital Platforms
                  </p>
                </div>
                <button
                  onClick={() => scrollToSection('services')}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center gap-1.5 transition-all"
                >
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Genuine Studio Pillars Row (Replaces fabricated statistics) */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/10 mb-8">
          {studioCapabilities.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`glass-card rounded-2xl p-4 sm:p-5 text-left relative overflow-hidden group transition-all border border-white/10 ${pillar.border}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${pillar.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    Studio Core
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white font-poppins mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs font-semibold text-[#06B6D4] font-space mb-1.5">
                  {pillar.highlight}
                </p>
                <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Client Trust & Terms Ticker (Honest payments & policies) */}
        <div className="w-full max-w-4xl p-3.5 sm:p-4 rounded-2xl glass-card border border-white/10 bg-white/[0.02] flex flex-wrap items-center justify-around gap-4 text-xs font-space text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#06B6D4]" />
            <span className="text-white font-medium">100% Commercial IP Rights</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-white font-medium">EST & PST Active Hours</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-medium">Transparent Milestone Invoicing</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-white font-medium">Defined Revision Rounds</span>
          </div>
        </div>
      </div>
    </section>
  );
};
