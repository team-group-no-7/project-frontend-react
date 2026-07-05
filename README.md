# LearnHub — Learner-Focused Content Platform (Frontend)

This is the React frontend for LearnHub, built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Shadcn UI**.

> [!WARNING]
> - **Do not commit in the `main` branch!**
> - **Commit on the `dev` branch only.**

---

## 🚀 How to Run the Project

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### 1. Install Dependencies
Run the following command in the project root directory to install all required packages (Tailwind v4, Shadcn, and Lucide React):
```bash
npm install
```

### 2. Start the Development Server
Launch the local hot-reloading development server:
```bash
npm run dev
```
Once started, open your browser and navigate to the local URL (usually [http://localhost:5173](http://localhost:5173)).

### 3. Build for Production
To compile and bundle the React project for deployment:
```bash
npm run build
```
The output static assets will be generated inside the `/dist` directory.

---

## 📁 Key Folder Structure

*   `/src/data/mockData.js`: Frontend mock database storing records that map 1-to-1 to the monolithic MySQL tables (`USERS`, `CONTENTS`, `PURCHASES`, `DOUBT_SESSIONS`).
*   `/src/components/ui/`: Standard Shadcn UI layout primitives (Button, Card, Tabs, Avatar, Badge, Input, Label, Textarea).
*   `/src/components/`: Modular custom views (`ProfileSidebar.jsx`, `LearnerDashboard.jsx`, `CreatorDashboard.jsx`).
*   `/src/pages/ProfilePage.jsx`: The orchestrator page displaying the profile dashboards and managing role switching.