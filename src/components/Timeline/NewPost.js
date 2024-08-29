import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/postsSlice";
import {
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  CircularProgress,
  Box,
  LinearProgress,
} from "@mui/material";

export const NewPost = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [postType, setPostType] = useState("picture");

  const loadingNewPost = useSelector((state) => state.posts.loadingNewPost);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      type: postType,
      text: message,
    };

    if (postType === "video" && mediaUrl) {
      postData.video_url = mediaUrl;
    }
    if (postType === "picture" && mediaUrl) {
      postData.picture_url = mediaUrl;
    }

    dispatch(createPost(postData));

    setMessage("");
    setMediaUrl("");
    setPostType("picture");
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Add New Post</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
          mx: "auto",
          mt: 4,
        }}
      >
        {loadingNewPost === "loading" && <CircularProgress />}

        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          minRows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/**According to the requirements, only text or text with an image/video can be posted here. However, the API does not allow posting text alone. */}
        <TextField
          select
          fullWidth
          label="Post Type"
          variant="outlined"
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
          margin="normal"
        >
          <MenuItem value="picture">Image</MenuItem>
          <MenuItem value="video">Video</MenuItem>
        </TextField>

        {(postType === "picture" || postType === "video") && (
          <TextField
            label="Media URL"
            variant="outlined"
            fullWidth
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            required
          />
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loadingNewPost === "loading" || mediaUrl === ""}
        >
          Create Post
        </Button>
        {loadingNewPost === "loading" && (
          <Box sx={{ width: "100%", mt: "5px" }}>
            <LinearProgress />
          </Box>
        )}
      </Box>
    </Paper>
  );
};
