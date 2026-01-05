const express = require('express');
const axios = require('axios');
const router = express.Router();

// ==================== API CONFIGURATIONS ====================

// Dify API configuration
const DIFY_API_KEY = process.env.DIFY_API_KEY || 'app-5zy9aBBpXmSpw2Flz02CeDG3';
const DIFY_API_URL = 'https://api.dify.ai/v1/chat-messages';

// Groq API configuration (get free key at https://console.groq.com/)
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Hugging Face API configuration (get free key at https://huggingface.co/settings/tokens)
const HF_API_KEY = process.env.HF_API_KEY || '';
const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';

// Store conversation IDs per user session (in production, use Redis or database)
const userConversations = new Map();

// ==================== DIFY API ====================

async function callDifyAPI(message, conversationId = '', userId = 'default-user') {
  if (!DIFY_API_KEY || DIFY_API_KEY === 'your-dify-api-key') {
    throw new Error('Dify API key not configured');
  }

  const response = await axios.post(DIFY_API_URL, {
    inputs: {},
    query: message,
    response_mode: 'blocking',
    conversation_id: conversationId,
    user: userId,
    files: []
  }, {
    headers: {
      'Authorization': `Bearer ${DIFY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    timeout: 30000
  });

  return {
    answer: response.data.answer,
    conversationId: response.data.conversation_id,
    messageId: response.data.message_id,
    createdAt: response.data.created_at
  };
}

// ==================== GROQ API ====================

async function callGroqAPI(message, conversationHistory = []) {
  if (!GROQ_API_KEY || GROQ_API_KEY === 'your-groq-api-key') {
    throw new Error('Groq API key not configured');
  }

  // Build messages array with conversation history
  const messages = [
    {
      role: 'system',
      content: 'You are a helpful AI assistant for a todo application. You help users with task management, answer questions, and provide productivity tips. Be friendly and concise. Answer in the same language the user uses (Russian, English, etc.).'
    }
  ];

  // Add conversation history
  conversationHistory.forEach(msg => {
    messages.push({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    });
  });

  // Add current message
  messages.push({
    role: 'user',
    content: message
  });

  const response = await axios.post(GROQ_API_URL, {
    model: 'llama-3.3-70b-versatile', // or 'mixtral-8x7b-32768'
    messages: messages,
    temperature: 0.7,
    max_tokens: 1024
  }, {
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    timeout: 30000
  });

  return {
    answer: response.data.choices[0].message.content,
    conversationId: conversationHistory[conversationHistory.length - 1]?.conversationId || '',
    messageId: response.data.id,
    createdAt: Date.now() / 1000
  };
}

// ==================== HUGGING FACE API ====================

async function callHuggingFaceAPI(message, conversationHistory = []) {
  if (!HF_API_KEY || HF_API_KEY === 'your-hf-api-key') {
    throw new Error('Hugging Face API key not configured');
  }

  // Build prompt with conversation history
  let prompt = 'You are a helpful AI assistant for a todo application. Help users with task management.\n\n';

  conversationHistory.forEach(msg => {
    const role = msg.type === 'user' ? 'User' : 'Assistant';
    prompt += `${role}: ${msg.content}\n`;
  });

  prompt += `User: ${message}\nAssistant:`;

  const response = await axios.post(HF_API_URL, {
    inputs: prompt,
    parameters: {
      max_new_tokens: 512,
      temperature: 0.7,
      top_p: 0.95,
      do_sample: true
    }
  }, {
    headers: {
      'Authorization': `Bearer ${HF_API_KEY}`,
      'Content-Type': 'application/json'
    },
    timeout: 30000
  });

  // Extract generated text from response
  let answer = response.data[0]?.generated_text || response.data;

  // Remove the prompt from the answer if it's included
  if (answer.includes('Assistant:')) {
    answer = answer.split('Assistant:').pop().trim();
  }

  return {
    answer: answer,
    conversationId: conversationHistory[conversationHistory.length - 1]?.conversationId || '',
    messageId: Date.now().toString(),
    createdAt: Date.now() / 1000
  };
}

// ==================== MAIN GENERATE RESPONSE ====================

// Generate AI response with fallback chain: Dify -> Groq -> Hugging Face -> Local
async function generateResponse(message, conversationId = '', userId = 'default-user', conversationHistory = []) {
  const errors = [];

  // Try Dify API first
  try {
    console.log('Attempting Dify API...');
    return await callDifyAPI(message, conversationId, userId);
  } catch (error) {
    errors.push(`Dify: ${error.message}`);
    console.warn('Dify API failed:', error.message);
  }

  // Try Groq API as second option
  try {
    console.log('Attempting Groq API...');
    return await callGroqAPI(message, conversationHistory);
  } catch (error) {
    errors.push(`Groq: ${error.message}`);
    console.warn('Groq API failed:', error.message);
  }

  // Try Hugging Face API as third option
  try {
    console.log('Attempting Hugging Face API...');
    return await callHuggingFaceAPI(message, conversationHistory);
  } catch (error) {
    errors.push(`HF: ${error.message}`);
    console.warn('Hugging Face API failed:', error.message);
  }

  // All APIs failed, log all errors
  console.error('All AI APIs failed:', errors.join(', '));

  // Return null to trigger local fallback
  return null;
}

// ==================== LOCAL FALLBACK RESPONSES ====================

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

// ==================== ROUTES ====================

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { message, conversationId, userId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const user = userId || 'default-user';

    // Try to get AI response from APIs
    const result = await generateResponse(message, conversationId || '', user, req.body.history || []);

    if (result) {
      // Success from one of the APIs
      res.json({
        response: result.answer,
        conversationId: result.conversationId,
        messageId: result.messageId,
        timestamp: new Date().toISOString()
      });
    } else {
      // All APIs failed, use local fallback
      console.warn('Using local fallback responses');
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

    // Try Dify API with file support first
    try {
      const files = [];

      // For images, prepare the file data for Dify
      if (mimeType.startsWith('image/')) {
        files.push({
          type: 'image',
          transfer_method: 'remote_url',
          url: fileData // Assuming fileData is URL
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
        },
        timeout: 30000
      });

      res.json({
        response: response.data.answer,
        conversationId: response.data.conversation_id,
        messageId: response.data.message_id,
        timestamp: new Date().toISOString()
      });

    } catch (apiError) {
      // Fallback response for file analysis
      console.warn('File analysis API failed, using fallback');
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
