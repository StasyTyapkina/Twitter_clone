import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLogoClick = (e) => {
    e.stopPropagation();
    navigate(`/`);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          style={{ flexGrow: 1, cursor: "pointer", maxWidth: "150px" }}
          onClick={handleLogoClick}
        >
          Twitter Clone
        </Typography>
        {token && (
          <Button color="inherit" onClick={handleLogout} sx={{ ml: "auto" }}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
