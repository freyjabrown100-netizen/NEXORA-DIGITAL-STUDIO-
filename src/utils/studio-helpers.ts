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

export interface BriefRequestInput {
  brandName?: unknown;
  projectType?: unknown;
  industry?: unknown;
  targetAudience?: unknown;
  goal?: unknown;
  notes?: unknown;
  currency?: unknown;
}

export interface BriefValidationResult {
  isValid: boolean;
  error?: string;
  sanitized?: {
    brandName: string;
    projectType: string;
    industry: string;
    targetAudience: string;
    goal: string;
    notes: string;
    currency: Currency;
  };
}

/**
 * Validates and sanitizes AI creative brief incoming requests with strict length limits.
 */
export function validateBriefRequest(input: BriefRequestInput): BriefValidationResult {
  const brand = typeof input.brandName === 'string' ? input.brandName.trim() : '';
  const project = typeof input.projectType === 'string' ? input.projectType.trim() : '';
  const ind = typeof input.industry === 'string' ? input.industry.trim().slice(0, 100) : '';
  const aud = typeof input.targetAudience === 'string' ? input.targetAudience.trim().slice(0, 200) : '';
  const g = typeof input.goal === 'string' ? input.goal.trim().slice(0, 300) : '';
  const n = typeof input.notes === 'string' ? input.notes.trim().slice(0, 500) : '';
  const curr: Currency = input.currency === 'PKR' ? 'PKR' : 'USD';

  if (!brand || brand.length < 2 || brand.length > 100) {
    return { isValid: false, error: 'Brand name must be between 2 and 100 characters.' };
  }
  if (!project || project.length > 100) {
    return { isValid: false, error: 'Service / project type is required (maximum 100 characters).' };
  }

  return {
    isValid: true,
    sanitized: {
      brandName: brand,
      projectType: project,
      industry: ind,
      targetAudience: aud,
      goal: g,
      notes: n,
      currency: curr,
    },
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
  sampleType: 'Concept Project' | 'Demo Work';
  description: string;
  tags: string[];
  gradient: string;
  icon: string;
  stats: string;
  aspectRatio: string;
  specsDetail: string;
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

export interface SocialProfile {
  platform: 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'linkedin';
  url: string;
  label: string;
}

/**
 * Configured studio social media profiles.
 * Only valid, live studio profile URLs should be added here.
 * Generic homepages are intentionally omitted.
 */
export const STUDIO_SOCIAL_PROFILES: SocialProfile[] = [
  // Add live verified studio profiles as they launch, e.g.:
  // { platform: 'instagram', url: 'https://instagram.com/nexora_studio', label: 'Instagram' }
];

export interface PaymentMethodInfo {
  method: string;
  description: string;
  category: 'international' | 'local';
}

export const HONEST_PAYMENT_METHODS: PaymentMethodInfo[] = [
  {
    method: 'Wise (TransferWise)',
    description: 'Direct international bank debit, ACH & wire transfers with low fees and transparent rates.',
    category: 'international',
  },
  {
    method: 'International Bank Wire Transfer',
    description: 'Direct SWIFT / IBAN business transfers for international project invoicing.',
    category: 'international',
  },
  {
    method: 'Payoneer / Direct Invoicing',
    description: 'Itemized milestone invoice with official receipt for corporate accounting.',
    category: 'international',
  },
  {
    method: 'Raast / Local Bank Transfer (PK)',
    description: 'Instant zero-fee Pakistani interbank fund transfer via State Bank Raast ID or IBAN.',
    category: 'local',
  },
  {
    method: 'JazzCash & EasyPaisa (PK)',
    description: 'Instant mobile wallet payment options for domestic clients.',
    category: 'local',
  },
];

export const STUDIO_PAYMENT_TERMS = {
  deposit: '50% project commencement deposit upon agreed scope',
  balance: '50% remaining balance upon final approval before source file release',
  nda: 'Standard mutual Non-Disclosure Agreement (NDA) available upon request',
  ipTransfer: '100% intellectual property & commercial copyright transferred upon final invoice settlement',
};

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
    revisions: '2 Dedicated Revision Rounds',
    features: [
      '1 High-Impact AI Video OR 3 Graphic Posters OR 1 Landing Page',
      'Full 1080p/4K High-Resolution Final Exports',
      '100% Commercial Usage Rights (Full IP Transfer Upon Completion)',
      '2 Dedicated Revision Rounds for Feedback & Polish',
      'Fast Turnaround in 3-5 Business Days',
      'Direct WhatsApp & Email Production Communication',
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
    revisions: 'Up to 4 Iterative Revision Rounds',
    features: [
      '2 Viral AI Videos (Reels/TikTok/Ads) + 5 High-Converting Posters',
      'Full Source Files (Figma layouts, Adobe & Premiere/AE project assets)',
      '100% Commercial Copyright & Broadcast Licensing',
      'Up to 4 Iterative Revision Rounds to Ensure Exact Execution',
      'Direct Project Coordinator (Active Coverage During US EST/PST Hours)',
      'Turnaround in 5-7 Business Days',
      '50% Milestone Commencement Deposit, 50% Upon Final Delivery',
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
    revisions: 'Up to 6 Comprehensive Revision Rounds',
    features: [
      'Full Responsive Custom Website + Video Ads + Graphic Suite',
      'Up to 6 Comprehensive Revision Rounds with Priority Feedback Iteration',
      '30 Days Free Technical & Maintenance Support Post-Launch',
      'Complete Brand Kit: Logos, Social Templates, Vector Banners',
      'Signed Mutual NDA Available on Request',
      'Itemized Milestone Invoicing via Wise, Wire Transfer, or Payoneer',
      '50% Milestone Deposit, 50% Upon Final Deliverable Approval',
    ],
  },
];

export function formatPrice(tier: PricingTier, currency: Currency): string {
  if (currency === 'USD') {
    return `Starting from ${tier.priceUSD}`;
  }
  return `Starting from ${tier.pricePKR}`;
}
