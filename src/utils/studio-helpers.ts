/**
 * Pure helper utilities for Nexora Digital Studio.
 * Optimized for both US / International and Local clients.
 * Clean, decoupled logic testable via node:test.
 */

export type Currency = 'USD' | 'PKR';

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  budgetRange: string;
  projectDescription: string;
  preferredContactMethod?: 'whatsapp' | 'email' | 'call';
  timeZone?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

export const STUDIO_PHONE = '+92 337 1089370';
export const STUDIO_PHONE_RAW = '03371089370';
export const STUDIO_WHATSAPP_INTL = '923371089370';
export const STUDIO_EMAIL = 'elsathompson11223@gmail.com';

/**
 * Validates the contact form inputs according to studio requirements.
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.serviceNeeded || data.serviceNeeded.trim() === '') {
    errors.serviceNeeded = 'Please select a service.';
  }

  if (!data.budgetRange || data.budgetRange.trim() === '') {
    errors.budgetRange = 'Please select a budget range.';
  }

  if (!data.projectDescription || data.projectDescription.trim().length < 10) {
    errors.projectDescription = 'Please describe your project (at least 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats a pre-filled WhatsApp click-to-chat URL with structured project inquiry.
 */
export function buildWhatsAppUrl(data: Partial<ContactFormData>, currency: Currency = 'USD'): string {
  const lines: string[] = ['*Hello Nexora Digital Studio!* 👋', 'I would like to inquire about a project:'];

  if (data.fullName) lines.push(`• *Name:* ${data.fullName}`);
  if (data.serviceNeeded) lines.push(`• *Service:* ${data.serviceNeeded}`);
  if (data.budgetRange) lines.push(`• *Budget:* ${data.budgetRange}`);
  if (data.email) lines.push(`• *Email:* ${data.email}`);
  if (data.phone) lines.push(`• *Phone:* ${data.phone}`);
  if (data.timeZone) lines.push(`• *Timezone:* ${data.timeZone}`);
  if (data.preferredContactMethod) lines.push(`• *Preferred Contact:* ${data.preferredContactMethod.toUpperCase()}`);
  if (data.projectDescription) lines.push(`\n*Project Details:*\n${data.projectDescription}`);

  lines.push('\nLooking forward to hearing from you!');

  const encodedText = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${STUDIO_WHATSAPP_INTL}?text=${encodedText}`;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'video' | 'design' | 'web';
  categoryLabel: string;
  description: string;
  tags: string[];
  gradient: string;
  icon: string;
  stats: string;
  aspectRatio: string;
  clientCountry?: string;
  metricsResult?: string;
  imageUrl?: string;
}

/**
 * Filters portfolio items by active category tab.
 */
export function filterPortfolioItems(items: PortfolioItem[], activeCategory: string): PortfolioItem[] {
  if (!activeCategory || activeCategory === 'all') {
    return items;
  }
  return items.filter((item) => item.category === activeCategory);
}

export interface PricingTier {
  id: string;
  name: string;
  priceUSD: string;
  pricePKR: string;
  badge?: string;
  targetAudience: string;
  deliveryDays: string;
  revisions: string;
  features: string[];
  isFeatured?: boolean;
}

export const PRICING_PACKAGES: PricingTier[] = [
  {
    id: 'starter',
    name: 'STARTER',
    priceUSD: '$49',
    pricePKR: 'Rs. 3,000',
    badge: 'Most Popular for Quick Wins',
    targetAudience: 'Startups, Creators & Small Businesses',
    deliveryDays: '3-5 Business Days',
    revisions: '2 Revisions Included',
    features: [
      '1 High-Impact AI Video OR 3 Graphic Posters OR 1 Landing Page',
      'Full 1080p/4K High-Resolution Exports',
      'Complete Commercial Usage Rights (100% IP Transfer)',
      '2 Comprehensive Revision Rounds',
      'Fast Turnaround in 3-5 Business Days',
      'Direct WhatsApp, Email & Slack Support',
    ],
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    priceUSD: '$149',
    pricePKR: 'Rs. 8,000',
    badge: 'Best Value for DTC & E-Commerce',
    targetAudience: 'Growing Brands, E-Commerce & Agencies',
    deliveryDays: '5-7 Business Days',
    revisions: 'Unlimited Revisions',
    features: [
      '2 Viral AI Videos (Reels/TikTok/Ads) + 5 High-Converting Posters',
      'Full Source Files (Figma, Adobe, Premiere/After Effects assets)',
      '100% Commercial Copyright & Broadcast Licensing',
      'Unlimited Revisions Until 100% Delighted',
      'Dedicated Account Manager (US EST/PST Timezone Aligned)',
      'Turnaround in 5-7 Business Days',
      'Rush 48-Hour Delivery Available Upon Request',
    ],
    isFeatured: true,
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    priceUSD: '$399',
    pricePKR: 'Rs. 15,000',
    badge: 'Complete Brand Launch Suite',
    targetAudience: 'Established Brands, SaaS & Global Businesses',
    deliveryDays: '7-12 Business Days',
    revisions: 'Unlimited Revisions',
    features: [
      'Full Responsive Modern Website + Video Ads + Graphic Suite',
      '30 Days Free Technical & Maintenance Support',
      'High-Converting SEO & Google Schema Integration',
      'Full Brand Kit: Logos, Social Templates, Video Banners',
      'Unlimited Revisions & VIP Direct Communication',
      'Signed Mutual NDA Available on Request',
      'US Legal / Enterprise Invoicing via Stripe & PayPal',
    ],
  },
];

export function formatPrice(tier: PricingTier, currency: Currency): string {
  if (currency === 'USD') {
    return `Starting from ${tier.priceUSD}`;
  }
  return `Starting from ${tier.pricePKR}`;
}
