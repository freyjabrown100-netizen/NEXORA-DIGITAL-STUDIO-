import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, ShieldCheck, CreditCard } from 'lucide-react';
import { STUDIO_PHONE, STUDIO_WHATSAPP_INTL } from '../utils/studio-helpers';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What payment methods do you accept for US & international clients?',
      a: 'We accept all major US and international payment solutions including Stripe, Credit/Debit Cards (Visa, MasterCard, American Express), PayPal, and Wise (TransferWise). Invoicing is transparent with receipts provided. For clients in Pakistan, JazzCash, EasyPaisa, and local bank transfers are also supported.',
    },
    {
      q: 'How does your studio handle US time zones (EST, CST, PST)?',
      a: 'Our digital production team maintains active coverage during US business hours (both Eastern and Pacific time). We communicate smoothly via Slack, Email, WhatsApp, and scheduled Google Meet or Zoom video calls so you never experience communication delays.',
    },
    {
      q: 'Do I own 100% of the commercial rights and source files?',
      a: 'Yes! Upon final delivery, 100% commercial copyright and intellectual property rights are fully transferred to you. You own all video exports, posters, and web code with no royalties. We also provide signed standard mutual NDAs for sensitive brand campaigns.',
    },
    {
      q: 'How long does project delivery take, and do you offer rush turnaround?',
      a: 'Standard projects are delivered within 3-5 business days (7-12 days for comprehensive multi-page websites). If you have an urgent advertising campaign, TikTok launch, or product drop, we offer 24-48 hour rush delivery options upon request.',
    },
    {
      q: 'How do revisions work if I need adjustments?',
      a: 'We offer revisions on all packages to ensure pixel-perfect results. Our Starter package includes 2 comprehensive revision rounds, while our Professional and Premium tiers include unlimited revisions until you are completely thrilled with the final assets.',
    },
    {
      q: 'Are your video and poster assets compliant with US advertising rules?',
      a: 'Yes, 100%. All video content is rendered to native aspect ratios (9:16 vertical for TikTok & Meta Reels, 16:9 for YouTube & TV, 1:1 for feed posts) in 4K/60fps with licensed or custom-synthesized audio that passes Meta, TikTok Spark Ads, and Google Ads commercial clearance.',
    },
    {
      q: 'How do I place an order or get started?',
      a: `Getting started is effortless. You can submit the project form below, reach out on WhatsApp at ${STUDIO_PHONE}, or schedule a free 15-minute concept discovery call. We reply within 24 hours with an actionable roadmap.`,
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#0A0A14]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#7C3AED]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#06B6D4] text-xs font-semibold tracking-wider uppercase font-space mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clear Answers & Policies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8]">
            Everything you need to know about working with Nexora for US & global campaigns.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#7C3AED]/50 bg-[#12121F]/90 shadow-lg shadow-[#7C3AED]/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white font-poppins">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#7C3AED] rotate-180 text-white' : 'bg-white/5 text-[#94A3B8]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#94A3B8] leading-relaxed border-t border-white/5 animate-in fade-in duration-200 font-inter">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="mt-12 text-center p-6 rounded-2xl glass-card border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-sm font-bold text-white block">
              Have a custom enterprise request or need an NDA first?
            </span>
            <span className="text-xs text-[#94A3B8]">
              We respond promptly during EST and PST business hours.
            </span>
          </div>
          <a
            href={`https://wa.me/${STUDIO_WHATSAPP_INTL}?text=${encodeURIComponent('Hello Nexora! I am a US brand inquiry and would like to ask a question.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-btn px-5 py-2.5 rounded-full text-white text-xs font-bold inline-flex items-center gap-2 whitespace-nowrap font-space"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp ({STUDIO_PHONE})</span>
          </a>
        </div>
      </div>
    </section>
  );
};
