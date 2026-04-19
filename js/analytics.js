const analyticsManager = {
    render: async () => {
        const container = document.getElementById('analytics-content');
        if (!container) return;
        
        const user = JSON.parse(localStorage.getItem('user_data') || '{}');
        const tasks = await api.getTasks();
        const done = tasks.filter(t => t.completed).length;
        
        container.innerHTML = `
            <div class="grid-layout">
                <div class="glass-card">
                    <h3>Focus Distribution</h3>
                    <div style="height: 200px; display: flex; align-items: flex-end; gap: 10px; padding-top: 2rem;">
                        ${[60, 80, 45, 90, 70, 50, 85].map((h, i) => `
                            <div style="flex: 1; height: ${h}%; background: var(--primary); border-radius: 6px; position: relative;" title="${h} mins">
                                <span style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: var(--text-muted);">${['M','T','W','T','F','S','S'][i]}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="glass-card flex-col center">
                    <h3>Productivity</h3>
                    <div style="font-size: 3rem; font-weight: 700; color: var(--accent); margin: 1rem 0;">${done}</div>
                    <p>Tasks Completed</p>
                    <small style="color: var(--text-muted);">Keep it up!</small>
                </div>
            </div>
            
            <div class="glass-card" style="margin-top: 1.5rem; background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1));">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h3>Status: ${user.is_pro ? '💎 PRO Member' : 'Sphere Basic'}</h3>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-muted);">
                            ${user.is_pro ? 'Full access unlocked. You are in the elite tier.' : 'Unlock detailed heatmaps and AI subject coaching.'}
                        </p>
                    </div>
                    ${!user.is_pro ? `<button class="btn btn-primary" onclick="analyticsManager.upgrade()">Upgrade</button>` : '<i class="ph ph-seal-check" style="font-size: 2.5rem; color: var(--accent);"></i>'}
                </div>
            </div>
        `;
    },
    
    upgrade: async () => {
        if (confirm("Unlock StudySphere Pro Features?")) {
            await api.upgradePro();
            alert("Welcome to the elite! PRO status activated. 🚀");
            app.refreshUser();
            analyticsManager.render();
        }
    }
};
