import React, { useState } from 'react';
import { Sparkles, BrainCircuit, ArrowRight, Check, Copy, MessageCircle, Send, Loader2, Info } from 'lucide-react';
import { STUDIO_WHATSAPP_INTL, Currency } from '../utils/studio-helpers';

interface AiCreativeConsultantProps {
  onApplyToContact?: (briefText: string, brandName: string, serviceType: string) => void;
  currency?: Currency;
}

export const AiCreativeConsultant: React.FC<AiCreativeConsultantProps> = ({
  onApplyToContact,
  currency = 'USD',
}) => {
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [projectType, setProjectType] = useState('AI Video Creation');
  const [targetAudience, setTargetAudience] = useState('');
  const [goal, setGoal] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiNotice, setApiNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) {
      setError('Please provide your Brand or Business Name.');
      return;
    }

    setLoading(true);
    setError(null);
    setApiNotice(null);
    setResult(null);

    try {
      const response = await fetch('/api/ai-creative-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName,
          industry,
          projectType,
          targetAudience,
          goal,
          notes,
          currency,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate brief');
      }

      if (data.apiKeyMissing) {
        setApiNotice(
          data.message ||
            'Notice: Live AI generation requires GEMINI_API_KEY in Netlify or Cloud Run environment variables. Showing instant studio strategy framework below.'
        );
      }

      setResult(data.brief);
    } catch (err: any) {
      console.error('Brief generation error:', err);
      setError(err?.message || 'Could not connect to AI engine. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const sendToWhatsApp = () => {
    if (!result) return;
    const summary = `*Creative Brief Request for ${brandName}*\nService: ${projectType} (${currency})\n\n${result.slice(0, 1000)}...`;
    window.open(
      `https://wa.me/${STUDIO_WHATSAPP_INTL}?text=${encodeURIComponent(summary)}`,
      '_blank'
    );
  };

  const applyToForm = () => {
    if (!result) return;
    if (onApplyToContact) {
      onApplyToContact(result, brandName, projectType);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="ai-consultant" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0A0A14] via-[#12121F] to-[#0A0A14]">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7C3AED]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#06B6D4]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#7C3AED]/40 text-[#A855F7] text-xs font-semibold tracking-wider uppercase font-space mb-4 shadow-lg shadow-[#7C3AED]/15">
            <BrainCircuit className="w-4 h-4 text-[#06B6D4] animate-pulse" />
            <span>High-Reasoning AI Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight">
            AI Creative <span className="gradient-text">Strategist</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8]">
            Experience Nexora's high-thinking intelligence. Enter your project idea below and let our engine
            formulate a bespoke creative hook, art direction, and production roadmap tailored for your market.
          </p>
        </div>

        {/* Interactive Consultation Card */}
        <div className="glass-card rounded-3xl border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Brand Name */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-space">
                  Brand / Business Name <span className="text-[#06B6D4]">*</span>
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Veloce Streetwear / Aura SaaS"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-space">
                  Industry / Niche
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. E-Commerce, B2B SaaS, Fashion, Food"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm"
                />
              </div>

              {/* Service Needed */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-space">
                  Desired Service
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#12121F] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm"
                >
                  <option value="AI Video Creation">AI Video Creation (TikTok & Reels Ads)</option>
                  <option value="Poster & Graphic Design">Poster & Graphic Design (Print & Digital)</option>
                  <option value="Website Development">Website Development (Landing Pages & Stores)</option>
                  <option value="Complete Brand Launch (All Services)">Complete Brand Launch (All Services)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target Audience */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-space">
                  Target Audience & Geography
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. US Gen-Z consumers on TikTok (18-30), Miami & NYC"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm"
                />
              </div>

              {/* Main Goal */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-space">
                  Core Objective / Goal
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. 3x ROAS on TikTok Ads and double weekly conversions"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm"
                />
              </div>
            </div>

            {/* Additional Vision */}
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-space">
                Vision & Key Preferences (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Mention any specific color preferences, US competitor benchmarks, or brand tone..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm resize-none"
              />
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                <Sparkles className="w-4 h-4 text-[#06B6D4]" />
                <span>Powered by Gemini 3.8 Flash Creative Intelligence ({currency})</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto glow-btn px-8 py-3.5 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 transition-transform disabled:opacity-50 font-space"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Analyzing US Ad Dynamics & Formulating Strategy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#06B6D4]" />
                    <span>Generate Creative Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Generated Result Output */}
          {result && (
            <div className="mt-8 pt-8 border-t border-white/15 animate-in fade-in duration-300">
              {apiNotice && (
                <div className="mb-4 p-4 rounded-xl bg-cyan-950/40 border border-[#06B6D4]/30 text-cyan-200 text-xs flex items-start gap-3">
                  <Info className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block mb-0.5">Deployment Configuration Note</span>
                    {apiNotice}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-sm font-bold text-white font-poppins uppercase tracking-wider">
                    Custom Creative Roadmap for {brandName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors font-space"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={sendToWhatsApp}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-semibold text-emerald-300 flex items-center gap-1.5 transition-colors font-space"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp</span>
                  </button>

                  <button
                    onClick={applyToForm}
                    className="px-3.5 py-1.5 rounded-lg bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 border border-[#7C3AED]/40 text-xs font-semibold text-purple-300 flex items-center gap-1.5 transition-colors font-space"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Use in Contact Form</span>
                  </button>
                </div>
              </div>

              {/* Proposal Content Container */}
              <div className="p-6 rounded-2xl bg-[#0A0A14]/90 border border-white/10 text-[#F8FAFC] text-sm leading-relaxed whitespace-pre-line font-inter overflow-x-auto selection:bg-[#06B6D4]/30">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
