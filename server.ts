import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK (only used server-side)
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

/**
 * AI Creative Proposal & Strategy Generator
 * Uses gemini-4-argon with ThinkingLevel.HIGH (no maxOutputTokens set)
 */
app.post('/api/ai-creative-brief', async (req, res) => {
  try {
    const { brandName, industry, targetAudience, projectType, goal, notes, currency = 'USD' } = req.body;

    if (!brandName || !projectType) {
      return res.status(400).json({ error: 'brandName and projectType are required.' });
    }

    if (!ai) {
      const fallbackBrief = generateFallbackCreativeBrief({
        brandName,
        industry: industry || 'Digital Commerce',
        targetAudience: targetAudience || 'US / Global Consumers & Trendsetters',
        projectType,
        goal: goal || 'Rapid brand awareness and high conversion',
        notes: notes || 'Modern aesthetic',
        currency,
      });
      return res.json({
        success: true,
        isFallback: true,
        brief: fallbackBrief,
      });
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

    const response = await ai.models.generateContent({
      model: 'gemini-4-argon',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
        systemInstruction:
          'You are the Lead Creative Director and Tech Architect at Nexora Digital Studio. You work with fast-growing brands across the United States, Europe, and globally. Your tone is visionary, highly professional, sharp, and encouraging. Deliver a structured, inspiring proposal that highlights how AI video production, premium graphic design, and modern web development can scale the client\'s brand.',
      },
    });

    const briefText = response.text || 'Proposal generated successfully.';

    return res.json({
      success: true,
      brief: briefText,
    });
  } catch (error: any) {
    console.error('Error generating AI creative brief:', error);
    const fallbackBrief = generateFallbackCreativeBrief(req.body);
    return res.json({
      success: true,
      isFallback: true,
      brief: fallbackBrief,
      warning: error?.message || 'Generated using studio creative engine baseline.',
    });
  }
});

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

// In development, hook into Vite middlewares; in production, serve built static files
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nexora Digital Studio server running at http://localhost:${PORT}`);
  });
}

startServer();
