const timer = {
    seconds: 1500, // 25 mins
    interval: null,
    isRunning: false,

    init: () => {
        const mount = document.getElementById('timer-container-mount');
        if (!mount) return;
        
        mount.innerHTML = `
            <div class="circular-progress-large">
                 <svg width="150" height="150">
                     <circle cx="75" cy="75" r="65" stroke="rgba(255,255,255,0.05)" stroke-width="10" fill="none"></circle>
                     <circle id="timer-ring" cx="75" cy="75" r="65" stroke="var(--accent)" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="408" stroke-dashoffset="0"></circle>
                 </svg>
                 <div class="progress-text">
                     <span id="timer-display">25:00</span>
                 </div>
            </div>
            <div class="timer-controls" style="margin-top: 1.5rem;">
                <button class="btn btn-icon" id="timer-toggle-btn"><i class="ph ph-play"></i></button>
                <button class="btn btn-icon" id="timer-reset-btn"><i class="ph ph-arrow-counter-clockwise"></i></button>
            </div>
        `;
        
        document.getElementById('timer-toggle-btn').onclick = timer.toggle;
        document.getElementById('timer-reset-btn').onclick = timer.reset;
        timer.updateDisplay();
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
        document.getElementById('timer-ring').style.strokeDashoffset = 0;
    },

    updateDisplay: () => {
        const m = Math.floor(timer.seconds / 60);
        const s = timer.seconds % 60;
        document.getElementById('timer-display').textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
        
        // Update ring
        const pct = timer.seconds / 1500;
        const offset = 408 * (1 - pct);
        document.getElementById('timer-ring').style.strokeDashoffset = offset;
    },

    complete: async () => {
        clearInterval(timer.interval);
        timer.isRunning = false;
        alert("Focus Session Complete! You earned 50 XP! 🚀");
        try {
            await api.requestXPReward('pomodoro');
            app.refreshUser();
            timer.reset();
        } catch (e) {
            console.error(e);
        }
    }
};

// Auto-init for Study Room view
document.addEventListener('click', (e) => {
    if (e.target.closest('[data-target="study-room"]')) {
        setTimeout(timer.init, 50);
    }
});
