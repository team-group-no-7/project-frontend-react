# 🎓 LearnHub — Learner-Focused Content Platform (Frontend)

LearnHub is a comprehensive, production-grade learning resources marketplace built for learners and content creators. It features content discovery, digital document unlocks via simulated Razorpay payments, 1-on-1 video doubt sessions, interactive Q&A discussion forums, creator revenue analytics, and executive platform administration.

> **CDAC PGCP-AC Final Project** — Built with **React 19**, **Vite 8**, **Tailwind CSS v4**, **Lucide React Icons**, and **Shadcn UI**.

---

## 🚀 Quick Start Guide

### Prerequisites
* [Node.js](https://nodejs.org/) (Version 18+ recommended)
* `npm` package manager

### 1. Install Dependencies
Run the following command in the project root directory:
```bash
npm install
```

### 2. Start Hot-Reloading Development Server
Launch the local development server:
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:5173`**.

### 3. Build for Production / Submission
Compile optimized production assets into the `/dist` directory:
```bash
npm run build
```

---



## 📁 Key File & Directory Mapping

```
project-frontend-react/
├── README.md                      # Comprehensive project documentation & guide
├── Modules of Project.txt         # Original architecture & module specifications
├── package.json                   # Project dependencies and npm scripts
├── vite.config.js                 # Vite bundler configuration & path aliases (@/)
└── src/
    ├── main.jsx                   # Application entry point
    ├── App.jsx                    # Navigation orchestrator & view router
    ├── index.css                  # Global Tailwind v4 theme & contrast styles
    ├── App.css                    # Utility styling & high-contrast base overrides
    ├── data/
    │   └── mockData.js            # Mock dataset mapping 1:1 to MySQL tables (USERS, CONTENTS, PURCHASES, DOUBT_SESSIONS)
    ├── components/
    │   ├── Hero.jsx               # Landing page hero section
    │   ├── Categories.jsx         # Category overview cards
    │   ├── CategoryCard.jsx       # Individual category pill component
    │   ├── Stats.jsx              # Platform statistics summary widget
    │   ├── MarketplaceCard.jsx    # Catalog content item card
    │   ├── ContentPreviewModal.jsx# Content syllabus & snippet preview drawer modal
    │   ├── EarningsDashboard.jsx  # Creator revenue & wallet withdrawal dashboard
    │   ├── QAThreadSection.jsx    # Interactive Q&A discussion forum
    │   ├── ProfileSidebar.jsx     # User info & metric summary sidebar
    │   ├── LearnerDashboard.jsx   # Learner library & doubt session tabs
    │   ├── CreatorDashboard.jsx   # Creator content list & account settings tabs
    │   └── ui/                    # Reusable Shadcn UI primitives (Button, Card, Tabs, Badge, Input, Label)
    └── pages/
        ├── LandingPage.jsx        # Public welcome & value proposition page (Module 1 - Item 1)
        ├── LoginPage.jsx          # Email & password authentication page (Module 1 - Item 2)
        ├── RegisterPage.jsx       # Registration with role toggle page (Module 1 - Item 3)
        ├── ProfilePage.jsx        # User profile summary & role switcher page (Module 1 - Item 4)
        ├── MarketplacePage.jsx    # Content catalog grid & filter page (Module 2 - Item 5)
        ├── ContentUploadPage.jsx  # Creator content publishing workspace (Module 2 - Item 6)
        ├── ContentManagementGrid.jsx # Creator uploaded content tabular grid (Module 2 - Item 7)
        ├── CheckoutPage.jsx       # Order summary & Razorpay payment gateway (Module 3 - Item 9)
        ├── PaymentResultPage.jsx  # Payment success & failure redirect screen (Module 3 - Item 10)
        ├── MyLibraryPage.jsx      # Private learner unlocked digital library (Module 3 - Item 11)
        ├── DoubtWorkspacePage.jsx # 1-on-1 video doubt session booking page (Module 4 - Item 14)
        ├── CreatorNoticeboardPage.jsx # Creator social feed & alert noticeboard (Module 4 - Item 15)
        └── AdminDashboardPage.jsx # Executive admin metrics & user moderation (Module 5 - Items 16 & 17)
```


