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
let users = JSON.parse(localStorage.getItem('todo-users')) || [];
let currentUser = null;

// ==================== ФУНКЦИИ АВТОРИЗАЦИИ ====================
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

function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = username;
        localStorage.setItem('current-user', username);
        showApp();
        loadUserTasks();
        return true;
    }
    return false;
}

function signup(username, password) {
    // Проверяем, существует ли пользователь
    if (users.some(u => u.username === username)) {
        alert("Username already exists!");
        return false;
    }
    
    // Создаем нового пользователя
    const newUser = {
        username: username,
        password: password,
        tasks: []
    };
    
    users.push(newUser);
    localStorage.setItem('todo-users', JSON.stringify(users));
    
    currentUser = username;
    localStorage.setItem('current-user', username);
    showApp();
    return true;
}

function loginAsGuest() {
    currentUser = "Guest";
    localStorage.setItem('current-user', 'Guest');
    showApp();
}

function logout() {
    saveUserTasks();
    currentUser = null;
    localStorage.removeItem('current-user');
    listContainer.innerHTML = "";
    updateCounters();
    showAuth();
    clearAuthInputs();
}

function showApp() {
    authContainer.style.display = "none";
    appContainer.style.display = "block";
    currentUserSpan.textContent = currentUser;
}

function showAuth() {
    authContainer.style.display = "flex";
    appContainer.style.display = "none";
}

function saveUserTasks() {
    if (currentUser && currentUser !== "Guest") {
        const tasks = [];
        document.querySelectorAll('#list-container li').forEach(li => {
            const taskText = li.querySelector('span').textContent;
            const isCompleted = li.classList.contains('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });
        
        const userIndex = users.findIndex(u => u.username === currentUser);
        if (userIndex !== -1) {
            users[userIndex].tasks = tasks;
            localStorage.setItem('todo-users', JSON.stringify(users));
        }
    }
}

function loadUserTasks() {
    if (currentUser && currentUser !== "Guest") {
        const user = users.find(u => u.username === currentUser);
        if (user && user.tasks) {
            listContainer.innerHTML = "";
            user.tasks.forEach(taskData => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <label>
                        <input type="checkbox" ${taskData.completed ? 'checked' : ''}>
                        <span>${taskData.text}</span>
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
    }
}

// ==================== СОБЫТИЯ АВТОРИЗАЦИИ ====================
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

loginBtn.addEventListener("click", function() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    
    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }
    
    if (login(username, password)) {
        alert(`Welcome back, ${username}!`);
    } else {
        alert("Invalid username or password");
    }
});

signupBtn.addEventListener("click", function() {
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
    
    if (password.length < 4) {
        alert("Password must be at least 4 characters");
        return;
    }
    
    if (signup(username, password)) {
        alert(`Account created! Welcome, ${username}!`);
    }
});

logoutBtn.addEventListener("click", logout);
// ==================== ФУНКЦИИ СПИСКА ЗАДАЧ ====================
function updateCounters() {
    const completedTasks = document.querySelectorAll("#list-container li.completed").length;
    const uncompletedTasks = document.querySelectorAll("#list-container li:not(.completed)").length;
    
    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
    
    // Сохраняем задачи при каждом изменении
    saveUserTasks();
}

function attachTaskListeners(li) {
    const checkbox = li.querySelector("input[type='checkbox']");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");
    
    checkbox.addEventListener("click", function() {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });
    
    editBtn.addEventListener("click", function() {
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null && update.trim() !== "") {
            taskSpan.textContent = update.trim();
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });
    
    deleteBtn.addEventListener("click", function() {
        if (confirm("Are you sure you want to delete this task?")) {
            li.remove();
            updateCounters();
        }
    });
}

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please write down a task");
        return;
    }
    
    const li = document.createElement("li");
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
    `;
    
    listContainer.appendChild(li);
    inputBox.value = "";
    inputBox.focus();
    
    attachTaskListeners(li);
    updateCounters();
}

// Добавление задачи по нажатию Enter
inputBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// ==================== ИНИЦИАЛИЗАЦИЯ ====================
// Проверяем, есть ли сохраненный пользователь
document.addEventListener("DOMContentLoaded", function() {
    const savedUser = localStorage.getItem('current-user');
    if (savedUser) {
        if (savedUser === "Guest") {
            loginAsGuest();
        } else {
            // Автоматический вход (без пароля для простоты)
            currentUser = savedUser;
            showApp();
            loadUserTasks();
        }
    } else {
        showAuth();
    }
});
