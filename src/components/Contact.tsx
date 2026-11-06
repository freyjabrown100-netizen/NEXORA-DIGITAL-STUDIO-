import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Calendar,
  Globe,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import {
  ContactFormData,
  validateContactForm,
  buildWhatsAppUrl,
  STUDIO_PHONE,
  STUDIO_WHATSAPP_INTL,
  STUDIO_EMAIL,
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
    budgetRange: currency === 'USD' ? '$200 - $600' : '5k-15k',
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
      budgetRange: currency === 'USD' ? '$200 - $600' : '5k-15k',
    }));
  }, [currency]);

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      const subject = encodeURIComponent(`Nexora Project Inquiry (${currency}): ${formData.serviceNeeded} - ${formData.fullName}`);
      const body = encodeURIComponent(
        `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nTimezone: ${formData.timeZone}\nPreferred Contact: ${formData.preferredContactMethod}\nService: ${formData.serviceNeeded}\nBudget: ${formData.budgetRange} (${currency})\n\nProject Description:\n${formData.projectDescription}`
      );
      window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
    }, 600);
  };

  const handleSendViaWhatsAppDirectly = () => {
    const waUrl = buildWhatsAppUrl(formData, currency);
    window.open(waUrl, '_blank');
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
            <span>US & Global Inquiries Welcome</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8]">
            Ready to scale your brand? Contact us for a rapid quote or schedule a 15-minute concept discovery call.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden space-y-6">
              <h3 className="text-2xl font-bold text-white font-poppins mb-2">
                Get In Touch
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Whether you need viral TikTok reels, Meta ad campaigns, 4K commercial videos, or a bespoke landing page, we reply within 24 hours with an actionable roadmap.
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
                      Phone / WhatsApp (International)
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
                      Direct WhatsApp chat &bull; Available 24/7
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
                      Formal project proposals & invoices
                    </span>
                  </div>
                </div>

                {/* US Timezone Support */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-space text-[#94A3B8] block">
                      Timezone & Working Hours
                    </span>
                    <span className="text-sm font-bold text-white block">
                      US EST & PST Aligned Hours
                    </span>
                    <span className="text-xs text-[#94A3B8]">
                      Global coverage (Mon - Sat, 9:00 AM - 9:00 PM EST/PKT)
                    </span>
                  </div>
                </div>

                {/* Location & Studio HQ */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-space text-[#94A3B8] block">
                      Studio Presence
                    </span>
                    <span className="text-sm font-bold text-white block">
                      Serving Clients in the United States & Worldwide
                    </span>
                    <span className="text-xs text-[#94A3B8]">
                      HQ: Pakistan &bull; Full English Fluent Communication
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout Button */}
              <div className="pt-2 border-t border-white/10 space-y-3">
                <a
                  href={`https://wa.me/${STUDIO_WHATSAPP_INTL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-emerald-500/25 active:scale-95 font-space"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Chat on WhatsApp Directly</span>
                </a>

                {/* Security & Payment Badges */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-[#94A3B8] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#06B6D4]" />
                    <span className="text-white font-medium">Stripe & PayPal Verified</span>
                  </div>
                  <span className="text-[#06B6D4] font-mono text-[11px]">Instant Receipt</span>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] block mb-3 font-space">
                  Connect On Social Media
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#7C3AED]/30 border border-white/10 hover:border-[#7C3AED] flex items-center justify-center text-white transition-all"
                    aria-label="Facebook"
                  >
                    <i className="fa-brands fa-facebook-f text-base"></i>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#EC4899]/30 border border-white/10 hover:border-[#EC4899] flex items-center justify-center text-white transition-all"
                    aria-label="Instagram"
                  >
                    <i className="fa-brands fa-instagram text-base"></i>
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#06B6D4]/30 border border-white/10 hover:border-[#06B6D4] flex items-center justify-center text-white transition-all"
                    aria-label="TikTok"
                  >
                    <i className="fa-brands fa-tiktok text-base"></i>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/30 border border-white/10 hover:border-red-500 flex items-center justify-center text-white transition-all"
                    aria-label="YouTube"
                  >
                    <i className="fa-brands fa-youtube text-base"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 relative">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-poppins">
                    Thank You!
                  </h3>
                  <p className="text-base sm:text-lg text-[#94A3B8] max-w-md mx-auto">
                    We'll contact you within 24 hours. Your project inquiry draft has been sent to our production desk.
                  </p>
                  <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleSendViaWhatsAppDirectly}
                      className="glow-btn px-6 py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Also Open in WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
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
                        Business Email Address <span className="text-[#06B6D4]">*</span>
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
                        Your Timezone (For Fast Reply)
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

                    {/* Budget Range (Dynamic based on currency) */}
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
                      Preferred Way To Connect
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'email', label: 'Email (Proposal & Brief)' },
                        { id: 'whatsapp', label: 'WhatsApp Chat' },
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
                      Project Vision & Target Audience <span className="text-[#06B6D4]">*</span>
                    </label>
                    <textarea
                      name="projectDescription"
                      rows={4}
                      value={formData.projectDescription}
                      onChange={handleChange}
                      placeholder="Share your brand goals, target audience (e.g. US TikTok/IG users), ideal timeline, and deliverables needed..."
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
                      disabled={submitting}
                      className="glow-btn py-4 px-8 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 flex-1 transition-transform disabled:opacity-50 font-space"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? 'Sending Proposal Request...' : 'Send Project Inquiry'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaWhatsAppDirectly}
                      className="py-4 px-6 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center justify-center gap-2 transition-colors font-space"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Inquire on WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
