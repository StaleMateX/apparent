import axios from "axios";

//Important note for security: Use AuthO or AWS Cognito for authentications to avoid Cross-Site Scripting attacks (XSS).
let isRefreshing = false;

/* Base url is pulling from vite's configuration file that I set to pull from Django and adding the /api/ to the path.
Axios calls this an axios instance
See https://axios-http.com/docs/instance */
const apiClient = (contentType = "application/json") => {
  const apiClientSetup = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      "Content-Type": contentType,
    },
  });

  /* Added an interceptor before handling our request so the authentication can take place first.
Source: https://axios-http.com/docs/instance */
  apiClientSetup.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  //Much of this code came from an example provided by a Medium article found at this URL : https://medium.com/%40velja/token-refresh-with-axios-interceptors-for-a-seamless-authentication-experience-854b06064bde
  apiClientSetup.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        localStorage.getItem("refresh_token")
      ) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const refreshToken = localStorage.getItem("refresh_token");
            const refreshResponse = await axios.post(
              "http://127.0.0.1:8000/api/token/refresh/",
              { refresh: refreshToken },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            const newAccessToken = refreshResponse.data.access;
            localStorage.setItem("token", newAccessToken);
            isRefreshing = false;

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(contentType).request(originalRequest);
          } catch (refreshError) {
            isRefreshing = false;
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return apiClientSetup;
};

export default apiClient;
