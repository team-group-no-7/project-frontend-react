import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Create instance pointing to Spring Boot backend
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("learnhub_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor to handle token expiry (401 Unauthorized) with automatic retry-after-refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 Unauthorized, request has not been retried yet, and not an auth endpoint
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken = localStorage.getItem("learnhub_refreshToken");

      if (refreshToken) {
        try {
          // Attempt to refresh the access token using the stored refresh token
          const refreshRes = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
            refreshToken: refreshToken,
          });

          const authData = refreshRes.data?.data || refreshRes.data;
          if (authData && authData.token) {
            // Save newly issued access token and rotated refresh token
            localStorage.setItem("learnhub_token", authData.token);
            if (authData.refreshToken) {
              localStorage.setItem("learnhub_refreshToken", authData.refreshToken);
            }

            // Update user profile in localStorage with new role/token data if present
            const savedUser = localStorage.getItem("learnhub_user");
            if (savedUser) {
              try {
                const userObj = JSON.parse(savedUser);
                userObj.token = authData.token;
                if (authData.refreshToken) userObj.refreshToken = authData.refreshToken;
                localStorage.setItem("learnhub_user", JSON.stringify(userObj));
              } catch (e) {
                console.error("Failed to parse saved user during token refresh", e);
              }
            }

            // Update Authorization header on original failed request and process queue
            originalRequest.headers.Authorization = `Bearer ${authData.token}`;
            processQueue(null, authData.token);
            isRefreshing = false;
            return api(originalRequest);
          }
        } catch (refreshErr) {
          console.warn("Session expired or refresh token revoked. Logging out user.", refreshErr);
          processQueue(refreshErr, null);
          isRefreshing = false;
          localStorage.removeItem("learnhub_token");
          localStorage.removeItem("learnhub_refreshToken");
          localStorage.removeItem("learnhub_user");
          localStorage.removeItem("learnhub_purchases");
          localStorage.removeItem("learnhub_sessions");
          window.location.href = "/login";
          return Promise.reject(refreshErr);
        }
      }
    }

    // If 401 occurs on auth endpoints or retry fails, clear storage
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("learnhub_token");
      localStorage.removeItem("learnhub_refreshToken");
      localStorage.removeItem("learnhub_user");
    }

    return Promise.reject(error);
  }
);

export default api;
