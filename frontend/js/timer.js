const timer = {
    seconds: 1500, // 25 mins
    interval: null,
    isRunning: false,

    init: () => {
        const timerContainer = document.querySelector('.grid-layout');
        if (!timerContainer) return;
        
        // Add timer widget if not exists
        if (!document.getElementById('study-timer-widget')) {
            const div = document.createElement('div');
            div.id = 'study-timer-widget';
            div.className = 'glass-card timer-card';
            div.innerHTML = `
                <h3>Focus Timer</h3>
                <div class="time" id="timer-display" style="font-size: 3rem; margin: 1rem 0;">25:00</div>
                <div class="timer-controls">
                    <button class="btn btn-icon" id="timer-toggle-btn"><i class="ph ph-play"></i></button>
                    <button class="btn btn-icon" id="timer-reset-btn"><i class="ph ph-arrow-counter-clockwise"></i></button>
                </div>
            `;
            timerContainer.insertBefore(div, timerContainer.firstChild);
            
            document.getElementById('timer-toggle-btn').onclick = timer.toggle;
            document.getElementById('timer-reset-btn').onclick = timer.reset;
        }
    },

    toggle: () => {
        if (timer.isRunning) {
            clearInterval(timer.interval);
            document.querySelector('#timer-toggle-btn i').className = 'ph ph-play';
        } else {
            timer.interval = setInterval(() => {
                if (timer.seconds > 0) {
                    timer.seconds--;
                    timer.updateDisplay();
                } else {
                    timer.complete();
                }
            }, 1000);
            document.querySelector('#timer-toggle-btn i').className = 'ph ph-pause';
        }
        timer.isRunning = !timer.isRunning;
    },

    reset: () => {
        clearInterval(timer.interval);
        timer.seconds = 1500;
        timer.isRunning = false;
        timer.updateDisplay();
        document.querySelector('#timer-toggle-btn i').className = 'ph ph-play';
    },

    updateDisplay: () => {
        const m = Math.floor(timer.seconds / 60);
        const s = timer.seconds % 60;
        document.getElementById('timer-display').textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    },

    complete: async () => {
        clearInterval(timer.interval);
        timer.isRunning = false;
        alert("Focus Session Complete! You earned 50 XP! 🚀");
        try {
            await api.addXP(50);
            app.refreshUser();
            timer.reset();
        } catch (e) {
            console.error(e);
        }
    }
};

// Hook into dashboard render
const originalDashboardRender = dashboard.render;
dashboard.render = async () => {
    await originalDashboardRender();
    timer.init();
};
