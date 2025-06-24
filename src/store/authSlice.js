import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  isAuthenticated: !!savedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const expiresIn = 60 * 30; // 30 minutes
      const expiryTime = Date.now() + expiresIn * 1000;

      const payload = {
        user: action.payload.user,
        token: action.payload.token,
        tokenExpiry: expiryTime,
      };
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);
      localStorage.setItem("tokenExpiry", expiryTime.toString());
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
