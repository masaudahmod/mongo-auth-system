import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("authToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("authToken", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;