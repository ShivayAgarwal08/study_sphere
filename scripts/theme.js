// Theme Toggle - Dark Mode Support for StudySphere
// Persists theme preference in localStorage

(function() {
    'use strict';
    
    // Theme configuration
    const THEME_KEY = 'studysphere-theme';
    const DARK = 'dark';
    const LIGHT = 'light';
    
    // Initialize theme on page load
    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? DARK : LIGHT);
        
        // Apply theme without transition on initial load
        document.documentElement.classList.add('no-transition');
        setTheme(theme);
        
        // Re-enable transitions after a brief delay
        setTimeout(() => {
            document.documentElement.classList.remove('no-transition');
        }, 100);
    }
    
    // Set theme on document
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        updateToggleButtons(theme);
    }
    
    // Toggle between light and dark
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT;
        const newTheme = currentTheme === DARK ? LIGHT : DARK;
        setTheme(newTheme);
    }
    
    // Update all toggle buttons on the page
    function updateToggleButtons(theme) {
        // We now handle icon visibility purely via CSS using [data-theme="dark"] selectors
        // This function can remain as a hook if we need to do other things later,
        // but for now, the CSS handle icons based on the data-theme attribute.
    }
    
    // Attach event listeners to toggle buttons
    function attachToggleListeners() {
        document.querySelectorAll('.theme-toggle').forEach(toggle => {
            toggle.addEventListener('click', toggleTheme);
        });
    }
    
    // Listen for system theme changes
    function watchSystemTheme() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(THEME_KEY)) {
                setTheme(e.matches ? DARK : LIGHT);
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initTheme();
            attachToggleListeners();
            watchSystemTheme();
        });
    } else {
        initTheme();
        attachToggleListeners();
        watchSystemTheme();
    }
    
    // === TOAST SYSTEM ===
    function showToast(title, message, type = 'info', duration = 4000) {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;

        container.appendChild(toast);

        // Animate in
        setTimeout(() => toast.classList.add('show'), 100);

        // Automaticaly remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, duration);
    }

    // Expose toggle and toast function globally
    window.toggleTheme = toggleTheme;
    window.setTheme = setTheme;
    window.showToast = showToast;
})();
