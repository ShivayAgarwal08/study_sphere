// Dashboard JavaScript - Enhanced with dynamic features

// State
const state = {
    xp: 2450,
    nextLevelXp: 3000,
    level: 12,
    streak: 15,
    streakHistory: [
        { day: 1, status: 'active' },
        { day: 2, status: 'active' },
        { day: 3, status: 'active' },
        { day: 4, status: 'active' },
        { day: 5, status: 'missed' },
        { day: 6, status: 'active', hasFire: true },
        { day: 7, status: 'active' },
        { day: 8, status: 'active' },
        { day: 9, status: 'active' },
        { day: 10, status: 'active' },
        { day: 11, status: 'active' },
        { day: 12, status: 'active' },
        { day: 13, status: 'active', hasFire: true },
        { day: 14, status: 'active' },
        { day: 15, status: 'active' },
        { day: 16, status: 'active' },
        { day: 17, status: 'active' },
        { day: 18, status: 'active' },
        { day: 19, status: 'active' },
        { day: 20, status: 'active', isToday: true, hasFire: true },
        { day: 21, status: 'future' },
        { day: 22, status: 'future' },
        { day: 23, status: 'future' },
        { day: 24, status: 'future' },
        { day: 25, status: 'future' },
        { day: 26, status: 'future' },
        { day: 27, status: 'future' },
        { day: 28, status: 'future' }
    ],
    goals: [
        { id: 'goal1', text: 'Complete daily quiz', xp: 50, completed: true },
        { id: 'goal2', text: 'Study for 30 minutes', xp: 30, completed: true },
        { id: 'goal3', text: 'Review 20 flashcards', xp: 40, completed: true },
        { id: 'goal4', text: 'Upload new study material', xp: 25, completed: false },
        { id: 'goal5', text: 'Challenge a friend', xp: 60, completed: false }
    ]
};

// Initialize
function init() {
    renderGoals();
    updateXPProgress();
    renderStreakCalendar();
    attachEventListeners();
    initNotifications();
}

// Render Streak Calendar
function renderStreakCalendar() {
    const calendar = document.getElementById('streakCalendar');
    if (!calendar) return;

    // Keep the headers
    const headers = `
        <div class="streak-day header">Sun</div>
        <div class="streak-day header">Mon</div>
        <div class="streak-day header">Tue</div>
        <div class="streak-day header">Wed</div>
        <div class="streak-day header">Thu</div>
        <div class="streak-day header">Fri</div>
        <div class="streak-day header">Sat</div>
    `;

    calendar.innerHTML = headers + state.streakHistory.map(day => `
        <div class="streak-day ${day.status} ${day.isToday ? 'today' : ''}">
            ${day.day}
            ${day.hasFire ? '<span class="fire-icon">🔥</span>' : ''}
        </div>
    `).join('');
}

// Render goals
function renderGoals() {
    const goalsList = document.querySelector('.goals-list');
    if (!goalsList) return;

    goalsList.innerHTML = state.goals.map(goal => `
        <div class="goal-item ${goal.completed ? 'completed' : ''}">
            <input type="checkbox" id="${goal.id}" ${goal.completed ? 'checked' : ''}>
            <label for="${goal.id}">
                <span class="goal-text">${goal.text}</span>
                <span class="goal-xp">+${goal.xp} XP</span>
            </label>
        </div>
    `).join('');

    // Re-attach checkbox listeners
    goalsList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const goalId = this.id;
            const goal = state.goals.find(g => g.id === goalId);
            if (goal) {
                goal.completed = this.checked;
                this.closest('.goal-item').classList.toggle('completed', this.checked);
                
                if (this.checked) {
                    showXPPopup(goal.xp);
                    showToast('Goal Completed!', `You earned ${goal.xp} XP for "${goal.text}"`, 'success');
                    state.xp += goal.xp;
                    updateXPProgress();
                }
            }
        });
    });
}

// Update XP Progress bar
function updateXPProgress() {
    const progressBar = document.querySelector('.progress-fill');
    const xpText = document.querySelector('.xp-value');
    
    if (progressBar) {
        const percentage = (state.xp / state.nextLevelXp) * 100;
        progressBar.style.width = `${percentage}%`;
    }
    
    if (xpText) {
        xpText.textContent = `${state.xp} / ${state.nextLevelXp} XP`;
    }
}

// Show XP Popup animation
function showXPPopup(amount) {
    const popup = document.createElement('div');
    popup.className = 'xp-popup';
    popup.innerHTML = `
        <div class="xp-popup-icon">⭐</div>
        <div class="xp-popup-amount">+${amount} XP</div>
    `;
    document.body.appendChild(popup);
    
    // Position near the top bar or cursor
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }, 2000);
}

// Attach event listeners
function attachEventListeners() {
    // Quick actions animation
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-5px)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });

    // Logout confirmation
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            if (!confirm('Are you sure you want to logout?')) {
                e.preventDefault();
            }
        });
    }
}

// Notifications
function initNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            showSimpleModal('Notifications', `
                <div class="notification-item">
                    <span class="notif-icon">🎯</span>
                    <div class="notif-content">
                        <strong>Quiz results available</strong>
                        <p>You scored 90% in Physics Fundamentals!</p>
                    </div>
                </div>
                <div class="notification-item">
                    <span class="notif-icon">⚔️</span>
                    <div class="notif-content">
                        <strong>Friend challenge received</strong>
                        <p>Sarah Miller challenged you to a Quiz Battle!</p>
                    </div>
                </div>
                <div class="notification-item">
                    <span class="notif-icon">🏆</span>
                    <div class="notif-content">
                        <strong>New badge earned!</strong>
                        <p>You've unlocked the "Streak Master" badge.</p>
                    </div>
                </div>
            `);
        });
    }
}

// Simple modal utility
function showSimpleModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal" style="max-width: 400px;">
            <div class="modal-header">
                <h2 class="modal-title">${title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                <button class="btn-primary" id="closeSimpleModal">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const close = () => {
        modal.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', close);
    modal.querySelector('#closeSimpleModal').addEventListener('click', close);
}

// Run init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
