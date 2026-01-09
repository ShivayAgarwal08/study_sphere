const app = {
    loadDashboard: async () => {
        try {
            let user = await api.getMe();
            localStorage.setItem('user_data', JSON.stringify(user));
            
            await dashboard.render();
            academicManager.render();
            todoManager.render();
            notesManager.render();
            
            // Random motivation
            const quotes = [
                "Your future is created by what you do today, not tomorrow.",
                "Success is the sum of small efforts, repeated day in and day out.",
                "Don't wish it were easier. Wish you were better.",
                "Focus on being productive instead of busy.",
                "The secret of getting ahead is getting started."
            ];
            const quoteEl = document.getElementById('motivational-quote');
            if (quoteEl) quoteEl.textContent = `"${quotes[Math.floor(Math.random()*quotes.length)]}"`;
            
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
        } catch (e) {
            console.error('Refresh user failed', e);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    authManager.init();

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            if (target) {
                router.navigateTo(target);
                if (target === 'profile') profileManager.init();
            }
        });
    });

    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
        });
    }

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
