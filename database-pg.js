const { Pool } = require('pg');

// PostgreSQL connection from Railway environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

// Initialize database tables
async function initializeDatabase() {
  const client = await pool.connect();
  try {
    console.log('✅ Connected to PostgreSQL database');

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      )
    `);
    console.log('✅ Users table ready');

    // Create tasks table
    await client.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tasks table ready');

    // Create index
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_tasks_user_id
      ON tasks(user_id)
    `);
    console.log('✅ Index created');

  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    client.release();
  }
}

// ==================== USER METHODS ====================

const findUserByUsername = async (username) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, username, created_at, last_login FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

const createUser = async (username, passwordHash, salt) => {
  const result = await pool.query(
    'INSERT INTO users (username, password_hash, salt) VALUES ($1, $2, $3) RETURNING id, username',
    [username, passwordHash, salt]
  );
  return result.rows[0];
};

const updateLastLogin = async (userId) => {
  await pool.query(
    'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
    [userId]
  );
};

// ==================== TASK METHODS ====================

const getUserTasks = async (userId) => {
  const result = await pool.query(
    `SELECT id, text, completed, created_at, updated_at
     FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

const createTask = async (userId, text) => {
  const result = await pool.query(
    'INSERT INTO tasks (user_id, text) VALUES ($1, $2) RETURNING *',
    [userId, text]
  );
  return result.rows[0];
};

const updateTask = async (taskId, userId, updates) => {
  const { text, completed } = updates;

  console.log('database-pg.js updateTask called with:', { taskId, userId, text, completed });

  const result = await pool.query(
    `UPDATE tasks
     SET text = $1, completed = $2, updated_at = CURRENT_TIMESTAMP
     WHERE id = $3 AND user_id = $4`,
    [text, completed, taskId, userId]
  );

  console.log('database-pg.js updateTask result rowCount:', result.rowCount);

  return result.rowCount > 0;
};

const deleteTask = async (taskId, userId) => {
  const result = await pool.query(
    'DELETE FROM tasks WHERE id = $1 AND user_id = $2',
    [taskId, userId]
  );
  return result.rowCount > 0;
};

const deleteAllCompletedTasks = async (userId) => {
  const result = await pool.query(
    'DELETE FROM tasks WHERE user_id = $1 AND completed = true',
    [userId]
  );
  return result.rowCount;
};

module.exports = {
  pool,
  initializeDatabase,
  findUserByUsername,
  findUserById,
  createUser,
  updateLastLogin,
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
  deleteAllCompletedTasks
};

// Auto-initialize database on module load (only in production)
if (process.env.DATABASE_URL) {
  initializeDatabase().catch(err => {
    console.error('Failed to initialize PostgreSQL database:', err);
  });
}
