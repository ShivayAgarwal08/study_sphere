const app = {
    loadDashboard: async () => {
        try {
            // Ensure we have user data
            let user = await api.getMe();
            localStorage.setItem('user_data', JSON.stringify(user));
            
            await dashboard.render();
            academicManager.render();
            todoManager.render();
            notesManager.render();
            
            router.navigateTo('dashboard');
        } catch (e) {
            console.error(e);
            authManager.logout();
        }
    },

    refreshUser: async () => {
        try {
            const user = await api.getMe();
            localStorage.setItem('user_data', JSON.stringify(user));
            // Update UI elements that depend on user stats
            document.getElementById('xp-display').textContent = user.xp;
            document.getElementById('level-display').textContent = 'Lvl ' + user.level;
            document.getElementById('streak-display').textContent = user.streak;
            
            // Animation for XP gain
            const xpPill = document.querySelector('.xp-pill');
            if (xpPill) {
                xpPill.classList.add('pulse-animation');
                setTimeout(() => xpPill.classList.remove('pulse-animation'), 1000);
            }
        } catch (e) {
            console.error('Refresh user failed', e);
        }
    }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    authManager.init();

    // Sidebar Navigation
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            if (target) {
                router.navigateTo(target);
                // Trigger specific renders if needed
                if (target === 'notes') notesManager.render();
                if (target === 'academic') academicManager.render();
                if (target === 'tasks') todoManager.render();
            }
        });
    });

    // Mobile Menu
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
        });
    }

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('studySphereTheme', isLight ? 'light' : 'dark');
        });
    }
    const savedTheme = localStorage.getItem('studySphereTheme');
    if (savedTheme === 'light') document.body.classList.add('light-theme');

    router.init();
});
