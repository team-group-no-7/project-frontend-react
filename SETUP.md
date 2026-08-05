# 🚀 LearnHub Frontend — Local Setup & Development Guide

This guide provides setup and execution instructions for running the **LearnHub Frontend** (React 18/19 + Vite + Tailwind CSS) locally on your developer machine.

---

## 🛠️ Step 1: Prerequisites Verification

Ensure you have the following installed:

* **Node.js**: Version 18 or higher (`node -v`).
* **npm**: Package manager (`npm -v`).
* **LearnHub Backend Running**: Spring Boot backend running on `http://localhost:8080`.

---

## 📥 Step 2: Clone & Install Dependencies

```bash
# Clone repository
git clone https://github.com/team-group-no-7/project-frontend-react.git

# Navigate into project directory
cd project-frontend-react

# Install npm packages
npm install
```

---

## 🌐 Step 3: Environment Configuration

Create a `.env` file in the root directory (copied from `.env.example`):

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# macOS / Linux
cp .env.example .env
```

Contents of `.env`:
```properties
VITE_API_BASE_URL=http://localhost:8080
```

---

## 🏃 Step 4: Run Development Server

```bash
npm run dev
```

*The Vite development server will launch at `http://localhost:5173`.*

---

## 📦 Step 5: Production Build Verification

To create an optimized production build:

```bash
npm run build
```

*Built bundle will be generated in `dist/`.*

---

## 🐳 Running Frontend with Docker

### Build & Run Docker Image
```bash
# Build Frontend Docker Image
docker build -t learnhub-frontend .

# Run Frontend Container
docker run -p 5173:5173 --name learnhub-frontend learnhub-frontend
```

---

## 🔑 Step 6: Demo Accounts for Testing

Log in at `http://localhost:5173/login` using any of these test credentials:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Learner** | `arjun.mehta@learnhub.com` | `password123` |
| **Creator** | `rohan.verma@learnhub.com` | `password123` |
| **Admin** | `admin@learnhub.com` | `admin123` |

---

## ❓ Step 7: Troubleshooting & Common Issues

* **Issue: API requests fail with Network Error or 404**
  * *Solution*: Verify the Java Spring Boot backend is running on `http://localhost:8080`.
* **Issue: CORS error in browser console**
  * *Solution*: Ensure backend `CorsConfig.java` allows `http://localhost:5173`.
* **Issue: Module or Lucide Icon Import Error**
  * *Solution*: Run `npm install` to update installed packages in `node_modules/`.
