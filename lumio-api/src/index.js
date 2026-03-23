require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const allowedOrigin = process.env.ALLOWED_ORIGIN;
app.use(cors({
  origin: allowedOrigin ? allowedOrigin : '*'
}));

// Body parser
app.use(express.json({ limit: '10mb' }));

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_key_for_build'
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'lumio-api',
    timestamp: new Date().toISOString()
  });
});

// Main endpoint
app.post('/api/classify', async (req, res) => {
  try {
    const { image, prompt } = req.body;

    if (!image) return res.status(400).json({ error: 'image required' });
    if (!prompt) return res.status(400).json({ error: 'prompt required' });

    if (image.length > 5 * 1024 * 1024) {
      return res.status(413).json({ error: 'image too large' });
    }

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/jpeg',
              data: image
            }
          },
          {
            type: 'text',
            text: prompt
          }
        ]
      }]
    });

    const text = response.content[0].text;
    res.json({
      result: text,
      model: response.model,
      usage: response.usage
    });

  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error('Anthropic Error:', error);
      return res.status(502).json({ error: 'AI service error', detail: error.message });
    }
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'internal server error' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Lumio API running on port ${PORT}`));
