const express = require('express');
const bcrypt = require('bcryptjs');
const {
  findUserByUsername,
  createUser,
  updateLastLogin
} = require('../database');
const { generateToken } = require('../middleware/auth');

const router = express.Router();

// ==================== VALIDATION ====================

// Валидация username
const validateUsername = (username) => {
  if (!username || username.length < 3) {
    return 'Username must be at least 3 characters';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers and underscores';
  }
  if (username.length > 30) {
    return 'Username must be less than 30 characters';
  }
  return null;
};

// Валидация password
const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (password.length > 100) {
    return 'Password must be less than 100 characters';
  }
  return null;
};

// ==================== ROUTES ====================

/**
 * POST /api/auth/register
 * Регистрация нового пользователя
 * Пароль хэшируется с bcrypt (cost factor: 12)
 */
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Валидация
    const usernameError = validateUsername(username);
    if (usernameError) {
      return res.status(400).json({ error: usernameError });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ error: passwordError });
    }

    // Проверяем, существует ли пользователь
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // === БЕЗОПАСНОСТЬ: ХЭШИРОВАНИЕ ПАРОЛЯ ===
    // bcrypt генерирует соль автоматически и включаем её в хэш
    // cost factor 12 = 2^12 итераций (4096) - хороший баланс безопасности и скорости
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Создаем пользователя
    const newUser = await createUser(username, passwordHash, 'included-in-hash');

    // Генерируем JWT токен
    const token = generateToken(newUser.id);

    // Устанавливаем cookie с токеном (httpOnly для защиты от XSS)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS в продакшене
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 дней
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

/**
 * POST /api/auth/login
 * Вход пользователя
 * Пароль сравнивается с хэшированной версией через bcrypt
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Валидация
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Находим пользователя
    const user = await findUserByUsername(username);
    if (!user) {
      // Не раскрываем, существует ли пользователь (защита от энумерации)
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // === БЕЗОПАСНОСТЬ: СРАВНЕНИЕ ПАРОЛЕЙ ===
    // bcrypt.compare() безопасно сравнивает пароль с хэшем
    // timing-attack безопасный (constant-time comparison)
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Обновляем время последнего входа
    await updateLastLogin(user.id);

    // Генерируем JWT токен
    const token = generateToken(user.id);

    // Устанавливаем cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

/**
 * POST /api/auth/logout
 * Выход пользователя (удаление cookie)
 */
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

/**
 * GET /api/auth/me
 * Получить информацию о текущем пользователе
 */
router.get('/me', require('../middleware/auth').authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      username: req.user.username,
      created_at: req.user.created_at,
      last_login: req.user.last_login
    }
  });
});

module.exports = router;
