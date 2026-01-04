// State Management
let currentUser = localStorage.getItem('studySphereUser');
let tasks = JSON.parse(localStorage.getItem('studySphereTasks')) || [
    { id: 1, text: "Finish Math Assignment", completed: false },
    { id: 2, text: "Read History Chapter 5", completed: true },
];
let notes = JSON.parse(localStorage.getItem('studySphereNotes')) || [
    { title: "Chemistry Reactions", content: "Remember: Acid + Base -> Salt + Water" }
];

// DOM Elements
const views = [
    'landing-page', 'auth-page', 'app-layout'
];
const dashboardViews = [
    'view-dashboard', 'view-academic', 'view-tasks', 'view-material', 'view-friends', 'view-profile', 'view-analytics', 'view-notes'
];

// Initialization
window.addEventListener('DOMContentLoaded', () => {
    if (currentUser) {
        showDashboard();
    } else {
        showLanding();
    }
    renderTasks();
    renderNotes();
});

// -- Navigation --

function showLanding() {
    hideAll();
    const landing = document.getElementById('landing-page');
    if(landing) landing.classList.remove('hidden');
}

function showAuth(mode = 'login') {
    hideAll();
    const auth = document.getElementById('auth-page');
    if(auth) auth.classList.remove('hidden');
    
    // Toggle fields based on mode
    const isSignup = mode === 'signup';
    document.getElementById('signup-fields').classList.toggle('hidden', !isSignup);
    document.getElementById('auth-title').innerText = isSignup ? 'Create Account' : 'Welcome Back';
    document.getElementById('auth-switch-text').innerText = isSignup ? 'Already have an account?' : 'New here?';
}

function showDashboard() {
    hideAll();
    document.getElementById('app-layout').classList.remove('hidden');
    document.getElementById('user-name-display').innerText = currentUser || "Student";
    navTo('dashboard');
}

function hideAll() {
    views.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.classList.add('hidden');
    });
}

function navTo(viewName) {
    // Update Sidebar Active State
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active');
        if (el.innerText.toLowerCase().includes(viewName)) {
            el.classList.add('active');
        }
    });

    // Hide all dashboard sub-views
    dashboardViews.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });

    // Show selected view
    const target = document.getElementById(`view-${viewName}`);
    if (target) target.classList.remove('hidden');

    // Dynamic Title
    document.getElementById('page-title').innerText = viewName.charAt(0).toUpperCase() + viewName.slice(1);
}

// -- Auth --

function toggleAuthMode() {
    const title = document.getElementById('auth-title').innerText;
    if (title.includes('Welcome')) showAuth('signup');
    else showAuth('login');
}

function handleAuth(e) {
    e.preventDefault();
    const email = document.querySelector('input[type="email"]').value;
    currentUser = email.split('@')[0]; // Dummy username from email
    localStorage.setItem('studySphereUser', currentUser);
    
    // Simulate loading
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = "Loading...";
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
        showDashboard();
    }, 1000);
}

function logout() {
    localStorage.removeItem('studySphereUser');
    currentUser = null;
    showLanding();
}

// -- Features --

// Tasks
function renderTasks() {
    const list = document.getElementById('tasks-list');
    list.innerHTML = '';
    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task-item';
        div.innerHTML = `
            <div class="task-checkbox ${task.completed ? 'completed' : ''}" onclick="toggleTask(${task.id})">
                ${task.completed ? '✓' : ''}
            </div>
            <span style="${task.completed ? 'text-decoration: line-through; opacity: 0.5' : ''}">${task.text}</span>
        `;
        list.appendChild(div);
    });
    localStorage.setItem('studySphereTasks', JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById('new-task-input');
    if (!input.value.trim()) return;
    
    tasks.push({
        id: Date.now(),
        text: input.value,
        completed: false
    });
    input.value = '';
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

// AI Simulation
function simulateAI() {
    const btn = document.querySelector('#view-material button');
    const output = document.getElementById('ai-output');
    
    btn.disabled = true;
    btn.innerText = "Generating... 🤖";
    
    setTimeout(() => {
        btn.disabled = false;
        btn.innerText = "Generate Flashcards 🪄";
        output.classList.remove('hidden');
        output.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}

// Chat
function handleChat(e) {
    if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const box = document.getElementById('chat-box');
    const text = input.value.trim();
    
    if (!text) return;

    // Add User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'message sent';
    userMsg.innerText = text;
    box.appendChild(userMsg);
    
    input.value = '';
    box.scrollTop = box.scrollHeight;

    // Simulate Reply
    setTimeout(() => {
        const reply = document.createElement('div');
        reply.className = 'message received';
        reply.innerText = "That sounds great! Keep it up! 👍";
        box.appendChild(reply);
        box.scrollTop = box.scrollHeight;
    }, 2000);
}

// Notes
function renderNotes() {
    const grid = document.getElementById('notes-grid');
    // Clear existing notes but keep the "New Note" logic if needed, 
    // actually grid has static content in HTML, let's clear it and render dynamic
    grid.innerHTML = '';
    
    // Add "New Note" Button as a card if we want, or just render notes
    notes.forEach(note => {
        const div = document.createElement('div');
        div.className = 'glass p-4 bg-white/5 cursor-pointer hover:bg-white/10 transition';
        div.innerHTML = `
            <h4 class="font-bold mb-2">${note.title}</h4>
            <p class="text-sm text-muted line-clamp-3">${note.content}</p>
        `;
        grid.appendChild(div);
    });
}

function newNote() {
    const title = prompt("Note Title:");
    if (!title) return;
    const content = prompt("Note Content:");
    
    notes.push({ title, content: content || "" });
    localStorage.setItem('studySphereNotes', JSON.stringify(notes));
    renderNotes();
}
