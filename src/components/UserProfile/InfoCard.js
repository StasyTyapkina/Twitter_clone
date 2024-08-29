import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

export const InfoCard = ({ item = {} }) => {
  return (
    <Card variant="outlined" style={{ marginBottom: 16 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle2" color="textSecondary">
            User: {item.user_id}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {new Date(item.created_at).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          {item.content.text}
        </Typography>
        {item.content.type === "picture" && (
          <CardMedia
            component="img"
            image={item.content.picture_url}
            alt="Image"
            style={{ marginBottom: 16, maxHeight: "200px", maxWidth: "200px" }}
          />
        )}
        {item.content.type === "video" && (
          <video
            controls
            width="250"
            src={item.content?.video_url}
            style={{ width: "100%", marginTop: 8 }}
          />
        )}
        <Typography variant="caption" color="textSecondary">
          Likes: {item.like_count}
        </Typography>
      </CardContent>
    </Card>
  );
};
