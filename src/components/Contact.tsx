import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Sparkles,
  AlertCircle,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  Info,
} from 'lucide-react';
import {
  ContactFormData,
  validateContactForm,
  buildWhatsAppUrl,
  STUDIO_PHONE,
  STUDIO_WHATSAPP_INTL,
  STUDIO_EMAIL,
  STUDIO_SOCIAL_PROFILES,
  Currency,
} from '../utils/studio-helpers';

interface ContactProps {
  initialService?: string;
  initialDescription?: string;
  currency?: Currency;
}

export const Contact: React.FC<ContactProps> = ({
  initialService,
  initialDescription,
  currency = 'USD',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceNeeded: initialService || 'ai-video',
    budgetRange: currency === 'USD' ? '$150 - $500' : '5k-15k',
    projectDescription: initialDescription || '',
    preferredContactMethod: 'email',
    timeZone: 'US Eastern (EST/EDT)',
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialDescription) {
      setFormData((prev) => ({ ...prev, projectDescription: initialDescription }));
    }
  }, [initialDescription]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      budgetRange: currency === 'USD' ? '$150 - $500' : '5k-15k',
    }));
  }, [currency]);

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [draftPrepared, setDraftPrepared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPreparingDraft, setIsPreparingDraft] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const formatInquirySummary = () => {
    return [
      `Nexora Digital Studio Project Inquiry`,
      `--------------------------------------`,
      `Client / Company: ${formData.fullName}`,
      `Email: ${formData.email}`,
      `Phone / WhatsApp: ${formData.phone || 'Not provided'}`,
      `Service Needed: ${formData.serviceNeeded}`,
      `Budget Range: ${formData.budgetRange} (${currency})`,
      `Timezone: ${formData.timeZone}`,
      `Preferred Contact: ${formData.preferredContactMethod?.toUpperCase()}`,
      `\nProject Description & Scope:\n${formData.projectDescription}`,
    ].join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsPreparingDraft(true);

    const subject = encodeURIComponent(
      `Nexora Project Inquiry (${currency}): ${formData.serviceNeeded} - ${formData.fullName}`
    );
    const body = encodeURIComponent(formatInquirySummary());

    // Open user's default email client
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsPreparingDraft(false);
      setDraftPrepared(true);
    }, 400);
  };

  const handleSendViaWhatsAppWithDetails = () => {
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    const waUrl = buildWhatsAppUrl(formData, currency);
    window.open(waUrl, '_blank');
  };

  const handleQuickWhatsAppChat = () => {
    // If user clicks direct chat without full validation, build URL with available info
    const waUrl = buildWhatsAppUrl(formData, currency);
    window.open(waUrl, '_blank');
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(formatInquirySummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0A0A14]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#7C3AED]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#06B6D4]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#06B6D4] text-xs font-semibold tracking-wider uppercase font-space mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>US & Global Direct Inquiry Desk</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8]">
            Share your creative vision or campaign goals. We review all inquiries directly and respond within 24 hours.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: Contact Info & Transparent Terms */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden space-y-6">
              <h3 className="text-2xl font-bold text-white font-poppins mb-2">
                Direct Studio Channels
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Connect directly with our production desk. No automated middlemen or call centers—you speak straight with creators and digital developers.
              </p>

              {/* Contact list */}
              <div className="space-y-4 pt-2">
                {/* Phone / WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-space text-[#94A3B8] block">
                      Direct WhatsApp & Calls
                    </span>
                    <a
                      href={`https://wa.me/${STUDIO_WHATSAPP_INTL}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-bold text-white hover:text-emerald-400 transition-colors block font-space"
                    >
                      {STUDIO_PHONE}
                    </a>
                    <span className="text-xs text-emerald-400/90 font-medium">
                      Fast response &bull; Voice notes and briefs welcome
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/20 text-[#A855F7] border border-[#7C3AED]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-space text-[#94A3B8] block">
                      Direct Studio Email
                    </span>
                    <a
                      href={`mailto:${STUDIO_EMAIL}`}
                      className="text-base sm:text-lg font-bold text-white hover:text-[#06B6D4] transition-colors break-all"
                    >
                      {STUDIO_EMAIL}
                    </a>
                    <span className="text-xs text-[#94A3B8] block">
                      Formal project proposals & milestone invoices
                    </span>
                  </div>
                </div>

                {/* Timezone Support */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-space text-[#94A3B8] block">
                      Operating Schedule & Timezones
                    </span>
                    <span className="text-sm font-bold text-white block">
                      Active Coverage for US EST, CST, PST & Global Hours
                    </span>
                    <span className="text-xs text-[#94A3B8]">
                      Mon &ndash; Sat &bull; Direct async & real-time communication
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-space text-[#94A3B8] block">
                      Studio Headquarters
                    </span>
                    <span className="text-sm font-bold text-white block">
                      Pakistan (Serving Clients in the US & Worldwide)
                    </span>
                    <span className="text-xs text-[#94A3B8]">
                      Fluent English &bull; International contracts and mutual NDAs
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-2 border-t border-white/10 space-y-3">
                <button
                  type="button"
                  onClick={handleQuickWhatsAppChat}
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-emerald-500/25 active:scale-95 font-space"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Start WhatsApp Conversation</span>
                </button>

                {/* Honest Payment Terms Box (No fake gateways) */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-[#94A3B8] space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[#06B6D4]" />
                    <span>Transparent Milestone Invoicing</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Standard 50% commencement deposit and 50% upon final deliverable sign-off. Payments accepted via Wise, International Wire Transfer, Payoneer, or local PK channels (Raast, Bank Transfer, JazzCash, EasyPaisa).
                  </p>
                </div>
              </div>

              {/* Social Media Section: Only show configured profiles */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] block mb-2 font-space">
                  Studio Social Profiles
                </span>
                {STUDIO_SOCIAL_PROFILES.length > 0 ? (
                  <div className="flex items-center gap-3">
                    {STUDIO_SOCIAL_PROFILES.map((profile, idx) => (
                      <a
                        key={idx}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#7C3AED]/30 border border-white/10 hover:border-[#7C3AED] flex items-center justify-center text-white transition-all text-xs font-space"
                        aria-label={profile.label}
                      >
                        {profile.label}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-[#94A3B8] flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                    <span>
                      Official studio social profiles will be announced here once verified. Direct client communication is handled via WhatsApp and direct Email.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form / Submission State */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 relative">
              {draftPrepared ? (
                /* Clear Draft Prepared State (No fake "sent" message) */
                <div className="text-left py-6 space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                    <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white font-poppins">
                        Inquiry Draft Prepared in Your Email App
                      </h4>
                      <p className="text-xs sm:text-sm text-amber-200/90 mt-1">
                        ⚠️ <strong>Important:</strong> Opening an email draft does not automatically send it. Please click <strong>"Send"</strong> in your email program (Gmail, Apple Mail, Outlook) to complete delivery to <strong>{STUDIO_EMAIL}</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Inquiry Summary Preview */}
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-space font-bold tracking-wider text-slate-300">
                        Inquiry Details Prepared:
                      </span>
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="text-xs flex items-center gap-1.5 text-[#06B6D4] hover:text-white transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Summary</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-xs font-mono text-slate-300 space-y-1 bg-black/40 p-3.5 rounded-xl border border-white/5">
                      <p><strong className="text-white">Client:</strong> {formData.fullName}</p>
                      <p><strong className="text-white">Email:</strong> {formData.email}</p>
                      {formData.phone && <p><strong className="text-white">Phone:</strong> {formData.phone}</p>}
                      <p><strong className="text-white">Service:</strong> {formData.serviceNeeded}</p>
                      <p><strong className="text-white">Budget:</strong> {formData.budgetRange} ({currency})</p>
                      <p><strong className="text-white">Timezone:</strong> {formData.timeZone}</p>
                      <p className="pt-1.5 border-t border-white/10 text-slate-400 line-clamp-3">
                        <strong className="text-white">Details:</strong> {formData.projectDescription}
                      </p>
                    </div>
                  </div>

                  {/* Immediate Alternatives & Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSendViaWhatsAppWithDetails}
                      className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-emerald-500/25 font-space"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span>Send This Inquiry via WhatsApp Now (Instant Delivery)</span>
                    </button>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex-1 py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4 text-[#06B6D4]" />
                        <span>Re-open Email App</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDraftPrepared(false)}
                        className="py-3.5 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white text-xs sm:text-sm font-semibold transition-colors"
                      >
                        Edit Details / Send Another
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Active Contact Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-space">
                        Full Name / Company <span className="text-[#06B6D4]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Marcus Vance (Veloce Brand)"
                        required
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                          errors.fullName ? 'border-red-500' : 'border-white/10'
                        } text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-space">
                        Email Address <span className="text-[#06B6D4]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. marcus@brand.com"
                        required
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                          errors.email ? 'border-red-500' : 'border-white/10'
                        } text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-space">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +1 (555) 019-2834"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm"
                      />
                    </div>

                    {/* Service Needed */}
                    <div>
                      <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-space">
                        Service Needed <span className="text-[#06B6D4]">*</span>
                      </label>
                      <select
                        name="serviceNeeded"
                        value={formData.serviceNeeded}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#12121F] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm"
                      >
                        <option value="ai-video">AI Video Creation (Reels & Ads)</option>
                        <option value="poster-design">Poster & Graphic Design</option>
                        <option value="website-development">Website Development</option>
                        <option value="other">Full Brand Launch Bundle</option>
                      </select>
                      {errors.serviceNeeded && (
                        <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.serviceNeeded}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Timezone */}
                    <div>
                      <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-space">
                        Your Timezone
                      </label>
                      <select
                        name="timeZone"
                        value={formData.timeZone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#12121F] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm"
                      >
                        <option value="US Eastern (EST/EDT)">US Eastern Time (EST/EDT - NY, Miami)</option>
                        <option value="US Central (CST/CDT)">US Central Time (CST/CDT - Chicago, Dallas)</option>
                        <option value="US Mountain (MST/MDT)">US Mountain Time (MST/MDT - Denver)</option>
                        <option value="US Pacific (PST/PDT)">US Pacific Time (PST/PDT - LA, SF, Seattle)</option>
                        <option value="UK / Europe (GMT/CET)">UK & Europe (GMT/CET - London, Berlin)</option>
                        <option value="Pakistan Standard Time (PKT)">Pakistan Standard Time (PKT)</option>
                        <option value="Other International">Other International</option>
                      </select>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-space">
                        Budget Range ({currency}) <span className="text-[#06B6D4]">*</span>
                      </label>
                      <select
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#12121F] border border-white/10 text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm"
                      >
                        {currency === 'USD' ? (
                          <>
                            <option value="Under $150">Under $150 USD</option>
                            <option value="$150 - $500">$150 - $500 USD (Starter/Pro)</option>
                            <option value="$500 - $1,500">$500 - $1,500 USD (Multi-Asset)</option>
                            <option value="$1,500+ Enterprise">$1,500+ USD (Full Suite & Retainer)</option>
                          </>
                        ) : (
                          <>
                            <option value="Under 5k">Under Rs. 5,000</option>
                            <option value="5k-15k">Rs. 5,000 - 15,000</option>
                            <option value="15k-50k">Rs. 15,000 - 50,000</option>
                            <option value="Custom">Custom Enterprise Budget</option>
                          </>
                        )}
                      </select>
                      {errors.budgetRange && (
                        <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.budgetRange}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-space">
                      Preferred Response Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'email', label: 'Email (Proposal & Scope)' },
                        { id: 'whatsapp', label: 'WhatsApp Message' },
                        { id: 'call', label: 'Schedule 15-Min Call' },
                      ].map((item) => (
                        <label
                          key={item.id}
                          className={`flex items-center gap-2 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            formData.preferredContactMethod === item.id
                              ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-white'
                              : 'bg-white/5 border-white/10 text-[#94A3B8] hover:text-white'
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferredContactMethod"
                            value={item.id}
                            checked={formData.preferredContactMethod === item.id}
                            onChange={handleChange}
                            className="text-[#7C3AED] focus:ring-[#7C3AED]"
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2 font-space">
                      Project Vision & Deliverables Needed <span className="text-[#06B6D4]">*</span>
                    </label>
                    <textarea
                      name="projectDescription"
                      rows={4}
                      value={formData.projectDescription}
                      onChange={handleChange}
                      placeholder="Describe your brand, desired deliverables, target platform (TikTok, Meta, Web), and ideal timeline..."
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.projectDescription ? 'border-red-500' : 'border-white/10'
                      } text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm resize-none`}
                    />
                    {errors.projectDescription && (
                      <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.projectDescription}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isPreparingDraft}
                      className="glow-btn py-4 px-8 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 flex-1 transition-transform disabled:opacity-50 font-space"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isPreparingDraft ? 'Preparing Email Draft...' : 'Open Email Draft'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaWhatsAppWithDetails}
                      className="py-4 px-6 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center justify-center gap-2 transition-colors font-space"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Inquire on WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-[#94A3B8] text-center pt-1 font-inter">
                    Clicking "Open Email Draft" generates a formatted message in your default email client addressed to <span className="text-white font-mono">{STUDIO_EMAIL}</span>. Remember to click "Send" in your email client to dispatch.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
