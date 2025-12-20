// Authentication JavaScript

// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate login - redirect to dashboard
        window.location.href = 'dashboard.html';
    });
}

// Handle signup form submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate signup - redirect to dashboard
        window.location.href = 'dashboard.html';
    });
}

// Google sign-in button
const googleBtn = document.querySelector('.btn-google');
if (googleBtn) {
    googleBtn.addEventListener('click', () => {
        // Simulate Google sign-in
        window.location.href = 'dashboard.html';
    });
}
