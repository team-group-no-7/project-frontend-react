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

## 🏛️ Comprehensive Architecture & Modules Breakdown (Items 1 to 17)

All 5 core modules and 17 functional UI items specified in the project architecture are fully implemented and navigable:

### 🔐 Module 1: Authentication & User Onboarding
* **Item 1: Public Landing / Welcome Page** ([`src/pages/LandingPage.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/pages/LandingPage.jsx))
  * Unauthenticated welcome Hero, platform value proposition, trust badges, and navigation CTA buttons.
* **Item 2: Login Page** ([`src/pages/LoginPage.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/pages/LoginPage.jsx))
  * Input form for Email and Password, frontend validation, error handling banner, and JWT token saving to `localStorage`.
* **Item 3: Registration Page** ([`src/pages/RegisterPage.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/pages/RegisterPage.jsx))
  * Registration form for Name, Email, Password, and an interactive **Role Selection Toggle** (`Learner` vs `Creator`).
* **Item 4: User Profile Page** ([`src/pages/ProfilePage.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/pages/ProfilePage.jsx))
  * Account summary dashboard with dynamic role switcher, profile sidebar, and editable profile credentials form.

### 📚 Module 2: Content Marketplace & Discovery
* **Item 5: Marketplace Catalog** ([`src/pages/MarketplacePage.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/pages/MarketplacePage.jsx))
  * Catalog grid with real-time search bar, category quick-filter chips (`Java`, `DSA`, `Web Dev`, `System Design`, `SQL`), and sorting dropdown.
* **Item 6: Content Upload Form Page** ([`src/pages/ContentUploadPage.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/pages/ContentUploadPage.jsx))
  * Creator workspace with fields for Title, Category, Description, Pricing Model (Free vs Paid INR), PDF document picker, and sample preview snippet.
* **Item 7: Content Management Grid Dashboard** ([`src/pages/ContentManagementGrid.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/pages/ContentManagementGrid.jsx))
  * Tabular layout for creators displaying active items, status tracking (*Live*), download counters, total earnings, edit metadata, and delete options.
* **Item 8: Detailed Content View & Preview Page** ([`src/components/ContentPreviewModal.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/components/ContentPreviewModal.jsx))
  * Modal popup drawer rendering syllabus details, learner ratings, partial preview text snippet, and Razorpay buy trigger.

### 💳 Module 3: Payment Gateway & Access Control
* **Item 9: Checkout & Invoice Summary Page** ([`src/pages/CheckoutPage.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/pages/CheckoutPage.jsx))
  * Invoice breakdown (Subtotal + 18% GST calculation), user billing details, and **Razorpay Secure Checkout Modal** with CDAC test triggers (*Simulate Success* / *Simulate Failure*).
* **Item 10: Payment Redirect Screens** ([`src/pages/PaymentResultPage.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/pages/PaymentResultPage.jsx))
  * Feedback screens showing **Success Animation** (green checkmark, transaction ID `pay_N8s92f1Kds`, invoice summary) or **Failure Warning** (red error icon, decline reason, try again option).
* **Item 11: "My Library" Learner Page** ([`src/pages/MyLibraryPage.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/pages/MyLibraryPage.jsx))
  * Private learner dashboard displaying unlocked verified purchases, **Online PDF Document Reader Modal**, PDF download simulation, and library search bar.
* **Item 12: Earnings Dashboard Component** ([`src/components/EarningsDashboard.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/components/EarningsDashboard.jsx))
  * Financial wallet dashboard for creators displaying **Available Wallet Balance**, total sales volume, monthly revenue growth CSS bar chart, recent transaction ledger, and **"Withdraw Funds to Bank"** action button.

### 💬 Module 4: Interaction & Community Engagement
* **Item 13: Interactive Q&A Thread Section** ([`src/components/QAThreadSection.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/components/QAThreadSection.jsx))
  * Nested discussion comment thread under study materials with student question posting, upvotes count, verified creator answers (`✓ Verified Answer`), and resolved status badges.
* **Item 14: Doubt Session Workspace Page** ([`src/pages/DoubtWorkspacePage.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/pages/DoubtWorkspacePage.jsx))
  * Administrative booking dashboard to request 1-on-1 video doubt sessions with creators, track booking status (`PENDING` / `APPROVED`), and launch **Jitsi Video Call Rooms**.
* **Item 15: Creator Noticeboard Space** ([`src/pages/CreatorNoticeboardPage.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/pages/CreatorNoticeboardPage.jsx))
  * Social feed style component displaying announcements, text alerts, pinned posts, likes count, and creator updates.

### 🛠️ Module 5: System Administration & Oversight
* **Item 16: Central Admin Metrics Panel** ([`src/pages/AdminDashboardPage.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/pages/AdminDashboardPage.jsx))
  * Executive control center rendering user registration counters, active published file counts, transaction revenue stats, and system uptime health indicators.
* **Item 17: User Moderation Management View** ([`src/pages/AdminDashboardPage.jsx`](file:///C:/Users/pgcp-ac/Documents/project-frontend-react/src/pages/AdminDashboardPage.jsx))
  * Management table listing platform user profiles, with controls allowing admins to change user roles (`LEARNER`, `CREATOR`, `ADMIN`) or freeze/unfreeze accounts.

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

---

## 💡 Project Viva & Presentation Guide

When presenting this project for evaluation:

1. **Architecture Alignment**:
   > *"The application is structured into 5 core modules with 17 specific UI views mapping 1-to-1 to the backend Spring Boot REST API endpoints and MySQL table schemas (`USERS`, `CONTENTS`, `PURCHASES`, `DOUBT_SESSIONS`, `CATEGORIES`)."*

2. **State Management & Routing**:
   > *"We use React `useState` for state management, component props for modularity, and a clean view router in `App.jsx` allowing seamless navigation within and outside all modules."*

3. **Payment & Access Control Simulation**:
   > *"Module 3 simulates Razorpay payment integration using a modal overlay supporting UPI/QR, Cards, and NetBanking, generating unique transaction IDs (`pay_XXXXX`) and granting access in the Learner's private digital library."*