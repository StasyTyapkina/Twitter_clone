import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  setSearchLine,
  pollNewPosts,
} from "../../redux/postsSlice";
import {
  Container,
  Grid,
  TextField,
  Box,
  LinearProgress,
  Typography,
  Paper,
} from "@mui/material";
import { PostItem } from "./PostItem";
import { NewPost } from "./NewPost";
import Fuse from "fuse.js";

export const Timeline = () => {
  const dispatch = useDispatch();
  const searchLine = useSelector((state) => state.posts.searchLine);
  const [lastPollTime, setLastPollTime] = useState(Date.now());
  const { posts, loading, hasMore, nextCursor, loadingPosts } = useSelector(
    (state) => state.posts
  );
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchPosts(""));
  }, [dispatch]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchPosts(nextCursor)); // Request the next posts
        }
      });

      if (node) observer.current.observe(node);
    },
    [dispatch, loading, hasMore, nextCursor]
  );

  useEffect(() => {
    // Poll for new posts every 2 min
    const intervalId = setInterval(() => {
      dispatch(pollNewPosts(lastPollTime)).then((action) => {
        if (pollNewPosts.fulfilled.match(action) && action.payload.length > 0) {
          setLastPollTime(Date.now()); // Update last poll time if new posts are found
        }
      });
    }, 120000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [dispatch, lastPollTime]);

  const handleSearchChange = (event) => {
    dispatch(setSearchLine(event.target.value));
  };

  // Function for filtering posts (using Fuse.js)

  const filterPosts = (posts, query) => {
    if (!query) return posts;
    const fuse = new Fuse(posts, {
      keys: ["content.text"],
      includeScore: true,
      threshold: 0.6,
      useExtendedSearch: true,
    });

    // Perform the search
    const results = fuse.search(query);

    return results.map((result) => result.item);
  };

  const filteredPosts = filterPosts(posts, searchLine);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper style={{ padding: 16 }}>
            <TextField
              fullWidth
              label="Filter"
              variant="outlined"
              placeholder="Search posts..."
              type="search"
              value={searchLine}
              onChange={handleSearchChange}
              margin="normal"
            />
            <Grid container spacing={2}>
              {filteredPosts.length === 0 && loadingPosts !== "loading" ? (
                <Typography sx={{ mt: "15px", ml: "15px" }}>
                  No posts found
                </Typography>
              ) : (
                filteredPosts.map((post, index) => (
                  <Grid
                    item
                    xs={12}
                    key={index}
                    ref={index === posts.length - 1 ? lastPostRef : null}
                  >
                    <PostItem post={post} />
                  </Grid>
                ))
              )}
            </Grid>

            {loadingPosts === "loading" && (
              <Box sx={{ width: "100%", mt: "5px" }}>
                <LinearProgress />
              </Box>
            )}
            {!hasMore && (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: "15px", mb: "10px" }}
              >
                You've reached the end of the timeline.
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <NewPost />
        </Grid>
      </Grid>
    </Container>
  );
};
