const analyticsManager = {
    render: async () => {
        const container = document.getElementById('analytics-content');
        if (!container) return;
        
        // Simple visualization for MVP
        // In a real app we'd fetch actual study session logs
        const user = JSON.parse(localStorage.getItem('user_data'));
        
        container.innerHTML = `
            <div class="glass-card">
                <h3>Consistency Score</h3>
                <div class="consistency-chart" style="display:flex; gap: 8px; margin-top: 1rem;">
                    ${[...Array(7)].map((_, i) => `
                        <div class="day-bar" style="flex:1; height: ${Math.random()*100 + 20}px; background: var(--primary); border-radius: 4px;"></div>
                    `).join('')}
                </div>
                <div style="display:flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.7rem; color: var(--text-muted);">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
            </div>
            
            <div class="glass-card" style="margin-top: 1.5rem;">
                <h3>Status: ${user.is_pro ? '💎 PRO Member' : 'Basic Member'}</h3>
                <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-muted);">
                    ${user.is_pro ? 'You have full access to all insights and unlimited groups.' : 'Upgrade to Pro to unlock advanced analytics and deeper insights!'}
                </p>
                ${!user.is_pro ? `<button class="btn btn-primary" style="margin-top: 1rem;" onclick="analyticsManager.upgrade()">Upgrade to Pro</button>` : ''}
            </div>
        `;
    },
    
    upgrade: async () => {
        if (confirm("Proceed to upgrade to StudySphere Pro?")) {
            await api.upgradePro();
            alert("Congratulations! You are now a PRO member! 🚀");
            app.refreshUser();
            analyticsManager.render();
        }
    }
};
