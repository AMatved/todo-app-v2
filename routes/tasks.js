const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
  deleteAllCompletedTasks
} = require('../database');

const router = express.Router();

// ==================== ROUTES ====================

/**
 * GET /api/tasks
 * Получить все задачи текущего пользователя
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await getUserTasks(req.user.id);

    console.log('GET /api/tasks - Raw tasks from DB:', tasks);

    // PostgreSQL возвращает boolean, SQLite - integer (0/1)
    const formattedTasks = tasks.map(task => ({
      ...task,
      completed: task.completed === true || task.completed === 1
    }));

    console.log('GET /api/tasks - Formatted tasks:', formattedTasks);

    res.json({ tasks: formattedTasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

/**
 * POST /api/tasks
 * Создать новую задачу
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('POST /api/tasks - User ID:', req.user.id);
    console.log('POST /api/tasks - Request body:', req.body);

    const { text, category, due_date, due_time } = req.body;

    if (!text || text.trim().length === 0) {
      console.log('POST /api/tasks - Validation failed: empty text');
      return res.status(400).json({ error: 'Task text is required' });
    }

    if (text.length > 500) {
      console.log('POST /api/tasks - Validation failed: text too long');
      return res.status(400).json({ error: 'Task text must be less than 500 characters' });
    }

    if (!due_date) {
      console.log('POST /api/tasks - Validation failed: no due date');
      return res.status(400).json({ error: 'Due date is required. Please select a date from the calendar.' });
    }

    console.log('POST /api/tasks - Creating task...');
    const task = await createTask(req.user.id, text.trim(), category || null, due_date, due_time || null);
    console.log('POST /api/tasks - Task created:', task);

    const response = {
      message: 'Task created successfully',
      task: {
        ...task,
        completed: task.completed === true || task.completed === 1
      }
    };
    console.log('POST /api/tasks - Sending response:', response);

    res.status(201).json(response);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

/**
 * DELETE /api/tasks/completed
 * Удалить все выполненные задачи
 */
router.delete('/completed', authenticateToken, async (req, res) => {
  try {
    const deletedCount = await deleteAllCompletedTasks(req.user.id);

    console.log(`DELETE /api/tasks/completed - Deleted ${deletedCount} completed tasks for user ${req.user.id}`);

    res.json({
      message: 'All completed tasks deleted successfully',
      deletedCount
    });
  } catch (error) {
    console.error('Delete all completed tasks error:', error);
    res.status(500).json({ error: 'Failed to delete completed tasks' });
  }
});

/**
 * PUT /api/tasks/:id
 * Обновить задачу
 */
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { text, completed, category, due_date, due_time, comment } = req.body;

    console.log('PUT /api/tasks/:id - Task ID:', taskId);
    console.log('PUT /api/tasks/:id - Request body:', req.body);

    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    if (text !== undefined && text.trim().length === 0) {
      return res.status(400).json({ error: 'Task text cannot be empty' });
    }

    if (text !== undefined && text.length > 500) {
      return res.status(400).json({ error: 'Task text must be less than 500 characters' });
    }

    const updates = {};
    if (text !== undefined) updates.text = text.trim();
    if (completed !== undefined) updates.completed = completed;
    if (category !== undefined) updates.category = category;
    if (due_date !== undefined) updates.dueDate = due_date;
    if (due_time !== undefined) updates.dueTime = due_time;
    if (comment !== undefined) updates.comment = comment;

    console.log('PUT /api/tasks/:id - Updates to apply:', updates);

    const updated = await updateTask(taskId, req.user.id, updates);

    console.log('PUT /api/tasks/:id - Updated successfully:', updated);

    if (!updated) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

/**
 * DELETE /api/tasks/:id
 * Удалить задачу
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const deleted = await deleteTask(taskId, req.user.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
