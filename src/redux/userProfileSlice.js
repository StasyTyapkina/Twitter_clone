import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "../utils/customAxios";

const initialState = {
  userInfo: {},
  userPosts: [],
  userLikes: [],
  userComments: [],

  loadingUserInfo: "idle",
  loadingUserPosts: "idle",
  loadingUserLikes: "idle",
  loadingUserComments: "idle",

  error: null,
};

//Get a user
export const getUserInfoById = createAsyncThunk(
  "userProfile/getUserInfoById",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await customAxios.get(`/api/users/${userID}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch info");
    }
  }
);

//Get a user's posts
export const getUserPostsById = createAsyncThunk(
  "userProfile/getUserPostsById",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await customAxios.get(`/api/users/${userID}/posts`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch post");
    }
  }
);

//Get a user's liked posts
export const getUserLikesById = createAsyncThunk(
  "userProfile/getUserLikesById",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await customAxios.get(`/api/users/${userID}/likes`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch likes");
    }
  }
);

//Get a user's comments
export const getUserCommentsById = createAsyncThunk(
  "userProfile/getUserCommentsById",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await customAxios.get(`/api/users/${userID}/likes`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch comments");
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get a user
      .addCase(getUserInfoById.pending, (state) => {
        state.loadingUserInfo = "loading";
      })
      .addCase(getUserInfoById.fulfilled, (state, action) => {
        state.loadingUserInfo = "succeeded";
        state.userInfo = action.payload.data;
      })
      .addCase(getUserInfoById.rejected, (state, action) => {
        state.loadingUserInfo = "failed";
        state.error = action.error.message;
      })
      //Get a user's posts
      .addCase(getUserPostsById.pending, (state) => {
        state.loadingUserPosts = "loading";
      })
      .addCase(getUserPostsById.fulfilled, (state, action) => {
        state.loadingUserPosts = "succeeded";
        state.userPosts = action.payload.data;
      })
      .addCase(getUserPostsById.rejected, (state, action) => {
        state.loadingUserPosts = "failed";
        state.error = action.error.message;
      })
      //Get a user's liked posts
      .addCase(getUserLikesById.pending, (state) => {
        state.loadingUserLikes = "loading";
      })
      .addCase(getUserLikesById.fulfilled, (state, action) => {
        state.loadingUserLikes = "succeeded";
        state.userLikes = action.payload.data;
      })
      .addCase(getUserLikesById.rejected, (state, action) => {
        state.loadingUserLikes = "failed";
        state.error = action.error.message;
      })
      //Get a user's comments
      .addCase(getUserCommentsById.pending, (state) => {
        state.loadingUserComments = "loading";
      })
      .addCase(getUserCommentsById.fulfilled, (state, action) => {
        state.loadingUserComments = "succeeded";
        state.userComments = action.payload.data;
      })
      .addCase(getUserCommentsById.rejected, (state, action) => {
        state.loadingUserComments = "failed";
        state.error = action.error.message;
      });
  },
});

export const userProfileReducer = userProfileSlice.reducer;
