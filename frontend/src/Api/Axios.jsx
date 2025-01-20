import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// Axios Instance without Authentication (Public Routes)
const axiosWithoutAuth = axios.create({
  baseURL: `${BASE_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios Instance with Authentication (Protected Routes)
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// ✅ Token Management Helpers
// const tokenStorage = {
//   getAccessToken: () => localStorage.getItem("token"),
//   getRefreshToken: () => localStorage.getItem("refreshToken"),
//   setTokens: (accessToken, refreshToken) => {
//     localStorage.setItem("token", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//   },
//   clearTokens: () => localStorage.clear(),
// };

// ✅ Request Interceptor: Attach Authorization Token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = tokenStorage.getAccessToken();
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// ✅ Response Interceptor: Handle Token Expiry and Refresh
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If the error status is 401 (Unauthorized) and it's not a retry
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = tokenStorage.getRefreshToken();

//       if (refreshToken) {
//         try {
//           // Attempt to refresh the token
//           const { data } = await axiosWithoutAuth.post("/refresh-token", {
//             token: refreshToken,
//           });

//           const { accessToken, refreshToken: newRefreshToken } = data;

//           // Update tokens in localStorage
//           tokenStorage.setTokens(accessToken, newRefreshToken);

//           // Update headers for future requests
//           axiosInstance.defaults.headers[
//             "Authorization"
//           ] = `Bearer ${accessToken}`;
//           originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

//           // Retry the original request with the new token
//           return axiosInstance(originalRequest);
//         } catch (refreshError) {
//           console.error("Refresh token failed:", refreshError);
//           // Clear tokens and redirect to login on failure
//           tokenStorage.clearTokens();
//           localStorage.clear();
//           window.location.href = "/login";
//         }
//       } else {
//         alert.warn("⚠️ No refresh token found, redirecting to login...");
//         tokenStorage.clearTokens();
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export { axiosInstance, axiosWithoutAuth };