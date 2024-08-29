import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export const PostItem = ({ post }) => {
  const navigate = useNavigate();
  const { content, like_count } = post;

  const handleCardClick = (e) => {
    e.stopPropagation();
    navigate(`/post/${post.id}`);
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    navigate(`/profile/${post.user_id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      variant="outlined"
      style={{ marginBottom: 16 }}
    >
      <CardHeader
        title={post?.user_id}
        subheader={new Date(post?.created_at).toLocaleString()}
        avatar={
          <Avatar sx={{ bgcolor: "blue" }} onClick={handleAvatarClick}>
            ?
          </Avatar>
        }
        style={{ cursor: "pointer" }}
      />
      <CardContent sx={{ cursor: "pointer" }}>
        <Typography variant="body1" paragraph>
          {content?.text}
        </Typography>
        {content?.type === "picture" && (
          <CardMedia
            component="img"
            image={content?.picture_url}
            alt="Image"
            style={{ marginBottom: 16, maxHeight: "200px", maxWidth: "200px" }}
          />
        )}
        {content && content?.type === "video" && (
          <video
            controls
            width="250"
            src={content?.video_url}
            style={{ width: "100%", marginTop: 8 }}
          />
        )}

        <Typography variant="caption" color="textSecondary">
          Likes: {like_count}
        </Typography>
      </CardContent>
    </Card>
  );
};
