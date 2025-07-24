import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  phone_no: number;
  address: {
    street_name?: string;
    house_no?: number;
    pincode: number;
    city?: string;
    state?: string;
    country?: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState: AuthState = {
  user: user ? JSON.parse(user) : null,
  token: token ? token : null,
  isAuthenticated: Boolean(token),    // shorthand for !!token
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
