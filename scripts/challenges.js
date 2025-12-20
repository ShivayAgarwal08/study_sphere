// Challenges JavaScript - Enhanced with Create Challenge Modal

// DOM Elements
const tabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const createChallengeBtn = document.getElementById('createChallengeBtn');
const createChallengeModal = document.getElementById('createChallengeModal');
const closeCreateChallenge = document.getElementById('closeCreateChallenge');
const cancelCreateChallenge = document.getElementById('cancelCreateChallenge');
const sendChallenge = document.getElementById('sendChallenge');

// State
let selectedChallengeType = 'quiz';
let selectedFriend = null;
let selectedDuration = 1;

// Initialize
function init() {
    attachTabListeners();
    attachModalListeners();
    attachSelectorListeners();
    startCountdownTimers();
}

// Tab switching
function attachTabListeners() {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
                if (content.id === targetTab + 'Tab') {
                    content.classList.add('active');
                    content.style.display = 'block';
                }
            });
        });
    });
}

// Modal listeners
function attachModalListeners() {
    // Open modal
    if (createChallengeBtn) {
        createChallengeBtn.addEventListener('click', () => {
            createChallengeModal.style.display = 'flex';
        });
    }
    
    // Close modal
    [closeCreateChallenge, cancelCreateChallenge].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                createChallengeModal.style.display = 'none';
            });
        }
    });
    
    // Close on outside click
    if (createChallengeModal) {
        createChallengeModal.addEventListener('click', (e) => {
            if (e.target === createChallengeModal) {
                createChallengeModal.style.display = 'none';
            }
        });
    }
    
    // Send challenge
    if (sendChallenge) {
        sendChallenge.addEventListener('click', () => {
            if (!selectedFriend) {
                showNotification('Please select a friend to challenge', 'warning');
                return;
            }
            
            const friendName = document.querySelector(`[data-friend="${selectedFriend}"] .user-name-small`)?.textContent;
            showNotification(`Challenge sent to ${friendName}! 🚀`);
            createChallengeModal.style.display = 'none';
            
            // Reset selections
            resetSelections();
        });
    }
}

// Selector listeners
function attachSelectorListeners() {
    // Challenge type
    document.querySelectorAll('.challenge-type-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.challenge-type-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            selectedChallengeType = option.dataset.type;
        });
    });
    
    // Friend selector
    document.querySelectorAll('.friend-selector-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.friend-selector-item').forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            item.querySelector('input').checked = true;
            selectedFriend = item.dataset.friend;
        });
    });
    
    // Duration selector
    document.querySelectorAll('.duration-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.duration-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            selectedDuration = parseInt(option.dataset.duration);
        });
    });
}

// Reset selections
function resetSelections() {
    selectedChallengeType = 'quiz';
    selectedFriend = null;
    selectedDuration = 1;
    
    document.querySelectorAll('.challenge-type-option').forEach((o, i) => {
        o.classList.toggle('selected', i === 0);
    });
    document.querySelectorAll('.friend-selector-item').forEach(i => {
        i.classList.remove('selected');
        i.querySelector('input').checked = false;
    });
    document.querySelectorAll('.duration-option').forEach((o, i) => {
        o.classList.toggle('selected', i === 0);
    });
}

// Start countdown timers
function startCountdownTimers() {
    // Mock countdown - update timer displays periodically
    const timers = document.querySelectorAll('.timer-text');
    // In a real app, this would use actual timestamps
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'xp-popup';
    notification.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">${type === 'success' ? '✅' : '⚠️'}</div>
        <p>${message}</p>
    `;
    notification.style.padding = '1.5rem';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add CSS for fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
