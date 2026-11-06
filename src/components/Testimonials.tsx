import React from 'react';
import { Star, Quote, Sparkles, MapPin } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Marcus Vance',
      role: 'DTC Brand Founder & CEO',
      company: 'Veloce Apparel',
      location: 'Miami, FL (USA)',
      avatarGradient: 'from-cyan-500 to-blue-600',
      initials: 'MV',
      rating: 5,
      review:
        'Nexora produced 4 viral AI reels for our TikTok ad account that dropped our CAC by 38%. Fast delivery, crystal-clear English communication, and zero timezone lag. A phenomenal digital partner for any US brand.',
      verified: 'Verified US Client',
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Growth',
      company: 'Aura Cloud SaaS',
      location: 'Austin, TX (USA)',
      avatarGradient: 'from-purple-500 to-pink-600',
      initials: 'ER',
      rating: 5,
      review:
        'Our B2B website revamp and product launch video was delivered in just 6 days. The interactive glassmorphism design helped boost demo conversions by over 60%. Highly recommend Nexora!',
      verified: 'Verified US Client',
    },
    {
      name: 'Ahmed Raza',
      role: 'Restaurant & Hospitality Owner',
      company: 'Royal Bistro Lounge',
      location: 'Lahore (PK)',
      avatarGradient: 'from-amber-500 to-red-600',
      initials: 'AR',
      rating: 5,
      review:
        'Nexora Digital Studio completely transformed our brand. The AI videos they created for our business went viral on social media and filled our tables on opening week. Absolutely professional work!',
      verified: 'Verified Local Partner',
    },
    {
      name: 'Sara Khan',
      role: 'Fashion Boutique Owner',
      company: 'Luxe Couture',
      location: 'Karachi (PK)',
      avatarGradient: 'from-pink-500 to-violet-600',
      initials: 'SK',
      rating: 5,
      review:
        'The poster designs and social media launch assets were stunning! They understood exactly what I needed and delivered even better than expected. Fast turnaround and wonderful communication.',
      verified: 'Verified Local Partner',
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#0A0A14]/80">
      {/* Decorative glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#06B6D4] text-xs font-semibold tracking-wider uppercase font-space mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Social Proof & Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#94A3B8]">
            Trusted by creators, founders, and business owners across the United States and worldwide.
          </p>
        </div>

        {/* 4 Testimonial Cards Grid (2x2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between relative group hover:border-[#7C3AED]/40 transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Quote icon background */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 group-hover:text-[#7C3AED]/15 transition-colors pointer-events-none" />

              <div>
                {/* 5 Star Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current drop-shadow" />
                    ))}
                  </div>
                  <span className="text-[11px] font-space font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#06B6D4]">
                    {item.verified}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic mb-8 font-normal">
                  "{item.review}"
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-tr ${item.avatarGradient} flex items-center justify-center font-bold text-white text-sm shadow-md flex-shrink-0 font-space`}
                >
                  {item.initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-poppins">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    {item.role} &bull; <span className="text-white font-medium">{item.company}</span>
                  </p>
                  <p className="text-[11px] text-[#06B6D4] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 inline" />
                    <span>{item.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
