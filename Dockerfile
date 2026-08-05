# ====================================================================
# LearnHub Frontend Dockerfile (React 18/19 + Vite)
# Simple & Beginner-Friendly Configuration for CDAC Project Viva
# ====================================================================

# Step 1: Use official Node.js 18 base image (Alpine version for fast download)
FROM node:18-alpine

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first for npm caching
COPY package*.json ./

# Step 4: Install npm dependencies
RUN npm install

# Step 5: Copy application source code into container
COPY . .

# Step 6: Expose port 5173 (Default Vite Dev Server Port)
EXPOSE 5173

# Step 7: Launch Vite development server listening on all interfaces (0.0.0.0)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
