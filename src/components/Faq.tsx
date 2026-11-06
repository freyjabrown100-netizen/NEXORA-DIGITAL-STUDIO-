import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { STUDIO_PHONE, STUDIO_WHATSAPP_INTL } from '../utils/studio-helpers';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What payment methods and terms do you use for US & international clients?',
      a: 'We work on transparent 50/50 milestone invoicing: a 50% commencement deposit prior to kickoff, and the final 50% balance upon final approval before source file delivery. We accept Wise (Direct Bank Wire / ACH transfer), International Bank Wire Transfer (SWIFT), and Payoneer / Direct Invoicing with official digital receipts. For clients in Pakistan, Raast, local bank transfers, JazzCash, and EasyPaisa are fully supported.',
    },
    {
      q: 'How does your studio handle US time zones (EST, CST, PST)?',
      a: 'Our digital production team maintains active coverage during US business hours (both Eastern and Pacific time). We communicate smoothly via Email, WhatsApp, and scheduled Google Meet or Zoom video calls so you never experience communication delays.',
    },
    {
      q: 'Do I own 100% of the commercial rights and source files?',
      a: 'Yes! Upon final invoice payment, 100% commercial copyright and intellectual property rights are fully transferred to you. You own all video exports, posters, and web code with zero ongoing royalties. We also provide signed standard mutual NDAs for sensitive brand campaigns.',
    },
    {
      q: 'How long does project delivery take, and do you offer rush turnaround?',
      a: 'Standard turnaround is 3-5 business days for Starter assets, 5-7 days for Professional multi-asset packages, and 7-12 days for comprehensive multi-page websites. If you have an urgent advertising campaign, TikTok launch, or product drop, 24-48 hour rush delivery options can be arranged upon request.',
    },
    {
      q: 'How do revisions work if I need adjustments?',
      a: 'Revisions are structured into defined rounds to maintain focused progress: our Starter tier includes 2 dedicated revision rounds; our Professional tier includes up to 4 iterative rounds; and our Premium tier includes up to 6 comprehensive rounds. Revisions cover pacing, grading, sound adjustments, copy, and visual polish within original project scope.',
    },
    {
      q: 'Are your video and poster assets compliant with US advertising rules?',
      a: 'Yes, 100%. All video content is rendered to native aspect ratios (9:16 vertical for TikTok & Meta Reels, 16:9 for YouTube & TV, 1:1 for feed posts) in 4K/60fps with clear text safe zones and licensed or custom audio that passes Meta Ads, TikTok Spark Ads, and Google Ads commercial clearance.',
    },
    {
      q: 'How do I place an inquiry or get started?',
      a: `Getting started is simple. You can submit the project inquiry form below, reach out on WhatsApp at ${STUDIO_PHONE}, or schedule a free 15-minute concept discovery call. We reply within 24 hours with an actionable roadmap.`,
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
            Clear, transparent answers regarding payment methods, revision limits, turnarounds, and ownership.
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
              We respond promptly during EST, CST, and PST business hours.
            </span>
          </div>
          <a
            href={`https://wa.me/${STUDIO_WHATSAPP_INTL}?text=${encodeURIComponent('Hello Nexora! I have a question regarding an upcoming campaign.')}`}
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
