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
    // Collapse
    hideTasks: 'Скрыть задачи',
    showTasks: 'Показать задачи',
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
    // Trash
    trash: 'Корзина',
    trashInfo: 'Элементы удаляются окончательно через 15 дней',
    trashEmpty: 'Корзина пуста',
    emptyTrash: 'Очистить корзину',
    restore: 'Восстановить',
    deleteForever: 'Удалить навсегда',
    confirmEmptyTrash: 'Очистить корзину? Все элементы будут удалены навсегда.',
    confirmDeleteForever: 'Удалить эту задачу навсегда?',
    taskRestored: 'Задача восстановлена',
    taskDeletedForever: 'Задача удалена навсегда',
    trashEmptied: 'Корзина очищена',
    deletedAt: 'Удалено',
    expiresAt: 'Истекает',
    // Categories
    categoryWork: 'Работа',
    categoryStudy: 'Учеба',
    categoryHealth: 'Здоровье',
    categoryHome: 'Дом',
    categoryDevelopment: 'Личное развитие',
    categoryFinance: 'Финансы',
    categoryLabel: 'Категория',
    // Placeholders
    loginPlaceholder: 'Введите имя пользователя',
    passwordPlaceholder: 'Введите пароль',
    signupUsernamePlaceholder: 'Придумайте имя пользователя',
    signupPasswordPlaceholder: 'Минимум 6 символов',
    confirmPlaceholder: 'Повторите пароль',
    // Themes
    themeTitle: 'Выберите тему',
    themeSpring: 'Весна',
    themeSummer: 'Лето',
    themeAutumn: 'Осень',
    themeWinter: 'Зима',
    themeSakura: 'Сакура',
    themeBtn: 'Тема',
    // Calendar
    calMon: 'Пн',
    calTue: 'Вт',
    calWed: 'Ср',
    calThu: 'Чт',
    calFri: 'Пт',
    calSat: 'Сб',
    calSun: 'Вс',
    calMonthYear: (month, year) => {
      const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
      return `${months[month]} ${year}`;
    },
    selectedDate: 'Выбрана дата',
    filterCleared: 'Фильтр снят',
    filteringFor: 'Задачи на'
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
    // Collapse
    hideTasks: 'Hide Tasks',
    showTasks: 'Show Tasks',
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
    // Trash
    trash: 'Trash',
    trashInfo: 'Items are permanently deleted after 15 days',
    trashEmpty: 'Trash is empty',
    emptyTrash: 'Empty Trash',
    restore: 'Restore',
    deleteForever: 'Delete Forever',
    confirmEmptyTrash: 'Empty trash? All items will be permanently deleted.',
    confirmDeleteForever: 'Delete this task forever?',
    taskRestored: 'Task restored',
    taskDeletedForever: 'Task permanently deleted',
    trashEmptied: 'Trash emptied',
    deletedAt: 'Deleted',
    expiresAt: 'Expires',
    // Categories
    categoryWork: 'Work',
    categoryStudy: 'Study',
    categoryHealth: 'Health',
    categoryHome: 'Home',
    categoryDevelopment: 'Personal Development',
    categoryFinance: 'Finance',
    categoryLabel: 'Category',
    // Placeholders
    loginPlaceholder: 'Enter username',
    passwordPlaceholder: 'Enter password',
    signupUsernamePlaceholder: 'Come up with a username',
    signupPasswordPlaceholder: 'Minimum 6 characters',
    confirmPlaceholder: 'Repeat password',
    // Themes
    themeTitle: 'Choose Theme',
    themeSpring: 'Spring',
    themeSummer: 'Summer',
    themeAutumn: 'Autumn',
    themeWinter: 'Winter',
    themeSakura: 'Sakura',
    themeBtn: 'Theme',
    // Calendar
    calMon: 'Mon',
    calTue: 'Tue',
    calWed: 'Wed',
    calThu: 'Thu',
    calFri: 'Fri',
    calSat: 'Sat',
    calSun: 'Sun',
    calMonthYear: (month, year) => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
      return `${months[month]} ${year}`;
    },
    selectedDate: 'Selected date',
    filterCleared: 'Filter cleared',
    filteringFor: 'Tasks for'
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

  // Update trash modal
  const trashModalTitle = document.querySelector('.trash-modal-title');
  if (trashModalTitle) {
    trashModalTitle.textContent = t('trash');
  }

  const trashInfoText = document.querySelector('.trash-info-text');
  if (trashInfoText) {
    trashInfoText.textContent = t('trashInfo');
  }

  const trashEmptyText = document.querySelector('.trash-empty-text');
  if (trashEmptyText) {
    trashEmptyText.textContent = t('trashEmpty');
  }

  const emptyTrashText = document.querySelector('.empty-trash-text');
  if (emptyTrashText) {
    emptyTrashText.textContent = t('emptyTrash');
  }

  // Update categories
  document.querySelector('.category-work').textContent = t('categoryWork');
  document.querySelector('.category-study').textContent = t('categoryStudy');
  document.querySelector('.category-health').textContent = t('categoryHealth');
  document.querySelector('.category-home').textContent = t('categoryHome');
  document.querySelector('.category-development').textContent = t('categoryDevelopment');
  document.querySelector('.category-finance').textContent = t('categoryFinance');

  // Update category selector label if no category is selected
  const categorySelectorLabel = document.querySelector('.category-label-text');
  if (categorySelectorLabel && !selectedTaskCategory) {
    categorySelectorLabel.textContent = t('categoryLabel');
  }

  // Update trash button title
  const trashBtn = document.getElementById('trash-btn');
  if (trashBtn) {
    trashBtn.title = t('trash');
  }

  // Update toggle tasks button
  const toggleText = document.querySelector('.toggle-tasks-text');
  if (toggleText) {
    toggleText.textContent = tasksCollapsed ? t('showTasks') : t('hideTasks');
  }

  // Update theme modal
  const themeModalTitle = document.querySelector('.theme-modal-title');
  if (themeModalTitle) {
    themeModalTitle.textContent = t('themeTitle');
  }

  document.querySelector('.theme-name-spring').textContent = t('themeSpring');
  document.querySelector('.theme-name-summer').textContent = t('themeSummer');
  document.querySelector('.theme-name-autumn').textContent = t('themeAutumn');
  document.querySelector('.theme-name-winter').textContent = t('themeWinter');
  document.querySelector('.theme-name-sakura').textContent = t('themeSakura');

  // Update theme button title
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    themeBtn.title = t('themeBtn');
  }

  // Update calendar weekdays
  document.querySelector('.calendar-weekday-mon').textContent = t('calMon');
  document.querySelector('.calendar-weekday-tue').textContent = t('calTue');
  document.querySelector('.calendar-weekday-wed').textContent = t('calWed');
  document.querySelector('.calendar-weekday-thu').textContent = t('calThu');
  document.querySelector('.calendar-weekday-fri').textContent = t('calFri');
  document.querySelector('.calendar-weekday-sat').textContent = t('calSat');
  document.querySelector('.calendar-weekday-sun').textContent = t('calSun');

  // Update calendar month/year
  if (typeof currentCalendarMonth !== 'undefined' && typeof currentCalendarYear !== 'undefined') {
    const monthYearText = t('calMonthYear')(currentCalendarMonth, currentCalendarYear);
    document.getElementById('calendar-month-year').textContent = monthYearText;
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

  // Always show exact date and time in DD.MM.YY HH:MM format
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2); // Last 2 digits
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (currentLang === 'ru') {
    return `${day}.${month}.${year} в ${hours}:${minutes}`;
  } else {
    return `${day}.${month}.${year} at ${hours}:${minutes}`;
  }
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
let selectedTaskCategory = null; // Category selected for new task creation
let allTasks = []; // Храним все задачи для фильтрации
let selectedDateFilter = null; // Date filter from calendar (YYYY-MM-DD format) for filtering tasks

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

    console.log('Login successful - Saving to localStorage');
    localStorage.setItem('auth-token', authToken);
    localStorage.setItem('current-user', JSON.stringify(currentUser));
    console.log('Token saved:', !!localStorage.getItem('auth-token'));
    console.log('User saved:', !!localStorage.getItem('current-user'));

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

  // Применяем фильтр по дате из календаря
  if (selectedDateFilter) {
    filtered = filtered.filter(task => {
      if (task.due_date) {
        // Handle different date formats from PostgreSQL
        let taskDateStr;
        if (typeof task.due_date === 'string') {
          taskDateStr = task.due_date.includes('T') ? task.due_date.split('T')[0] : task.due_date;
        } else if (task.due_date instanceof Date) {
          taskDateStr = task.due_date.toISOString().split('T')[0];
        } else {
          return false;
        }
        return taskDateStr === selectedDateFilter;
      }
      return false;
    });
  }

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

  // Update calendar
  if (typeof renderCalendar === 'function') {
    renderCalendar();
  }
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

// ==================== CATEGORY SELECTOR (FOR TASK CREATION) ====================

function toggleCategorySelector() {
  const categorySelectorMenu = document.getElementById('category-selector-menu');
  const categorySelectorBtn = document.getElementById('category-selector-btn');

  if (categorySelectorMenu.classList.contains('active')) {
    categorySelectorMenu.classList.remove('active');
  } else {
    categorySelectorMenu.classList.add('active');
  }
}

function selectTaskCategory(category) {
  const categorySelectorBtn = document.getElementById('category-selector-btn');
  const categorySelectorIcon = categorySelectorBtn.querySelector('.category-selector-icon');
  const categorySelectorLabel = categorySelectorBtn.querySelector('.category-selector-label');

  const categoryIcons = {
    work: '💼',
    study: '📚',
    health: '💪',
    home: '🏠',
    development: '🚀',
    finance: '💰'
  };

  const categoryNames = {
    work: t('categoryWork'),
    study: t('categoryStudy'),
    health: t('categoryHealth'),
    home: t('categoryHome'),
    development: t('categoryDevelopment'),
    finance: t('categoryFinance')
  };

  if (selectedTaskCategory === category) {
    // Deselect if clicking the same category
    selectedTaskCategory = null;
    categorySelectorBtn.classList.remove('has-category');
    categorySelectorIcon.textContent = '📋';
    categorySelectorLabel.textContent = t('categoryLabel');
  } else {
    // Select new category
    selectedTaskCategory = category;
    categorySelectorBtn.classList.add('has-category');
    categorySelectorIcon.textContent = categoryIcons[category];
    categorySelectorLabel.textContent = categoryNames[category];
  }

  // Update menu items
  document.querySelectorAll('.category-selector-item').forEach(item => {
    item.classList.remove('selected');
    if (item.dataset.category === selectedTaskCategory) {
      item.classList.add('selected');
    }
  });

  // Close dropdown
  const categorySelectorMenu = document.getElementById('category-selector-menu');
  categorySelectorMenu.classList.remove('active');
}

// ==================== COLLAPSE/EXPAND FUNCTIONS ====================

let tasksCollapsed = false;

function toggleTasksVisibility() {
  tasksCollapsed = !tasksCollapsed;
  const taskList = document.getElementById('list-container');
  const tasksContainer = document.querySelector('.tasks-container');
  const collapseIcon = document.getElementById('collapse-icon');
  const expandIcon = document.getElementById('expand-icon');
  const toggleText = document.querySelector('.toggle-tasks-text');

  if (tasksCollapsed) {
    taskList.classList.add('collapsed');
    if (tasksContainer) tasksContainer.classList.add('collapsed');
    collapseIcon.style.display = 'none';
    expandIcon.style.display = 'block';
    toggleText.textContent = t('showTasks');
  } else {
    taskList.classList.remove('collapsed');
    if (tasksContainer) tasksContainer.classList.remove('collapsed');
    collapseIcon.style.display = 'block';
    expandIcon.style.display = 'none';
    toggleText.textContent = t('hideTasks');
  }

  // Сохраняем состояние
  localStorage.setItem('tasks-collapsed', tasksCollapsed);
}

function restoreTasksCollapsedState() {
  const savedState = localStorage.getItem('tasks-collapsed');
  if (savedState === 'true') {
    tasksCollapsed = true;
    const taskList = document.getElementById('list-container');
    const tasksContainer = document.querySelector('.tasks-container');
    const collapseIcon = document.getElementById('collapse-icon');
    const expandIcon = document.getElementById('expand-icon');
    const toggleText = document.querySelector('.toggle-tasks-text');

    taskList.classList.add('collapsed');
    if (tasksContainer) tasksContainer.classList.add('collapsed');
    collapseIcon.style.display = 'none';
    expandIcon.style.display = 'block';
    toggleText.textContent = t('showTasks');
  }
}

function displayTasks(tasks) {
  listContainer.innerHTML = "";

  if (tasks.length === 0) {
    emptyState.classList.add('visible');
  } else {
    emptyState.classList.remove('visible');

    // Category icons mapping
    const categoryIcons = {
      work: '💼',
      study: '📚',
      health: '💪',
      home: '🏠',
      development: '🚀',
      finance: '💰'
    };

    tasks.forEach(taskData => {
      const li = document.createElement("div");
      li.className = "task-item" + (taskData.completed ? " completed" : "");
      li.dataset.taskId = taskData.id;

      // Show due_date if available, otherwise show created_at
      const dateToShow = taskData.due_date || taskData.created_at;
      const timestamp = dateToShow ? formatTimestamp(dateToShow) : '';
      const categoryIcon = taskData.category ? categoryIcons[taskData.category] : '';

      li.innerHTML = `
        <label class="task-checkbox">
          <input type="checkbox" ${taskData.completed ? 'checked' : ''}>
          <span class="checkmark"></span>
        </label>
        ${categoryIcon ? `<span class="task-category-icon">${categoryIcon}</span>` : ''}
        <div class="task-wrapper">
          <span class="task-content">${escapeHtml(taskData.text)}</span>
          ${timestamp ? `<span class="task-timestamp" data-timestamp="${dateToShow}">${timestamp}</span>` : ''}
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

async function saveTask(text, dueDate) {
  if (isGuest) {
    // Гости - только локально
    addLocalTask(text);
  } else {
    try {
      const requestBody = {
        text,
        due_date: dueDate
      };
      if (selectedTaskCategory) {
        requestBody.category = selectedTaskCategory;
      }

      const data = await apiRequest('/tasks', {
        method: 'POST',
        body: JSON.stringify(requestBody)
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

// ==================== TRASH FUNCTIONS ====================

const trashModal = document.getElementById('trash-modal');
const trashList = document.getElementById('trash-list');
const trashEmpty = document.getElementById('trash-empty');

async function openTrash() {
  if (isGuest) {
    showNotification('Trash is not available for guests', 'error');
    return;
  }

  trashModal.classList.add('active');
  await loadTrashItems();
}

function closeTrash() {
  trashModal.classList.remove('active');
}

async function loadTrashItems() {
  try {
    const data = await apiRequest('/trash');
    const deletedTasks = data.tasks || [];

    displayTrashItems(deletedTasks);
  } catch (error) {
    console.error('Failed to load trash:', error);
    showNotification(t('errorTaskDelete'), 'error');
  }
}

function displayTrashItems(tasks) {
  trashList.innerHTML = '';

  if (tasks.length === 0) {
    trashEmpty.style.display = 'block';
    trashList.style.display = 'none';
    updateEmptyTrashButton(true);
    return;
  }

  trashEmpty.style.display = 'none';
  trashList.style.display = 'block';
  updateEmptyTrashButton(false);

  tasks.forEach(task => {
    const item = document.createElement('div');
    item.className = 'trash-item';
    item.dataset.deletedId = task.id;

    const deletedDate = new Date(task.deleted_at);
    const expiresDate = new Date(task.expires_at);
    const deletedStr = `${deletedDate.toLocaleDateString()} ${deletedDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    const expiresStr = `${expiresDate.toLocaleDateString()} ${expiresDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

    item.innerHTML = `
      <div class="trash-item-content">
        <div class="trash-item-text ${task.completed ? 'completed' : ''}">${escapeHtml(task.text)}</div>
        <div class="trash-item-meta">
          <span>${t('deletedAt')}: ${deletedStr}</span>
          <span>${t('expiresAt')}: ${expiresStr}</span>
        </div>
      </div>
      <div class="trash-item-actions">
        <button class="trash-action-btn trash-restore-btn" data-id="${task.id}">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 14 4 9 9 4"></polyline>
            <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
          </svg>
          ${t('restore')}
        </button>
        <button class="trash-action-btn trash-delete-btn" data-id="${task.id}">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          ${t('deleteForever')}
        </button>
      </div>
    `;

    trashList.appendChild(item);
  });

  // Add event listeners
  document.querySelectorAll('.trash-restore-btn').forEach(btn => {
    btn.addEventListener('click', () => restoreTask(parseInt(btn.dataset.id)));
  });

  document.querySelectorAll('.trash-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteTaskForever(parseInt(btn.dataset.id)));
  });
}

async function restoreTask(deletedTaskId) {
  try {
    const data = await apiRequest(`/trash/${deletedTaskId}/restore`, {
      method: 'POST'
    });

    showNotification(t('taskRestored'));

    // Reload tasks to show the restored task
    await loadTasks();
    await loadTrashItems();
  } catch (error) {
    console.error('Failed to restore task:', error);
    showNotification(t('errorTaskDelete'), 'error');
  }
}

async function deleteTaskForever(deletedTaskId) {
  if (!confirm(t('confirmDeleteForever'))) {
    return;
  }

  try {
    await apiRequest(`/trash/${deletedTaskId}`, {
      method: 'DELETE'
    });

    showNotification(t('taskDeletedForever'));
    await loadTrashItems();
  } catch (error) {
    console.error('Failed to permanently delete task:', error);
    showNotification(t('errorTaskDelete'), 'error');
  }
}

async function emptyTrash() {
  if (!confirm(t('confirmEmptyTrash'))) {
    return;
  }

  try {
    const data = await apiRequest('/trash', {
      method: 'DELETE'
    });

    showNotification(`${t('trashEmptied')} (${data.deletedCount} ${t('deletedCompleted')})`);
    await loadTrashItems();
  } catch (error) {
    console.error('Failed to empty trash:', error);
    showNotification(t('errorTaskDelete'), 'error');
  }
}

function updateEmptyTrashButton(isEmpty) {
  const emptyTrashBtn = document.getElementById('empty-trash-btn');
  if (emptyTrashBtn) {
    emptyTrashBtn.disabled = isEmpty;
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
  const dueDateInput = document.getElementById('due-date-input');
  const dueDate = dueDateInput ? dueDateInput.value : null;

  if (!task) {
    showNotification(t('errorTaskText'), 'error');
    return;
  }

  if (!dueDate) {
    showNotification('Пожалуйста, выберите дату для задачи', 'error');
    dueDateInput.focus();
    return;
  }

  inputBox.value = "";
  // Don't clear due date - user might want to add multiple tasks for same date

  try {
    await saveTask(task, dueDate);
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

// ==================== THEMES ====================

// Function to apply theme
function applyTheme(themeName) {
  // Remove all theme classes
  document.body.classList.remove('theme-spring', 'theme-summer', 'theme-autumn', 'theme-winter', 'theme-sakura');

  // Apply new theme if not default
  if (themeName && themeName !== 'default') {
    document.body.classList.add(`theme-${themeName}`);
  }

  // Update active state in theme cards
  document.querySelectorAll('.theme-card').forEach(card => {
    card.classList.remove('active');
    if (card.dataset.theme === themeName) {
      card.classList.add('active');
    }
  });

  // Save to localStorage
  localStorage.setItem('app-theme', themeName || 'default');
}

// Function to get current theme
function getCurrentTheme() {
  return localStorage.getItem('app-theme') || 'default';
}

// Function to open theme modal
function openThemeModal() {
  const themeModal = document.getElementById('theme-modal');
  if (themeModal) {
    themeModal.style.display = 'flex';
    // Update active state
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme);
  }
}

// Function to close theme modal
function closeThemeModal() {
  const themeModal = document.getElementById('theme-modal');
  if (themeModal) {
    themeModal.style.display = 'none';
  }
}

// ==================== CALENDAR ====================

// Calendar state
let currentCalendarMonth = new Date().getMonth();
let currentCalendarYear = new Date().getFullYear();
let selectedDate = null;

// Get tasks for a specific date
function getTasksForDate(day, month, year) {
  // Format date as YYYY-MM-DD using local timezone (not UTC)
  const targetDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  return allTasks.filter(task => {
    // Use due_date if it exists, otherwise fall back to created_at
    if (task.due_date) {
      // Handle different date formats from PostgreSQL
      let taskDateStr;
      if (typeof task.due_date === 'string') {
        // If due_date is ISO string, extract date part
        taskDateStr = task.due_date.includes('T') ? task.due_date.split('T')[0] : task.due_date;
      } else if (task.due_date instanceof Date) {
        // Convert to ISO string and extract date part
        taskDateStr = task.due_date.toISOString().split('T')[0];
      } else {
        return false;
      }
      return taskDateStr === targetDateStr;
    } else {
      // Fallback to created_at
      const taskDate = new Date(task.created_at);
      // Use local date components to avoid UTC conversion
      const taskYear = taskDate.getFullYear();
      const taskMonth = taskDate.getMonth(); // 0-indexed
      const taskDay = taskDate.getDate();
      return taskDay === day && taskMonth === month && taskYear === year;
    }
  });
}

// Render calendar
function renderCalendar() {
  const calendarDays = document.getElementById('calendar-days');
  const monthYearElement = document.getElementById('calendar-month-year');

  // Update month/year title with filter indicator
  const monthYearText = t('calMonthYear')(currentCalendarMonth, currentCalendarYear);
  if (selectedDateFilter) {
    const filterDate = new Date(selectedDateFilter + 'T00:00:00'); // Add T00:00:00 to prevent UTC conversion
    const filterDay = filterDate.getDate();
    const filterMonth = filterDate.getMonth() + 1;
    const filterYear = filterDate.getFullYear();
    monthYearElement.textContent = `${monthYearText} • ${t('filteringFor')} ${filterDay}.${filterMonth}.${filterYear}`;
  } else {
    monthYearElement.textContent = monthYearText;
  }

  // Clear previous days
  calendarDays.innerHTML = '';

  // Get first day of month and total days
  const firstDay = new Date(currentCalendarYear, currentCalendarMonth, 1);
  const lastDay = new Date(currentCalendarYear, currentCalendarMonth + 1, 0);
  const totalDays = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Adjust for Monday-first week (0 = Monday, 6 = Sunday)
  const adjustedStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

  // Get today's date
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // Previous month's days
  const prevMonthLastDay = new Date(currentCalendarYear, currentCalendarMonth, 0).getDate();
  for (let i = adjustedStartingDay - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const dayElement = createDayElement(day, true, false, null);
    calendarDays.appendChild(dayElement);
  }

  // Current month's days
  for (let day = 1; day <= totalDays; day++) {
    const isToday = day === todayDay && currentCalendarMonth === todayMonth && currentCalendarYear === todayYear;
    const tasksForDay = getTasksForDate(day, currentCalendarMonth, currentCalendarYear);
    const hasTasks = tasksForDay.length > 0;

    const dayElement = createDayElement(day, false, isToday, tasksForDay);
    calendarDays.appendChild(dayElement);
  }

  // Next month's days (to fill the grid to 42 cells)
  const totalCells = adjustedStartingDay + totalDays;
  const remainingCells = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;
  for (let day = 1; day <= remainingCells; day++) {
    const dayElement = createDayElement(day, true, false, null);
    calendarDays.appendChild(dayElement);
  }
}

// Create a single day element
function createDayElement(day, isOtherMonth, isToday, tasksForDay) {
  const dayElement = document.createElement('div');
  dayElement.className = 'calendar-day';

  if (isOtherMonth) {
    dayElement.classList.add('other-month');
  }

  if (isToday) {
    dayElement.classList.add('today');
  }

  if (tasksForDay && tasksForDay.length > 0) {
    dayElement.classList.add('has-tasks');
  }

  if (selectedDate && selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentCalendarMonth &&
      selectedDate.getFullYear() === currentCalendarYear && !isOtherMonth) {
    dayElement.classList.add('selected');
  }

  // Day number
  const dayNumber = document.createElement('div');
  dayNumber.className = 'calendar-day-number';
  dayNumber.textContent = day;
  dayElement.appendChild(dayNumber);

  // Task indicator dots
  if (tasksForDay && tasksForDay.length > 0) {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'calendar-dots';

    // Show up to 3 dots
    const maxDots = Math.min(tasksForDay.length, 3);
    for (let i = 0; i < maxDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'calendar-dot';
      if (tasksForDay[i].completed) {
        dot.classList.add('completed');
      }
      dotsContainer.appendChild(dot);
    }

    dayElement.appendChild(dotsContainer);
  }

  // Click handler for ALL days (not just days with tasks)
  dayElement.addEventListener('click', function() {
    // Ignore click if it's other month
    if (isOtherMonth) return;

    // Format date as YYYY-MM-DD
    const formattedDate = `${currentCalendarYear}-${String(currentCalendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Toggle date filter: if same date clicked, clear filter; otherwise set new filter
    if (selectedDateFilter === formattedDate) {
      // Second click - clear filter
      selectedDateFilter = null;
      showNotification(t('filterCleared') || 'Фильтр снят', 'success');
    } else {
      // First click - set filter and update date input
      selectedDateFilter = formattedDate;

      // Update selected date for visual highlight
      selectedDate = new Date(currentCalendarYear, currentCalendarMonth, day);

      // Update date input (for task creation)
      const dueDateInput = document.getElementById('due-date-input');
      if (dueDateInput) {
        dueDateInput.value = formattedDate;
        dueDateInput.classList.add('has-value');
      }

      showNotification(`${t('filteringFor') || 'Задачи на'} ${day}.${currentCalendarMonth + 1}.${currentCalendarYear}`, 'success');
    }

    // Apply filter and re-render calendar
    applyFiltersAndSort();
  });

  return dayElement;
}

// Navigate to previous month
function navigateToPrevMonth() {
  currentCalendarMonth--;
  if (currentCalendarMonth < 0) {
    currentCalendarMonth = 11;
    currentCalendarYear--;
  }
  renderCalendar();
}

// Navigate to next month
function navigateToNextMonth() {
  currentCalendarMonth++;
  if (currentCalendarMonth > 11) {
    currentCalendarMonth = 0;
    currentCalendarYear++;
  }
  renderCalendar();
}

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

  // Добавляем listeners для корзины
  const trashBtn = document.getElementById('trash-btn');
  if (trashBtn) {
    trashBtn.addEventListener('click', openTrash);
  }

  const trashClose = document.getElementById('trash-close');
  if (trashClose) {
    trashClose.addEventListener('click', closeTrash);
  }

  const emptyTrashBtn = document.getElementById('empty-trash-btn');
  if (emptyTrashBtn) {
    emptyTrashBtn.addEventListener('click', emptyTrash);
  }

  // Закрытие корзины по клику на оверлей
  trashModal.addEventListener('click', function(e) {
    if (e.target === trashModal || e.target.classList.contains('modal-overlay')) {
      closeTrash();
    }
  });

  // Добавляем listeners для тем
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', openThemeModal);
  }

  const themeClose = document.getElementById('theme-close');
  if (themeClose) {
    themeClose.addEventListener('click', closeThemeModal);
  }

  // Добавляем listeners для карточек тем
  document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', function() {
      const theme = this.dataset.theme;
      applyTheme(theme);
    });
  });

  // Закрытие модального окна тем по клику на оверлей
  const themeModal = document.getElementById('theme-modal');
  if (themeModal) {
    themeModal.addEventListener('click', function(e) {
      if (e.target === themeModal || e.target.classList.contains('modal-overlay')) {
        closeThemeModal();
      }
    });
  }

  // Инициализация темы при загрузке
  const savedTheme = getCurrentTheme();
  if (savedTheme && savedTheme !== 'default') {
    applyTheme(savedTheme);
  }

  // Добавляем listeners для календаря
  const calendarPrev = document.getElementById('calendar-prev');
  if (calendarPrev) {
    calendarPrev.addEventListener('click', navigateToPrevMonth);
  }

  const calendarNext = document.getElementById('calendar-next');
  if (calendarNext) {
    calendarNext.addEventListener('click', navigateToNextMonth);
  }

  // Инициализация календаря
  renderCalendar();

  // Добавляем listener для date input
  const dueDateInput = document.getElementById('due-date-input');
  if (dueDateInput) {
    dueDateInput.addEventListener('change', function() {
      if (this.value) {
        this.classList.add('has-value');
      } else {
        this.classList.remove('has-value');
      }
    });
  }

  // Добавляем listener для переключения видимости задач
  const toggleTasksBtn = document.getElementById('toggle-tasks-btn');
  if (toggleTasksBtn) {
    toggleTasksBtn.addEventListener('click', toggleTasksVisibility);
  }

  // Добавляем listeners для селектора категорий при создании задач
  const categorySelectorBtn = document.getElementById('category-selector-btn');
  if (categorySelectorBtn) {
    categorySelectorBtn.addEventListener('click', toggleCategorySelector);
  }

  document.querySelectorAll('.category-selector-item').forEach(item => {
    item.addEventListener('click', function() {
      selectTaskCategory(this.dataset.category);
    });
  });

  // Закрытие селектора по клику вне его
  document.addEventListener('click', function(e) {
    const categorySelector = document.querySelector('.category-selector');
    if (categorySelector && !categorySelector.contains(e.target)) {
      const categorySelectorMenu = document.getElementById('category-selector-menu');
      categorySelectorMenu.classList.remove('active');
    }
  });

  // Восстанавливаем состояние свернутых задач
  restoreTasksCollapsedState();

  const savedToken = localStorage.getItem('auth-token');
  const savedUser = localStorage.getItem('current-user');

  console.log('Session restore - Token exists:', !!savedToken);
  console.log('Session restore - User exists:', !!savedUser);

  if (savedToken && savedUser) {
    try {
      authToken = savedToken;
      currentUser = JSON.parse(savedUser);
      isGuest = currentUser.username === "Guest" || currentUser.username === "Гость";

      console.log('Session restored - User:', currentUser.username, 'isGuest:', isGuest);

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
    console.log('No saved session found, showing auth');
    showAuth();
  }
});
