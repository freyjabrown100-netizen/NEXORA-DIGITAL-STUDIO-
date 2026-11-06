import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { STUDIO_WHATSAPP_INTL } from '../utils/studio-helpers';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on hover */}
      <div
        className={`absolute right-16 px-3.5 py-1.5 rounded-xl bg-[#12121F] border border-white/20 text-white text-xs font-semibold whitespace-nowrap shadow-xl transition-all duration-300 pointer-events-none font-space ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span>Chat with us on WhatsApp</span>
        {/* Triangle arrow */}
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#12121F] border-t border-r border-white/20 rotate-45" />
      </div>

      {/* Main Floating Button */}
      <a
        href={`https://wa.me/${STUDIO_WHATSAPP_INTL}?text=${encodeURIComponent('Hi Nexora Digital Studio! I would like to inquire about your services.')}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/40 transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Chat with us on WhatsApp"
      >
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring pointer-events-none" />

        {/* WhatsApp Icon */}
        <i className="fa-brands fa-whatsapp text-2xl relative z-10"></i>
      </a>
    </div>
  );
};
