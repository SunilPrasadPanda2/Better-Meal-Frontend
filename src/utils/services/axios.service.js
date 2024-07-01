import axios from "axios";

// const getToken = () => {
//   return Cookies.get('accessToken');
// };

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  // withCredentials: true,
  // headers: {
  //   'Authorization': `Bearer ${getToken()}`,
  // },
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error);
    // Check if we received a 401 error

    // console.log("Error Message");
    // console.log(error.response.data.err.message);
    if (
      error.response.status === 401 &&
      error.response.data.err.message === "jwt expired"
    ) {
      originalRequest._retry = true; // Marking that we already retried the request
      try {
        const authData = JSON.parse(localStorage.getItem("persist:auth"));
        const refreshToken = JSON.parse(authData.auth).refreshToken;
        // Call your API to refresh the token
        const newToken = await api.post("/refresh-token", {
          refreshToken: refreshToken,
        }); // Replace with your refresh token call

        // update the token in the local storage
        const updatedToken = newToken.data.token; // Assuming data contains the new token
        // Parse the authData and update the token field
        const updatedAuthData = {
          ...JSON.parse(authData.auth), // Parse existing authData
          token: updatedToken, // Update token field with new value
        };

        // Stringify the updated authData and store it back in localStorage
        authData.auth = JSON.stringify(updatedAuthData);
        localStorage.setItem("persist:auth", JSON.stringify(authData));
        // Return the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        // Handle errors, e.g., redirect to login if token refresh fails
        return Promise.reject(refreshError);
      }
    }
    // Return any other errors as is
    return Promise.reject(error);
  }
);

export { api };
