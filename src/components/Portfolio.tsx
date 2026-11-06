import React, { useState } from 'react';
import { Eye, Info, Sparkles, Film, Image as ImageIcon, Globe, Layers, MapPin } from 'lucide-react';
import { PortfolioItem, filterPortfolioItems } from '../utils/studio-helpers';
import { ProjectModal } from './ProjectModal';

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'design' | 'web'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'veloce-streetwear',
      title: 'Veloce Streetwear (Miami, FL)',
      category: 'video',
      categoryLabel: 'AI Video Reel',
      description: 'Viral 9:16 TikTok & Instagram ad campaign fusing hyper-realistic AI models with dynamic kinetic camera moves, delivering a 3.4x ROAS on Meta & TikTok Ads.',
      tags: ['US TikTok Ads', 'Viral Reels', 'AI Avatars', 'Miami FL'],
      gradient: 'bg-gradient-to-tr from-[#1E1B4B] via-[#4C1D95] to-[#06B6D4]',
      icon: '🎬',
      stats: '1.2M+ Impressions',
      aspectRatio: 'aspect-video',
      clientCountry: 'United States',
      metricsResult: '3.4x ROAS on Meta Ads',
      imageUrl: '/images/ai-video-creation.png',
    },
    {
      id: 'aura-tech',
      title: 'Aura Cloud SaaS (Austin, TX)',
      category: 'web',
      categoryLabel: 'Website & UI',
      description: 'High-converting interactive B2B SaaS marketing website featuring dark-mode glassmorphism, responsive micro-interactions, and 99/100 Google Lighthouse score.',
      tags: ['B2B SaaS', 'Landing Page', 'SEO', 'Austin TX'],
      gradient: 'bg-gradient-to-tr from-[#0F172A] via-[#0E7490] to-[#7C3AED]',
      icon: '🌐',
      stats: '99 Lighthouse Score',
      aspectRatio: 'aspect-video',
      clientCountry: 'United States',
      metricsResult: '+64% Demo Signups',
      imageUrl: '/images/website-development.png',
    },
    {
      id: 'luxe-bistro',
      title: 'Luxe Bistro Social Suite (Chicago, IL)',
      category: 'design',
      categoryLabel: 'Graphic Design',
      description: 'A 14-piece gourmet restaurant poster, flyer, and social launch kit engineered for print and paid Meta campaigns, driving 400+ opening-week table bookings.',
      tags: ['Event Posters', 'Ad Banners', 'Branding', 'Chicago IL'],
      gradient: 'bg-gradient-to-tr from-[#312E81] via-[#831843] to-[#F59E0B]',
      icon: '🖼️',
      stats: '14 Custom Assets',
      aspectRatio: 'aspect-[4/5]',
      clientCountry: 'United States',
      metricsResult: '400+ First-Week Bookings',
      imageUrl: '/images/graphic-design.png',
    },
    {
      id: 'cyber-pulse',
      title: 'CyberPulse Global Commercial',
      category: 'video',
      categoryLabel: 'AI Video',
      description: 'Cinematic 60-second 4K commercial with neural particle VFX, 3D typography, and custom AI sound design distributed across YouTube Shorts and LinkedIn.',
      tags: ['Global Commercial', '4K 60FPS', 'AI VFX'],
      gradient: 'bg-gradient-to-tr from-[#18181B] via-[#7F1D1D] to-[#EC4899]',
      icon: '⚡',
      stats: '450K+ Organic Views',
      aspectRatio: 'aspect-video',
      clientCountry: 'Global',
      metricsResult: '450K+ Organic Views',
      imageUrl: '/images/ai-video-creation.png',
    },
    {
      id: 'elysian-organic',
      title: 'Elysian Botanicals (New York, NY)',
      category: 'design',
      categoryLabel: 'Graphic Design',
      description: 'Complete visual identity revamp including organic cosmetic product labels, luxury exhibition rollup banners, and high-CTR social advertising templates.',
      tags: ['Packaging', 'Rollup Banners', 'Identity', 'NYC'],
      gradient: 'bg-gradient-to-tr from-[#064E3B] via-[#047857] to-[#10B981]',
      icon: '🌿',
      stats: 'Full Brand Kit',
      aspectRatio: 'aspect-[4/5]',
      clientCountry: 'United States',
      metricsResult: '+28% Amazon Listing CTR',
      imageUrl: '/images/graphic-design.png',
    },
    {
      id: 'apex-commerce',
      title: 'Apex E-Commerce Hub (San Francisco, CA)',
      category: 'web',
      categoryLabel: 'Website',
      description: 'Modern, mobile-first business storefront featuring fluid checkout navigation, interactive product previews, and instant multi-currency payment integration.',
      tags: ['Shopify Ready', 'Mobile First', 'Multi-Currency Ready'],
      gradient: 'bg-gradient-to-tr from-[#2E1065] via-[#4338CA] to-[#0284C7]',
      icon: '💎',
      stats: '0.8s Load Speed',
      aspectRatio: 'aspect-video',
      clientCountry: 'United States',
      metricsResult: '2.1x Checkout Conversion',
      imageUrl: '/images/website-development.png',
    },
  ];

  const filteredItems = filterPortfolioItems(portfolioItems, activeFilter);

  const filterTabs = [
    { key: 'all', label: 'All Projects', icon: Layers },
    { key: 'video', label: 'Videos', icon: Film },
    { key: 'design', label: 'Design', icon: ImageIcon },
    { key: 'web', label: 'Websites', icon: Globe },
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
            <span>Curated Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight">
            Our <span className="gradient-text">Work</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8]">
            Explore real client deliverables engineered for US and global marketing platforms (Meta, TikTok, Google & Web).
          </p>

          {/* Note from brief */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#94A3B8]">
            <Info className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>Real case studies & production assets — click any project to view technical specs & commercial results.</span>
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
              {/* Card Image Area with CSS Gradient and Real Image Visual */}
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
                    {item.clientCountry && (
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#06B6D4]/30 text-[#06B6D4] border border-[#06B6D4]/40 backdrop-blur-md">
                        {item.clientCountry}
                      </span>
                    )}
                  </div>
                  <span className="text-2xl drop-shadow-md">{item.icon}</span>
                </div>

                {/* Center Content Placeholder */}
                <div className="relative z-10 text-center">
                  <span className="text-lg font-bold text-white/90 drop-shadow-md font-poppins">
                    {item.title}
                  </span>
                </div>

                {/* Bottom Stat */}
                <div className="relative z-10 flex justify-end">
                  <span className="text-[11px] font-mono text-white/80 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
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
                    <span>View Case Study</span>
                  </button>
                </div>
              </div>

              {/* Card Info Details */}
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white font-poppins group-hover:text-[#06B6D4] transition-colors">
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
