// Flashcards JavaScript - Enhanced with Keyboard Navigation

const flashcard = document.getElementById('flashcard');
const flipCard = document.getElementById('flipCard');
const prevCard = document.getElementById('prevCard');
const nextCard = document.getElementById('nextCard');
const hardBtn = document.getElementById('hardBtn');
const mediumBtn = document.getElementById('mediumBtn');
const easyBtn = document.getElementById('easyBtn');

// Flashcard data
const flashcards = [
    { front: "What is Newton's First Law of Motion?", back: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.", hint: "Think about inertia" },
    { front: "What is the derivative of sin(x)?", back: "cos(x)", hint: "Trigonometric derivatives" },
    { front: "What is the powerhouse of the cell?", back: "The mitochondria - it produces ATP through cellular respiration.", hint: "Biology basics" },
    { front: "What is the chemical formula for water?", back: "H₂O (two hydrogen atoms bonded to one oxygen atom)", hint: "Chemistry fundamentals" },
    { front: "What is the Pythagorean theorem?", back: "a² + b² = c², where c is the hypotenuse of a right triangle.", hint: "Right triangles" }
];

let currentCardIndex = 0;
const totalCards = flashcards.length;
let stats = { reviewed: 0, easy: 0, medium: 0, hard: 0 };
let isFlipped = false;

// Initialize
function init() {
    updateCard();
    attachEventListeners();
    attachKeyboardListeners();
}

// Update card display
function updateCard() {
    const card = flashcards[currentCardIndex];
    
    // Update front content
    const frontContent = document.querySelector('.flashcard-front .card-content p');
    const frontHint = document.querySelector('.flashcard-front .card-hint');
    if (frontContent) frontContent.textContent = card.front;
    if (frontHint) frontHint.textContent = `💡 Hint: ${card.hint}`;
    
    // Update back content
    const backContent = document.querySelector('.flashcard-back .card-content p');
    if (backContent) backContent.textContent = card.back;
    
    // Update progress
    const currentCardEl = document.getElementById('currentCard');
    const totalCardsEl = document.getElementById('totalCards');
    const progressBar = document.getElementById('cardProgress');
    
    if (currentCardEl) currentCardEl.textContent = currentCardIndex + 1;
    if (totalCardsEl) totalCardsEl.textContent = totalCards;
    if (progressBar) progressBar.style.width = ((currentCardIndex + 1) / totalCards) * 100 + '%';
    
    // Reset flip state
    if (flashcard) flashcard.classList.remove('flipped');
    isFlipped = false;
    
    // Update button states
    if (prevCard) prevCard.disabled = currentCardIndex === 0;
}

// Flip the card
function flipCardAction() {
    if (flashcard) {
        flashcard.classList.toggle('flipped');
        isFlipped = !isFlipped;
    }
}

// Go to previous card
function goToPrevCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateCard();
    }
}

// Go to next card
function goToNextCard() {
    if (currentCardIndex < totalCards - 1) {
        currentCardIndex++;
        updateCard();
    } else {
        showCompletion();
    }
}

// Rate card difficulty
function rateCard(difficulty) {
    stats[difficulty]++;
    stats.reviewed++;
    updateStats();
    
    // Show XP animation
    showXPAnimation(difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20);
    
    // Move to next card after rating
    setTimeout(() => {
        if (currentCardIndex < totalCards - 1) {
            goToNextCard();
        } else {
            showCompletion();
        }
    }, 300);
}

// Update stats display
function updateStats() {
    const reviewedEl = document.getElementById('cardsReviewed');
    const easyEl = document.getElementById('easyCards');
    const mediumEl = document.getElementById('mediumCards');
    const hardEl = document.getElementById('hardCards');
    
    if (reviewedEl) reviewedEl.textContent = stats.reviewed;
    if (easyEl) easyEl.textContent = stats.easy;
    if (mediumEl) mediumEl.textContent = stats.medium;
    if (hardEl) hardEl.textContent = stats.hard;
}

// Show XP animation
function showXPAnimation(xp) {
    const xpEl = document.createElement('div');
    xpEl.className = 'xp-flying';
    xpEl.textContent = `+${xp} XP`;
    xpEl.style.top = '50%';
    xpEl.style.left = '50%';
    document.body.appendChild(xpEl);
    
    setTimeout(() => xpEl.remove(), 1500);
}

// Show completion screen
function showCompletion() {
    const viewer = document.querySelector('.flashcard-viewer');
    if (viewer) {
        viewer.innerHTML = `
            <div class="flashcard-complete">
                <div class="flashcard-complete-icon">🎉</div>
                <h2 class="flashcard-complete-title">Session Complete!</h2>
                <p>You reviewed all ${totalCards} flashcards</p>
                <div class="flashcard-complete-stats">
                    <div class="summary-stat">
                        <div class="summary-icon">✅</div>
                        <div>
                            <div class="summary-value">${stats.easy}</div>
                            <div class="summary-label">Easy</div>
                        </div>
                    </div>
                    <div class="summary-stat">
                        <div class="summary-icon">⚖️</div>
                        <div>
                            <div class="summary-value">${stats.medium}</div>
                            <div class="summary-label">Medium</div>
                        </div>
                    </div>
                    <div class="summary-stat">
                        <div class="summary-icon">🔴</div>
                        <div>
                            <div class="summary-value">${stats.hard}</div>
                            <div class="summary-label">Hard</div>
                        </div>
                    </div>
                </div>
                <p style="margin-top: 1rem; color: var(--primary); font-weight: 600;">+${stats.easy * 10 + stats.medium * 15 + stats.hard * 20} XP Earned!</p>
                <button class="btn-primary" style="margin-top: 1.5rem;" onclick="location.reload()">Study Again</button>
            </div>
        `;
    }
}

// Attach click event listeners
function attachEventListeners() {
    if (flashcard) flashcard.addEventListener('click', flipCardAction);
    if (flipCard) flipCard.addEventListener('click', flipCardAction);
    if (prevCard) prevCard.addEventListener('click', goToPrevCard);
    if (nextCard) nextCard.addEventListener('click', goToNextCard);
    if (hardBtn) hardBtn.addEventListener('click', () => rateCard('hard'));
    if (mediumBtn) mediumBtn.addEventListener('click', () => rateCard('medium'));
    if (easyBtn) easyBtn.addEventListener('click', () => rateCard('easy'));
}

// Keyboard navigation
function attachKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case ' ':
            case 'Enter':
                e.preventDefault();
                flipCardAction();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                goToPrevCard();
                break;
            case 'ArrowRight':
                e.preventDefault();
                goToNextCard();
                break;
            case '1':
                if (isFlipped) rateCard('hard');
                break;
            case '2':
                if (isFlipped) rateCard('medium');
                break;
            case '3':
                if (isFlipped) rateCard('easy');
                break;
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
