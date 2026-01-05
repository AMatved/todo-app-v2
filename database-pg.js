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
        category VARCHAR(20) DEFAULT NULL,
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

    // Migration: add category column if it doesn't exist
    try {
      await client.query(`
        ALTER TABLE tasks
        ADD COLUMN IF NOT EXISTS category VARCHAR(20) DEFAULT NULL
      `);
      console.log('✅ Category column added to tasks table');
    } catch (err) {
      // Column might already exist, ignore error
      if (!err.message.includes('already exists')) {
        console.error('Error adding category column:', err.message);
      }
    }

    // Migration: add due_date column if it doesn't exist
    try {
      await client.query(`
        ALTER TABLE tasks
        ADD COLUMN IF NOT EXISTS due_date DATE DEFAULT NULL
      `);
      console.log('✅ Due date column added to tasks table');
    } catch (err) {
      // Column might already exist, ignore error
      if (!err.message.includes('already exists')) {
        console.error('Error adding due_date column:', err.message);
      }
    }

    // Create deleted_tasks table (trash)
    await client.query(`
      CREATE TABLE IF NOT EXISTS deleted_tasks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        original_task_id INTEGER NOT NULL,
        text TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL,
        deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '15 days')
      )
    `);
    console.log('✅ Deleted tasks table ready');

    // Create index for deleted_tasks
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_deleted_tasks_user_id
      ON deleted_tasks(user_id)
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_deleted_tasks_expires_at
      ON deleted_tasks(expires_at)
    `);
    console.log('✅ Deleted tasks indexes created');

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
    `SELECT id, text, completed, category, created_at, updated_at, due_date
     FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

const createTask = async (userId, text, category = null, dueDate = null) => {
  const result = await pool.query(
    'INSERT INTO tasks (user_id, text, category, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, text, category, dueDate]
  );
  return result.rows[0];
};

const updateTask = async (taskId, userId, updates) => {
  const { text, completed, category, dueDate } = updates;

  console.log('database-pg.js updateTask called with:', { taskId, userId, text, completed, category });

  const fields = [];
  const values = [];
  let paramCount = 1;

  if (text !== undefined) {
    fields.push(`text = $${paramCount++}`);
    values.push(text);
  }
  if (completed !== undefined) {
    fields.push(`completed = $${paramCount++}`);
    values.push(completed);
  }
  if (category !== undefined) {
    fields.push(`category = $${paramCount++}`);
    values.push(category);
  }
  if (dueDate !== undefined) {
    fields.push(`due_date = $${paramCount++}`);
    values.push(dueDate);
  }

  fields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(taskId, userId);

  const result = await pool.query(
    `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${paramCount++} AND user_id = $${paramCount++}`,
    values
  );

  console.log('database-pg.js updateTask result rowCount:', result.rowCount);

  return result.rowCount > 0;
};

const deleteTask = async (taskId, userId) => {
  // First, get the task details to save in deleted_tasks
  const taskResult = await pool.query(
    'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
    [taskId, userId]
  );

  if (taskResult.rows.length === 0) {
    return false;
  }

  const task = taskResult.rows[0];

  // Save to deleted_tasks before actual deletion
  await pool.query(
    `INSERT INTO deleted_tasks (user_id, original_task_id, text, completed, created_at)
     VALUES ($1, $2, $3, $4, $5)`,
    [userId, taskId, task.text, task.completed, task.created_at]
  );

  // Now delete the task
  const result = await pool.query(
    'DELETE FROM tasks WHERE id = $1 AND user_id = $2',
    [taskId, userId]
  );
  return result.rowCount > 0;
};

const deleteAllCompletedTasks = async (userId) => {
  // First, get all completed tasks
  const tasksResult = await pool.query(
    'SELECT * FROM tasks WHERE user_id = $1 AND completed = true',
    [userId]
  );

  // Save all to deleted_tasks
  for (const task of tasksResult.rows) {
    await pool.query(
      `INSERT INTO deleted_tasks (user_id, original_task_id, text, completed, created_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, task.id, task.text, task.completed, task.created_at]
    );
  }

  // Now delete all completed tasks
  const result = await pool.query(
    'DELETE FROM tasks WHERE user_id = $1 AND completed = true',
    [userId]
  );
  return result.rowCount;
};

// ==================== TRASH METHODS ====================

const getDeletedTasks = async (userId) => {
  const result = await pool.query(
    `SELECT id, original_task_id, text, completed, created_at, deleted_at, expires_at
     FROM deleted_tasks
     WHERE user_id = $1 AND expires_at > CURRENT_TIMESTAMP
     ORDER BY deleted_at DESC`,
    [userId]
  );
  return result.rows;
};

const restoreTask = async (deletedTaskId, userId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Get the deleted task
    const deletedResult = await client.query(
      'SELECT * FROM deleted_tasks WHERE id = $1 AND user_id = $2',
      [deletedTaskId, userId]
    );

    if (deletedResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return false;
    }

    const deletedTask = deletedResult.rows[0];

    // Restore to tasks table
    const restoreResult = await client.query(
      `INSERT INTO tasks (user_id, text, completed, created_at)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [userId, deletedTask.text, deletedTask.completed, deletedTask.created_at]
    );

    // Delete from deleted_tasks
    await client.query(
      'DELETE FROM deleted_tasks WHERE id = $1',
      [deletedTaskId]
    );

    await client.query('COMMIT');
    return restoreResult.rows[0].id;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const permanentDeleteTask = async (deletedTaskId, userId) => {
  const result = await pool.query(
    'DELETE FROM deleted_tasks WHERE id = $1 AND user_id = $2',
    [deletedTaskId, userId]
  );
  return result.rowCount > 0;
};

const emptyTrash = async (userId) => {
  const result = await pool.query(
    'DELETE FROM deleted_tasks WHERE user_id = $1',
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
  deleteAllCompletedTasks,
  getDeletedTasks,
  restoreTask,
  permanentDeleteTask,
  emptyTrash
};

// Auto-initialize database on module load (only in production)
if (process.env.DATABASE_URL) {
  initializeDatabase().catch(err => {
    console.error('Failed to initialize PostgreSQL database:', err);
  });
}
