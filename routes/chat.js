const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// Initialize Google AI
const genAI = process.env.GOOGLE_AI_API_KEY
  ? new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY)
  : null;

// Generate AI response with fallback to simple responses
async function generateResponse(message, history = []) {
  // If API key is configured, use Google AI
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Start chat with history if provided
      const chat = model.startChat({
        history: history.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'model',
          parts: msg.content
        }))
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Google AI Error:', error.message);
      // Fall back to simple responses on error
    }
  }

  // Simple fallback responses without AI API
  const msg = message.toLowerCase();

  // Greeting
  if (msg.includes('привет') || msg.includes('hello') || msg.includes('hi') || msg.includes('здравств')) {
    return 'Привет! 👋 Я AI помощник. Могу помочь вам с управлением задачами, ответить на вопросы или просто поболтать. Чем могу помочь?';
  }

  // Task-related queries
  if (msg.includes('задач') || msg.includes('task')) {
    return 'Я вижу, у вас есть задачи в приложении! 📝 Вы можете добавлять новые задачи, устанавливать дедлайны, добавлять комментарии и категории. Нужна помощь с организацией?';
  }

  // Help
  if (msg.includes('помощ') || msg.includes('help') || msg.includes('что умеешь')) {
    return 'Я могу помочь вам:\n\n• 💬 Отвечать на вопросы\n• 📝 Подсказывать по управлению задачами\n• 💡 Давать советы по продуктивности\n• 🎯 Помогать с планированием\n\nЗадайте любой вопрос!';
  }

  // Time/date
  if (msg.includes('врем') || msg.includes('дата') || msg.includes('сейчас')) {
    const now = new Date();
    return `Сейчас ${now.toLocaleDateString('ru-RU')} ${now.toLocaleTimeString('ru-RU')}. 🕐`;
  }

  // Thanks
  if (msg.includes('спасибо') || msg.includes('благодар') || msg.includes('thanks')) {
    return 'Пожалуйста! 😊 Рад помочь! Если что - обращайтесь!';
  }

  // Bye
  if (msg.includes('пока') || msg.includes('до свидан') || msg.includes('bye')) {
    return 'До свидания! 👋 Удачи с задачами!';
  }

  // Default responses
  const defaultResponses = [
    'Интересный вопрос! 🤔 Расскажите подробнее?',
    'Понял! Могу помочь вам чем-то конкретным?',
    'Отлично! Что ещё планируете сделать сегодня?',
    'Хорошо! Продолжайте в том же духе! 💪',
    'Записал! Нужна помощь с организацией задач?'
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Generate response (with AI if available, or fallback)
    const response = await generateResponse(message, history || []);

    res.json({
      response: response,
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
