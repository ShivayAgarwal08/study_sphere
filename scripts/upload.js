// Upload Page JavaScript

const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const uploadCard = document.getElementById('uploadCard');
const uploadProgress = document.getElementById('uploadProgress');
const uploadSuccess = document.getElementById('uploadSuccess');
const uploadMoreBtn = document.getElementById('uploadMoreBtn');

// Browse button click
if (browseBtn) {
    browseBtn.addEventListener('click', () => fileInput.click());
}

// Drag and drop handlers
if (uploadZone) {
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = 'var(--primary)';
        uploadZone.style.background = 'var(--gray-50)';
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.style.borderColor = '';
        uploadZone.style.background = '';
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    uploadZone.addEventListener('click', () => fileInput.click());
}

// File input change
if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

// Handle file upload
function handleFiles(files) {
    if (files.length === 0) return;
    
    // Hide upload card, show progress
    uploadCard.style.display = 'none';
    uploadProgress.style.display = 'block';
    
    const filesList = document.getElementById('uploadFilesList');
    filesList.innerHTML = Array.from(files).map(file => `
        <div class="upload-file-item">
            <div class="file-info">
                <span class="file-name">${file.name}</span>
                <span class="file-size">${(file.size / 1024).toFixed(1)} KB</span>
            </div>
            <div class="analysis-steps">
                <div class="step active" id="step1">🔍 Scanning</div>
                <div class="step" id="step2">🧠 AI Analysis</div>
                <div class="step" id="step3">📊 Generating Flashcards</div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" id="uploadBar" style="width: 0%"></div>
            </div>
        </div>
    `).join('');

    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        const uploadBar = document.getElementById('uploadBar');
        if (uploadBar) uploadBar.style.width = `${progress}%`;
        
        if (progress === 30) {
            document.getElementById('step2').classList.add('active');
            showToast('AI Analysis', 'Processing document structure...', 'info');
        }
        if (progress === 70) {
            document.getElementById('step3').classList.add('active');
            showToast('Generation', 'Creating interactive materials...', 'info');
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                uploadProgress.style.display = 'none';
                uploadSuccess.style.display = 'block';
                showToast('Success', 'Study materials processed and ready!', 'success');
            }, 500);
        }
    }, 150);
}

// Upload more button
if (uploadMoreBtn) {
    uploadMoreBtn.addEventListener('click', () => {
        uploadSuccess.style.display = 'none';
        uploadCard.style.display = 'block';
    });
}
