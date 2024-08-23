import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the config here (e.g., add auth tokens)
    console.log("Request:", config);
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle responses
    console.log("Response:", response);
    return response;
  },
  (error) => {
    // Handle response errors
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

// Export the Axios instance
export default axiosInstance;
