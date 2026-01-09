const router = {
    init: () => {
        // Check for token
        const token = localStorage.getItem('access_token');
        if (token) {
            api.setToken(token);
            app.loadDashboard();
        } else {
            router.navigateTo('landing-page');
        }
    },

    navigateTo: (pageId) => {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // Show target page
        // Check if pageId is a sub-view of app-layout
        const subViews = ['dashboard', 'academic', 'tasks', 'materials', 'notes', 'friends', 'analytics', 'profile'];
        
        if (subViews.includes(pageId)) {
            document.getElementById('app-layout').classList.add('active');
            
            // Update sidebar
            document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
            const activeLink = document.querySelector(`.menu-item[data-target="${pageId}"]`);
            if (activeLink) activeLink.classList.add('active');

            // Show sub section
            document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
            const targetSection = document.getElementById(pageId);
            if (targetSection) targetSection.classList.add('active');
            
        } else {
            const target = document.getElementById(pageId);
            if (target) target.classList.add('active');
        }
    }
};
