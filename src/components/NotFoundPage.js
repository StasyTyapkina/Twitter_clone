import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

export const NotFoundPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6">
        Sorry, the page you are looking for does not exist.
      </Typography>

      <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
        Go to Home
      </Button>
    </Container>
  );
};
