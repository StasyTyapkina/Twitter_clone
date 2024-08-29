import React from "react";
import { Footer } from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { SignUp } from "./components/Auth/Register";
import { SignIn } from "./components/Auth/Login";
import { Timeline } from "./components/Timeline/Timeline";
import { Navbar } from "./components/Navigation/NavBar";
import { ProtectedRoute } from "./components/Navigation/ProtectedRoute";
import { PostDetails } from "./components/Posts/PostDetails";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { NotFoundPage } from "./components/NotFoundPage";

export const App = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <main style={{ flexGrow: 1, padding: "16px", marginTop: "64px" }}>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Timeline />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
