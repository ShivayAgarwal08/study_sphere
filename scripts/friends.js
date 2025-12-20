// Friends Page JavaScript - Enhanced with Remove Friend

// DOM Elements
const addFriendBtn = document.getElementById('addFriendBtn');
const addFriendModal = document.getElementById('addFriendModal');
const closeModal = document.getElementById('closeModal');
const cancelAdd = document.getElementById('cancelAdd');
const sendRequest = document.getElementById('sendRequest');

// Mock friends data
const friendsData = [
    { id: 1, name: 'Sarah Miller', username: '@sarah_m', initials: 'SM', xp: 3980, streak: 25, level: 16, online: true },
    { id: 2, name: 'Alex Johnson', username: '@alexj', initials: 'AJ', xp: 4850, streak: 28, level: 18, online: true },
    { id: 3, name: 'Emily Chen', username: '@emily_c', initials: 'EC', xp: 5420, streak: 35, level: 20, online: false },
    { id: 4, name: 'Michael Park', username: '@mike_p', initials: 'MP', xp: 2180, streak: 12, level: 11, online: true },
    { id: 5, name: 'Lisa Rodriguez', username: '@lisa_r', initials: 'LR', xp: 4320, streak: 22, level: 17, online: false },
    { id: 6, name: 'David Kim', username: '@david_k', initials: 'DK', xp: 3650, streak: 19, level: 14, online: false }
];

// Initialize
function init() {
    attachEventListeners();
    attachRemoveFriendListeners();
}

// Attach event listeners
function attachEventListeners() {
    // Open modal
    if (addFriendBtn) {
        addFriendBtn.addEventListener('click', () => {
            addFriendModal.style.display = 'flex';
        });
    }

    // Close modal
    [closeModal, cancelAdd].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                addFriendModal.style.display = 'none';
            });
        }
    });

    // Send friend request
    if (sendRequest) {
        sendRequest.addEventListener('click', () => {
            const input = document.getElementById('friendEmail');
            if (input && input.value.trim()) {
                showNotification('Friend request sent to ' + input.value);
                input.value = '';
                addFriendModal.style.display = 'none';
            } else {
                showNotification('Please enter an email or username', 'error');
            }
        });
    }

    // Close modal on outside click
    if (addFriendModal) {
        addFriendModal.addEventListener('click', (e) => {
            if (e.target === addFriendModal) {
                addFriendModal.style.display = 'none';
            }
        });
    }
    
    // Friend request actions
    document.querySelectorAll('.request-actions button').forEach(btn => {
        btn.addEventListener('click', function() {
            const requestItem = this.closest('.request-item');
            const name = requestItem.querySelector('.request-name').textContent;
            
            if (this.classList.contains('btn-primary')) {
                showNotification(`You are now friends with ${name}!`);
            } else {
                showNotification(`Friend request from ${name} declined`);
            }
            
            requestItem.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => requestItem.remove(), 300);
        });
    });
}

// Attach remove friend listeners
function attachRemoveFriendListeners() {
    document.querySelectorAll('.remove-friend-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const friendCard = this.closest('.friend-card');
            const friendName = friendCard.querySelector('.friend-name').textContent;
            
            showConfirmDialog(
                '👋 Remove Friend',
                `Are you sure you want to remove ${friendName} from your friends list?`,
                () => {
                    friendCard.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        friendCard.remove();
                        showNotification(`${friendName} has been removed from your friends`);
                    }, 300);
                }
            );
        });
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `xp-popup`;
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

// Show confirm dialog
function showConfirmDialog(title, message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="confirm-dialog">
            <div class="confirm-dialog-icon">❓</div>
            <h3 class="confirm-dialog-title">${title}</h3>
            <p class="confirm-dialog-message">${message}</p>
            <div class="confirm-dialog-actions">
                <button class="btn-secondary" id="confirmCancel">Cancel</button>
                <button class="btn-primary remove-friend-btn" id="confirmAction">Remove</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    
    document.getElementById('confirmCancel').addEventListener('click', () => overlay.remove());
    document.getElementById('confirmAction').addEventListener('click', () => {
        onConfirm();
        overlay.remove();
    });
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
}

// Add CSS for fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
