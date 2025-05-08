import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("authUser")) || null,
  token: localStorage.getItem("authToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
      localStorage.setItem("authToken", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
