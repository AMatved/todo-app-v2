// ==================== КОНФИГУРАЦИЯ ====================
// Используем относительный путь - работает и локально, и на Railway
const API_BASE_URL = '/api';

// ==================== DOM ELEMENTS ====================
const authContainer = document.getElementById("auth-container");
const appContainer = document.getElementById("app-container");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const goToSignup = document.getElementById("go-to-signup");
const goToLogin = document.getElementById("go-to-login");
const guestLogin = document.getElementById("guest-login");
const logoutBtn = document.getElementById("logout-btn");
const currentUserSpan = document.getElementById("current-user");

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");
const emptyState = document.getElementById("empty-state");

// Модальное окно редактирования
const editModal = document.getElementById("edit-modal");
const editInput = document.getElementById("edit-input");
const editSave = document.getElementById("edit-save");
const editCancel = document.getElementById("edit-cancel");

// ==================== ПЕРЕМЕННЫЕ ====================
let currentUser = null;
let authToken = null;
let isGuest = false;
let currentEditTaskId = null;

// ==================== API ФУНКЦИИ ====================

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  if (authToken) {
    defaultOptions.headers.Authorization = `Bearer ${authToken}`;
  }

  console.log('API Request:', url, options.method || 'GET');

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    console.log('API Response:', response.status, data);

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// ==================== AUTH FUNCTIONS ====================

async function login(username, password) {
  try {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    authToken = data.token;
    currentUser = data.user;
    isGuest = false;

    localStorage.setItem('auth-token', authToken);
    localStorage.setItem('current-user', JSON.stringify(currentUser));

    showApp();
    await loadTasks();
    return true;
  } catch (error) {
    showNotification(error.message || 'Ошибка входа', 'error');
    return false;
  }
}

async function signup(username, password) {
  try {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    authToken = data.token;
    currentUser = data.user;
    isGuest = false;

    localStorage.setItem('auth-token', authToken);
    localStorage.setItem('current-user', JSON.stringify(currentUser));

    showApp();
    await loadTasks();
    return true;
  } catch (error) {
    showNotification(error.message || 'Ошибка регистрации', 'error');
    return false;
  }
}

async function logout() {
  try {
    await apiRequest('/auth/logout', { method: 'POST' });
  } catch (error) {
    console.error('Logout error:', error);
  }

  authToken = null;
  currentUser = null;
  isGuest = false;

  localStorage.removeItem('auth-token');
  localStorage.removeItem('current-user');

  listContainer.innerHTML = "";
  updateCounters();
  showAuth();
  clearAuthInputs();
}

function loginAsGuest() {
  currentUser = { username: "Гость" };
  isGuest = true;
  authToken = null;

  localStorage.setItem('current-user', JSON.stringify({ username: "Гость" }));

  showApp();
  listContainer.innerHTML = "";
  updateCounters();
}

// ==================== UI FUNCTIONS ====================

function switchToSignup() {
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
  clearAuthInputs();
}

function switchToLogin() {
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
  clearAuthInputs();
}

function clearAuthInputs() {
  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";
  document.getElementById("signup-username").value = "";
  document.getElementById("signup-password").value = "";
  document.getElementById("signup-confirm").value = "";
}

function showApp() {
  authContainer.style.display = "none";
  appContainer.style.display = "block";
  currentUserSpan.textContent = currentUser.username;
}

function showAuth() {
  authContainer.style.display = "flex";
  appContainer.style.display = "none";
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// ==================== TASK FUNCTIONS ====================

async function loadTasks() {
  if (isGuest) return;

  try {
    const data = await apiRequest('/tasks');
    displayTasks(data.tasks);
  } catch (error) {
    console.error('Failed to load tasks:', error);
    if (error.message.includes('token')) {
      logout();
    }
  }
}

function displayTasks(tasks) {
  listContainer.innerHTML = "";

  if (tasks.length === 0) {
    emptyState.classList.add('visible');
  } else {
    emptyState.classList.remove('visible');

    tasks.forEach(taskData => {
      const li = document.createElement("div");
      li.className = "task-item" + (taskData.completed ? " completed" : "");
      li.dataset.taskId = taskData.id;
      li.innerHTML = `
        <label class="task-checkbox">
          <input type="checkbox" ${taskData.completed ? 'checked' : ''}>
          <span class="checkmark"></span>
        </label>
        <span class="task-content">${escapeHtml(taskData.text)}</span>
        <div class="task-actions">
          <button class="action-btn edit">Изменить</button>
          <button class="action-btn delete">Удалить</button>
        </div>
      `;

      listContainer.appendChild(li);
      attachTaskListeners(li);
    });
  }
  updateCounters();
}

async function saveTask(text) {
  if (isGuest) {
    // Гости - только локально
    addLocalTask(text);
  } else {
    try {
      const data = await apiRequest('/tasks', {
        method: 'POST',
        body: JSON.stringify({ text })
      });

      // Добавляем новую задачу в UI напрямую (быстрее)
      if (data && data.task) {
        const taskData = data.task;
        const li = document.createElement("div");
        li.className = "task-item";
        li.dataset.taskId = taskData.id;
        li.innerHTML = `
          <label class="task-checkbox">
            <input type="checkbox">
            <span class="checkmark"></span>
          </label>
          <span class="task-content">${escapeHtml(taskData.text)}</span>
          <div class="task-actions">
            <button class="action-btn edit">Изменить</button>
            <button class="action-btn delete">Удалить</button>
          </div>
        `;
        listContainer.appendChild(li);
        attachTaskListeners(li);
        updateCounters();
        showNotification('Задача создана!');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      showNotification(error.message || 'Не удалось создать задачу', 'error');
    }
  }
}

function addLocalTask(text) {
  const li = document.createElement("div");
  li.className = "task-item";
  li.innerHTML = `
    <label class="task-checkbox">
      <input type="checkbox">
      <span class="checkmark"></span>
    </label>
    <span class="task-content">${escapeHtml(text)}</span>
    <div class="task-actions">
      <button class="action-btn edit">Изменить</button>
      <button class="action-btn delete">Удалить</button>
    </div>
  `;
  listContainer.appendChild(li);
  attachTaskListeners(li);
  updateCounters();
  checkEmptyState();
}

async function updateTaskOnServer(taskId, updates) {
  if (isGuest) return;

  try {
    await apiRequest(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  } catch (error) {
    showNotification('Не удалось обновить задачу', 'error');
  }
}

async function deleteTaskFromServer(taskId) {
  if (isGuest) return;

  try {
    await apiRequest(`/tasks/${taskId}`, {
      method: 'DELETE'
    });
  } catch (error) {
    showNotification('Не удалось удалить задачу', 'error');
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function updateCounters() {
  const completedTasks = document.querySelectorAll(".task-item.completed").length;
  const uncompletedTasks = document.querySelectorAll(".task-item:not(.completed)").length;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;

  checkEmptyState();
}

function checkEmptyState() {
  const hasTasks = listContainer.children.length > 0;
  emptyState.classList.toggle('visible', !hasTasks);
}

function attachTaskListeners(taskElement) {
  const checkbox = taskElement.querySelector("input[type='checkbox']");
  const editBtn = taskElement.querySelector(".edit");
  const deleteBtn = taskElement.querySelector(".delete");

  checkbox.addEventListener("click", async function() {
    taskElement.classList.toggle("completed", checkbox.checked);
    updateCounters();

    const taskId = parseInt(taskElement.dataset.taskId);
    if (taskId && !isGuest) {
      const taskContent = taskElement.querySelector('.task-content').textContent;
      await updateTaskOnServer(taskId, { text: taskContent, completed: checkbox.checked });
    }
  });

  editBtn.addEventListener("click", function() {
    const taskContent = taskElement.querySelector('.task-content').textContent;
    openEditModal(parseInt(taskElement.dataset.taskId), taskContent);
  });

  deleteBtn.addEventListener("click", async function() {
    if (confirm("Удалить эту задачу?")) {
      const taskId = parseInt(taskElement.dataset.taskId);
      if (taskId && !isGuest) {
        await deleteTaskFromServer(taskId);
      }
      taskElement.remove();
      updateCounters();
    }
  });
}

async function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    showNotification('Введите текст задачи', 'error');
    return;
  }

  console.log('Adding task:', task);
  console.log('Is guest:', isGuest);
  console.log('Has auth token:', !!authToken);

  inputBox.value = "";

  try {
    await saveTask(task);
    console.log('Task saved successfully');
  } catch (error) {
    console.error('Failed to save task:', error);
    showNotification('Ошибка при создании задачи', 'error');
  }
}

// ==================== МОДАЛЬНОЕ ОКНО ====================

function openEditModal(taskId, currentText) {
  currentEditTaskId = taskId;
  editInput.value = currentText;
  editModal.classList.add('active');
  editInput.focus();
}

function closeEditModal() {
  editModal.classList.remove('active');
  currentEditTaskId = null;
  editInput.value = "";
}

async function saveEdit() {
  const newText = editInput.value.trim();

  if (!newText) {
    showNotification('Введите текст задачи', 'error');
    return;
  }

  const taskElement = document.querySelector(`[data-task-id="${currentEditTaskId}"]`);

  if (currentEditTaskId && !isGuest) {
    const checkbox = taskElement.querySelector('input[type="checkbox"]').checked;
    await updateTaskOnServer(currentEditTaskId, { text: newText, completed: checkbox });
  }

  if (taskElement) {
    const taskContent = taskElement.querySelector('.task-content');
    taskContent.textContent = newText;
  }

  closeEditModal();
}

// ==================== EVENT LISTENERS ====================

goToSignup.addEventListener("click", function(e) {
  e.preventDefault();
  switchToSignup();
});

goToLogin.addEventListener("click", function(e) {
  e.preventDefault();
  switchToLogin();
});

guestLogin.addEventListener("click", function(e) {
  e.preventDefault();
  loginAsGuest();
});

loginBtn.addEventListener("click", async function() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!username || !password) {
    showNotification('Заполните все поля', 'error');
    return;
  }

  loginBtn.classList.add('loading');
  await login(username, password);
  loginBtn.classList.remove('loading');
});

signupBtn.addEventListener("click", async function() {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const confirmPass = document.getElementById("signup-confirm").value.trim();

  if (!username || !password || !confirmPass) {
    showNotification('Заполните все поля', 'error');
    return;
  }

  if (password !== confirmPass) {
    showNotification('Пароли не совпадают', 'error');
    return;
  }

  if (password.length < 6) {
    showNotification('Минимум 6 символов', 'error');
    return;
  }

  signupBtn.classList.add('loading');
  await signup(username, password);
  signupBtn.classList.remove('loading');
});

logoutBtn.addEventListener("click", logout);

const inputButton = document.getElementById("input-button");
if (inputButton) {
  inputButton.addEventListener("click", addTask);
}

inputBox.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Модальное окно
editCancel.addEventListener("click", closeEditModal);
editSave.addEventListener("click", saveEdit);
editInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    saveEdit();
  }
});

// Закрытие по клику на оверлей
editModal.addEventListener('click', function(e) {
  if (e.target === editModal || e.target.classList.contains('modal-overlay')) {
    closeEditModal();
  }
});

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

document.addEventListener("DOMContentLoaded", async function() {
  const savedToken = localStorage.getItem('auth-token');
  const savedUser = localStorage.getItem('current-user');

  if (savedToken && savedUser) {
    try {
      authToken = savedToken;
      currentUser = JSON.parse(savedUser);
      isGuest = currentUser.username === "Guest" || currentUser.username === "Гость";

      showApp();

      if (!isGuest) {
        await loadTasks();
      } else {
        checkEmptyState();
      }
    } catch (error) {
      console.error('Session restore failed:', error);
      logout();
    }
  } else {
    showAuth();
  }
});
