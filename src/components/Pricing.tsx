import React from 'react';
import { Check, Sparkles, ArrowRight, MessageCircle, Shield, CreditCard, DollarSign } from 'lucide-react';
import { PRICING_PACKAGES, STUDIO_WHATSAPP_INTL, Currency, formatPrice } from '../utils/studio-helpers';

interface PricingProps {
  onSelectTier?: (tierName: string) => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectTier, currency, onCurrencyChange }) => {
  const handleSelectPackage = (packageName: string) => {
    if (onSelectTier) {
      onSelectTier(packageName);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(
        `https://wa.me/${STUDIO_WHATSAPP_INTL}?text=${encodeURIComponent(`Hi Nexora! I would like to get started with the ${packageName} package (${currency}).`)}`,
        '_blank'
      );
    }
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#0A0A14]">
      {/* Background glow behind featured package */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#7C3AED]/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#06B6D4] text-xs font-semibold tracking-wider uppercase font-space mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Investment Plans</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight">
            Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8]">
            World-class studio quality at honest, transparent rates. Full commercial rights included in every package.
          </p>

          {/* Currency Toggle Switch in Header */}
          <div className="mt-6 inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10 shadow-lg font-space text-xs">
            <button
              onClick={() => onCurrencyChange('USD')}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-[#06B6D4] text-black shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              USD ($) &bull; United States & Global
            </button>
            <button
              onClick={() => onCurrencyChange('PKR')}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                currency === 'PKR'
                  ? 'bg-[#7C3AED] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              PKR (Rs) &bull; Pakistan Local
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {PRICING_PACKAGES.map((pkg) => {
            const isFeatured = pkg.isFeatured;
            const priceDisplay = currency === 'USD' ? pkg.priceUSD : pkg.pricePKR;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'glass-card border-2 border-[#7C3AED] shadow-2xl shadow-[#7C3AED]/30 scale-100 lg:scale-105 z-20 bg-[#12121F]/95'
                    : 'glass-card border border-white/10 hover:border-white/20 z-10'
                }`}
              >
                {/* Featured Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-bold font-space uppercase tracking-wider shadow-md whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  {/* Package Title & Target Audience */}
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-black text-white font-poppins mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8]">
                      For {pkg.targetAudience}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-space">
                        {priceDisplay}
                      </span>
                      <span className="text-xs uppercase text-[#94A3B8] font-mono">
                        {currency}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8] mt-3">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-space font-medium">
                        ⏱️ {pkg.deliveryDays}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-space font-medium text-emerald-400">
                        🔄 {pkg.revisions}
                      </span>
                    </div>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3.5 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block font-space">
                      Deliverables & Scope:
                    </span>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#06B6D4]/20 text-[#06B6D4] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-200 leading-snug font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action Button */}
                <button
                  onClick={() => handleSelectPackage(pkg.name)}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 font-space ${
                    isFeatured
                      ? 'glow-btn text-white shadow-xl hover:scale-105'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                  }`}
                >
                  <span>Select {pkg.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Global Payments & Risk-Free Guarantees Bar */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#06B6D4] flex-shrink-0" />
              <div className="text-left">
                <span className="text-sm font-bold text-white block font-poppins">
                  100% Satisfaction & Commercial Copyright Guarantee
                </span>
                <span className="text-xs text-[#94A3B8]">
                  Unlimited revisions on eligible tiers. Full IP ownership transferred on completion.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-space text-slate-300">
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">US NDA Ready</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Invoices Included</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-white font-medium">Accepted Global Payments:</span>
              <span className="text-slate-300">Stripe &bull; Visa &bull; Mastercard &bull; Amex &bull; PayPal &bull; Wise &bull; Wire</span>
            </div>
            <div className="text-xs text-[#94A3B8]">
              Local PK: JazzCash, EasyPaisa & Raast also supported
            </div>
          </div>
        </div>

        {/* Custom Quote Note */}
        <div className="mt-12 text-center">
          <p className="text-base text-[#94A3B8] mb-3">
            Need an enterprise bundle, retainer, or custom turnaround?
          </p>
          <a
            href={`https://wa.me/${STUDIO_WHATSAPP_INTL}?text=${encodeURIComponent(`Hi Nexora! I have a custom inquiry and would like to discuss a personalized package in ${currency}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#06B6D4] hover:text-white transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat directly with our director on WhatsApp or Book a Strategy Call</span>
          </a>
        </div>
      </div>
    </section>
  );
};
