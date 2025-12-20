// Quizzes JavaScript - Enhanced Quiz System

// Quiz data
const quizData = {
    title: "Physics Fundamentals",
    questions: [
        {
            question: "What is the SI unit of force?",
            options: ["Joule", "Newton", "Watt", "Pascal"],
            correct: 1
        },
        {
            question: "Which law of thermodynamics states that energy cannot be created or destroyed?",
            options: ["Zeroth Law", "First Law", "Second Law", "Third Law"],
            correct: 1
        },
        {
            question: "What is the speed of light in a vacuum?",
            options: ["3 × 10⁶ m/s", "3 × 10⁷ m/s", "3 × 10⁸ m/s", "3 × 10⁹ m/s"],
            correct: 2
        },
        {
            question: "Which particle has a positive charge?",
            options: ["Electron", "Neutron", "Proton", "Photon"],
            correct: 2
        },
        {
            question: "What is the formula for kinetic energy?",
            options: ["KE = mgh", "KE = ½mv²", "KE = Fd", "KE = mc²"],
            correct: 1
        },
        {
            question: "What is the unit of electrical resistance?",
            options: ["Ampere", "Volt", "Ohm", "Coulomb"],
            correct: 2
        },
        {
            question: "Which type of wave requires a medium to travel?",
            options: ["Electromagnetic", "Light", "Sound", "Radio"],
            correct: 2
        },
        {
            question: "What is the acceleration due to gravity on Earth?",
            options: ["9.8 m/s", "9.8 m/s²", "10 m/s", "10 m/s²"],
            correct: 1
        },
        {
            question: "What is the principle behind hydraulic systems?",
            options: ["Archimedes", "Pascal's", "Bernoulli's", "Newton's"],
            correct: 1
        },
        {
            question: "Which color of visible light has the longest wavelength?",
            options: ["Violet", "Blue", "Green", "Red"],
            correct: 3
        }
    ]
};

// State
let currentQuestion = 0;
let answers = [];
let timeRemaining = 900; // 15 minutes
let timerInterval = null;
let quizStarted = false;

// DOM Elements
const quizSelection = document.getElementById('quizSelection');
const quizTaking = document.getElementById('quizTaking');
const quizResults = document.getElementById('quizResults');
const startQuizBtns = document.querySelectorAll('.start-quiz-btn');
const prevQuestion = document.getElementById('prevQuestion');
const nextQuestion = document.getElementById('nextQuestion');
const retakeQuiz = document.getElementById('retakeQuiz');
const reviewAnswers = document.getElementById('reviewAnswers');
const backToDashboard = document.getElementById('backToDashboard');

// Initialize
function init() {
    attachEventListeners();
}

// Attach event listeners
function attachEventListeners() {
    startQuizBtns.forEach(btn => {
        btn.addEventListener('click', startQuiz);
    });
    
    if (prevQuestion) prevQuestion.addEventListener('click', goToPrevQuestion);
    if (nextQuestion) nextQuestion.addEventListener('click', goToNextQuestion);
    if (retakeQuiz) retakeQuiz.addEventListener('click', resetQuiz);
    if (reviewAnswers) reviewAnswers.addEventListener('click', showReview);
    if (backToDashboard) backToDashboard.addEventListener('click', () => window.location.href = 'dashboard.html');
}

// Start quiz
function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    answers = new Array(quizData.questions.length).fill(null);
    
    if (quizSelection) quizSelection.style.display = 'none';
    if (quizTaking) quizTaking.style.display = 'block';
    
    renderQuestion();
    startTimer();
}

// Render current question
function renderQuestion() {
    const q = quizData.questions[currentQuestion];
    const questionCard = document.querySelector('.question-card');
    
    if (questionCard) {
        questionCard.innerHTML = `
            <div class="question-text">
                <span class="quiz-question-number">${currentQuestion + 1}</span>
                ${q.question}
            </div>
            <div class="options-list">
                ${q.options.map((option, idx) => `
                    <label class="option-item ${answers[currentQuestion] === idx ? 'selected' : ''}">
                        <input type="radio" name="answer" value="${idx}" ${answers[currentQuestion] === idx ? 'checked' : ''}>
                        <div class="option-content">
                            <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
                            <span class="option-text">${option}</span>
                        </div>
                    </label>
                `).join('')}
            </div>
        `;
        
        // Attach answer listeners
        questionCard.querySelectorAll('input[name="answer"]').forEach(input => {
            input.addEventListener('change', (e) => {
                answers[currentQuestion] = parseInt(e.target.value);
                questionCard.querySelectorAll('.option-item').forEach(item => item.classList.remove('selected'));
                e.target.closest('.option-item').classList.add('selected');
            });
        });
    }
    
    updateProgress();
    updateNavButtons();
}

// Update progress indicators
function updateProgress() {
    const currentEl = document.getElementById('currentQuestion');
    const progressBar = document.getElementById('quizProgress');
    const progressText = document.querySelector('.quiz-progress-text');
    
    if (currentEl) currentEl.textContent = currentQuestion + 1;
    if (progressBar) progressBar.style.width = ((currentQuestion + 1) / quizData.questions.length) * 100 + '%';
    if (progressText) progressText.textContent = `Question ${currentQuestion + 1} of ${quizData.questions.length}`;
}

// Update navigation buttons
function updateNavButtons() {
    if (prevQuestion) prevQuestion.disabled = currentQuestion === 0;
    if (nextQuestion) {
        nextQuestion.textContent = currentQuestion === quizData.questions.length - 1 ? 'Finish Quiz' : 'Next →';
    }
}

// Go to previous question
function goToPrevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

// Go to next question
function goToNextQuestion() {
    if (currentQuestion < quizData.questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

// Finish quiz and show results
function finishQuiz() {
    stopTimer();
    
    // Calculate score
    let correct = 0;
    answers.forEach((answer, idx) => {
        if (answer === quizData.questions[idx].correct) correct++;
    });
    
    const percentage = Math.round((correct / quizData.questions.length) * 100);
    const xpEarned = correct * 10 + (percentage >= 80 ? 50 : percentage >= 60 ? 25 : 0);
    
    if (quizTaking) quizTaking.style.display = 'none';
    if (quizResults) {
        quizResults.style.display = 'block';
        quizResults.innerHTML = `
            <div class="results-container">
                <div class="results-header">
                    <div class="results-icon">${percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '📚'}</div>
                    <h2 class="results-title">Quiz Complete!</h2>
                    <p class="results-subtitle">${percentage >= 80 ? 'Excellent work!' : percentage >= 60 ? 'Good effort!' : 'Keep practicing!'}</p>
                </div>
                
                <div class="results-score">
                    <div class="score-circle">
                        <svg class="score-ring" width="180" height="180">
                            <circle cx="90" cy="90" r="80" fill="none" stroke="var(--gray-200)" stroke-width="12"/>
                            <circle cx="90" cy="90" r="80" fill="none" stroke="var(--primary)" stroke-width="12" 
                                stroke-dasharray="${2 * Math.PI * 80}" 
                                stroke-dashoffset="${2 * Math.PI * 80 * (1 - percentage / 100)}"
                                stroke-linecap="round"/>
                        </svg>
                        <div class="score-text">
                            <div class="score-percentage">${percentage}%</div>
                            <div class="score-label">Score</div>
                        </div>
                    </div>
                </div>
                
                <div class="results-stats">
                    <div class="result-stat">
                        <div class="result-stat-icon">✅</div>
                        <div class="result-stat-value">${correct}</div>
                        <div class="result-stat-label">Correct</div>
                    </div>
                    <div class="result-stat">
                        <div class="result-stat-icon">❌</div>
                        <div class="result-stat-value">${quizData.questions.length - correct}</div>
                        <div class="result-stat-label">Incorrect</div>
                    </div>
                    <div class="result-stat">
                        <div class="result-stat-icon">⭐</div>
                        <div class="result-stat-value">+${xpEarned}</div>
                        <div class="result-stat-label">XP Earned</div>
                    </div>
                </div>
                
                <div class="results-actions">
                    <button class="btn-secondary" id="reviewAnswers">📋 Review Answers</button>
                    <button class="btn-primary" id="retakeQuiz">🔄 Retake Quiz</button>
                    <a href="dashboard.html" class="btn-secondary">🏠 Dashboard</a>
                </div>
            </div>
        `;
        
        // Re-attach event listeners
        document.getElementById('reviewAnswers')?.addEventListener('click', showReview);
        document.getElementById('retakeQuiz')?.addEventListener('click', resetQuiz);
    }
}

// Show answer review
function showReview() {
    const resultsContainer = document.querySelector('.results-container');
    if (resultsContainer) {
        let reviewHTML = `
            <div class="results-header">
                <h2 class="results-title">Answer Review</h2>
            </div>
            <div class="quiz-review-list">
        `;
        
        quizData.questions.forEach((q, idx) => {
            const isCorrect = answers[idx] === q.correct;
            reviewHTML += `
                <div class="quiz-review-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <strong>Q${idx + 1}: ${q.question}</strong>
                        <span>${isCorrect ? '✅' : '❌'}</span>
                    </div>
                    <div style="font-size: 0.875rem; color: var(--text-secondary);">
                        Your answer: <span style="color: ${isCorrect ? 'var(--success)' : 'var(--error)'};">${answers[idx] !== null ? q.options[answers[idx]] : 'Not answered'}</span>
                        ${!isCorrect ? `<br>Correct answer: <span style="color: var(--success);">${q.options[q.correct]}</span>` : ''}
                    </div>
                </div>
            `;
        });
        
        reviewHTML += `
            </div>
            <div class="results-actions" style="margin-top: 2rem;">
                <button class="btn-primary" id="retakeQuiz">🔄 Retake Quiz</button>
                <a href="dashboard.html" class="btn-secondary">🏠 Dashboard</a>
            </div>
        `;
        
        resultsContainer.innerHTML = reviewHTML;
        document.getElementById('retakeQuiz')?.addEventListener('click', resetQuiz);
    }
}

// Reset quiz
function resetQuiz() {
    currentQuestion = 0;
    answers = [];
    timeRemaining = 900;
    
    if (quizResults) quizResults.style.display = 'none';
    if (quizSelection) quizSelection.style.display = 'block';
}

// Timer functions
function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        if (timeRemaining <= 0) {
            finishQuiz();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    const timerEl = document.getElementById('timer');
    if (timerEl) {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Warning color when time is low
        if (timeRemaining <= 60) {
            timerEl.style.color = 'var(--error)';
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
