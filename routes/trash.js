const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  getDeletedTasks,
  restoreTask,
  permanentDeleteTask,
  emptyTrash
} = require('../database');

const router = express.Router();

// ==================== ROUTES ====================

/**
 * GET /api/trash
 * Получить все удаленные задачи текущего пользователя
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await getDeletedTasks(req.user.id);

    console.log(`GET /api/trash - Found ${tasks.length} deleted tasks for user ${req.user.id}`);

    // Форматируем задачи
    const formattedTasks = tasks.map(task => ({
      ...task,
      completed: task.completed === true || task.completed === 1
    }));

    res.json({ tasks: formattedTasks });
  } catch (error) {
    console.error('Get deleted tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch deleted tasks' });
  }
});

/**
 * POST /api/trash/:id/restore
 * Восстановить задачу из корзины
 */
router.post('/:id/restore', authenticateToken, async (req, res) => {
  try {
    const deletedTaskId = parseInt(req.params.id);

    if (isNaN(deletedTaskId)) {
      return res.status(400).json({ error: 'Invalid deleted task ID' });
    }

    console.log(`POST /api/trash/${deletedTaskId}/restore - Restoring task for user ${req.user.id}`);

    const restoredTaskId = await restoreTask(deletedTaskId, req.user.id);

    if (!restoredTaskId) {
      return res.status(404).json({ error: 'Deleted task not found' });
    }

    console.log(`Task restored successfully with new ID: ${restoredTaskId}`);

    res.json({
      message: 'Task restored successfully',
      taskId: restoredTaskId
    });
  } catch (error) {
    console.error('Restore task error:', error);
    res.status(500).json({ error: 'Failed to restore task' });
  }
});

/**
 * DELETE /api/trash/:id
 * Окончательно удалить задачу из корзины
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedTaskId = parseInt(req.params.id);

    if (isNaN(deletedTaskId)) {
      return res.status(400).json({ error: 'Invalid deleted task ID' });
    }

    console.log(`DELETE /api/trash/${deletedTaskId} - Permanently deleting task for user ${req.user.id}`);

    const deleted = await permanentDeleteTask(deletedTaskId, req.user.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Deleted task not found' });
    }

    res.json({ message: 'Task permanently deleted' });
  } catch (error) {
    console.error('Permanent delete error:', error);
    res.status(500).json({ error: 'Failed to permanently delete task' });
  }
});

/**
 * DELETE /api/trash
 * Очистить всю корзину
 */
router.delete('/', authenticateToken, async (req, res) => {
  try {
    const deletedCount = await emptyTrash(req.user.id);

    console.log(`DELETE /api/trash - Emptied trash for user ${req.user.id}, deleted ${deletedCount} items`);

    res.json({
      message: 'Trash emptied successfully',
      deletedCount
    });
  } catch (error) {
    console.error('Empty trash error:', error);
    res.status(500).json({ error: 'Failed to empty trash' });
  }
});

module.exports = router;
