<div align="center">
  <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop" alt="StudySphere Banner" width="100%" style="border-radius: 10px; margin-bottom: 20px;">
  
  <h1>🌌 StudySphere</h1>
  <p><strong>Premium Gamified Student Productivity Companion</strong></p>

  <p>
    <a href="#-features"><b>Features</b></a> •
    <a href="#-quick-start"><b>Quick Start</b></a> •
    <a href="#-architecture"><b>Architecture</b></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML Badge">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS Badge">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JS Badge">
    <img src="https://img.shields.io/badge/Local%20Storage-000000?style=for-the-badge&logoColor=white" alt="Storage Badge">
  </p>
</div>

---

## 🌟 About StudySphere

**StudySphere** is the ultimate, 100% serverless academic companion designed to level up your entire academic journey. Featuring a highly aesthetic, state-of-the-art glassmorphism UI, StudySphere keeps you focused, tracks your insights, and rewards your progress through a unified gamified ecosystem. 

Because it's completely serverless, **your data stays entirely private inside your browser!**

---

## 🔥 Gamified Features

| Module | Description |
| :--- | :--- |
| **🎮 Gamified Dashboard** | Earn XP, track daily goals, maintain streaks, and unlock profile achievements. |
| **🎧 Deep Focus Study Room** | A distraction-free zone featuring a Pomodoro timer and integrated Lo-Fi/Ambient audio controls. |
| **📓 Knowledge Base (Notes)** | Write, store, and manage your academic notes with seamless local storage integration. |
| **✅ Smart Task Manager** | Filterable to-do list integrated right into your core study loop. |
| **🌐 Community Circles** | Join groups to chat and share academic goals via an intuitive messaging interface. |

---

## 🏗 Serverless Architecture

StudySphere leverages pure frontend technologies, operating 100% statically in the browser for maximum speed and privacy:

```mermaid
graph TD
    UI[🖥️ User Interface<br/>HTML5, CSS3, Glassmorphism]
    Logic[⚙️ Core Engine<br/>Vanilla JavaScript Modules]
    Storage[(💾 Local Storage<br/>Browser Native API)]

    UI <--> Logic
    Logic <--> Storage

    style UI fill:#1f1f1f,stroke:#f7df1e,color:#fff
    style Logic fill:#005571,stroke:#00a3cc,color:#fff
    style Storage fill:#8b0000,stroke:#ff6347,color:#fff
```

---

## 🚀 Quick Start

Since StudySphere is completely static and serverless, getting started takes literally seconds.

### 1. Requirements
- A modern web browser (Chrome, Edge, Firefox, Safari).

### 2. Launching The App
Clone the repository and jump straight in!
```bash
git clone https://github.com/shivayBadmoss/study_sphere.git
cd study_sphere/frontend
```
Open `index.html` in your favorite web browser—no servers, dependencies, or compilers needed!

---

## 📁 Directory Structure

```text
study_sphere/
├── frontend/
│   ├── index.html        # Main Entry Point & App Layout
│   ├── css/
│   │   └── style.css     # Glassmorphism & UI Animations
│   └── js/
│       ├── main.js       # Core initialization
│       ├── auth.js       # Local authentication & sessions
│       ├── tasks.js      # Task tracking logic
│       ├── notes.js      # Notes system handling
│       ├── timer.js      # Focus room Pomodoro logic
│       ├── ...           # Additional modular scripts
└── README.md             # You are here!
```

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/shivayBadmoss">Shivay Agarwal</a></p>
</div>
