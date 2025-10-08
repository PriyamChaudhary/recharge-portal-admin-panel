// src/services/api.ts
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ADMIN_SUB_URL = import.meta.env.VITE_ADMIN_SUB_URL;

const api = axios.create({
  baseURL: `${API_BASE_URL}${ADMIN_SUB_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Attach token automatically from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Handle global errors (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Something went wrong. Try again.";
    return Promise.reject(new Error(message));
  }
);

export default api;
