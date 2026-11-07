import { GoogleGenAI } from '@google/genai';
import { validateBriefRequest, BriefRequestInput } from './utils/studio-helpers.ts';

export interface Env {
  GEMINI_API_KEY?: string;
  ASSETS?: {
    fetch: typeof fetch;
  };
}

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle preflight OPTIONS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    // AI Creative Proposal & Strategy Generator endpoint
    if (url.pathname === '/api/ai-creative-brief') {
      return handleAiCreativeBrief(request, env);
    }

    // Pass through all other requests to Cloudflare Static Assets (with SPA fallback)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};

export async function handleAiCreativeBrief(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'Method Not Allowed' }), {
      status: 405,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  let rawBody: BriefRequestInput = {};
  try {
    rawBody = await request.json();
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Malformed JSON payload provided.' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  // Pure validation & length limits
  const validation = validateBriefRequest(rawBody);
  if (!validation.isValid || !validation.sanitized) {
    return new Response(JSON.stringify({ success: false, error: validation.error || 'Invalid request parameters.' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  const { brandName, projectType, industry, targetAudience, goal, notes, currency } = validation.sanitized;

  const fallbackBrief = generateFallbackCreativeBrief({
    brandName,
    industry: industry || 'Digital Commerce',
    targetAudience: targetAudience || 'US / Global Consumers & Trendsetters',
    projectType,
    goal: goal || 'Rapid brand awareness and high conversion',
    notes: notes || 'Modern aesthetic',
    currency,
  });

  // Check Cloudflare Worker environment binding for GEMINI_API_KEY
  const apiKey = env.GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : undefined);

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        success: true,
        isFallback: true,
        apiKeyMissing: true,
        message:
          'GEMINI_API_KEY secret is not configured in Cloudflare Worker environment. Please add it using "wrangler secret put GEMINI_API_KEY" or in Cloudflare Dashboard (Workers & Pages > Settings > Variables).',
        brief: fallbackBrief,
      }),
      {
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      }
    );
  }

  const priceGuide =
    currency === 'USD'
      ? 'Starter: $49, Professional: $149, or Premium: $399 USD'
      : 'Starter: Rs. 3,000, Professional: Rs. 8,000, or Premium: Rs. 15,000 PKR';

  const prompt = `
Client Project Details:
- Brand Name: ${brandName}
- Industry: ${industry || 'Not specified'}
- Target Audience: ${targetAudience || 'US / International consumers'}
- Service Type Requested: ${projectType}
- Main Goal: ${goal || 'Brand awareness and customer conversions'}
- Additional Notes / Vision: ${notes || 'None'}
- Selected Currency: ${currency}

Please produce a high-caliber Creative Strategy & Production Proposal tailored for Nexora Digital Studio.
Ensure the strategy considers major modern advertising channels (such as TikTok Spark Ads, Meta Reels 9:16 vertical video, and modern responsive web standards).
Include:
1. Executive Creative Hook & Narrative Angle
2. Visual Aesthetic & Art Direction (Color palettes, mood, lighting, audio vibe)
3. Actionable Production Plan (Scene storyboard for video, or layout concepts for posters/website)
4. Recommended Nexora Package Tier (${priceGuide}) with expected turnaround time.
5. Key Value Proposition for their brand.
`;

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build-cloudflare',
        },
      },
    });

    const briefPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are the Lead Creative Director and Tech Architect at Nexora Digital Studio. You work with fast-growing brands across the United States, Europe, and globally. Your tone is visionary, highly professional, sharp, and encouraging. Deliver a structured, inspiring proposal that highlights how AI video production, premium graphic design, and modern web development can scale the client\'s brand.',
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('AI generation timed out.')), 8500);
    });

    const response = await Promise.race([briefPromise, timeoutPromise]);
    const briefText = response.text || fallbackBrief;

    return new Response(
      JSON.stringify({
        success: true,
        brief: briefText,
      }),
      {
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: unknown) {
    // Log error safely in Worker logs without leaking secrets or stack traces to client
    console.error('Error in Cloudflare Worker AI generation:', error);
    return new Response(
      JSON.stringify({
        success: true,
        isFallback: true,
        brief: fallbackBrief,
        warning: 'The studio AI engine is temporarily busy. A tailored studio baseline proposal has been formulated.',
      }),
      {
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      }
    );
  }
}

export function generateFallbackCreativeBrief(data: any): string {
  const brand = data.brandName || 'Your Brand';
  const type = data.projectType || 'AI Video & Creative Campaign';
  const industry = data.industry || 'Digital Commerce';
  const currency = data.currency || 'USD';
  const tierPrice = currency === 'USD' ? 'PROFESSIONAL TIER ($149 USD)' : 'PROFESSIONAL TIER (Rs. 8,000 PKR)';

  return `### 🚀 Nexora Creative Strategy Proposal for **${brand}**

#### 1. Executive Hook & Concept
Create a high-impact narrative centered on *"${brand}: Redefining ${industry}"*. By fusing cinematic AI visuals with human storytelling, we position your business as the foremost innovator in your space, fully optimized for US TikTok Ads and Instagram Reels.

#### 2. Visual Art Direction & Palette
- **Palette**: Deep Obsidian (#0A0A14), Electric Cyan (#06B6D4), and Royal Violet (#7C3AED) with high-contrast metallic highlights.
- **Tone**: Sleek, aspirational, modern, and trustworthy.
- **Audio/Motion**: Dynamic percussion with ethereal ambient pads and kinetic typography.

#### 3. Production Roadmap & Deliverables
- **Core Asset**: 4K 60fps promotional reel tailored for Instagram Reels, TikTok, and YouTube Shorts (9:16 vertical).
- **Graphic Assets**: 3x High-converting promotional posters and social media launch banners.
- **Web Anchor**: Interactive digital landing section optimized for mobile tap-to-WhatsApp and email conversions.

#### 4. Recommended Nexora Package
- **Package**: **${tierPrice}**
- **Turnaround**: 5-7 Business Days (24-48h Rush Available)
- **Includes**: 2 AI Videos, 5 Poster Designs, Up to 4 Iterative Revision Rounds, Full Source Files, 100% Commercial IP Rights, and EST/PST Friendly Support.

*Ready to bring this vision to life? Click "Send Brief via WhatsApp" or submit the form below!*`;
}
