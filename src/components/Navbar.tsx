import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MessageCircle, DollarSign, Calendar } from 'lucide-react';
import { STUDIO_WHATSAPP_INTL, Currency } from '../utils/studio-helpers';

interface NavbarProps {
  onQuoteClick: () => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onQuoteClick, currency, onCurrencyChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'services', 'work', 'portfolio', 'pricing', 'testimonials', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { name: 'Pricing', href: '#pricing', id: 'pricing' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A14]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="group flex flex-col focus:outline-none"
            aria-label="Nexora Digital Studio Home"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight gradient-text font-poppins">
                Nexora
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse"></span>
            </div>
            <div className="flex items-center gap-1.5 -mt-1">
              <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-space group-hover:text-white transition-colors">
                Digital Studio
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#7C3AED]/20 text-[#A855F7] border border-[#7C3AED]/30 font-bold uppercase font-mono">
                US & Global
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all relative group ${
                    isActive ? 'text-white' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* Underline indicator */}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] opacity-100 scale-x-100'
                        : 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop Controls & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Currency Selector Pill */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 text-xs font-semibold font-space">
              <button
                onClick={() => onCurrencyChange('USD')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  currency === 'USD'
                    ? 'bg-[#06B6D4] text-black font-bold shadow-sm'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
                title="View prices in US Dollars"
              >
                USD ($)
              </button>
              <button
                onClick={() => onCurrencyChange('PKR')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  currency === 'PKR'
                    ? 'bg-[#7C3AED] text-white font-bold shadow-sm'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
                title="View prices in Pakistani Rupees"
              >
                PKR (Rs)
              </button>
            </div>

            {/* Book Strategy Call */}
            <a
              href="#contact"
              onClick={onQuoteClick}
              className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>Book Call</span>
            </a>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={`https://wa.me/${STUDIO_WHATSAPP_INTL}?text=${encodeURIComponent('Hi Nexora Digital Studio! I would like to get a project quote.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn px-4 py-2.5 rounded-full text-white text-xs font-bold inline-flex items-center gap-2 group transition-transform active:scale-95 font-space"
              aria-label="Get a Quote on WhatsApp"
            >
              <span>Get a Quote</span>
              <MessageCircle className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
            </a>
          </div>

          {/* Mobile menu button & currency pill */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onCurrencyChange(currency === 'USD' ? 'PKR' : 'USD')}
              className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-[#06B6D4] font-space"
            >
              {currency}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 px-2 rounded-2xl glass-card border border-white/10 space-y-2 animate-in fade-in duration-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#06B6D4]/20 text-white border border-[#7C3AED]/30'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 px-2 space-y-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-[#94A3B8] font-space">Currency Display:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onCurrencyChange('USD')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      currency === 'USD' ? 'bg-[#06B6D4] text-black' : 'text-slate-400'
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    onClick={() => onCurrencyChange('PKR')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      currency === 'PKR' ? 'bg-[#7C3AED] text-white' : 'text-slate-400'
                    }`}
                  >
                    PKR (Rs)
                  </button>
                </div>
              </div>

              <a
                href={`https://wa.me/${STUDIO_WHATSAPP_INTL}?text=${encodeURIComponent('Hi Nexora Digital Studio! I would like to get a project quote.')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full glow-btn px-4 py-3 rounded-xl text-white text-center font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get a Quote on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
