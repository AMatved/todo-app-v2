// ==================== КОНФИГУРАЦИЯ ====================
// Используем относительный путь - работает и локально, и на Railway
const API_BASE_URL = '/api';

// ==================== ПЕРЕВОДЫ ====================
const translations = {
  ru: {
    greeting: 'Привет,',
    logout: 'Выйти',
    pageTitle: 'Мои задачи',
    subtitle: 'Организуйте свои дела эффективно',
    completed: 'Выполнено',
    uncompleted: 'Осталось',
    placeholder: 'Добавьте новую задачу...',
    add: 'Добавить',
    emptyTitle: 'Пока нет задач',
    emptyText: 'Добавьте первую задачу, чтобы начать!',
    edit: 'Изменить',
    delete: 'Удалить',
    editModalTitle: 'Редактировать задачу',
    editPlaceholder: 'Название задачи',
    cancel: 'Отмена',
    save: 'Сохранить',
    // Date/Time
    justNow: 'только что',
    minutesAgo: 'минут назад',
    hoursAgo: 'часов назад',
    daysAgo: 'дней назад',
    at: 'в',
    // Filters
    filterAll: 'Все',
    filterActive: 'Активные',
    filterCompleted: 'Завершенные',
    sortByDate: 'По дате',
    sortAsc: 'По возрастанию',
    sortDesc: 'По убыванию',
    deleteCompleted: 'Очистить выполненные',
    // Auth
    username: 'Имя пользователя',
    password: 'Пароль',
    confirm: 'Подтвердите пароль',
    login: 'Войти',
    loginLoading: 'Вход...',
    signup: 'Создать аккаунт',
    signupLoading: 'Регистрация...',
    noAccount: 'Нет аккаунта?',
    register: 'Зарегистрироваться',
    hasAccount: 'Уже есть аккаунт?',
    loginLink: 'Войти',
    guestOption: 'Или',
    guestLink: 'продолжить как гость',
    guestName: 'Гость',
    // Errors & Notifications
    errorFillAll: 'Заполните все поля',
    errorPasswordsMatch: 'Пароли не совпадают',
    errorMinLength: 'Минимум 6 символов',
    errorTaskText: 'Введите текст задачи',
    successTaskCreated: 'Задача создана!',
    errorTaskCreate: 'Не удалось создать задачу',
    errorTaskUpdate: 'Не удалось обновить задачу',
    errorTaskDelete: 'Не удалось удалить задачу',
    confirmDelete: 'Удалить эту задачу?',
    confirmDeleteAll: 'Удалить все выполненные задачи?',
    noCompletedTasks: 'Нет выполненных задач',
    deletedCompleted: 'Удалено выполненных задач:',
    loginError: 'Ошибка входа',
    registerError: 'Ошибка регистрации',
    // Placeholders
    loginPlaceholder: 'Введите имя пользователя',
    passwordPlaceholder: 'Введите пароль',
    signupUsernamePlaceholder: 'Придумайте имя пользователя',
    signupPasswordPlaceholder: 'Минимум 6 символов',
    confirmPlaceholder: 'Повторите пароль'
  },
  en: {
    greeting: 'Hello,',
    logout: 'Logout',
    pageTitle: 'My Tasks',
    subtitle: 'Organize your tasks efficiently',
    completed: 'Completed',
    uncompleted: 'Remaining',
    placeholder: 'Add a new task...',
    add: 'Add',
    emptyTitle: 'No tasks yet',
    emptyText: 'Add your first task to get started!',
    edit: 'Edit',
    delete: 'Delete',
    editModalTitle: 'Edit Task',
    editPlaceholder: 'Task name',
    cancel: 'Cancel',
    save: 'Save',
    // Date/Time
    justNow: 'just now',
    minutesAgo: 'minutes ago',
    hoursAgo: 'hours ago',
    daysAgo: 'days ago',
    at: 'at',
    // Filters
    filterAll: 'All',
    filterActive: 'Active',
    filterCompleted: 'Completed',
    sortByDate: 'By date',
    sortAsc: 'Ascending',
    sortDesc: 'Descending',
    deleteCompleted: 'Clear completed',
    // Auth
    username: 'Username',
    password: 'Password',
    confirm: 'Confirm Password',
    login: 'Login',
    loginLoading: 'Logging in...',
    signup: 'Create Account',
    signupLoading: 'Registering...',
    noAccount: "Don't have an account?",
    register: 'Sign up',
    hasAccount: 'Already have an account?',
    loginLink: 'Login',
    guestOption: 'Or',
    guestLink: 'continue as guest',
    guestName: 'Guest',
    // Errors & Notifications
    errorFillAll: 'Please fill in all fields',
    errorPasswordsMatch: 'Passwords do not match',
    errorMinLength: 'Minimum 6 characters',
    errorTaskText: 'Please enter task text',
    successTaskCreated: 'Task created!',
    errorTaskCreate: 'Failed to create task',
    errorTaskUpdate: 'Failed to update task',
    errorTaskDelete: 'Failed to delete task',
    confirmDelete: 'Delete this task?',
    confirmDeleteAll: 'Delete all completed tasks?',
    noCompletedTasks: 'No completed tasks',
    deletedCompleted: 'Deleted completed tasks:',
    loginError: 'Login error',
    registerError: 'Registration error',
    // Placeholders
    loginPlaceholder: 'Enter username',
    passwordPlaceholder: 'Enter password',
    signupUsernamePlaceholder: 'Come up with a username',
    signupPasswordPlaceholder: 'Minimum 6 characters',
    confirmPlaceholder: 'Repeat password'
  }
};

// Язык по умолчанию
let currentLang = localStorage.getItem('app-language') || 'en';

// Функция для получения перевода
function t(key) {
  return translations[currentLang][key] || translations.ru[key] || key;
}

// Функция для смены языка
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('app-language', lang);
  updateUILanguage();
}

// Функция для обновления UI с новым языком
function updateUILanguage() {
  // Update language icon
  const langIcon = document.getElementById('lang-icon');
  if (langIcon) {
    langIcon.textContent = currentLang === 'en' ? '🇷🇺' : '🇬🇧';
  }

  // Update nav
  document.querySelector('.greeting-text').textContent = t('greeting');
  document.querySelector('.logout-text').textContent = t('logout');
  document.querySelector('.page-title').textContent = t('pageTitle');
  document.querySelectorAll('.subtitle-text').forEach(el => el.textContent = t('subtitle'));
  document.querySelector('.completed-label').textContent = t('completed');
  document.querySelector('.uncompleted-label').textContent = t('uncompleted');
  document.querySelector('.task-input').placeholder = t('placeholder');
  document.querySelector('.add-button-text').textContent = t('add');
  document.querySelector('.empty-title').textContent = t('emptyTitle');
  document.querySelector('.empty-text').textContent = t('emptyText');
  document.querySelector('.edit-modal-title').textContent = t('editModalTitle');
  document.querySelector('#edit-input').placeholder = t('editPlaceholder');
  document.querySelector('.cancel-text').textContent = t('cancel');
  document.querySelector('.save-text').textContent = t('save');

  // Update auth form
  document.querySelector('.username-label').textContent = t('username');
  document.querySelectorAll('.password-label').forEach(el => el.textContent = t('password'));
  document.querySelector('.confirm-label').textContent = t('confirm');
  document.querySelector('.login-text').textContent = t('login');
  document.querySelector('.login-loading').textContent = t('loginLoading');
  document.querySelector('.signup-text').textContent = t('signup');
  document.querySelector('.signup-loading').textContent = t('signupLoading');
  document.querySelector('.no-account-text').textContent = t('noAccount');
  document.querySelector('.register-link').textContent = t('register');
  document.querySelector('.has-account-text').textContent = t('hasAccount');
  document.querySelector('.login-link').textContent = t('loginLink');
  document.querySelector('.guest-option-text').textContent = t('guestOption');
  document.querySelector('.guest-link').textContent = t('guestLink');

  // Update placeholders
  document.getElementById('login-username').placeholder = t('loginPlaceholder');
  document.getElementById('login-password').placeholder = t('passwordPlaceholder');
  document.getElementById('signup-username').placeholder = t('signupUsernamePlaceholder');
  document.getElementById('signup-password').placeholder = t('signupPasswordPlaceholder');
  document.getElementById('signup-confirm').placeholder = t('confirmPlaceholder');

  // Update task timestamps
  document.querySelectorAll('.task-timestamp').forEach(el => {
    const timestamp = el.dataset.timestamp;
    if (timestamp) {
      el.textContent = formatTimestamp(timestamp);
    }
  });

  // Update filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const filterType = btn.dataset.filter;
    if (filterType === 'all') btn.textContent = t('filterAll');
    if (filterType === 'active') btn.textContent = t('filterActive');
    if (filterType === 'completed') btn.textContent = t('filterCompleted');
  });

  // Update sort button
  const sortBtn = document.querySelector('.sort-text');
  if (sortBtn) {
    sortBtn.textContent = t('sortByDate');
  }

  // Update delete completed button
  const deleteCompletedText = document.querySelector('.delete-completed-text');
  if (deleteCompletedText) {
    deleteCompletedText.textContent = t('deleteCompleted');
  }

  // Update guest username if logged in as guest
  if (currentUser && (currentUser.username === 'Гость' || currentUser.username === 'Guest')) {
    currentUser.username = t('guestName');
    document.getElementById('current-user').textContent = currentUser.username;
  }
}

// Функция для форматирования времени
function formatTimestamp(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  let timeStr;
  if (diffMins < 1) {
    timeStr = t('justNow');
  } else if (diffMins < 60) {
    timeStr = `${diffMins} ${t('minutesAgo')}`;
  } else if (diffHours < 24) {
    timeStr = `${diffHours} ${t('hoursAgo')}`;
  } else if (diffDays < 7) {
    timeStr = `${diffDays} ${t('daysAgo')}`;
  } else {
    // Show full date for older tasks
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    if (currentLang === 'ru') {
      timeStr = `${day}.${month}.${year} ${t('at')} ${hours}:${minutes}`;
    } else {
      timeStr = `${month}/${day}/${year} ${t('at')} ${hours}:${minutes}`;
    }
  }

  return timeStr;
}

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

// Фильтры и сортировка
let currentFilter = localStorage.getItem('task-filter') || 'all'; // all, active, completed
let sortDirection = localStorage.getItem('sort-direction') || 'desc'; // asc, desc
let allTasks = []; // Храним все задачи для фильтрации

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

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    const contentType = response.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

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
    showNotification(error.message || t('loginError'), 'error');
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
    showNotification(error.message || t('registerError'), 'error');
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
  currentUser = { username: t('guestName') };
  isGuest = true;
  authToken = null;

  localStorage.setItem('current-user', JSON.stringify({ username: t('guestName') }));

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
    allTasks = data.tasks || [];
    applyFiltersAndSort();
  } catch (error) {
    console.error('Failed to load tasks:', error);
    if (error.message.includes('token')) {
      logout();
    }
  }
}

function applyFiltersAndSort() {
  let filtered = [...allTasks];

  // Применяем фильтр по статусу
  if (currentFilter === 'active') {
    filtered = filtered.filter(task => !task.completed);
  } else if (currentFilter === 'completed') {
    filtered = filtered.filter(task => task.completed);
  }

  // Сортируем по дате создания
  filtered.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
  });

  displayTasks(filtered);
  updateFilterButtons();
}

function setFilter(filterType) {
  currentFilter = filterType;
  localStorage.setItem('task-filter', filterType);
  applyFiltersAndSort();
}

function toggleSortDirection() {
  sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  localStorage.setItem('sort-direction', sortDirection);
  applyFiltersAndSort();
}

function updateFilterButtons() {
  // Обновляем активный фильтр
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === currentFilter) {
      btn.classList.add('active');
    }
  });

  // Обновляем иконку сортировки
  const sortIcon = document.getElementById('sort-icon');
  if (sortIcon) {
    sortIcon.textContent = sortDirection === 'asc' ? '↑' : '↓';
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

      const timestamp = taskData.created_at ? formatTimestamp(taskData.created_at) : '';

      li.innerHTML = `
        <label class="task-checkbox">
          <input type="checkbox" ${taskData.completed ? 'checked' : ''}>
          <span class="checkmark"></span>
        </label>
        <div class="task-wrapper">
          <span class="task-content">${escapeHtml(taskData.text)}</span>
          ${timestamp ? `<span class="task-timestamp" data-timestamp="${taskData.created_at}">${timestamp}</span>` : ''}
        </div>
        <div class="task-actions">
          <button class="action-btn edit">${t('edit')}</button>
          <button class="action-btn delete">${t('delete')}</button>
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

      // Добавляем новую задачу в allTasks и применяем фильтры
      if (data && data.task) {
        allTasks.push(data.task);
        applyFiltersAndSort();
        showNotification(t('successTaskCreated'));
      }
    } catch (error) {
      console.error('Error creating task:', error);
      showNotification(error.message || t('errorTaskCreate'), 'error');
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
      <button class="action-btn edit">${t('edit')}</button>
      <button class="action-btn delete">${t('delete')}</button>
    </div>
  `;
  listContainer.appendChild(li);
  attachTaskListeners(li);
  updateCounters();
  checkEmptyState();
}

async function updateTaskOnServer(taskId, updates) {
  if (isGuest) return;

  console.log('Client: Updating task', taskId, 'with updates:', JSON.stringify(updates));

  try {
    await apiRequest(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });

    console.log('Client: Update successful for task', taskId);
  } catch (error) {
    console.error('Client: Update failed:', error);
    throw error; // Перебрасываем ошибку, чтобы откатить UI
  }
}

async function deleteTaskFromServer(taskId) {
  if (isGuest) return;

  try {
    await apiRequest(`/tasks/${taskId}`, {
      method: 'DELETE'
    });

    // Удаляем задачу из allTasks
    allTasks = allTasks.filter(t => t.id !== taskId);
    applyFiltersAndSort();
  } catch (error) {
    showNotification(t('errorTaskDelete'), 'error');
  }
}

async function deleteAllCompletedTasks() {
  if (isGuest) {
    // Для гостей удаляем выполненные задачи напрямую
    const tasks = listContainer.querySelectorAll('.task-item');
    tasks.forEach(task => {
      const checkbox = task.querySelector('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
        task.remove();
      }
    });
    updateCounters();
    checkEmptyState();
    return;
  }

  // Проверяем, есть ли выполненные задачи
  const hasCompletedTasks = allTasks.some(task => task.completed);
  if (!hasCompletedTasks) {
    showNotification(t('noCompletedTasks'), 'error');
    return;
  }

  if (!confirm(t('confirmDeleteAll'))) {
    return;
  }

  try {
    const data = await apiRequest('/tasks/completed', {
      method: 'DELETE'
    });

    // Удаляем выполненные задачи из allTasks
    allTasks = allTasks.filter(task => !task.completed);
    applyFiltersAndSort();

    showNotification(`${t('deletedCompleted')} ${data.deletedCount}`);
  } catch (error) {
    showNotification(t('errorTaskDelete'), 'error');
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function updateCounters() {
  // Считаем из allTasks, чтобы показывать общее количество, а не только отфильтрованные
  const completedTasks = allTasks.filter(task => task.completed).length;
  const uncompletedTasks = allTasks.filter(task => !task.completed).length;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;

  // Обновляем состояние кнопки удаления выполненных задач
  const deleteCompletedBtn = document.getElementById('delete-completed-btn');
  if (deleteCompletedBtn) {
    deleteCompletedBtn.disabled = completedTasks === 0;
  }

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

  checkbox.addEventListener("change", async function() {
    const taskId = parseInt(taskElement.dataset.taskId);
    const newCompletedState = checkbox.checked;

    // Сразу обновляем UI (оптимистичное обновление)
    taskElement.classList.toggle("completed", newCompletedState);

    if (taskId && !isGuest) {
      const taskContent = taskElement.querySelector('.task-content').textContent;

      // Обновляем в allTasks сразу
      const taskIndex = allTasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        allTasks[taskIndex].completed = newCompletedState;
        updateCounters();
      }

      // Отправляем на сервер в фоне
      try {
        await updateTaskOnServer(taskId, { text: taskContent, completed: newCompletedState });
      } catch (error) {
        // При ошибке откатываем UI
        taskElement.classList.toggle("completed", !newCompletedState);
        checkbox.checked = !newCompletedState;
        if (taskIndex !== -1) {
          allTasks[taskIndex].completed = !newCompletedState;
          updateCounters();
        }
      }
    } else {
      // Для гостей обновляем напрямую
      updateCounters();
    }
  });

  editBtn.addEventListener("click", function() {
    const taskContent = taskElement.querySelector('.task-content').textContent;
    openEditModal(parseInt(taskElement.dataset.taskId), taskContent);
  });

  deleteBtn.addEventListener("click", async function() {
    if (confirm(t('confirmDelete'))) {
      const taskId = parseInt(taskElement.dataset.taskId);
      if (taskId && !isGuest) {
        await deleteTaskFromServer(taskId);
      } else {
        // Для гостей удаляем напрямую
        taskElement.remove();
        updateCounters();
      }
    }
  });
}

async function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    showNotification(t('errorTaskText'), 'error');
    return;
  }

  inputBox.value = "";

  try {
    await saveTask(task);
  } catch (error) {
    console.error('Failed to save task:', error);
    showNotification(t('errorTaskCreate'), 'error');
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
    showNotification(t('errorTaskText'), 'error');
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
    showNotification(t('errorFillAll'), 'error');
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
    showNotification(t('errorFillAll'), 'error');
    return;
  }

  if (password !== confirmPass) {
    showNotification(t('errorPasswordsMatch'), 'error');
    return;
  }

  if (password.length < 6) {
    showNotification(t('errorMinLength'), 'error');
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
  // Инициализация языка
  updateUILanguage();

  // Добавляем listener для переключения языка
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', function() {
      setLanguage(currentLang === 'ru' ? 'en' : 'ru');
    });
  }

  // Добавляем listeners для фильтров
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      setFilter(this.dataset.filter);
    });
  });

  // Добавляем listener для сортировки
  const sortBtn = document.getElementById('sort-btn');
  if (sortBtn) {
    sortBtn.addEventListener('click', toggleSortDirection);
  }

  // Добавляем listener для удаления всех выполненных задач
  const deleteCompletedBtn = document.getElementById('delete-completed-btn');
  if (deleteCompletedBtn) {
    deleteCompletedBtn.addEventListener('click', deleteAllCompletedTasks);
  }

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
