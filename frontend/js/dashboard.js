const dashboard = {
    render: async () => {
        const user = JSON.parse(localStorage.getItem('user_data') || '{}');
        const userNameDisplay = document.getElementById('user-name-display');
        if (userNameDisplay) userNameDisplay.textContent = user.full_name ? user.full_name.split(' ')[0] : 'Student';
        
        // Update stats calls
        document.getElementById('xp-display').textContent = user.xp || 0;
        document.getElementById('level-display').textContent = 'Lvl ' + (user.level || 1);
        document.getElementById('streak-display').textContent = user.streak || 0;
        
        // Load Widgets
        await todoManager.render();
        // academicManager.render(); 
    }
};
