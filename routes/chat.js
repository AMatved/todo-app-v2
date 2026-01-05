const express = require('express');
const axios = require('axios');
const router = express.Router();

// Dify API configuration
const DIFY_API_KEY = process.env.DIFY_API_KEY || 'app-5zy9aBBpXmSpw2Flz02CeDG3';
const DIFY_API_URL = 'https://api.dify.ai/v1/chat-messages';

// Store conversation IDs per user session (in production, use Redis or database)
const userConversations = new Map();

// Generate AI response using Dify API
async function generateResponse(message, conversationId = '', userId = 'default-user') {
  try {
    const response = await axios.post(DIFY_API_URL, {
      inputs: {},
      query: message,
      response_mode: 'blocking', // Use blocking for simpler implementation
      conversation_id: conversationId,
      user: userId,
      files: []
    }, {
      headers: {
        'Authorization': `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Return the response with conversation_id for continuity
    return {
      answer: response.data.answer,
      conversationId: response.data.conversation_id,
      messageId: response.data.message_id,
      createdAt: response.data.created_at
    };
  } catch (error) {
    console.error('Dify API Error:', error.response?.data || error.message);
    throw error;
  }
}

// Simple fallback responses without AI API
function getFallbackResponse(message) {
  const msg = message.toLowerCase();

  // Greeting
  if (msg.includes('привет') || msg.includes('hello') || msg.includes('hi') || msg.includes('здравств')) {
    return 'Hello! 👋 I am an AI assistant. I can help you with task management, answer questions, or just chat. How can I help you?';
  }

  // Task-related queries
  if (msg.includes('задач') || msg.includes('task')) {
    return 'I see you have tasks in the app! 📝 You can add new tasks, set deadlines, add comments, and organize them with categories. Need help with organization?';
  }

  // Help
  if (msg.includes('помощ') || msg.includes('help') || msg.includes('что умеешь')) {
    return 'I can help you with:\n\n• 💬 Answer questions\n• 📝 Task management tips\n• 💡 Productivity advice\n• 🎯 Planning assistance\n\nFeel free to ask any question!';
  }

  // Time/date
  if (msg.includes('врем') || msg.includes('дата') || msg.includes('сейчас')) {
    const now = new Date();
    return `Current time is ${now.toLocaleDateString('en-US')} ${now.toLocaleTimeString('en-US')}. 🕐`;
  }

  // Thanks
  if (msg.includes('спасибо') || msg.includes('благодар') || msg.includes('thanks')) {
    return 'You\'re welcome! 😊 Happy to help! Let me know if you need anything else!';
  }

  // Bye
  if (msg.includes('пока') || msg.includes('до свидан') || msg.includes('bye')) {
    return 'Goodbye! 👋 Good luck with your tasks!';
  }

  // Default responses
  const defaultResponses = [
    'Interesting question! 🤔 Can you tell me more?',
    'Got it! Can I help you with something specific?',
    'Great! What else are you planning to do today?',
    'Sounds good! Keep it up! 💪',
    'Noted! Need help organizing your tasks?'
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { message, conversationId, userId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const user = userId || 'default-user';

    // Try to use Dify API
    try {
      const result = await generateResponse(message, conversationId || '', user);

      res.json({
        response: result.answer,
        conversationId: result.conversationId,
        messageId: result.messageId,
        timestamp: new Date().toISOString()
      });
    } catch (apiError) {
      // Fallback to simple responses if API fails
      console.warn('Falling back to simple responses due to API error');
      const fallbackResponse = getFallbackResponse(message);

      res.json({
        response: fallbackResponse,
        conversationId: conversationId || '',
        timestamp: new Date().toISOString()
      });
    }

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
    const { message, fileData, mimeType, fileName, conversationId, userId } = req.body;

    if (!fileData || !mimeType) {
      return res.status(400).json({ error: 'File data and mime type are required' });
    }

    const user = userId || 'default-user';

    // Try to use Dify API with file support
    try {
      const files = [];

      // For images, prepare the file data for Dify
      if (mimeType.startsWith('image/')) {
        files.push({
          type: 'image',
          transfer_method: 'remote_url',
          url: fileData // Assuming fileData is URL, otherwise you need to upload first
        });
      }

      const response = await axios.post(DIFY_API_URL, {
        inputs: {},
        query: message || 'Analyze this file and describe what you see.',
        response_mode: 'blocking',
        conversation_id: conversationId || '',
        user: user,
        files: files
      }, {
        headers: {
          'Authorization': `Bearer ${DIFY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      res.json({
        response: response.data.answer,
        conversationId: response.data.conversation_id,
        messageId: response.data.message_id,
        timestamp: new Date().toISOString()
      });

    } catch (apiError) {
      // Fallback response for file analysis
      console.warn('Falling back to simple response for file analysis');
      const fallbackResponse = message ||
        `I have uploaded a file named "${fileName}" with type ${mimeType}. ` +
        `I can help you with general questions about the file. What would you like to know?`;

      res.json({
        response: fallbackResponse,
        conversationId: conversationId || '',
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
