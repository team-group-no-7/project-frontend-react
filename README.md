# ⚛️ LearnHub Frontend — Technical Study Material & Knowledge Marketplace

LearnHub Frontend is a modern, single-page web application built with **React 18 / React 19**, **Vite**, and **Tailwind CSS**. It provides an intuitive interface for learners to discover technical study materials, read PDF guides inline, participate in Q&A discussion forums, schedule 1:1 mentorship video sessions, and allows creators and admins to manage content, sales, and platform operations.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Current UI Modules](#-current-ui-modules)
- [Folder Structure & Responsibilities](#-folder-structure--responsibilities)
- [Technology Stack & Dependency Audit](#-technology-stack--dependency-audit)
- [State Management & Routing](#-state-management--routing)
- [API Integration & Auth Interceptors](#-api-integration--auth-interceptors)
- [Refresh Token Rotation Flow](#-refresh-token-rotation-flow)
- [Environment Variables](#-environment-variables)
- [Setup & Running Locally](#-setup--running-locally)
- [Production Build](#-production-build)
- [Coding Standards & Guidelines](#-coding-standards--guidelines)

---

## 🎯 Project Overview

LearnHub Frontend serves as the user-facing web interface connecting Learners, Technical Creators, and System Administrators. It communicates with the Spring Boot REST API at `http://localhost:8080`, providing real-time data fetching, JWT token management, inline document rendering, and payment processing.

---

## ✨ Key Features

* 🏠 **Dynamic Landing Page**: Hero banner, process walkthrough, top database categories, featured study materials, creator author cards, and student reviews.
* 📚 **Marketplace Catalog**: Search, category filtering, price filtering (Free/Paid), and sorting options (Price Low/High, Rating).
* 📖 **Inline PDF Reader & Q&A**: View purchased study materials inline with page controls, zoom, continuous scroll, and attached Q&A discussion tab.
* 👤 **Public Creator Profiles**: Dynamic view of creator stats, bio, headline, published courses, and 1:1 mentorship session booking.
* ✍️ **Creator Content Studio**: Drag-and-drop PDF upload, price setting, tag management, and resource status toggles.
* 🎓 **Learner & Creator Dashboards**: Access enrolled courses, transaction history, session schedules, and earnings.
* 🛡️ **Admin Panel**: Grid view for Users, Resources (with Creator ID), and Transactions with client-side pagination and refund controls.
* 🎥 **1:1 Video Calls**: Built-in Jitsi Meet video room integration for approved mentorship sessions.

---

## 🧩 Current UI Modules

| Module Name | Route | Access | Main Component |
| :--- | :--- | :--- | :--- |
| **Landing Page** | `/` | Public Guest | [`LandingPage.jsx`](src/pages/LandingPage.jsx) |
| **Login / Register** | `/login`, `/register` | Public Guest | [`LoginPage.jsx`](src/pages/LoginPage.jsx), [`RegisterPage.jsx`](src/pages/RegisterPage.jsx) |
| **Marketplace** | `/marketplace` | Protected Auth | [`MarketplacePage.jsx`](src/pages/MarketplacePage.jsx) |
| **Resource Detail** | `/resources/:id` | Protected Auth | [`ResourceDetailPage.jsx`](src/pages/ResourceDetailPage.jsx) |
| **Public Creator** | `/creator/:id` | Protected Auth | [`CreatorProfilePage.jsx`](src/pages/CreatorProfilePage.jsx) |
| **Inline PDF Reader** | `/reader` | Protected Auth | [`UnifiedContentViewerPage.jsx`](src/pages/UnifiedContentViewerPage.jsx) |
| **Learner Dashboard** | `/learner/dashboard` | Protected Learner | [`LearnerDashboard.jsx`](src/components/LearnerDashboard.jsx) |
| **Creator Studio** | `/creator/studio` | Protected Creator | [`ContentManagementGrid.jsx`](src/pages/ContentManagementGrid.jsx) |
| **Admin Panel** | `/admin` | Protected Admin | [`AdminDashboardPage.jsx`](src/pages/AdminDashboardPage.jsx) |
| **Video Doubt Call** | `/jitsi` | Protected Auth | [`JitsiCallPage.jsx`](src/pages/JitsiCallPage.jsx) |

---

## 📁 Folder Structure & Responsibilities

```
project-frontend-react/
├── public/                 # Static public assets (favicon.svg, icons.svg)
├── src/
│   ├── assets/             # Logos, category icons, and brand graphics
│   ├── components/         # Reusable UI components
│   │   ├── MarketplaceCard.jsx   # Shared resource card component
│   │   ├── ProfileSidebar.jsx    # User profile sidebar card
│   │   ├── LearnerDashboard.jsx  # Enrolled courses and purchases panel
│   │   └── CreatorDashboard.jsx  # Author statistics and resource grid
│   ├── data/               # Legacy local initial state fallback data
│   ├── lib/                # Custom utility helpers (clsx, tailwind-merge)
│   ├── pages/              # Domain views and application routes
│   │   ├── LandingPage.jsx       # Public landing page
│   │   ├── MarketplacePage.jsx   # Catalog listing page
│   │   ├── ResourceDetailPage.jsx# Resource preview and purchase modal
│   │   ├── CreatorProfilePage.jsx# Public author page
│   │   ├── AdminDashboardPage.jsx# Admin oversight panel with pagination
│   │   └── UnifiedContentViewerPage.jsx # PDF reader & Q&A viewer
│   ├── routes/             # AppRoutes.jsx (Route protection & Navigation)
│   └── utils/              # api.js (Axios instance with Bearer JWT interceptors)
├── index.html              # HTML DOM entry point
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite build configuration
```

### Purpose of Key Directories:
* `src/components/`: Modular, reusable UI components shared across multiple pages.
* `src/pages/`: Top-level page views rendered by `AppRoutes.jsx`.
* `src/routes/`: Route definitions and authentication guards preventing unauthenticated navigation.
* `src/utils/`: HTTP client (`api.js`) configuring Bearer JWT headers and automatic refresh token rotation.

---

## 🛠️ Technology Stack & Dependency Audit

Verified directly from [`package.json`](package.json):

* **React**: `^19.2.6` (React 18 / 19 DOM engine)
* **Vite**: `^8.0.12` / `@vitejs/plugin-react` `^6.0.1` (Fast ESM build tool)
* **Tailwind CSS**: `^4.3.2` / `@tailwindcss/vite` `^4.3.2` (Utility-first CSS styling)
* **React Router DOM**: `^7.18.2` (Client-side route navigation)
* **Axios**: `^1.19.0` (HTTP client with JWT interceptors)
* **Lucide React**: `^1.23.0` (Icon library)
* **Recharts**: `^3.10.0` (Analytics charts)
* **React PDF**: `^10.4.1` (PDF document rendering)

---

## 🔄 API Integration & Refresh Token Rotation Flow

All HTTP requests pass through the centralized Axios instance in [`src/utils/api.js`](src/utils/api.js):

1. **Request Interceptor**: Reads `learnhub_token` from `localStorage` and appends `Authorization: Bearer <token>` to every request header.
2. **Automatic 401 Retry**: If an API returns `401 Unauthorized`:
   * Checks if `learnhub_refreshToken` exists in `localStorage`.
   * Sends a `POST /api/auth/refresh` request to issue a new access token.
   * Updates `learnhub_token` in `localStorage`, attaches it to the original request, and retries automatically.
   * If refresh fails or expires, clears local storage and redirects the user to `/login`.

---

## 🌐 Environment Variables

Configured in [`.env.example`](.env.example):

```properties
# Backend REST API base URL
VITE_API_BASE_URL=http://localhost:8080
```

---

## 🚀 Setup & Running Locally

### 1. Installation
```bash
# Clone repository and navigate to frontend
cd project-frontend-react

# Install npm dependencies
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
*App will start at `http://localhost:5173`.*

### 3. Production Build
```bash
npm run build
```
*Output bundle generated in `dist/`.*

---

## 🐳 Docker Containerization Guide

LearnHub Frontend includes a beginner-friendly `Dockerfile` running Vite on Node.js:

### 1. Build Frontend Docker Image
```bash
docker build -t learnhub-frontend .
```

### 2. Run Frontend Container
```bash
docker run -p 5173:5173 --name learnhub-frontend-app learnhub-frontend
```

---

## 🔑 Demo Accounts for Testing

| Role | Email Address | Password |
| :--- | :--- | :--- |
| **Learner** | `arjun.mehta@learnhub.com` | `password123` |
| **Creator** | `rohan.verma@learnhub.com` | `password123` |
| **Admin** | `admin@learnhub.com` | `admin123` |
