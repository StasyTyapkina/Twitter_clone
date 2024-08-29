import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "../utils/customAxios";

const initialState = {
  posts: [],

  loading: false,
  hasMore: true,
  nextCursor: "",
  loadingNewPost: "idle",
  loadingPosts: "idle",
  error: null,
  searchLine: "",
};

//Get posts in pages
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (cursor = "", { rejectWithValue }) => {
    try {
      const response = await await customAxios.get("/api/posts", {
        params: { cursor },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch posts");
    }
  }
);

//Check for new posts
export const pollNewPosts = createAsyncThunk(
  "posts/pollNewPosts",
  async (since, { rejectWithValue }) => {
    try {
      const response = await customAxios.get("/api/posts/poll", {
        params: { since },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to poll new posts");
    }
  }
);

//Create a new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await customAxios.post(`/api/posts`, postData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create post");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSearchLine: (state, action) => {
      state.searchLine = action.payload;
    },
    addNewPosts: (state, action) => {
      state.posts = [...action.payload, ...state.posts];
    },
  },
  extraReducers: (builder) => {
    builder
      //Get posts in pages
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.loadingPosts = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const { data, next_cursor } = action.payload;
        state.loading = false;
        state.loadingPosts = "succeeded";
        state.posts = [...state.posts, ...data];
        state.nextCursor = next_cursor || ""; // Set the cursor for the next page
        state.hasMore = Boolean(next_cursor); // If the cursor is '', there are no more posts
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
        state.loadingPosts = "failed";
      })
      //Create a new post
      .addCase(createPost.pending, (state) => {
        state.loadingNewPost = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loadingNewPost = "succeeded";
        state.posts.unshift(action.payload.data);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loadingNewPost = "failed";
        state.error = action.payload;
      })
      //Check for new posts
      .addCase(pollNewPosts.fulfilled, (state, action) => {
        state.posts = [...action.payload.data, ...state.posts];
      });
  },
});

export const { setSearchLine, addNewPosts } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
