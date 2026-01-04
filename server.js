require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;

// ==================== MIDDLEWARE ====================
// Безопасность HTTP заголовков
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      styleSrcElem: ["'self'", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'"]
    }
  }
}));

// CORS - разрешаем запросы только с нашего домена
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting - защита от bruteforce
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 5, // максимум 5 попыток
  message: { error: 'Too many attempts, please try again later' },
  skipSuccessfulRequests: true
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

// ==================== ROUTES ====================

// Database initializes automatically on first require in routes
// PostgreSQL: async init in database-pg.js
// SQLite: sync init in database-sqlite.js

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/tasks', generalLimiter, taskRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Обслуживаем index.html для всех остальных маршрутов
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ==================== HTTPS SERVER ====================
// Попытка запустить HTTPS сервер (только локально)
if (process.env.NODE_ENV !== 'production') {
  try {
    const httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
    };

    https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
      console.log(`\n🔒 HTTPS Server running on https://localhost:${HTTPS_PORT}`);
      console.log(`📝 Certificate: self-signed (browser warning expected)\n`);
    });
  } catch (err) {
    console.log('\n⚠️  HTTPS certificates not found. Running HTTP only.');
    console.log('Run: npm run generate-cert\n');
  }
}

// ==================== HTTP SERVER ====================
app.listen(PORT, () => {
  console.log(`\n🚀 HTTP Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   POST /api/auth/register - Register new user`);
  console.log(`   POST /api/auth/login    - Login user`);
  console.log(`   POST /api/auth/logout   - Logout user`);
  console.log(`   GET  /api/tasks         - Get all tasks`);
  console.log(`   POST /api/tasks        - Create task`);
  console.log(`   PUT  /api/tasks/:id    - Update task`);
  console.log(`   DELETE /api/tasks/:id  - Delete task\n`);
});

module.exports = app;
