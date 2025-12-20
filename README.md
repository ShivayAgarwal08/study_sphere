# StudySphere - Hackathon-Ready Learning Platform

A highly polished, professional frontend UI for a gamified learning platform. Built with modern web technologies and designed for hackathon demonstrations.

## 🎯 Overview

StudySphere is a comprehensive learning platform that combines study tracking, gamification, and social features to create an engaging educational experience. This is a **frontend-only** demo using mock data, perfect for hackathon presentations.

## ✨ Features

### Core Pages

- **Landing Page** - Professional hero section, features showcase, and call-to-action
- **Authentication** - Login & Signup pages with Google sign-in UI
- **Dashboard** - Overview with streak tracking, XP, level, goals, and quick actions
- **Upload Material** - Drag-and-drop file upload with progress animation
- **Daily Progress** - Track study sessions, subjects, time spent, and earn XP
- **Flashcards** - Interactive card-flip interface with difficulty ratings
- **Quizzes** - MCQ interface with timer, progress tracking, and results
- **Friends** - Social features with friend cards and requests
- **Friend Profile** - View friend stats, badges, and activity
- **Challenges** - Compete with friends in various challenge types
- **Leaderboard** - Ranked list with podium display and progress tracking

### Design Highlights

- 🎨 Modern, clean aesthetic inspired by NotebookLM, Notion, and Duolingo
- 🌈 Soft color palette with indigo primary and purple secondary
- ✨ Smooth micro-animations and transitions
- 📱 Fully responsive design (desktop-first, mobile-friendly)
- 🎯 Professional typography using Inter font
- 💫 Glassmorphism effects and subtle shadows

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required!

### Running the Application

1. **Clone or download** this repository

2. **Open the landing page**:

   - Simply open `index.html` in your web browser
   - Or use a local server for best experience:

     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js
     npx serve
     ```

3. **Navigate the app**:
   - Start at `index.html` (Landing Page)
   - Click "Get Started" or "Login"
   - Explore all features from the dashboard

## 📁 Project Structure

```
study-sphere/
├── index.html              # Landing page
├── login.html              # Login page
├── signup.html             # Signup page
├── dashboard.html          # Main dashboard
├── upload.html             # Upload materials
├── progress.html           # Daily progress tracking
├── flashcards.html         # Flashcards viewer
├── quizzes.html            # Quiz interface
├── friends.html            # Friends list
├── friend-profile.html     # Friend profile view
├── challenges.html         # Friend challenges
├── leaderboard.html        # Global leaderboard
├── styles/
│   └── main.css            # Complete stylesheet
└── scripts/
    ├── main.js             # Landing page scripts
    ├── auth.js             # Authentication
    ├── dashboard.js        # Dashboard interactions
    ├── upload.js           # File upload handling
    ├── progress.js         # Progress tracking
    ├── flashcards.js       # Flashcard interactions
    ├── quizzes.js          # Quiz functionality
    ├── friends.js          # Friends management
    ├── friend-profile.js   # Profile viewing
    ├── challenges.js       # Challenge tabs
    └── leaderboard.js      # Leaderboard filters
```

## 🎨 Design System

### Colors

- **Primary**: #6366f1 (Indigo)
- **Secondary**: #8b5cf6 (Purple)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: 700-800 weight
- **Body**: 400-500 weight
- **Labels**: 600 weight

### Spacing

- Uses consistent rem-based spacing scale
- Border radius: 0.375rem to 1rem
- Shadows: Subtle layered shadows for depth

## 🔧 Customization

### Changing Colors

Edit the CSS variables in `styles/main.css`:

```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  /* ... */
}
```

### Adding New Pages

1. Create new HTML file
2. Include the main stylesheet
3. Use existing components and classes
4. Add corresponding JavaScript file if needed

### Mock Data

All data is hardcoded in HTML. To modify:

- Edit user stats in dashboard cards
- Update friend lists in `friends.html`
- Change quiz questions in `quizzes.html`
- Modify leaderboard rankings

## 📱 Responsive Design

The application is fully responsive with breakpoints at:

- **Desktop**: > 768px (primary design)
- **Tablet/Mobile**: ≤ 768px (stacked layouts)

## 🎯 Hackathon Tips

### Demo Flow

1. Start with landing page to show value proposition
2. Quick signup/login demo
3. Show dashboard with gamification elements
4. Demonstrate core features (upload, progress, flashcards, quiz)
5. Highlight social features (friends, challenges, leaderboard)

### Key Selling Points

- **Gamification**: XP, levels, streaks, badges
- **Social Learning**: Friends, challenges, leaderboards
- **Progress Tracking**: Daily logs, subject-wise tracking
- **Interactive Tools**: Flashcards, quizzes, material upload
- **Professional UX**: Clean, intuitive, engaging design

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - No frameworks, pure JS
- **Google Fonts** - Inter font family

## 📝 Notes

- This is a **frontend-only** demonstration
- All interactions are simulated (no backend)
- Data is static/mock data
- Perfect for hackathon demos and prototypes
- Ready to integrate with real backend APIs

## 🎓 Use Cases

- Hackathon demonstrations
- UI/UX portfolio projects
- Frontend development practice
- Design system reference
- Educational platform prototypes

## 📄 License

This project is open source and available for educational and demonstration purposes.

## 🤝 Contributing

Feel free to fork, modify, and enhance this project for your own hackathon or learning purposes!

---

**Built with ❤️ for hackathons and learning**

_StudySphere - Learn Smarter, Not Harder_
