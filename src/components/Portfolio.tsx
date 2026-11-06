import React, { useState } from 'react';
import { Eye, Info, Sparkles, Film, Image as ImageIcon, Globe, Layers } from 'lucide-react';
import { PortfolioItem, filterPortfolioItems } from '../utils/studio-helpers';
import { ProjectModal } from './ProjectModal';

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'design' | 'web'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'concept-streetwear-reel',
      title: 'Concept Project: Cyber Streetwear Reel',
      category: 'video',
      categoryLabel: 'Concept Video',
      sampleType: 'Concept Project',
      description: 'A demonstration 9:16 vertical video reel concept pairing neural AI visual synthesis with kinetic typography and beat synchronization for direct-to-consumer apparel marketing.',
      tags: ['9:16 Vertical Reel', 'TikTok & Meta Format', 'AI Visual Synthesis', 'Concept Demo'],
      gradient: 'bg-gradient-to-tr from-[#1E1B4B] via-[#4C1D95] to-[#06B6D4]',
      icon: '🎬',
      stats: 'Spec: 4K 60FPS Native 9:16',
      aspectRatio: 'aspect-video',
      specsDetail: 'Rendered in native 9:16 vertical resolution (2160x3840) at 60fps with platform safe zones tailored for TikTok Spark Ads and Instagram Reels.',
      imageUrl: '/images/ai-video-creation.png',
    },
    {
      id: 'demo-cloud-saas',
      title: 'Demo Work: B2B Cloud Platform UI',
      category: 'web',
      categoryLabel: 'Demo Website',
      sampleType: 'Demo Work',
      description: 'An interactive demonstration B2B marketing website layout showcasing dark-mode glassmorphism, responsive navigation micro-interactions, and conversion-focused typography.',
      tags: ['Modern Web SPA', 'Responsive Architecture', 'Dark Glassmorphism', 'Demo Showcase'],
      gradient: 'bg-gradient-to-tr from-[#0F172A] via-[#0E7490] to-[#7C3AED]',
      icon: '🌐',
      stats: 'Tech: React & Tailwind SPA',
      aspectRatio: 'aspect-video',
      specsDetail: 'Mobile-first responsive layout architecture with semantic HTML5, zero-layout-shift design, and accessible contrast standards.',
      imageUrl: '/images/website-development.png',
    },
    {
      id: 'concept-gourmet-bistro',
      title: 'Concept Project: Gourmet Bistro Poster Suite',
      category: 'design',
      categoryLabel: 'Concept Graphic Design',
      sampleType: 'Concept Project',
      description: 'A speculative promotional graphic design suite including event flyers, promotional restaurant posters, and vertical social banner templates engineered for digital and print distribution.',
      tags: ['Vector Print Poster', 'CMYK 300DPI', 'Social Ad Templates', 'Concept Design'],
      gradient: 'bg-gradient-to-tr from-[#312E81] via-[#831843] to-[#F59E0B]',
      icon: '🖼️',
      stats: 'Format: Vector & 300DPI',
      aspectRatio: 'aspect-[4/5]',
      specsDetail: 'High-resolution CMYK 300DPI vector export for physical print media, accompanied by matched RGB 1080x1350 social marketing companion assets.',
      imageUrl: '/images/graphic-design.png',
    },
    {
      id: 'demo-cyberpulse-commercial',
      title: 'Demo Work: CyberPulse Teaser Commercial',
      category: 'video',
      categoryLabel: 'Demo Video',
      sampleType: 'Demo Work',
      description: 'A creative concept commercial demonstrating cinematic AI camera moves, dynamic lighting passes, and atmospheric neural sound design for modern tech and gaming brand launches.',
      tags: ['16:9 Widescreen', 'Neural VFX Pass', 'Custom Sound Design', 'Demo Concept'],
      gradient: 'bg-gradient-to-tr from-[#18181B] via-[#7F1D1D] to-[#EC4899]',
      icon: '⚡',
      stats: 'Spec: 4K Cinematic 16:9',
      aspectRatio: 'aspect-video',
      specsDetail: 'Custom storyboarded video experiment rendered at 4K resolution (3840x2160) with custom synthesized audio pass and master sound design.',
      imageUrl: '/images/ai-video-creation.png',
    },
    {
      id: 'concept-elysian-botanicals',
      title: 'Concept Project: Elysian Botanicals Brand Kit',
      category: 'design',
      categoryLabel: 'Concept Graphic Design',
      sampleType: 'Concept Project',
      description: 'A concept branding and visual packaging kit featuring luxury cosmetic label layouts, exhibition banner designs, and high-contrast digital promotional banners.',
      tags: ['Brand Identity Kit', 'Packaging Mockups', 'Exhibition Banners', 'Concept Art'],
      gradient: 'bg-gradient-to-tr from-[#064E3B] via-[#047857] to-[#10B981]',
      icon: '🌿',
      stats: 'Assets: Vector Identity Suite',
      aspectRatio: 'aspect-[4/5]',
      specsDetail: 'Includes primary logo variations, typography hierarchy, design token palettes, vector mockups, and editable Figma source files.',
      imageUrl: '/images/graphic-design.png',
    },
    {
      id: 'demo-apex-storefront',
      title: 'Demo Work: Apex Modern Storefront',
      category: 'web',
      categoryLabel: 'Demo Website',
      sampleType: 'Demo Work',
      description: 'A demonstration e-commerce digital storefront showcasing responsive catalog grid layouts, instant multi-currency switching, and smooth cart interactions.',
      tags: ['E-Commerce Demo', 'Mobile First', 'Fast Checkout Flow', 'UI Prototype'],
      gradient: 'bg-gradient-to-tr from-[#2E1065] via-[#4338CA] to-[#0284C7]',
      icon: '💎',
      stats: 'Spec: Responsive Storefront',
      aspectRatio: 'aspect-video',
      specsDetail: 'Lightweight component hierarchy optimized for fast initial paint, smooth CSS transitions, and fluid touch navigation.',
      imageUrl: '/images/website-development.png',
    },
  ];

  const filteredItems = filterPortfolioItems(portfolioItems, activeFilter);

  const filterTabs = [
    { key: 'all', label: 'All Works', icon: Layers },
    { key: 'video', label: 'Videos (Concept/Demo)', icon: Film },
    { key: 'design', label: 'Design (Concept)', icon: ImageIcon },
    { key: 'web', label: 'Websites (Demo)', icon: Globe },
  ] as const;

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden bg-[#0A0A14]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#06B6D4] text-xs font-semibold tracking-wider uppercase font-space mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sample Production Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8]">
            Explore studio concept projects and demo production assets engineered to showcase our AI video, graphic design, and custom web capabilities.
          </p>

          {/* Transparent Notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-[#94A3B8] text-left">
            <Info className="w-4 h-4 text-[#06B6D4] flex-shrink-0" />
            <span>
              <strong>Authenticity Guarantee:</strong> All works displayed below are original studio concept projects and demonstration assets. We do not invent fictional client identities or claim fabricated business metrics.
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'glow-btn text-white shadow-lg shadow-[#7C3AED]/30 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 6 Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl border border-white/10 overflow-hidden group hover:border-[#7C3AED]/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image Area with Visual */}
              <div className={`relative w-full h-52 sm:h-56 ${item.gradient} overflow-hidden p-6 flex flex-col justify-between`}>
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/35 backdrop-blur-[0.5px]" />
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                {/* Top Badge & Icon */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs uppercase font-space font-bold tracking-wider px-3 py-1 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-md">
                      {item.categoryLabel}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#06B6D4]/30 text-[#06B6D4] border border-[#06B6D4]/40 backdrop-blur-md font-bold">
                      {item.sampleType}
                    </span>
                  </div>
                  <span className="text-2xl drop-shadow-md">{item.icon}</span>
                </div>

                {/* Center Title */}
                <div className="relative z-10 text-center">
                  <span className="text-base sm:text-lg font-bold text-white/90 drop-shadow-md font-poppins">
                    {item.title}
                  </span>
                </div>

                {/* Bottom Technical Stat */}
                <div className="relative z-10 flex justify-end">
                  <span className="text-[11px] font-mono text-white/80 bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
                    {item.stats}
                  </span>
                </div>

                {/* Hover Overlay with "View Project" Button */}
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-20">
                  <button
                    onClick={() => setSelectedProject(item)}
                    className="glow-btn px-6 py-3 rounded-full text-white font-semibold text-sm flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-xl"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Concept Specs</span>
                  </button>
                </div>
              </div>

              {/* Card Info Details */}
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-white font-poppins group-hover:text-[#06B6D4] transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-2 mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/5 text-[#94A3B8] font-space font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
