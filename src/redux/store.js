import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { postsReducer } from "./postsSlice";
import { postDetailsReducer } from "./postDetailsSlice";
import { userProfileReducer } from "./userProfileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    postDetails: postDetailsReducer,
    userProfile: userProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

window.store = store;

export default store;
