const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google AI
const genAI = process.env.GOOGLE_AI_API_KEY
  ? new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY)
  : null;

// Helper function to convert file to base64
const fileToBase64 = (file) => {
  return file.buffer.toString('base64');
};

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if API key is configured
    if (!genAI) {
      return res.status(500).json({
        error: 'AI service not configured',
        message: 'Please set GOOGLE_AI_API_KEY in environment variables'
      });
    }

    // Get the model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Prepare chat history
    const chatHistory = history && Array.isArray(history)
      ? history.map((msg, index) => {
          const role = msg.type === 'user' ? 'user' : 'model';
          return {
            role: role,
            parts: [{ text: msg.content }]
          };
        })
      : [];

    // Start a chat
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    // Send message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({
      response: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      details: error.message
    });
  }
});

// Chat with file analysis endpoint
router.post('/analyze', async (req, res) => {
  try {
    const { message, fileData, mimeType, fileName } = req.body;

    if (!fileData || !mimeType) {
      return res.status(400).json({ error: 'File data and mime type are required' });
    }

    // Check if API key is configured
    if (!genAI) {
      return res.status(500).json({
        error: 'AI service not configured',
        message: 'Please set GOOGLE_AI_API_KEY in environment variables'
      });
    }

    // For images, use gemini-pro-vision
    if (mimeType.startsWith('image/')) {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

      const imagePart = {
        inlineData: {
          data: fileData,
          mimeType: mimeType
        }
      };

      const prompt = message || 'Analyze this image and describe what you see.';

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      res.json({
        response: text,
        timestamp: new Date().toISOString()
      });

    } else {
      // For other files (PDF, audio), use text-based model
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = message ||
        `I have uploaded a file named "${fileName}" with type ${mimeType}. ` +
        `Unfortunately, I cannot directly process ${mimeType} files yet. ` +
        `However, I can help you with general questions about the file or guide you on how to extract text from it.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      res.json({
        response: text,
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    console.error('Chat analyze API error:', error);
    res.status(500).json({
      error: 'Failed to analyze file',
      details: error.message
    });
  }
});

module.exports = router;
