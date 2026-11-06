/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { AiCreativeConsultant } from './components/AiCreativeConsultant';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';
import { Currency } from './utils/studio-helpers';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('USD'); // Default to USD for USA audience
  const [selectedService, setSelectedService] = useState<string>('ai-video');
  const [injectedProjectDesc, setInjectedProjectDesc] = useState<string>('');

  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleSelectPricingTier = (tierName: string) => {
    setInjectedProjectDesc(`Interested in the ${tierName} Package (${currency}). Please advise on start date, milestones, and onboarding.`);
  };

  const handleApplyBriefToContact = (briefText: string, brandName: string, serviceType: string) => {
    if (serviceType.includes('Video')) {
      setSelectedService('ai-video');
    } else if (serviceType.includes('Design')) {
      setSelectedService('poster-design');
    } else if (serviceType.includes('Web')) {
      setSelectedService('website-development');
    }
    setInjectedProjectDesc(`[AI Strategic Brief for ${brandName} (${currency})]\n${briefText.slice(0, 500)}...`);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A14] text-[#F8FAFC] relative selection:bg-[#7C3AED] selection:text-white">
      {/* Navigation with Currency Switcher */}
      <Navbar
        onQuoteClick={scrollToContact}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section with US Trust Guarantees */}
        <Hero />

        {/* 2. About Us Section */}
        <About />

        {/* 3. Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* 4. How We Work (Process) Section */}
        <Process />

        {/* 5. Portfolio Section with US Client Cases */}
        <Portfolio />

        {/* 6. AI Creative Strategist (High Thinking Gemini 4 Argon Feature) */}
        <AiCreativeConsultant
          onApplyToContact={handleApplyBriefToContact}
          currency={currency}
        />

        {/* 7. Pricing Packages Section with Live USD/PKR Switch */}
        <Pricing
          onSelectTier={handleSelectPricingTier}
          currency={currency}
          onCurrencyChange={setCurrency}
        />

        {/* 8. Testimonials Section with US Clients */}
        <Testimonials />

        {/* 9. FAQ Section with US Payments & Timezone policies */}
        <Faq />

        {/* 10. Contact Section with Timezone & USD Budgeting */}
        <Contact
          initialService={selectedService}
          initialDescription={injectedProjectDesc}
          currency={currency}
        />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Floating Interactive Elements */}
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}
