import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Link,
  CircularProgress,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import { login } from "../../redux/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(() => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  maxWidth: "400px",
  padding: "20px",
  gap: 2,
}));

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingStatus = useSelector((state) => state.auth.loadingStatus);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (userData) => {
      dispatch(login({ userData, navigate }));
    },
  });

  return (
    <Box direction="column" justifyContent="space-between">
      <Stack
        sx={{
          justifyContent: "center",
          height: "100dvh",
          p: 2,
        }}
      >
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Sign in
            </Button>
            {loadingStatus === "loading" && (
              <Box
                sx={{ display: "flex", justifyContent: "space-around", mt: 1 }}
              >
                <CircularProgress />
              </Box>
            )}
          </form>
          <Typography sx={{ textAlign: "center", mt: 2 }}>
            Don't have an account?
            <Link href="/register" variant="body2" sx={{ ml: 1 }}>
              Sign up
            </Link>
          </Typography>
        </Card>
      </Stack>
    </Box>
  );
};
