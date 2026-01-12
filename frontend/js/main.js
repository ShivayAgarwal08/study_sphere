const app = {
    loadDashboard: async () => {
        try {
            const user = await api.getMe();
            localStorage.setItem('user_data', JSON.stringify(user));
            
            await dashboardManager.init();
            academicManager.render();
            todoManager.render();
            notesManager.render();
            groupsManager.render();
            
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
            
            document.getElementById('user-name-display').textContent = user.full_name;
            document.getElementById('xp-display').textContent = user.xp;
            document.getElementById('level-display').textContent = 'Lvl ' + user.level;
            
            const xpPill = document.querySelector('.xp-pill');
            if (xpPill) {
                xpPill.classList.add('pulse-animation');
                setTimeout(() => xpPill.classList.remove('pulse-animation'), 1000);
            }

            // Also update dashboard widgets if active
            if (dashboardManager && typeof dashboardManager.updateProgressRing === 'function') {
                dashboardManager.updateProgressRing();
            }
        } catch (e) {
            console.error('Refresh user failed', e);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    authManager.init();

    // Side Navigation
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.classList.contains('logout')) return;
            e.preventDefault();
            const target = item.getAttribute('data-target');
            if (target) {
                router.navigateTo(target);
                
                // Set active class
                document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
                item.classList.add('active');

                // Init specific views
                if (target === 'profile') profileManager.init();
                if (target === 'analytics') analyticsManager.render();
                if (target === 'dashboard') dashboardManager.init();

                // Close mobile sidebar if open
                document.querySelector('.sidebar').classList.remove('mobile-active');
            }
        });
    });

    // Mobile Toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('mobile-active');
        });
    }

    // Theme Engine
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('studySphereTheme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
    }
    const savedTheme = localStorage.getItem('studySphereTheme');
    if (savedTheme === 'light') document.body.classList.add('light-theme');

    router.init();
});
