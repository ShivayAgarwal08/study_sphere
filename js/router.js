const router = {
    init: () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            api.setToken(token);
            app.loadDashboard();
        } else {
            router.navigateTo('landing-page');
        }
    },

    navigateTo: (pageId) => {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        const subViews = ['dashboard', 'academic', 'tasks', 'materials', 'notes', 'groups', 'analytics', 'profile'];
        
        if (subViews.includes(pageId)) {
            document.getElementById('app-layout').classList.add('active');
            
            document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
            const activeLink = document.querySelector(`.menu-item[data-target="${pageId}"]`);
            if (activeLink) activeLink.classList.add('active');

            document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
            const targetSection = document.getElementById(pageId);
            if (targetSection) targetSection.classList.add('active');
            
            // Trigger specific page initializations
            if (pageId === 'groups') groupsManager.render();
            if (pageId === 'analytics') analyticsManager.render();
            
        } else {
            const target = document.getElementById(pageId);
            if (target) target.classList.add('active');
            document.getElementById('app-layout').classList.remove('active');
        }
    }
};
