const authManager = {
    init: () => {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');

        if (loginForm) loginForm.addEventListener('submit', authManager.handleLogin);
        if (signupForm) signupForm.addEventListener('submit', authManager.handleSignup);
    },

    toggleAuth: (mode) => {
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        document.getElementById(`${mode}-form`).classList.add('active');
    },

    handleLogin: async (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        const password = e.target.querySelector('input[type="password"]').value;

        try {
            await api.login(email, password);
             // Verify token by fetching user
             const user = await api.getMe();
             localStorage.setItem('user_data', JSON.stringify(user));
             app.loadDashboard();
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    },

    handleSignup: async (e) => {
        e.preventDefault();
        const inputs = e.target.querySelectorAll('input');
        const name = inputs[0].value;
        const email = inputs[1].value;
        const password = inputs[2].value;
        const confirm = inputs[3].value;

        if (password !== confirm) {
            alert("Passwords do not match");
            return;
        }

        try {
            await api.signup(email, name, password);
            const user = await api.getMe();
            localStorage.setItem('user_data', JSON.stringify(user));
            app.loadDashboard();
        } catch (error) {
            alert('Signup failed: ' + error.message);
        }
    },

    logout: () => {
        api.clearToken();
        localStorage.removeItem('user_data');
        router.navigateTo('landing-page');
    }
};
