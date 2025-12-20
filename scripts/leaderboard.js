// Leaderboard Page JavaScript - Mock Filtering and Highlighting

// Mock Data
const leaderboardData = {
    global: {
        week: [
            { rank: 1, name: 'Emily Chen', initials: 'EC', xp: 5420, streak: 35, level: 20, isChampion: true },
            { rank: 2, name: 'Alex Johnson', initials: 'AJ', xp: 4850, streak: 28, level: 18 },
            { rank: 3, name: 'Lisa Rodriguez', initials: 'LR', xp: 4320, streak: 22, level: 17 },
            { rank: 4, name: 'Sarah Miller', initials: 'SM', xp: 3980, streak: 25, level: 16 },
            { rank: 5, name: 'David Kim', initials: 'DK', xp: 3650, streak: 19, level: 14 },
            { rank: 6, name: 'You', initials: 'JD', xp: 2450, streak: 15, level: 12, isUser: true },
            { rank: 7, name: 'Michael Park', initials: 'MP', xp: 2180, streak: 12, level: 11 },
            { rank: 8, name: 'Jessica Wang', initials: 'JW', xp: 1950, streak: 10, level: 10 }
        ],
        month: [
            { rank: 1, name: 'Alex Johnson', initials: 'AJ', xp: 15420, streak: 31, level: 18, isChampion: true },
            { rank: 2, name: 'Emily Chen', initials: 'EC', xp: 14850, streak: 35, level: 20 },
            { rank: 3, name: 'John Doe', initials: 'JD', xp: 12320, streak: 22, level: 12, isUser: true },
            { rank: 4, name: 'Sarah Miller', initials: 'SM', xp: 11980, streak: 25, level: 16 }
        ]
    },
    friends: {
        week: [
            { rank: 1, name: 'Sarah Miller', initials: 'SM', xp: 3980, streak: 25, level: 16, isChampion: true },
            { rank: 2, name: 'Alex Johnson', initials: 'AJ', xp: 4850, streak: 28, level: 18 },
            { rank: 3, name: 'Emily Chen', initials: 'EC', xp: 5420, streak: 35, level: 20 },
            { rank: 4, name: 'You', initials: 'JD', xp: 2450, streak: 15, level: 12, isUser: true }
        ]
    }
};

// Current State
let currentScope = 'global';
let currentPeriod = 'week';

// DOM Elements
const leaderboardList = document.querySelector('.leaderboard-list');
const podium = document.querySelector('.podium');

// Initialize
function init() {
    renderLeaderboard();
    attachEventListeners();
}

// Render the entire leaderboard view
function renderLeaderboard() {
    const data = leaderboardData[currentScope]?.[currentPeriod] || leaderboardData.global.week;
    
    // Sort logic (if needed, but data is pre-sorted)
    const sortedData = [...data].sort((a, b) => a.rank - b.rank);
    
    renderPodium(sortedData.slice(0, 3));
    renderList(sortedData.slice(3));
}

// Render the top 3 podium
function renderPodium(top3) {
    if (!podium) return;
    
    const [first, second, third] = [
        top3.find(p => p.rank === 1),
        top3.find(p => p.rank === 2),
        top3.find(p => p.rank === 3)
    ];

    podium.innerHTML = `
        <!-- Second Place -->
        ${second ? `
            <div class="podium-item second">
                <div class="podium-rank">2</div>
                <div class="podium-avatar">${second.initials}</div>
                <div class="podium-name">${second.name}</div>
                <div class="podium-stats">
                    <div class="podium-stat"><span>⭐</span> ${second.xp.toLocaleString()}</div>
                    <div class="podium-stat"><span>🔥</span> ${second.streak} days</div>
                </div>
                <div class="podium-stand second-stand">🥈</div>
            </div>
        ` : ''}

        <!-- First Place -->
        ${first ? `
            <div class="podium-item first">
                <div class="podium-rank">1</div>
                <div class="podium-avatar champion">${first.initials}</div>
                <div class="podium-crown">👑</div>
                <div class="podium-name">${first.name}</div>
                <div class="podium-stats">
                    <div class="podium-stat"><span>⭐</span> ${first.xp.toLocaleString()}</div>
                    <div class="podium-stat"><span>🔥</span> ${first.streak} days</div>
                </div>
                <div class="podium-stand first-stand">🥇</div>
            </div>
        ` : ''}

        <!-- Third Place -->
        ${third ? `
            <div class="podium-item third">
                <div class="podium-rank">3</div>
                <div class="podium-avatar">${third.initials}</div>
                <div class="podium-name">${third.name}</div>
                <div class="podium-stats">
                    <div class="podium-stat"><span>⭐</span> ${third.xp.toLocaleString()}</div>
                    <div class="podium-stat"><span>🔥</span> ${third.streak} days</div>
                </div>
                <div class="podium-stand third-stand">🥉</div>
            </div>
        ` : ''}
    `;
}

// Render the ranked list
function renderList(others) {
    if (!leaderboardList) return;
    
    leaderboardList.innerHTML = others.map(user => `
        <div class="leaderboard-item ${user.isUser ? 'current-user' : ''}">
            <div class="rank-number">${user.rank}</div>
            <div class="user-info-row">
                <div class="user-avatar-small">${user.initials}</div>
                <div class="user-details">
                    <div class="user-name-small">${user.name}</div>
                    <div class="user-level-small">Level ${user.level}</div>
                </div>
            </div>
            <div class="user-stats-row">
                <div class="stat-item-small"><span>⭐</span> ${user.xp.toLocaleString()}</div>
                <div class="stat-item-small"><span>🔥</span> ${user.streak}</div>
            </div>
        </div>
    `).join('');
}

// Attach event listeners
function attachEventListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.closest('.filter-group');
            group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (btn.dataset.filter) {
                currentScope = btn.dataset.filter;
            } else if (btn.dataset.period) {
                currentPeriod = btn.dataset.period;
            }
            
            renderLeaderboard();
        });
    });
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
