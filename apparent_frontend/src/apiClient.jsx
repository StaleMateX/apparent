import axios from "axios";

/* Base url is pulling from vite's configuration file that I set to pull from Django and adding the /api/ to the path.
Axios calls this an axios instance
See https://axios-http.com/docs/instance */
const apiClient = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

/* Added an interceptor before handling our request so the authentication can take place first.
Source: https://axios-http.com/docs/instance */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
