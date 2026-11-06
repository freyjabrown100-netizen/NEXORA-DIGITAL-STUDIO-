import React from 'react';
import { Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';
import { STUDIO_PHONE, STUDIO_EMAIL, STUDIO_WHATSAPP_INTL } from '../utils/studio-helpers';

export const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'How We Work', href: '#work' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing Packages', href: '#pricing' },
    { name: 'Client Reviews', href: '#testimonials' },
    { name: 'FAQs', href: '#faq' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const serviceLinks = [
    { name: 'AI Video Production', href: '#services' },
    { name: 'Promotional Ad Videos', href: '#services' },
    { name: 'Social Media Reels', href: '#services' },
    { name: 'Creative Graphic Design', href: '#services' },
    { name: 'Poster & Flyer Design', href: '#services' },
    { name: 'Logo & Brand Visuals', href: '#services' },
    { name: 'Website Development', href: '#services' },
    { name: 'Landing Page Creation', href: '#services' },
  ];

  return (
    <footer className="relative bg-[#07070E] border-t border-white/10 pt-16 pb-12 overflow-hidden text-[#94A3B8]">
      {/* Background visual texture with flowing gold waves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/footer-background.webp"
          alt="Nexora Digital Studio Golden Waves Texture"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-screen"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070E] via-[#07070E]/75 to-[#07070E]/85" />
      </div>

      {/* Top subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[100px] bg-[#7C3AED]/15 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="inline-block group focus:outline-none">
              <div className="flex items-center gap-1.5">
                <span className="text-3xl font-extrabold tracking-tight gradient-text font-poppins">
                  Nexora
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#06B6D4]"></span>
              </div>
              <span className="text-xs uppercase tracking-widest text-[#94A3B8] font-space block -mt-1 group-hover:text-white transition-colors">
                Digital Studio
              </span>
            </a>

            <p className="text-sm text-slate-300 font-medium italic">
              "Where Creativity Meets Technology"
            </p>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              Your premier partner for viral AI video creation, eye-catching graphic design posters, and high-performance digital websites.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#7C3AED]/30 border border-white/10 hover:border-[#7C3AED] flex items-center justify-center text-white transition-all text-sm"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#EC4899]/30 border border-white/10 hover:border-[#EC4899] flex items-center justify-center text-white transition-all text-sm"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#06B6D4]/30 border border-white/10 hover:border-[#06B6D4] flex items-center justify-center text-white transition-all text-sm"
                aria-label="TikTok"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-500/30 border border-white/10 hover:border-red-500 flex items-center justify-center text-white transition-all text-sm"
                aria-label="YouTube"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-space">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-space">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {serviceLinks.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-space">
              Contact Studio
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#06B6D4] mt-0.5 flex-shrink-0" />
                <a
                  href={`https://wa.me/${STUDIO_WHATSAPP_INTL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {STUDIO_PHONE} (WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#7C3AED] mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${STUDIO_EMAIL}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {STUDIO_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EC4899] mt-0.5 flex-shrink-0" />
                <span>Pakistan (Serving Worldwide)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#94A3B8]">
            © 2025 Nexora Digital Studio. All rights reserved. | Designed with{' '}
            <Heart className="w-3.5 h-3.5 text-red-500 inline fill-current mx-0.5" />
          </p>
          <div className="flex items-center gap-6 text-[#94A3B8]">
            <a href="#about" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
