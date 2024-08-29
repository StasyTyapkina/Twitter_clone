import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/url";

const initialState = {
  name: "",
  email: "",
  token: null,
  isAuthenticated: false,
  loadingStatus: "idle",
  error: null,
};

//Log in as a user
export const login = createAsyncThunk(
  "auth/login",
  async ({ userData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, userData);
      const token = response.data.data.token;
      /**During login or registration, the server response should include the ID of the newly created user or the current user. However, this does not happen, so the user ID cannot be saved. Additionally, the provided API does not allow you to retrieve your ID (the method should return the ID or 'me' according to the documentation, but it does not do so).
       */
      localStorage.setItem("token", token);
      navigate("/");
      return { token, userData };
    } catch (error) {
      return rejectWithValue(error.message || "Error");
    }
  }
);

//Register a new user
export const register = createAsyncThunk(
  "auth/register",
  async ({ userData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        userData
      );
      const token = response.data.data.token;
      /**During login or registration, the server response should include the ID of the newly created user or the current user. However, this does not happen, so the user ID cannot be saved. Additionally, the provided API does not allow you to retrieve your ID (the method should return the ID or 'me' according to the documentation, but it does not do so).
       */
      localStorage.setItem("token", token);
      navigate("/");
      return { token, userData };
    } catch (error) {
      return rejectWithValue(error.message || "Error");
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      //Register a new user
      .addCase(register.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loadingStatus = "succeeded";
        state.token = action.payload.token;
        state.email = action.payload.userData.email;
        state.name = action.payload.userData.name;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.payload;
      })
      //Log in as a user
      .addCase(login.pending, (state) => {
        state.loadingStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loadingStatus = "succeeded";
        state.token = action.payload.token;
        state.email = action.payload.userData.email;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loadingStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { setToken, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
