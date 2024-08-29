import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

export const CommentCard = ({ comment }) => {
  return (
    <Card variant="outlined" style={{ marginBottom: 16 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle2" color="textSecondary">
            User ID: {comment?.user_id}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {new Date(comment?.created_at).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          {comment?.text}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Comment on Post ID: {comment?.post_id}
        </Typography>
      </CardContent>
    </Card>
  );
};
