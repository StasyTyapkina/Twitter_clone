import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getUserInfoById,
  getUserPostsById,
  getUserLikesById,
  getUserCommentsById,
} from "../../redux/userProfileSlice";
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { InfoCard } from "./InfoCard";
import { CommentCard } from "./CommentCard";

export const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userProfile.userInfo);
  const userPosts = useSelector((state) => state.userProfile.userPosts);
  const userLikes = useSelector((state) => state.userProfile.userLikes);
  const userComments = useSelector((state) => state.userProfile.userComments);

  const loadingUserInfo = useSelector(
    (state) => state.userProfile.loadingUserInfo
  );
  const loadingUserPosts = useSelector(
    (state) => state.userProfile.loadingUserPosts
  );
  const loadingUserLikes = useSelector(
    (state) => state.userProfile.loadingUserLikes
  );
  const loadingUserComments = useSelector(
    (state) => state.userProfile.loadingUserComments
  );

  useEffect(() => {
    dispatch(getUserInfoById(id));
    dispatch(getUserPostsById(id));
    dispatch(getUserLikesById(id));
    dispatch(getUserCommentsById(id));
  }, [dispatch, id]);

  if (
    loadingUserInfo === "loading" ||
    loadingUserPosts === "loading" ||
    loadingUserLikes === "loading" ||
    loadingUserComments === "loading"
  ) {
    return <CircularProgress />;
  }

  if (!userInfo) {
    return <Typography>No info found</Typography>;
  }

  return (
    <Container>
      <Paper style={{ padding: 16 }}>
        <Card>
          <CardHeader
            title={userInfo.name}
            subheader={userInfo.email}
            avatar={
              userInfo.avatar_url ? (
                <Avatar src={userInfo.avatar_url} alt="img" />
              ) : (
                <Avatar>?</Avatar>
              )
            }
          />

          <CardContent>
            <Typography variant="body2" color="textSecondary">
              User posts:
            </Typography>

            <List>
              {userPosts &&
                userPosts.map((post) => (
                  <ListItem key={post.id}>
                    <ListItemText
                      primary={post.content.text}
                      secondary={new Date(post.created_at).toLocaleString()}
                    />
                  </ListItem>
                ))}
            </List>

            {userPosts &&
              userPosts.map((post) => <InfoCard key={post.id} item={post} />)}

            {userLikes &&
              userLikes.map((like) => <InfoCard key={like.id} item={like} />)}

            {userComments &&
              userComments.map((comment) => (
                <CommentCard key={comment.id} item={comment} />
              ))}

            <Divider />
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};
