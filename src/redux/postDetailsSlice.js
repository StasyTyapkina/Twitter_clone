import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "../utils/customAxios";

const initialState = {
  post: null,
  creatorInfo: null,
  comments: [],
  status: "idle",
  loadingComment: "idle",
  error: null,
  isLiked: false,
};

//Get  post details
export const getPostById = createAsyncThunk(
  "postDetails/getPostById",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await customAxios.get(`/api/posts/${postId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch post");
    }
  }
);

//Get  creator details
export const getPostCreatorInfo = createAsyncThunk(
  "postDetails/getPostCreatorInfo",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await customAxios.get(`/api/posts/${postId}/user`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch creator");
    }
  }
);

//Get post comments
export const getPostComments = createAsyncThunk(
  "postDetails/getPostComments",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await customAxios.get(`/api/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch comments");
    }
  }
);

//Like the post
export const likePost = createAsyncThunk(
  "postDetails/likePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await customAxios.post(`/api/posts/${postId}/likes`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to like post");
    }
  }
);

//Remove the like on the post
export const deleteLike = createAsyncThunk(
  "postDetails/deleteLike",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await customAxios.delete(`/api/posts/${postId}/likes`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete like");
    }
  }
);

//Create a new comment for the post
export const addComment = createAsyncThunk(
  "postDetails/addComment",
  async ({ postId, text }, { rejectWithValue }) => {
    try {
      const response = await customAxios.post(`/api/posts/${postId}/comments`, {
        text,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add comment");
    }
  }
);

//Delete a post
export const deletePost = createAsyncThunk(
  "postDetails/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      await customAxios.delete(`/api/posts/${postId}`);
      return postId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete post");
    }
  }
);

const postDetailsSlice = createSlice({
  name: "postDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get a post
      .addCase(getPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.post = action.payload.data;
        state.status = "succeeded";
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //Get the user of a post
      .addCase(getPostCreatorInfo.fulfilled, (state, action) => {
        state.creatorInfo = action.payload.data;
      })
      .addCase(getPostCreatorInfo.rejected, (state, action) => {
        state.error = action.payload;
      })
      //Get the comments for the post
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.comments = action.payload.data;
      })
      .addCase(getPostComments.rejected, (state, action) => {
        state.error = action.payload;
      })
      //Like the post
      .addCase(likePost.fulfilled, (state) => {
        state.isLiked = true;
        state.post.like_count = state.post.like_count + 1;
      })
      //Remove the like on the post
      .addCase(deleteLike.fulfilled, (state) => {
        state.isLiked = false;
        state.post.like_count = state.post.like_count - 1;
      })
      //Create a new comment for the post
      .addCase(addComment.pending, (state) => {
        state.loadingComment = "loading";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload.data);
        state.loadingComment = "succeeded";
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loadingComment = "failed";
        state.error = action.payload;
      })

      //Delete a post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.post = null;
      });
  },
});

export const postDetailsReducer = postDetailsSlice.reducer;
