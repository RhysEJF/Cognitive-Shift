import express from 'express';
import cors from 'cors';
import PocketBase from 'pocketbase';

const app = express();
const port = process.env.PORT || 3000;

// Connect to PocketBase (anonymous access)
const pb = new PocketBase('https://pocketbase-production-3085.up.railway.app');

// Middleware
app.use(cors({
  origin: ['https://thecognitiveshift.com', 'https://cognitive-shift.pages.dev', 'http://localhost:4321'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Rate limiting store
const rateLimitStore = new Map();
const RATE_LIMIT = 10; // 10 likes per day
const RATE_WINDOW = 24 * 60 * 60 * 1000; // 24 hours

function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0] ||
         req.headers['x-real-ip'] ||
         req.connection.remoteAddress ||
         'unknown';
}

function checkRateLimit(userFingerprint) {
  const now = Date.now();
  const userLimits = rateLimitStore.get(userFingerprint) || { count: 0, resetTime: now + RATE_WINDOW };

  if (now > userLimits.resetTime) {
    userLimits.count = 0;
    userLimits.resetTime = now + RATE_WINDOW;
  }

  if (userLimits.count >= RATE_LIMIT) {
    return false;
  }

  userLimits.count++;
  rateLimitStore.set(userFingerprint, userLimits);
  return true;
}

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Cognitive Shift Likes API',
    timestamp: new Date().toISOString()
  });
});

// GET likes count
app.get('/api/likes', async (req, res) => {
  try {
    const { articleSlug } = req.query;

    if (!articleSlug) {
      return res.status(400).json({ error: 'Article slug is required' });
    }

    const records = await pb.collection('article_likes').getFullList({
      filter: `article_slug="${articleSlug}"`
    });

    res.json({
      likes: records.length,
      articleSlug
    });
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ error: 'Failed to fetch likes' });
  }
});

// POST new like
app.post('/api/likes', async (req, res) => {
  try {
    const { articleSlug } = req.body;

    if (!articleSlug) {
      return res.status(400).json({ error: 'Article slug is required' });
    }

    const clientIP = getClientIP(req);
    const userAgent = req.headers['user-agent'] || 'unknown';
    const userFingerprint = `${clientIP}-${userAgent.substring(0, 50)}`;

    // Check if already liked
    try {
      const existingLike = await pb.collection('article_likes').getFirstListItem(
        `article_slug="${articleSlug}" && user_fingerprint="${userFingerprint}"`
      );

      if (existingLike) {
        return res.status(409).json({ error: 'Already liked this article' });
      }
    } catch (error) {
      // No existing like found, continue
    }

    // Check rate limit
    if (!checkRateLimit(userFingerprint)) {
      return res.status(429).json({ error: 'Daily like limit reached (10 per day)' });
    }

    // Create new like
    await pb.collection('article_likes').create({
      article_slug: articleSlug,
      user_fingerprint: userFingerprint,
      liked_at: new Date().toISOString()
    });

    // Get updated count
    const allLikes = await pb.collection('article_likes').getFullList({
      filter: `article_slug="${articleSlug}"`
    });

    res.json({
      likes: allLikes.length,
      success: true,
      articleSlug
    });

  } catch (error) {
    console.error('Error creating like:', error);
    res.status(500).json({ error: 'Failed to create like' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Cognitive Shift API running on port ${port}`);
  console.log(`🔗 Connected to PocketBase: https://pocketbase-production-3085.up.railway.app`);
  console.log(`🔓 Using anonymous access to article_likes collection`);
});