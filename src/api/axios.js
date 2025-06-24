import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL, // JSON Server
});

export default axiosInstance;
