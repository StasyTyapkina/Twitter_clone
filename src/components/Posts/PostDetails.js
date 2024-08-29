import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPostById,
  getPostCreatorInfo,
  likePost,
  addComment,
  deletePost,
  getPostComments,
  deleteLike,
} from "../../redux/postDetailsSlice";
import { fetchPosts } from "../../redux/postsSlice";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  Divider,
  CircularProgress,
  Box,
  LinearProgress,
} from "@mui/material";
import { Favorite, Delete } from "@mui/icons-material";

export const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state) => state.postDetails.post);
  const creatorInfo = useSelector((state) => state.postDetails.creatorInfo);
  const comments = useSelector((state) => state.postDetails.comments);
  const isLiked = useSelector((state) => state.postDetails.isLiked);
  const status = useSelector((state) => state.postDetails.status);
  const loadingComment = useSelector(
    (state) => state.postDetails.loadingComment
  );
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getPostById(id));
      dispatch(getPostCreatorInfo(id));
      dispatch(getPostComments(id));
    }
  }, [dispatch, id]);

  const handleLike = () => {
    /**There should be a check to determine whether a registered user has previously liked it. However, the provided API does not allow you to retrieve your ID (the method should return the ID or 'me' according to the documentation, but it does not do this). */
    if (isLiked === false) dispatch(likePost(id));
    else dispatch(deleteLike(id));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({ postId: id, text: newComment }));
      setNewComment("");
    }
  };

  const handleDeletePost = () => {
    /**There should be a check to determine whether the post belongs to the logged-in user, but the API does not provide a way to get the current user’s data. */
    dispatch(deletePost(id))
      .then(() => {
        dispatch(fetchPosts(""));
      })
      .then(() => {
        navigate("/");
      });
  };

  if (status === "loading") {
    return <CircularProgress />;
  }

  return (
    <Card>
      <CardHeader
        avatar={
          creatorInfo?.avatar_url ? (
            <Avatar src={creatorInfo?.avatar_url} alt="img" />
          ) : (
            <Avatar>?</Avatar>
          )
        }
        title={creatorInfo?.name}
        subheader={creatorInfo?.email}
        /**There should be a check to determine whether the post belongs to the logged-in user, but the API does not provide a way to get the current user’s data. */
        action={
          <IconButton onClick={handleDeletePost}>
            <Delete />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body1" paragraph>
          {post?.content.text}
        </Typography>
        {post?.content.type === "picture" && (
          <CardMedia
            component="img"
            image={post?.content.picture_url}
            alt="Image"
            style={{ marginBottom: 16, maxHeight: "300px", maxWidth: "300px" }}
          />
        )}
        {post?.content.type === "video" && (
          <video
            controls
            width="250"
            src={post?.content?.video_url}
            style={{ width: "100%", marginTop: 8 }}
          />
        )}

        <Typography variant="caption" color="textSecondary">
          Likes: {post?.like_count}
        </Typography>
        <IconButton onClick={handleLike} sx={{ ml: 1 }}>
          <Favorite color={isLiked ? "error" : "default"} />
        </IconButton>
        <Typography variant="h6">Comments</Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <Button
          sx={{ mt: "5px" }}
          size="small"
          variant="contained"
          color="primary"
          onClick={handleAddComment}
          disabled={loadingComment === "loading"}
        >
          Submit
        </Button>
        {loadingComment === "loading" && (
          <Box sx={{ width: "100%", mt: "5px" }}>
            <LinearProgress />
          </Box>
        )}

        <List>
          {comments &&
            comments.map((comment) => (
              <React.Fragment key={comment?.id}>
                <ListItem>
                  <ListItemText
                    primary={comment.user_id}
                    secondary={comment.text}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
        </List>
      </CardContent>
    </Card>
  );
};
