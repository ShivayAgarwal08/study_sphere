# StudySphere Project Documentation

This document provides a comprehensive overview of the StudySphere project, detailing the purpose of each file, the functionality of its pages, and the logic implemented in its scripts.

---

## 📁 Root Directory

### `index.html` (Landing Page)

- **Purpose**: The gateway to StudySphere. Designed with high-end aesthetics (glassmorphism, gradient text) to attract new users.
- **Key Sections**:
  - **Hero Section**: Features a striking value proposition and core stats.
  - **Features Grid**: Showcases the main modules (AI Upload, Progress Tracking, Quizzes etc.) with premium glass cards.
  - **How It Works**: A step-by-step guide to using the platform.
  - **CTA**: Direct links to login and signup pages.

### `styles/main.css`

- **Purpose**: The core design system and styling for the entire application.
- **Key Features**:
  - **Semantic Variables**: Uses `--primary`, `--bg-card`, etc., for consistent theming.
  - **Dark Mode**: Comprehensive implementation using a `:root.dark` selector.
  - **Utility Classes**: Includes `.glass` (glassmorphism), `.gradient-text`, and `.card`.
  - **Responsive Design**: Mobile-first approach with extensive media queries.

---

## 📁 `pages/` Directory

### 🏠 `dashboard.html` (Academic Planner)

- **Purpose**: The central hub for the student's academic life.
- **Key Modules**:
  - **Stats Overview**: Dynamic cards for XP, Level, and Current Streak.
  - **Academic Planner**: Sections for "Upcoming Exams" and "Syllabus Status".
  - **Daily Goals**: Interactive checklist for daily study tasks.
  - **Recent Activity**: A chronological log of student actions.
  - **Gamification**: Visual display of unlocked/locked achievement badges.

### 📅 `academic-data.html`

- **Purpose**: Specialized page for organizing subjects and high-priority documents.
- **Key Features**:
  - **Subject Grid**: Dynamically added subject cards with linked material lists.
  - **Document Vault**: Upload/Download hub for Datesheets and Timetables.
  - **Library Browser**: Search bar for discovering community study materials.

### 👤 `profile-settings.html`

- **Purpose**: User profile management.
- **Key Features**:
  - **Image Upload**: Interactive preview and upload system for student avatars.
  - **Personal Info**: Form for name, bio, and institution.
  - **Preferences**: Account-level toggles for notifications and privacy.

### 📤 `upload.html`

- **Purpose**: Material processing interface.
- **Key Features**:
  - **Drag-and-Drop**: Modern file upload zone.
  - **AI Integration (Mock)**: Simulates AI processing of uploaded notes.

### 🎯 `quizzes.html` & `flashcards.html`

- **Purpose**: Interactive learning modules.
- **Key Features**:
  - **Quiz Engine**: Timed questions, progress tracking, and results review.
  - **Flashcard Deck**: Physics-based flip animations and spatial repetition tracking.

### 👥 `friends.html` & `challenges.html`

- **Purpose**: Social learning features.
- **Key Features**:
  - **Leaderboards**: Global and friend rankings.
  - **Challenge System**: Peer-to-peer study duels with timers and rewards.

---

## 📁 `scripts/` Directory

### `theme.js`

- **Functions**: Managing Dark/Light mode, persisting preference in `localStorage`, and handling the visual toggle animation.

### `dashboard.js`

- **`init()`**: Main entry point for dashboard data hydration.
- **`renderStreakCalendar()`**: Generates the dynamic visual calendar showing study consistency.
- **`renderGoals()`**: Manages the interactive checkbox list and triggers XP reward logic.
- **`updateXPProgress()`**: Calculates the progress bar percentage for leveling up.
- **`showXPPopup(amount)`**: Visual micro-animation to reward user actions.

### `auth.js`

- **Functions**: Handles form validation and mock redirection for login/signup flows.

### `progress.js`

- **Functions**: Manages daily study logs, subject selection logic, and time-tracking visualization.

### `quizzes.js` & `flashcards.js`

- **Functions**: Handle game logic, question timers, result calculations, and flip animations.

### `upload.js`

- **Functions**: Manages file selection, upload progress bars, and simulates "AI metadata extraction" from documents.

### `friends.js`

- **Functions**: Mock friend request handling, search filtering, and profile viewing logic.

---

## 🚀 Key Technologies

- **Frontend**: HTML5, Vanilla CSS3, Javascript (ES6+).
- **Typography**: Google Fonts (Outfit & Inter).
- **Icons**: Emoji & Custom SVG Icons.
- **Theming**: CSS Custom Properties (Variables).
