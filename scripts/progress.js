// Progress Page JavaScript - Enhanced Interactivity

// DOM Elements
const progressForm = document.getElementById('progressForm');
const xpReward = document.getElementById('xpReward');
const closeXpReward = document.getElementById('closeXpReward');
const subjectOptions = document.querySelectorAll('.subject-option');
const dateDisplay = document.getElementById('dateDisplay');
const dateInput = document.getElementById('dateInput');

// Initialize
function init() {
    attachEventListeners();
    updateDateDisplay();
}

// Attach event listeners
function attachEventListeners() {
    // Subject selection visual feedback
    subjectOptions.forEach(option => {
        const input = option.querySelector('input');
        input.addEventListener('change', () => {
            subjectOptions.forEach(o => o.querySelector('.subject-card').classList.remove('selected'));
            if (input.checked) {
                option.querySelector('.subject-card').classList.add('selected');
            }
        });
    });

    // Time spent selection visual feedback
    document.querySelectorAll('.time-option input').forEach(input => {
        input.addEventListener('change', () => {
            document.querySelectorAll('.time-card').forEach(c => c.classList.remove('selected'));
            if (input.checked) {
                input.nextElementSibling.classList.add('selected');
            }
        });
    });

    // Handle form submission
    if (progressForm) {
        progressForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Calculate XP
            let xp = 50; // Base XP
            const timeSpent = document.querySelector('input[name="timeSpent"]:checked');
            if (timeSpent) {
                const val = parseInt(timeSpent.value);
                xp += (val >= 60) ? 100 : val;
            }
            if (document.getElementById('quizCompleted').checked) xp += 50;
            if (document.getElementById('flashcardsReviewed').checked) xp += 30;
            
            showSuccess(xp);
        });
    }

    // Close XP reward
    if (closeXpReward) {
        closeXpReward.addEventListener('click', () => {
            xpReward.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => {
                xpReward.style.display = 'none';
                xpReward.style.animation = '';
                progressForm.reset();
                resetSelections();
            }, 300);
        });
    }

    // Date navigation
    const prevDay = document.getElementById('prevDay');
    const nextDay = document.getElementById('nextDay');

    if (prevDay && nextDay && dateInput) {
        prevDay.addEventListener('click', () => shiftDate(-1));
        nextDay.addEventListener('click', () => shiftDate(1));
        dateInput.addEventListener('change', updateDateDisplay);
    }
}

// Shift date helper
function shiftDate(days) {
    const date = new Date(dateInput.value);
    date.setDate(date.getDate() + days);
    dateInput.value = date.toISOString().split('T')[0];
    updateDateDisplay();
}

// Update the formatted date display
function updateDateDisplay() {
    if (!dateInput || !dateDisplay) return;
    const date = new Date(dateInput.value);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toISOString().split('T')[0];
    
    let prefix = '';
    if (dateInput.value === today) prefix = 'Today, ';
    
    dateDisplay.textContent = prefix + date.toLocaleDateString('en-US', options);
}

// Show success animation
function showSuccess(xp) {
    const xpAmountEl = document.getElementById('xpAmount');
    if (xpAmountEl) xpAmountEl.textContent = `+${xp} XP`;
    
    xpReward.style.display = 'flex';
    xpReward.style.animation = 'fadeIn 0.5s forwards';
    
    // Confetti effect (mock)
    launchConfetti();
}

// Reset visual states
function resetSelections() {
    subjectOptions.forEach(o => o.querySelector('.subject-card').classList.remove('selected'));
    document.querySelectorAll('.time-card').forEach(c => c.classList.remove('selected'));
}

// Mock confetti
function launchConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Run init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
