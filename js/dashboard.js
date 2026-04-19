const dashboardManager = {
    init: async () => {
        const user = await api.getMe();
        document.getElementById('user-name-display').innerText = user.full_name || 'Student';
        document.getElementById('xp-display').innerText = user.xp || 0;
        document.getElementById('level-display').innerText = `Lvl ${user.level || 1}`;
        
        dashboardManager.renderTasks();
        dashboardManager.updateProgressRing();
        dashboardManager.renderStreak();
        dashboardManager.loadQuote();
    },

    renderTasks: async () => {
        const tasks = await api.getTasks();
        const container = document.getElementById('dashboard-tasks');
        const pending = tasks.filter(t => !t.completed).slice(0, 4);
        
        if (pending.length === 0) {
            container.innerHTML = `<li class="task-item" style="justify-content: center; opacity: 0.7;">No pending tasks! Enjoy your break.</li>`;
            return;
        }

        container.innerHTML = pending.map(t => `
            <li class="task-item" onclick="todoManager.toggle(${t.id}, ${t.completed}, '${t.text.replace(/'/g, "\\'")}')">
                <div class="checkbox-circle"></div>
                <span>${t.text}</span>
            </li>
        `).join('');
    },

    updateProgressRing: async () => {
        const tasks = await api.getTasks();
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
        
        const ring = document.getElementById('progress-value');
        const text = document.getElementById('daily-progress-pct');
        
        // Circumference is 2 * PI * R = 2 * 3.14 * 65 ≈ 408
        const offset = 408 - (pct / 100) * 408;
        ring.style.strokeDashoffset = offset;
        text.innerText = `${pct}%`;
    },

    renderStreak: () => {
        const user = JSON.parse(localStorage.getItem('user_data') || '{}');
        const streakEl = document.getElementById('streak-count');
        streakEl.innerText = `${user.streak || 0} Days`;
    },

    loadQuote: () => {
        const quotes = [
            "Believe you can and you're halfway there.",
            "Don't stop until you're proud.",
            "Action is the foundational key to all success.",
            "Your only limit is your mind.",
            "Focus on being productive instead of busy."
        ];
        document.getElementById('motivational-quote').innerText = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
    }
};
