import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // JSON Server
});

export default axiosInstance;
