import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  buildWhatsAppUrl,
  filterPortfolioItems,
  STUDIO_WHATSAPP_INTL,
  PortfolioItem,
  PRICING_PACKAGES,
  formatPrice,
  validateBriefRequest,
} from './studio-helpers';

test('validateContactForm rejects empty inputs', () => {
  const result = validateContactForm({
    fullName: '',
    email: '',
    phone: '',
    serviceNeeded: '',
    budgetRange: '',
    projectDescription: '',
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.serviceNeeded);
  assert.ok(result.errors.budgetRange);
  assert.ok(result.errors.projectDescription);
});

test('validateContactForm rejects invalid email', () => {
  const result = validateContactForm({
    fullName: 'Bilal Khan',
    email: 'not-an-email',
    phone: '03001234567',
    serviceNeeded: 'ai-video',
    budgetRange: 'Rs. 5,000 - 15,000',
    projectDescription: 'We need 3 high-impact promotional reels for our cafe.',
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.email);
  assert.equal(result.errors.fullName, undefined);
});

test('validateContactForm accepts valid form submission', () => {
  const result = validateContactForm({
    fullName: 'Sara Ahmed',
    email: 'sara@example.com',
    phone: '03331234567',
    serviceNeeded: 'poster-design',
    budgetRange: 'Rs. 8,000 - 15,000',
    projectDescription: 'Looking for 5 professional event banners and social graphics.',
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('buildWhatsAppUrl creates valid wa.me URL with phone and encoded query', () => {
  const url = buildWhatsAppUrl({
    fullName: 'Ahmed Raza',
    serviceNeeded: 'AI Video Production',
    budgetRange: 'Rs. 8,000 - 15,000',
    projectDescription: 'Viral product reel with 3D avatars',
  });

  assert.ok(url.startsWith(`https://wa.me/${STUDIO_WHATSAPP_INTL}`));
  assert.ok(url.includes('Ahmed%20Raza'));
  assert.ok(url.includes('AI%20Video%20Production'));
});

test('filterPortfolioItems filters by category accurately', () => {
  const items: PortfolioItem[] = [
    {
      id: '1',
      title: 'Item 1',
      category: 'video',
      categoryLabel: 'AI Video',
      sampleType: 'Concept Project',
      description: 'Desc',
      tags: [],
      gradient: '',
      icon: '',
      stats: '',
      aspectRatio: '16/9',
      specsDetail: 'Spec 1',
    },
    {
      id: '2',
      title: 'Item 2',
      category: 'design',
      categoryLabel: 'Graphic Design',
      sampleType: 'Demo Work',
      description: 'Desc',
      tags: [],
      gradient: '',
      icon: '',
      stats: '',
      aspectRatio: '4/5',
      specsDetail: 'Spec 2',
    },
    {
      id: '3',
      title: 'Item 3',
      category: 'web',
      categoryLabel: 'Website',
      sampleType: 'Concept Project',
      description: 'Desc',
      tags: [],
      gradient: '',
      icon: '',
      stats: '',
      aspectRatio: '16/9',
      specsDetail: 'Spec 3',
    },
  ];

  assert.equal(filterPortfolioItems(items, 'all').length, 3);
  assert.equal(filterPortfolioItems(items, 'video').length, 1);
  assert.equal(filterPortfolioItems(items, 'video')[0].id, '1');
  assert.equal(filterPortfolioItems(items, 'design').length, 1);
  assert.equal(filterPortfolioItems(items, 'design')[0].id, '2');
  assert.equal(filterPortfolioItems(items, 'web').length, 1);
});

test('formatPrice correctly outputs USD and PKR amounts', () => {
  const starter = PRICING_PACKAGES[0];
  assert.equal(formatPrice(starter, 'USD'), 'Starting from $49');
  assert.equal(formatPrice(starter, 'PKR'), 'Starting from Rs. 3,000');
});

test('validateBriefRequest rejects empty or too short brandName', () => {
  const result = validateBriefRequest({ brandName: 'A', projectType: 'AI Video' });
  assert.equal(result.isValid, false);
  assert.ok(result.error);
});

test('validateBriefRequest rejects missing projectType', () => {
  const result = validateBriefRequest({ brandName: 'Valid Brand', projectType: '' });
  assert.equal(result.isValid, false);
  assert.ok(result.error);
});

test('validateBriefRequest sanitizes and enforces input limits', () => {
  const result = validateBriefRequest({
    brandName: '   Apex DTC Brand   ',
    projectType: 'Website Development',
    industry: 'Fashion & Apparel',
    currency: 'USD',
  });

  assert.equal(result.isValid, true);
  assert.equal(result.sanitized?.brandName, 'Apex DTC Brand');
  assert.equal(result.sanitized?.currency, 'USD');
});
