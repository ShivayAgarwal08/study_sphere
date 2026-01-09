const dashboard = {
    render: async () => {
        const user = JSON.parse(localStorage.getItem('user_data') || '{}');
        document.getElementById('user-name-display').textContent = user.full_name || 'Student';
        document.getElementById('xp-display').textContent = user.xp || 0;
        document.getElementById('level-display').textContent = 'Lvl ' + (user.level || 1);
        
        await dashboard.renderTasks();
    },

    renderTasks: async () => {
        const container = document.getElementById('dashboard-tasks');
        if (!container) return;
        
        try {
            const tasks = await api.getTasks();
            const pending = tasks.filter(t => !t.completed).slice(0, 5);
            
            container.innerHTML = pending.length ? '' : '<li class="placeholder-text">All caught up! 🎉</li>';
            
            pending.forEach(task => {
                const li = document.createElement('li');
                li.className = 'task-item';
                li.innerHTML = `
                    <div class="checkbox" onclick="dashboard.toggle(${task.id}, ${task.completed}, '${task.text}')"></div>
                    <span>${task.text}</span>
                `;
                container.appendChild(li);
            });
        } catch (e) {
            container.innerHTML = 'Error loading tasks.';
        }
    },

    toggle: async (id, status, text) => {
        await api.toggleTask(id, status, text);
        dashboard.renderTasks();
        app.refreshUser();
    }
};
