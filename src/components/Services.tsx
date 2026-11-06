import React from 'react';
import { Film, Image as ImageIcon, Globe, Check, ArrowRight, Sparkles } from 'lucide-react';
import { STUDIO_WHATSAPP_INTL } from '../utils/studio-helpers';

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const services = [
    {
      id: 'ai-video',
      icon: Film,
      badge: 'Trending & Viral',
      title: 'AI Video Production',
      desc: 'Captivating promotional videos, reels, explainer videos, and social media content powered by the latest AI technology. Perfect for businesses, brands, and influencers.',
      image: '/images/ai-video-creation.png',
      imageAlt: 'AI Video Creation & Cinematic Editing Suite',
      features: [
        'Promotional & Ad Videos',
        'Social Media Reels',
        'Explainer & Product Videos',
        'AI Avatar Videos',
        'Short-form Content',
      ],
      btnLabel: 'Get Video Quote',
      accentColor: 'from-[#7C3AED] to-[#A855F7]',
      glowColor: 'group-hover:border-[#7C3AED]/60 group-hover:shadow-[#7C3AED]/25',
      whatsappQuery: 'Hi Nexora! I would like to get a quote for AI Video Production (Reels, Ads, Avatars).',
    },
    {
      id: 'graphic-design',
      icon: ImageIcon,
      badge: 'High Impact',
      title: 'Creative Graphic Design',
      desc: 'Professional posters, social media graphics, flyers, banners, and brand visuals that make your business stand out from the competition.',
      image: '/images/graphic-design.png',
      imageAlt: 'Creative Graphic Design & Posters Suite',
      features: [
        'Business Posters & Flyers',
        'Social Media Graphics',
        'Logo & Branding',
        'Event Banners',
        'Marketing Materials',
      ],
      btnLabel: 'Get Design Quote',
      accentColor: 'from-[#06B6D4] to-[#38BDF8]',
      glowColor: 'group-hover:border-[#06B6D4]/60 group-hover:shadow-[#06B6D4]/25',
      whatsappQuery: 'Hi Nexora! I would like to get a quote for Creative Graphic Design & Posters.',
    },
    {
      id: 'website-development',
      icon: Globe,
      badge: 'High Performance',
      title: 'Website Development',
      desc: 'Modern, fast, and mobile-friendly websites that represent your brand professionally online. From simple landing pages to full business websites.',
      image: '/images/website-development.png',
      imageAlt: 'Modern Website Development & Engineering Workstation',
      features: [
        'Business Websites',
        'Portfolio Sites',
        'Landing Pages',
        'Mobile Responsive',
        'SEO Optimized',
      ],
      btnLabel: 'Get Website Quote',
      accentColor: 'from-[#EC4899] to-[#8B5CF6]',
      glowColor: 'group-hover:border-[#EC4899]/60 group-hover:shadow-[#EC4899]/25',
      whatsappQuery: 'Hi Nexora! I would like to get a quote for Website Development.',
    },
  ];

  const handleQuoteClick = (serviceId: string, whatsappQuery: string) => {
    if (onSelectService) {
      onSelectService(serviceId);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(`https://wa.me/${STUDIO_WHATSAPP_INTL}?text=${encodeURIComponent(whatsappQuery)}`, '_blank');
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#0A0A14]/70">
      {/* Decorative background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#06B6D4]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#7C3AED]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#7C3AED] text-xs font-semibold tracking-wider uppercase font-space mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8]">
            End-to-end creative and technological craftsmanship tailored to make your brand impossible to ignore.
          </p>
        </div>

        {/* 3 Large Glassmorphism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between transition-all duration-300 hover:scale-[1.03] group shadow-xl ${service.glowColor}`}
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.accentColor} p-0.5 shadow-lg shadow-black/50`}>
                      <div className="w-full h-full bg-[#0A0A14] rounded-[14px] flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-space">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-2xl font-bold text-white mb-3 font-poppins group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#06B6D4] transition-all">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-6 font-normal">
                    {service.desc}
                  </p>

                  {/* Service Visual Image */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-white/25 transition-all duration-500 shadow-lg bg-black/40">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3 pt-2 mb-8 border-t border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] block pt-3">
                      What's Included:
                    </span>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#7C3AED]/20 flex items-center justify-center flex-shrink-0 text-[#06B6D4]">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="text-sm text-slate-200 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Button */}
                <button
                  onClick={() => handleQuoteClick(service.id, service.whatsappQuery)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-gradient-to-r hover:from-[#7C3AED] hover:to-[#06B6D4] text-white font-semibold text-sm border border-white/15 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#7C3AED]/25"
                >
                  <span>{service.btnLabel}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
