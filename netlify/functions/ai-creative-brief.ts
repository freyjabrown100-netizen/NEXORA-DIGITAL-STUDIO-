import { GoogleGenAI } from '@google/genai';

interface NetlifyEvent {
  httpMethod: string;
  body: string | null;
  headers: Record<string, string | undefined>;
}

interface NetlifyResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}

export const handler = async (event: NetlifyEvent): Promise<NetlifyResponse> => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
    };
  }

  try {
    let payload: any = {};
    if (event.body) {
      try {
        payload = JSON.parse(event.body);
      } catch {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ success: false, error: 'Malformed JSON payload provided.' }),
        };
      }
    }

    const brand = typeof payload.brandName === 'string' ? payload.brandName.trim() : '';
    const project = typeof payload.projectType === 'string' ? payload.projectType.trim() : '';
    const ind = typeof payload.industry === 'string' ? payload.industry.trim().slice(0, 100) : '';
    const aud = typeof payload.targetAudience === 'string' ? payload.targetAudience.trim().slice(0, 200) : '';
    const g = typeof payload.goal === 'string' ? payload.goal.trim().slice(0, 300) : '';
    const n = typeof payload.notes === 'string' ? payload.notes.trim().slice(0, 500) : '';
    const curr = payload.currency === 'PKR' ? 'PKR' : 'USD';

    if (!brand || brand.length < 2 || brand.length > 100) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, error: 'Brand name must be between 2 and 100 characters.' }),
      };
    }

    if (!project || project.length > 100) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, error: 'Service / project type is required (maximum 100 characters).' }),
      };
    }

    const fallbackBrief = generateFallbackCreativeBrief({
      brandName: brand,
      industry: ind || 'Digital Commerce',
      targetAudience: aud || 'US & Global Consumers',
      projectType: project,
      goal: g || 'Rapid brand awareness and high conversion',
      notes: n || 'Modern aesthetic',
      currency: curr,
    });

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          success: true,
          isFallback: true,
          apiKeyMissing: true,
          message:
            'GEMINI_API_KEY environment variable is not configured. Please add GEMINI_API_KEY in Netlify Site Settings > Environment Variables to enable live AI responses.',
          brief: fallbackBrief,
        }),
      };
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const priceGuide =
      curr === 'USD'
        ? 'Starter: $49, Professional: $149, or Premium: $399 USD'
        : 'Starter: Rs. 3,000, Professional: Rs. 8,000, or Premium: Rs. 15,000 PKR';

    const prompt = `
Client Project Details:
- Brand Name: ${brand}
- Industry: ${ind || 'Not specified'}
- Target Audience: ${aud || 'US / International consumers'}
- Service Type Requested: ${project}
- Main Goal: ${g || 'Brand awareness and customer conversions'}
- Additional Notes / Vision: ${n || 'None'}
- Selected Currency: ${curr}

Please produce a high-caliber Creative Strategy & Production Proposal tailored for Nexora Digital Studio.
Ensure the strategy considers major modern advertising channels (such as TikTok Spark Ads, Meta Reels 9:16 vertical video, and modern responsive web standards).
Include:
1. Executive Creative Hook & Narrative Angle
2. Visual Aesthetic & Art Direction (Color palettes, mood, lighting, audio vibe)
3. Actionable Production Plan (Scene storyboard for video, or layout concepts for posters/website)
4. Recommended Nexora Package Tier (${priceGuide}) with expected turnaround time.
5. Key Value Proposition for their brand.
`;

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

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        brief: briefText,
      }),
    };
  } catch (error: unknown) {
    // Log internal error safely in Netlify function logs without exposing to client
    console.error('Error generating AI creative brief in Netlify function:', error);
    let rawPayload: any = {};
    try {
      rawPayload = event.body ? JSON.parse(event.body) : {};
    } catch {
      rawPayload = {};
    }
    const fallbackBrief = generateFallbackCreativeBrief({
      brandName: typeof rawPayload.brandName === 'string' ? rawPayload.brandName.slice(0, 100) : 'Your Brand',
      industry: typeof rawPayload.industry === 'string' ? rawPayload.industry.slice(0, 100) : 'Digital Commerce',
      targetAudience: typeof rawPayload.targetAudience === 'string' ? rawPayload.targetAudience.slice(0, 200) : '',
      projectType: typeof rawPayload.projectType === 'string' ? rawPayload.projectType.slice(0, 100) : 'Creative Campaign',
      currency: rawPayload.currency === 'PKR' ? 'PKR' : 'USD',
    });
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        isFallback: true,
        brief: fallbackBrief,
        warning: 'The studio AI engine is temporarily busy. A tailored studio baseline proposal has been formulated.',
      }),
    };
  }
};

function generateFallbackCreativeBrief(data: any): string {
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
