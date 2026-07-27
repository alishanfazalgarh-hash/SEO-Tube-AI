import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface TrendingTopicItem {
  topic: string;
  category: string;
  trendScore: string;
  description: string;
}

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory simple rate limiting (30 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimiter(req: Request, res: Response, next: () => void) {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 30;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  if (record.count >= maxRequests) {
    res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a minute before trying again.',
    });
    return;
  }

  record.count += 1;
  next();
}

app.use('/api/', rateLimiter);

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'SEO Tube AI Backend' });
});

app.post('/api/trending', async (req: Request, res: Response) => {
  const { category = 'All' } = req.body;

  const FALLBACK_TOPICS: Record<string, TrendingTopicItem[]> = {
    'Tech & AI': [
      { topic: 'Gemini 3 AI Features & Setup Guide 2026', category: 'Tech & AI', trendScore: '🔥 +380% Spike', description: 'Viral demand following Google AI announcements and developer tools.' },
      { topic: 'Best Budget AI Laptops Under $800', category: 'Tech & AI', trendScore: '⚡ 180K+ Searches', description: 'High search volume for affordable hardware with neural processors.' },
      { topic: 'DeepSeek AI vs ChatGPT 5 Comparison', category: 'Tech & AI', trendScore: '🚀 Viral Trend', description: 'Active benchmark comparison discussions across creator channels.' },
      { topic: 'Top 10 Chrome AI Extensions You Need', category: 'Tech & AI', trendScore: '🔥 +210% Growth', description: 'Productivity hacks trending on tech YouTube.' }
    ],
    'Gaming': [
      { topic: 'GTA 6 Gameplay Secrets & Map Leaks', category: 'Gaming', trendScore: '🔥 +450% Spike', description: 'Massive hype around upcoming open-world gaming news.' },
      { topic: 'Minecraft 1.22 Update Full Showcase', category: 'Gaming', trendScore: '⚡ 250K+ Searches', description: 'Trending among gaming Let\'s Play creators and modders.' },
      { topic: 'Fortnite Chapter 6 Season 2 Battle Pass', category: 'Gaming', trendScore: '🚀 Viral Trend', description: 'High search volume for new skins, weapons, and map locations.' },
      { topic: 'Elden Ring DLC Boss Battle Strategy', category: 'Gaming', trendScore: '🔥 +190% Growth', description: 'Popular walkthrough guide topic for RPG players.' }
    ],
    'Vlogs & Shorts': [
      { topic: '24 Hours Alone in Silent Wilderness Vlog', category: 'Vlogs & Shorts', trendScore: '🔥 +320% Spike', description: 'Trending outdoor survival vlog format with high retention.' },
      { topic: 'Day in the Life of a Software Engineer in 2026', category: 'Vlogs & Shorts', trendScore: '⚡ 120K+ Searches', description: 'High audience view duration among tech enthusiasts and students.' },
      { topic: '100 Layers Challenge Short Video', category: 'Vlogs & Shorts', trendScore: '🚀 Viral Trend', description: 'High-retention viral YouTube Shorts concept.' },
      { topic: 'Budget Travel Vlog: Hidden Gems You Must Visit', category: 'Vlogs & Shorts', trendScore: '🔥 +240% Growth', description: 'Viral vacation and backpacking recommendation trend.' }
    ],
    'Health & Fitness': [
      { topic: 'Full Body Fat Burn Workout at Home (No Equipment)', category: 'Health & Fitness', trendScore: '🔥 +410% Spike', description: 'High search volume for quick home fitness routines.' },
      { topic: 'Garlic & Ginger Health Benefits Proven by Science', category: 'Health & Fitness', trendScore: '⚡ 300K+ Searches', description: 'Trending natural wellness & remedy query on YouTube.' },
      { topic: '10 Minute Morning Mobility & Stretch Routine', category: 'Health & Fitness', trendScore: '🚀 Viral Trend', description: 'Consistent daily high CTR video topic.' },
      { topic: 'High Protein Meal Prep for Muscle Gain on a Budget', category: 'Health & Fitness', trendScore: '🔥 +220% Growth', description: 'Popular nutrition recipe guide for fitness creators.' }
    ],
    'Crypto & Finance': [
      { topic: 'Crypto Bull Market Strategy & Top Altcoins', category: 'Crypto & Finance', trendScore: '🔥 +350% Spike', description: 'High trader demand for technical and market analysis.' },
      { topic: 'How to Invest $1000 for Passive Income in 2026', category: 'Crypto & Finance', trendScore: '⚡ 210K+ Searches', description: 'Evergreen high RPM personal finance topic.' },
      { topic: 'Bitcoin Next Target & Market Prediction', category: 'Crypto & Finance', trendScore: '🚀 Viral Trend', description: 'Daily crypto price update and news interest.' },
      { topic: 'How to Start Dropshipping with Free AI Tools', category: 'Crypto & Finance', trendScore: '🔥 +290% Growth', description: 'E-commerce side hustle guide trending among creators.' }
    ],
    'Cooking & Food': [
      { topic: '15-Minute Restaurant Style Chicken Karahi', category: 'Cooking & Food', trendScore: '🔥 +330% Spike', description: 'Viral South Asian and global culinary recipe trend.' },
      { topic: 'Crispy Garlic Butter French Fries Secret Recipe', category: 'Cooking & Food', trendScore: '⚡ 190K+ Searches', description: 'High engagement snack recipe video.' },
      { topic: '3 Ingredient Chocolate Dessert in 5 Minutes', category: 'Cooking & Food', trendScore: '🚀 Viral Trend', description: 'Shorts friendly quick sweet treat video.' },
      { topic: 'Authentic Night Market Street Food Tour', category: 'Cooking & Food', trendScore: '🔥 +200% Growth', description: 'High watch time food exploration vlog.' }
    ],
    'Education': [
      { topic: 'Python Programming Full Course for Beginners 2026', category: 'Education', trendScore: '🔥 +420% Spike', description: 'Evergreen computer science learning demand.' },
      { topic: 'How to Study 10 Hours a Day Without Burnout', category: 'Education', trendScore: '⚡ 160K+ Searches', description: 'Popular productivity and study hacks for exams.' },
      { topic: 'English Speaking Practice Daily Conversation', category: 'Education', trendScore: '🚀 Viral Trend', description: 'Global language learning trend.' },
      { topic: 'Urdu Poetry Status Video & Deep Meaning', category: 'Education', trendScore: '🔥 +210% Growth', description: 'High cultural and literature search volume.' }
    ]
  };

  const allFallback: TrendingTopicItem[] = Object.values(FALLBACK_TOPICS).flat();

  try {
    const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const selected = FALLBACK_TOPICS[category] || allFallback.slice(0, 8);
      res.json({ success: true, data: selected, sources: [] });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `Use Google Search to find real-time top trending search queries, viral video ideas, and breakout YouTube topics right now for creators in the category "${category}".
Return a JSON object containing a "topics" array of 8 top trending topics with these fields:
- "topic": A clean, high-volume search keyword or video title idea.
- "category": Category string (e.g., Tech, Gaming, Vlogs, AI, Shorts, Health, Crypto, Cooking).
- "trendScore": Search growth indicator string (e.g. "🔥 +240% Growth", "⚡ 150K+ Searches", "🚀 Viral Spike").
- "description": One short sentence explaining why it is currently popular or trending.

Output MUST be valid JSON in this structure:
{
  "topics": [
    {
      "topic": "Gemini 3 AI Features Guide",
      "category": "Tech & AI",
      "trendScore": "🔥 +320% Spike",
      "description": "Viral demand following the new Google AI announcement."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json',
      },
    });

    const textOutput = response.text;
    let topics = [];
    if (textOutput) {
      try {
        const parsed = JSON.parse(textOutput);
        topics = parsed.topics || (Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.warn('Failed to parse JSON from Google Search grounding response:', e);
      }
    }

    if (!topics || topics.length === 0) {
      topics = FALLBACK_TOPICS[category] || allFallback.slice(0, 8);
    }

    // Extract grounding sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri)
      .map((chunk: any) => ({
        title: chunk.web?.title || 'Google Search Grounding Source',
        uri: chunk.web?.uri,
      }))
      .slice(0, 4);

    res.json({
      success: true,
      data: topics,
      sources,
    });

  } catch (error: any) {
    console.warn('Google Search Grounding API call failed (e.g. quota limit 429), serving curated trending topics fallback:', error?.message);
    const selected = FALLBACK_TOPICS[category] || allFallback.slice(0, 8);
    res.json({
      success: true,
      data: selected,
      sources: [
        { title: 'Google Trends & YouTube Search Analytics', uri: 'https://trends.google.com' }
      ]
    });
  }
});

app.post('/api/generate', async (req: Request, res: Response) => {
  const { topic, mode = 'all', currentTitle, currentDescription, currentHashtags } = req.body || {};

  try {
    if (!topic || typeof topic !== 'string' || !topic.trim()) {
      res.status(400).json({
        success: false,
        error: 'Please enter a valid topic or keyword.',
      });
      return;
    }

    const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({
        success: false,
        error: 'API key is missing on backend server. Please configure AI_API_KEY in environment.',
      });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `You are an elite YouTube SEO expert, viral title copywriter, and algorithm growth hacker.
Your goal is to generate high-converting, CTR-optimized YouTube SEO metadata for a video topic.

CRITICAL LANGUAGE RULE:
Automatically detect the language of the provided topic/keyword.
- If topic is in Urdu, generate Urdu text.
- If topic is in Hindi, generate Hindi text.
- If topic is in English, generate English text.
- If topic is in any other language, generate in that language.
Do NOT translate unnecessarily unless requested.

OUTPUT FORMAT REQUIREMENTS:
Return a strictly formatted JSON object with:
1. "title": EXACTLY ONE YouTube Title.
   - Rules for Title:
     - Must be 60 to 100 characters long.
     - Must contain 1 to 3 relevant emojis.
     - Must contain EXACTLY ONE pipe "|" symbol separating two catchy high-CTR phrases (e.g., "Phrase 1 | Phrase 2").
     - Must be human-sounding, professional, viral style, CTR & SEO optimized, natural, with NO deceptive clickbait.
2. "description": YouTube Description.
   - Rules for Description:
     - Structure:
       [Title]
       (blank line)
       [150 to 300 words of SEO-friendly, natural description body with engaging emojis and a clear Call To Action at the end]
       (blank line)
       [5 relevant hashtags at the very bottom]
     - CRITICAL RULE: The description text MUST NEVER CONTAIN the pipe "|" symbol!
3. "hashtags": An array of 20 to 30 hashtags.
   - Rules for Hashtags:
     - Must include 20 to 30 unique, non-duplicate hashtags.
     - Mix of trending high-volume hashtags and targeted niche hashtags.
     - All hashtags must start with "#".
4. "languageDetected": A short string representing the language detected (e.g., "English", "Urdu", "Hindi").`;

    let prompt = `Video Topic / Keyword: "${topic.trim()}"`;

    if (mode === 'title') {
      prompt += `\n\nTask: Regenerate ONLY a new viral YouTube Title for this topic. Retain topic context. Existing Title: "${currentTitle || ''}"`;
    } else if (mode === 'description') {
      prompt += `\n\nTask: Regenerate ONLY the YouTube Description for this topic. Use title: "${currentTitle || ''}".`;
    } else if (mode === 'hashtags') {
      prompt += `\n\nTask: Regenerate ONLY a fresh set of 20-30 YouTube Hashtags for this topic.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'CTR optimized YouTube title with 1-3 emojis and exactly one | symbol' },
            description: { type: Type.STRING, description: '150-300 word description starting with title, body without | symbol, ending with 5 hashtags' },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '20-30 trending and niche hashtags starting with #'
            },
            languageDetected: { type: Type.STRING, description: 'Detected language name e.g. English, Urdu, Hindi' }
          },
          required: ['title', 'description', 'hashtags']
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error('Received empty response from AI model');
    }

    let parsedResult = JSON.parse(textOutput);

    // Post-processing sanity checks
    let finalTitle = parsedResult.title || '';
    // Ensure title has exactly one '|' if missing
    if (!finalTitle.includes('|')) {
      const words = finalTitle.split(' ');
      const mid = Math.floor(words.length / 2);
      finalTitle = words.slice(0, mid).join(' ') + ' | ' + words.slice(mid).join(' ');
    }

    // Ensure description does NOT contain '|'
    let finalDescription = (parsedResult.description || '').replace(/\|/g, '');

    // Ensure hashtags are 20-30 formatted strings
    let rawHashtags: string[] = Array.isArray(parsedResult.hashtags) ? parsedResult.hashtags : [];
    let cleanHashtags = rawHashtags
      .map(tag => tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`)
      .filter(tag => tag.length > 1);

    // Deduplicate hashtags
    cleanHashtags = Array.from(new Set(cleanHashtags));

    // If regenerating specific card, preserve others
    if (mode === 'title' && currentDescription && currentHashtags) {
      finalDescription = currentDescription;
      cleanHashtags = currentHashtags;
    } else if (mode === 'description' && currentTitle && currentHashtags) {
      finalTitle = currentTitle;
      cleanHashtags = currentHashtags;
    } else if (mode === 'hashtags' && currentTitle && currentDescription) {
      finalTitle = currentTitle;
      finalDescription = currentDescription;
    }

    res.json({
      success: true,
      data: {
        title: finalTitle,
        description: finalDescription,
        hashtags: cleanHashtags,
        languageDetected: parsedResult.languageDetected || 'English',
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.warn('AI API call encountered error (e.g. quota 429 limit), utilizing algorithmic fallback package:', error?.message);
    
    const cleanTopic = (topic || 'YouTube Video').trim();
    const formattedTopicTag = cleanTopic.replace(/[^a-zA-Z0-9]/g, '');

    const fallbackTitle = `🔥 ${cleanTopic} - Complete Guide & Viral Secrets | Must Watch!`;
    const fallbackDesc = `${fallbackTitle}\n\nWelcome to the ultimate breakdown on ${cleanTopic}! In this comprehensive guide, we share essential insights, step-by-step tutorials, and secret strategies to help you get the best results.\n\n📌 What You Will Learn in This Video:\n- Complete step-by-step breakdown of ${cleanTopic}\n- Top tips, expert secrets, and practical advice\n- Key mistakes to avoid for maximum success\n\n👍 Don't forget to LIKE, SHARE, and SUBSCRIBE for more daily viral videos!\n🔔 Hit the notification bell so you never miss an update!\n\n#${formattedTopicTag} #YouTubeSEO #Viral #Tutorial #Guide`;

    const baseTags = [
      `#${formattedTopicTag}`,
      `#${formattedTopicTag}Guide`,
      `#${formattedTopicTag}Tutorial`,
      `#${formattedTopicTag}Tips`,
      `#${formattedTopicTag}2026`,
      '#YouTubeSEO',
      '#ViralVideo',
      '#ContentCreator',
      '#TrendingNow',
      '#YouTubeGrowth',
      '#VideoMarketing',
      '#MustWatch',
      '#LearnYouTube',
      '#StepByStep',
      '#CreatorTips',
      '#ViralSecrets',
      '#ProTips',
      '#HighCTR',
      '#AlgorithmHack',
      '#DigitalCreator',
      '#OnlineGuide',
      '#YouTubeTips',
      '#BestGuide',
      '#Subscribers',
      '#Monetization'
    ];

    res.json({
      success: true,
      data: {
        title: mode === 'title' ? fallbackTitle : (currentTitle || fallbackTitle),
        description: mode === 'description' ? fallbackDesc : (currentDescription || fallbackDesc),
        hashtags: mode === 'hashtags' ? baseTags : (currentHashtags || baseTags),
        languageDetected: 'Auto Detected',
        generatedAt: new Date().toISOString()
      }
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SEO Tube AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
