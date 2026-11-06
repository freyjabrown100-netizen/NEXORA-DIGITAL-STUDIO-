import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

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
 * Uses supported model gemini-3.8-flash server-side
 */
app.post('/api/ai-creative-brief', async (req, res) => {
  try {
    const rawBody = req.body || {};
    const brand = typeof rawBody.brandName === 'string' ? rawBody.brandName.trim() : '';
    const project = typeof rawBody.projectType === 'string' ? rawBody.projectType.trim() : '';
    const ind = typeof rawBody.industry === 'string' ? rawBody.industry.trim().slice(0, 100) : '';
    const aud = typeof rawBody.targetAudience === 'string' ? rawBody.targetAudience.trim().slice(0, 200) : '';
    const g = typeof rawBody.goal === 'string' ? rawBody.goal.trim().slice(0, 300) : '';
    const n = typeof rawBody.notes === 'string' ? rawBody.notes.trim().slice(0, 500) : '';
    const curr = rawBody.currency === 'PKR' ? 'PKR' : 'USD';

    if (!brand || brand.length < 2 || brand.length > 100) {
      return res.status(400).json({ error: 'Brand name must be between 2 and 100 characters.' });
    }

    if (!project || project.length > 100) {
      return res.status(400).json({ error: 'Service / project type is required (maximum 100 characters).' });
    }

    const fallbackBrief = generateFallbackCreativeBrief({
      brandName: brand,
      industry: ind || 'Digital Commerce',
      targetAudience: aud || 'US / Global Consumers & Trendsetters',
      projectType: project,
      goal: g || 'Rapid brand awareness and high conversion',
      notes: n || 'Modern aesthetic',
      currency: curr,
    });

    if (!geminiApiKey || !ai) {
      return res.json({
        success: true,
        isFallback: true,
        apiKeyMissing: true,
        message:
          'GEMINI_API_KEY environment variable is not configured. Please set GEMINI_API_KEY in your hosting environment (Netlify or Cloud Run) to enable live AI responses.',
        brief: fallbackBrief,
      });
    }

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

    return res.json({
      success: true,
      brief: briefText,
    });
  } catch (error: unknown) {
    // Log internal error safely on the server console without leaking to client
    console.error('Error generating AI creative brief:', error);
    const rawBody = req.body || {};
    const fallbackBrief = generateFallbackCreativeBrief({
      brandName: typeof rawBody.brandName === 'string' ? rawBody.brandName.slice(0, 100) : 'Your Brand',
      industry: typeof rawBody.industry === 'string' ? rawBody.industry.slice(0, 100) : 'Digital Commerce',
      targetAudience: typeof rawBody.targetAudience === 'string' ? rawBody.targetAudience.slice(0, 200) : '',
      projectType: typeof rawBody.projectType === 'string' ? rawBody.projectType.slice(0, 100) : 'Creative Campaign',
      currency: rawBody.currency === 'PKR' ? 'PKR' : 'USD',
    });
    return res.json({
      success: true,
      isFallback: true,
      brief: fallbackBrief,
      warning: 'The studio AI engine is temporarily busy. A tailored studio baseline proposal has been formulated.',
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
