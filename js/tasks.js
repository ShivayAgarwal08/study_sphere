const todoManager = {
    render: async () => {
        const dashboardList = document.getElementById('dashboard-tasks');
        const fullList = document.getElementById('full-task-list');
        
        if (!dashboardList && !fullList) return;

        try {
            const tasks = await api.getTasks();
            
            if (dashboardList) dashboardList.innerHTML = '';
            if (fullList) fullList.innerHTML = '';
            
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                li.onclick = () => todoManager.toggle(task.id, task.completed, task.text);
                li.innerHTML = `
                    <div class="checkbox-circle"></div>
                    <span>${task.text}</span>
                `;
                
                // Add to dashboard (limit 3)
                if (dashboardList && dashboardList.children.length < 3) {
                    // Clone for dashboard to avoid move
                    const clone = li.cloneNode(true);
                    clone.onclick = () => todoManager.toggle(task.id, task.completed, task.text);
                    dashboardList.appendChild(clone);
                }
                if (fullList) fullList.appendChild(li);
            });
        } catch (e) {
            console.error(e);
        }
    },

    addFromInput: async () => {
        const input = document.getElementById('new-task-input');
        if (!input.value.trim()) return;
        
        await api.createTask(input.value);
        input.value = '';
        todoManager.render();
    },

    toggle: async (id, status, text) => {
        await api.toggleTask(id, status, text);
        todoManager.render();
    },
    
    filter: (type) => {
        // Client side filtering for MVP on the DOM or refetch with query params
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(b => b.classList.remove('active'));
        if (event) event.target.classList.add('active');
        
        // Simple DOM filter for now
        const items = document.querySelectorAll('#full-task-list .task-item');
        items.forEach(item => {
            const isCompleted = item.classList.contains('completed');
            if (type === 'all') item.style.display = 'flex';
            else if (type === 'completed' && isCompleted) item.style.display = 'flex';
            else if (type === 'pending' && !isCompleted) item.style.display = 'flex';
            else item.style.display = 'none';
        });
    }
};
