/**
 * StudySphere - Main Application Logic
 * Architecture: SPA with Vanilla JS
 */

// --- STATE MANAGEMENT ---
const AppState = {
    user: null,
    data: {
        xp: 0,
        level: 1,
        streak: 3,
        tasks: [],
        notes: [],
        friends: [],
        studyTime: { today: 0, total: 0 },
        subjects: [
            { id: 1, name: 'Mathematics', progress: 75, syllabus: ['Algebra', 'Calculus', 'Geometry'], nextClass: 'Mon 10:00 AM' },
            { id: 2, name: 'Physics', progress: 45, syllabus: ['Kinematics', 'Thermodynamics', 'Waves'], nextClass: 'Tue 12:00 PM' },
            { id: 3, name: 'Computer Science', progress: 90, syllabus: ['Data Structures', 'Algorithms', 'Web Dev'], nextClass: 'Wed 09:00 AM' }
        ]
    }
};

// --- ROUTER ---
const router = {
    init: () => {
        // Check for saved user session
        const savedUser = localStorage.getItem('studySphereUser');
        if (savedUser) {
            AppState.user = JSON.parse(savedUser);
            // Load data
            const savedData = localStorage.getItem('studySphereData');
            if (savedData) AppState.data = JSON.parse(savedData);
            
            app.loadDashboard();
        } else {
            router.navigateTo('landing-page');
        }
    },

    navigateTo: (pageId) => {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // Show target page
        const target = document.getElementById(pageId) || document.getElementById('app-layout');
        target.classList.add('active');

        // If inside app layout, handle sub-views
        if (['dashboard', 'academic', 'tasks', 'materials', 'notes', 'friends', 'analytics', 'profile'].includes(pageId)) {
            document.getElementById('app-layout').classList.add('active');
            
            // Update sidebar
            document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
            const activeLink = document.querySelector(`.menu-item[data-target="${pageId}"]`);
            if (activeLink) activeLink.classList.add('active');

            // Show sub section
            document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');
        }
    }
};

// --- APP CONTROLLER ---
const app = {
    toggleAuth: (mode) => {
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        document.getElementById(`${mode}-form`).classList.add('active');
    },

    login: (e) => {
        e.preventDefault();
        // Dummy login
        AppState.user = {
            name: "Shivay Agarwal",
            email: "shivay@example.com",
            avatar: "https://ui-avatars.com/api/?name=Shivay+Agarwal&background=6366f1&color=fff"
        };
        localStorage.setItem('studySphereUser', JSON.stringify(AppState.user));
        
        // Initialize dummy data if empty
        if (!AppState.data.tasks.length) app.seedDummyData();
        
        app.loadDashboard();
    },

    signup: (e) => {
        e.preventDefault();
        alert("Account created successfully! Logging you in...");
        app.login(e);
    },

    logout: () => {
        localStorage.removeItem('studySphereUser');
        AppState.user = null;
        router.navigateTo('landing-page');
    },

    loadDashboard: () => {
        // Update UI with user data
        document.getElementById('user-name-display').textContent = AppState.user.name.split(' ')[0];
        document.getElementById('profile-name').value = AppState.user.name;
        document.getElementById('profile-email').value = AppState.user.email;
        document.getElementById('nav-profile-img').src = AppState.user.avatar;
        document.getElementById('profile-edit-img').src = AppState.user.avatar;
        
        app.updateStats();
        todoManager.render();
        notesManager.render();
        friendsManager.render();
        academicManager.render();
        
        router.navigateTo('dashboard');
    },

    updateStats: () => {
        document.getElementById('xp-display').textContent = AppState.data.xp;
        document.getElementById('level-display').textContent = 'Lvl ' + Math.floor(AppState.data.xp / 100 + 1);
        document.getElementById('streak-display').textContent = AppState.data.streak;
        app.saveData();
    },

    saveData: () => {
        localStorage.setItem('studySphereData', JSON.stringify(AppState.data));
    },

    saveProfile: (e) => {
        e.preventDefault();
        AppState.user.name = document.getElementById('profile-name').value;
        AppState.user.email = document.getElementById('profile-email').value;
        localStorage.setItem('studySphereUser', JSON.stringify(AppState.user));
        alert("Profile saved!");
        app.loadDashboard();
    },

    seedDummyData: () => {
        AppState.data.tasks = [
            { id: 1, text: "Finish Math Chapter 3", completed: false },
            { id: 2, text: "Read Physics History", completed: true },
            { id: 3, text: "Submit CS Assignment", completed: false }
        ];
        AppState.data.notes = [
            { id: 1, title: "Calculus Formulas", body: "Derivative of sin(x) is cos(x)...", date: "2023-10-01" },
            { id: 2, title: "Physics Laws", body: "Newton's First Law: Inertia...", date: "2023-10-02" }
        ];
        AppState.data.friends = [
            { id: 1, name: "Aarav", online: true },
            { id: 2, name: "Zara", online: false }
        ];
        app.saveData();
    }
};

// --- FEATURES ---

// 1. TODO MANAGER
const todoManager = {
    render: () => {
        const dashboardList = document.getElementById('dashboard-tasks');
        const fullList = document.getElementById('full-task-list');
        
        dashboardList.innerHTML = '';
        fullList.innerHTML = '';
        
        const tasks = AppState.data.tasks; 

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.onclick = () => todoManager.toggle(task.id);
            li.innerHTML = `
                <div class="checkbox-circle"></div>
                <span>${task.text}</span>
            `;
            
            // Add to both lists
            if (dashboardList.children.length < 3) {
                dashboardList.appendChild(li.cloneNode(true));
            }
            dashboardList.lastChild && (dashboardList.lastChild.onclick = () => todoManager.toggle(task.id));
            fullList.appendChild(li);
        });
    },

    addFromInput: () => {
        const input = document.getElementById('new-task-input');
        if (!input.value.trim()) return;
        
        AppState.data.tasks.push({
            id: Date.now(),
            text: input.value,
            completed: false
        });
        input.value = '';
        app.saveData();
        todoManager.render();
    },

    toggle: (id) => {
        const task = AppState.data.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            if (task.completed) {
                AppState.data.xp += 10;
            } else {
                AppState.data.xp = Math.max(0, AppState.data.xp - 10);
            }
            app.updateStats();
            todoManager.render();
        }
    },
    
    filter: (type) => {
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(b => b.classList.remove('active'));
        event.target.classList.add('active');
        // Visual filter logic can be added here
        todoManager.render(); 
    }
};

// 2. ACADEMIC MANAGER
const academicManager = {
    render: () => {
        const container = document.getElementById('subjects-container');
        container.innerHTML = '';
        
        AppState.data.subjects.forEach(sub => {
            const card = document.createElement('div');
            card.className = 'glass-card subject-card';
            
            // Generate syllabus list
            const syllabusHtml = sub.syllabus.map(topic => `<li>${topic}</li>`).join('');

            card.innerHTML = `
                <div class="subject-header">
                    <h3>${sub.name}</h3>
                </div>
                <div class="subject-info" style="padding: 1.5rem; padding-top:0;">
                    <div class="progress-bar-container">
                        <div class="label"><span>Progress</span> <span>${sub.progress}%</span></div>
                        <div class="progress-bar"><div class="fill" style="width: ${sub.progress}%"></div></div>
                    </div>
                    
                    <div style="margin-top: 1rem;">
                        <strong><i class="ph ph-clock"></i> Next Class:</strong> ${sub.nextClass}
                    </div>

                    <div style="margin-top: 1rem;">
                        <strong><i class="ph ph-list-dashes"></i> Syllabus:</strong>
                        <ul style="padding-left: 1.2rem; font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-muted);">
                            ${syllabusHtml}
                        </ul>
                    </div>

                    <div style="margin-top: 1rem; display:flex; gap:0.5rem;">
                        <button class="btn btn-sm btn-secondary" onclick="alert('Viewing Timetable for ${sub.name}')"><i class="ph ph-calendar"></i> Timetable</button>
                        <button class="btn btn-sm btn-secondary" onclick="alert('Opening Documents for ${sub.name}')"><i class="ph ph-file-text"></i> Docs</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }
};


// 3. STUDY TIMER
const studyTimer = {
    interval: null,
    seconds: 1500, // 25 mins
    isRunning: false,

    toggle: () => {
        if (studyTimer.isRunning) {
            clearInterval(studyTimer.interval);
            document.getElementById('timer-icon').className = 'ph ph-play';
        } else {
            studyTimer.interval = setInterval(() => {
                if (studyTimer.seconds > 0) {
                    studyTimer.seconds--;
                    studyTimer.updateDisplay();
                } else {
                    studyTimer.toggle();
                    alert("Study Session Complete! +50 XP");
                    AppState.data.xp += 50;
                    app.updateStats();
                }
            }, 1000);
            document.getElementById('timer-icon').className = 'ph ph-pause';
        }
        studyTimer.isRunning = !studyTimer.isRunning;
    },

    reset: () => {
        clearInterval(studyTimer.interval);
        studyTimer.seconds = 1500;
        studyTimer.isRunning = false;
        document.getElementById('timer-icon').className = 'ph ph-play';
        studyTimer.updateDisplay();
    },

    updateDisplay: () => {
        const mins = Math.floor(studyTimer.seconds / 60);
        const secs = studyTimer.seconds % 60;
        document.getElementById('timer-display').textContent = 
            `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        const total = 1500;
        const offset = 440 - (440 * studyTimer.seconds) / total;
        document.getElementById('hh-timer-progress').style.strokeDashoffset = offset;
    }
};

// 4. NOTES MANAGER
const notesManager = {
    render: () => {
        const container = document.getElementById('notes-container');
        container.innerHTML = '';
        AppState.data.notes.forEach(note => {
            const div = document.createElement('div');
            div.className = 'glass-card note-card';
            div.innerHTML = `<h4>${note.title}</h4><p>${note.body}</p><span>${note.date}</span>`;
            div.onclick = () => alert("Viewing note: " + note.title);
            container.appendChild(div);
        });
    },

    createNew: () => {
        document.getElementById('note-editor').classList.remove('hidden');
        document.getElementById('note-title-input').value = '';
        document.getElementById('note-body-input').value = '';
    },

    closeEditor: () => {
        document.getElementById('note-editor').classList.add('hidden');
    },

    saveCurrent: () => {
        const title = document.getElementById('note-title-input').value;
        const body = document.getElementById('note-body-input').value;
        if (title && body) {
            AppState.data.notes.unshift({
                id: Date.now(),
                title,
                body,
                date: new Date().toLocaleDateString()
            });
            app.saveData();
            notesManager.render();
            notesManager.closeEditor();
        }
    }
};

// 5. AI SIMULATION
const aiSim = {
    generate: (type) => {
        const output = document.getElementById('ai-output');
        const input = document.getElementById('ai-input').value;
        
        if (!input.trim()) {
            output.innerHTML = '<div class="placeholder-text">Please enter some text first!</div>';
            return;
        }

        output.innerHTML = '<div class="placeholder-text">Generating... <i class="ph ph-spinner ph-spin"></i></div>';
        
        setTimeout(() => {
            if (type === 'flashcards') {
                output.innerHTML = `
                    <div class="flashcard">
                        <h4>Q: What is the main concept?</h4>
                        <p>A: Based on your text, the main concept appears to be about leveraging AI for education...</p>
                    </div>
                    <div class="flashcard">
                        <h4>Q: Key Terminology</h4>
                        <p>A: Important terms include "Neural Networks", "Data Processing", and "UI/UX Design".</p>
                    </div>
                `;
            } else {
                output.innerHTML = `
                    <div class="glass-card">
                        <h4>Summary</h4>
                        <p>This study material covers the fundamental aspects of the topic. Key points include:</p>
                        <br>
                        <ul>
                            <li>- Definition and Scope</li>
                            <li>- Historical Context</li>
                            <li>- Modern Applications</li>
                        </ul>
                    </div>
                `;
            }
        }, 1500);
    }
};

// 6. FRIENDS MANAGER
const friendsManager = {
    render: () => {
        const ul = document.getElementById('friends-ul');
        ul.innerHTML = '';
        AppState.data.friends.forEach(f => {
            const li = document.createElement('li');
            li.className = 'friend-item';
            li.innerHTML = `
                <div class="friend-img"></div>
                <div>
                    <div>${f.name}</div>
                    <small style="color:${f.online ? 'var(--success)' : 'var(--text-muted)'}">${f.online ? 'Online' : 'Offline'}</small>
                </div>
            `;
            li.onclick = () => friendsManager.selectChat(f);
            ul.appendChild(li);
        });
    },

    addDummy: () => {
        const name = prompt("Enter friend's name:");
        if (name) {
            AppState.data.friends.push({ id: Date.now(), name, online: true });
            app.saveData();
            friendsManager.render();
        }
    },

    selectChat: (friend) => {
        document.getElementById('chat-header').textContent = `Chat with ${friend.name}`;
        document.getElementById('chat-input-area').classList.remove('hidden');
        document.getElementById('chat-messages').innerHTML = `
            <div class="message received">Hey! How is the study going?</div>
        `;
    },

    sendMessage: () => {
        const input = document.getElementById('message-input');
        const text = input.value;
        if (text) {
            const container = document.getElementById('chat-messages');
            const div = document.createElement('div');
            div.className = 'message sent';
            div.textContent = text;
            container.appendChild(div);
            input.value = '';
            container.scrollTop = container.scrollHeight;
            
            // Auto reply
            setTimeout(() => {
                const reply = document.createElement('div');
                reply.className = 'message received';
                reply.textContent = "That sounds great! Keep it up!";
                container.appendChild(reply);
                container.scrollTop = container.scrollHeight;
            }, 1000);
        }
    }
};

// 7. THEME MANAGER
const themeManager = {
    init: () => {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('studySphereTheme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    },

    toggle: () => {
        document.body.classList.toggle('light-theme');
        
        // Save preference
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('studySphereTheme', isLight ? 'light' : 'dark');
        
        // Add a subtle animation effect
        const button = document.querySelector('.theme-toggle');
        button.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            button.style.transform = '';
        }, 300);
    }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Event Listeners for Forms
    document.getElementById('login-form').addEventListener('submit', app.login);
    document.getElementById('signup-form').addEventListener('submit', app.signup);

    // Sidebar Navigation
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            if (target && target !== 'profile') {
                router.navigateTo(target);
            }
            if (target === 'profile') {
                router.navigateTo('profile');
            }
        });
    });

    // Mobile Menu
    document.getElementById('menu-toggle').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('open');
    });

    // Initialize theme
    themeManager.init();

    router.init();
});
