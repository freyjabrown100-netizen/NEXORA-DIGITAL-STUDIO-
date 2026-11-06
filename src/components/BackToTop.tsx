import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full bg-[#12121F]/90 hover:bg-[#7C3AED] text-white border border-white/20 hover:border-transparent flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md animate-in fade-in zoom-in-75"
      aria-label="Back to top of page"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
