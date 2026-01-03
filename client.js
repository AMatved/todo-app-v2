// ==================== КОНФИГУРАЦИЯ ====================
const API_BASE_URL = window.location.protocol === 'https:'
  ? 'https://localhost:3443/api'
  : 'http://localhost:3000/api';

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

// ==================== ПЕРЕМЕННЫЕ ====================
let currentUser = null;
let authToken = null;
let isGuest = false;

// ==================== API ФУНКЦИИ ====================

/**
 * Универсальная функция для API запросов
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    credentials: 'include', // Отправляем cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  // Добавляем токен в заголовок, если он есть
  if (authToken) {
    defaultOptions.headers.Authorization = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    // Проверяем, является ли ответ JSON
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
    console.error('Login failed:', error);
    alert(error.message || 'Login failed');
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
    console.error('Signup failed:', error);
    alert(error.message || 'Signup failed');
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
  currentUser = { username: "Guest" };
  isGuest = true;
  authToken = null;

  localStorage.setItem('current-user', JSON.stringify({ username: "Guest" }));

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

// ==================== TASK FUNCTIONS ====================

async function loadTasks() {
  if (isGuest) return;

  try {
    const data = await apiRequest('/tasks');
    displayTasks(data.tasks);
  } catch (error) {
    console.error('Failed to load tasks:', error);
    if (error.message.includes('token')) {
      // Токен недействителен, разлогиниваем
      logout();
    }
  }
}

function displayTasks(tasks) {
  listContainer.innerHTML = "";
  tasks.forEach(taskData => {
    const li = document.createElement("li");
    li.dataset.taskId = taskData.id;
    li.innerHTML = `
      <label>
        <input type="checkbox" ${taskData.completed ? 'checked' : ''}>
        <span>${escapeHtml(taskData.text)}</span>
      </label>
      <span class="edit-btn">Edit</span>
      <span class="delete-btn">Delete</span>
    `;

    if (taskData.completed) {
      li.classList.add("completed");
    }

    listContainer.appendChild(li);
    attachTaskListeners(li);
  });
  updateCounters();
}

async function saveTask(text) {
  if (isGuest) return;

  try {
    const data = await apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify({ text })
    });

    // Добавляем новую задачу в UI
    const li = document.createElement("li");
    li.dataset.taskId = data.task.id;
    li.innerHTML = `
      <label>
        <input type="checkbox">
        <span>${escapeHtml(data.task.text)}</span>
      </label>
      <span class="edit-btn">Edit</span>
      <span class="delete-btn">Delete</span>
    `;
    listContainer.appendChild(li);
    attachTaskListeners(li);
    updateCounters();
  } catch (error) {
    console.error('Failed to save task:', error);
    alert('Failed to create task');
  }
}

async function updateTaskOnServer(taskId, updates) {
  if (isGuest) return;

  try {
    await apiRequest(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  } catch (error) {
    console.error('Failed to update task:', error);
    alert('Failed to update task');
  }
}

async function deleteTaskFromServer(taskId) {
  if (isGuest) return;

  try {
    await apiRequest(`/tasks/${taskId}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Failed to delete task:', error);
    alert('Failed to delete task');
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function updateCounters() {
  const completedTasks = document.querySelectorAll("#list-container li.completed").length;
  const uncompletedTasks = document.querySelectorAll("#list-container li:not(.completed)").length;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}

function attachTaskListeners(li) {
  const checkbox = li.querySelector("input[type='checkbox']");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("span");
  const deleteBtn = li.querySelector(".delete-btn");

  checkbox.addEventListener("click", async function() {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();

    const taskId = parseInt(li.dataset.taskId);
    if (taskId && !isGuest) {
      await updateTaskOnServer(taskId, { text: taskSpan.textContent, completed: checkbox.checked });
    }
  });

  editBtn.addEventListener("click", async function() {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null && update.trim() !== "") {
      taskSpan.textContent = update.trim();
      li.classList.remove("completed");
      checkbox.checked = false;
      updateCounters();

      const taskId = parseInt(li.dataset.taskId);
      if (taskId && !isGuest) {
        await updateTaskOnServer(taskId, { text: update.trim(), completed: false });
      }
    }
  });

  deleteBtn.addEventListener("click", async function() {
    if (confirm("Are you sure you want to delete this task?")) {
      const taskId = parseInt(li.dataset.taskId);
      if (taskId && !isGuest) {
        await deleteTaskFromServer(taskId);
      }
      li.remove();
      updateCounters();
    }
  });
}

async function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    return;
  }

  if (isGuest) {
    // Гости - только локально
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="checkbox">
        <span>${escapeHtml(task)}</span>
      </label>
      <span class="edit-btn">Edit</span>
      <span class="delete-btn">Delete</span>
    `;
    listContainer.appendChild(li);
    inputBox.value = "";
    inputBox.focus();
    attachTaskListeners(li);
    updateCounters();
  } else {
    // Авторизованные пользователи - на сервер
    inputBox.value = "";
    await saveTask(task);
  }
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
    alert("Please enter both username and password");
    return;
  }

  await login(username, password);
});

signupBtn.addEventListener("click", async function() {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const confirmPass = document.getElementById("signup-confirm").value.trim();

  if (!username || !password || !confirmPass) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPass) {
    alert("Passwords do not match!");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  await signup(username, password);
});

logoutBtn.addEventListener("click", logout);

inputBox.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    addTask();
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
      isGuest = currentUser.username === "Guest";

      if (isGuest) {
        showApp();
      } else {
        showApp();
        await loadTasks();
      }
    } catch (error) {
      console.error('Session restore failed:', error);
      logout();
    }
  } else {
    showAuth();
  }
});
