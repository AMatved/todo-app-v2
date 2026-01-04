const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Убеждаемся, что папка для базы данных существует
const dbDir = path.join(__dirname, 'data');
if (!fs.existsSync(dbDir)){
  fs.mkdirSync(dbDir);
}

const dbPath = path.join(dbDir, 'todo-app.db');

// Создаем подключение к базе данных
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
    initializeDatabase();
  }
});

// Инициализация базы данных - создаем таблицы
function initializeDatabase() {
  // Таблица пользователей с безопасным хранением паролей
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    )
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('✅ Users table ready');
    }
  });

  // Таблица задач
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      text TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) {
      console.error('Error creating tasks table:', err.message);
    } else {
      console.log('✅ Tasks table ready');
    }
  });

  // Индекс для быстрого поиска задач пользователя
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_tasks_user_id
    ON tasks(user_id)
  `, (err) => {
    if (err) {
      console.error('Error creating index:', err.message);
    }
  });
}

// ==================== USER METHODS ====================

// Найти пользователя по username
const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE username = ?',
      [username],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};

// Найти пользователя по ID
const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT id, username, created_at, last_login FROM users WHERE id = ?',
      [id],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};

// Создать нового пользователя с хэшированным паролем
const createUser = (username, passwordHash, salt) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (username, password_hash, salt) VALUES (?, ?, ?)',
      [username, passwordHash, salt],
      function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, username });
      }
    );
  });
};

// Обновить время последнего входа
const updateLastLogin = (userId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [userId],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

// ==================== TASK METHODS ====================

// Получить все задачи пользователя
const getUserTasks = (userId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT id, text, completed, created_at, updated_at
       FROM tasks WHERE user_id = ? ORDER BY created_at DESC`,
      [userId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

// Создать новую задачу
const createTask = (userId, text) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO tasks (user_id, text) VALUES (?, ?)',
      [userId, text],
      function(err) {
        if (err) reject(err);
        else {
          db.get(
            'SELECT * FROM tasks WHERE id = ?',
            [this.lastID],
            (err, row) => {
              if (err) reject(err);
              else resolve(row);
            }
          );
        }
      }
    );
  });
};

// Обновить задачу
const updateTask = (taskId, userId, updates) => {
  return new Promise((resolve, reject) => {
    const { text, completed } = updates;
    db.run(
      `UPDATE tasks SET text = ?, completed = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ? AND user_id = ?`,
      [text, completed ? 1 : 0, taskId, userId],
      function(err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      }
    );
  });
};

// Удалить задачу
const deleteTask = (taskId, userId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [taskId, userId],
      function(err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      }
    );
  });
};

module.exports = {
  db,
  findUserByUsername,
  findUserById,
  createUser,
  updateLastLogin,
  getUserTasks,
  createTask,
  updateTask,
  deleteTask
};
