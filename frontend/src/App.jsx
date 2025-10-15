import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Pending from "./pages/Pending";
import Complete from "./pages/Complete";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./index.css";

/**
 * Smart Task - Main Application Component
 * Handles routing, authentication flow, and session persistence.
 */
const App = () => {
  const navigate = useNavigate();

  // Load the user from localStorage if available
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  // Keep user data synced with localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // Handle login/signup success
  const handleAuthSubmit = (data) => {
    const user = {
      email: data.email,
      name: data.name || "User",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        data.name || "User"
      )}&background=8b5cf6&color=fff`, // consistent purple tone for Smart Task
    };
    setCurrentUser(user);
    navigate("/", { replace: true });
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/login", { replace: true });
  };

  // Protected layout wrapper
  const ProtectedLayout = () => (
    <Layout user={currentUser} onLogout={handleLogout}>
      <Outlet />
    </Layout>
  );

  return (
    <Routes>
      {/* ---------- Public Routes ---------- */}
      <Route
        path="/login"
        element={
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <Login
              onSubmit={handleAuthSubmit}
              onSwitchMode={() => navigate("/signup")}
            />
          </div>
        }
      />

      <Route
        path="/signup"
        element={
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <SignUp
              onSubmit={handleAuthSubmit}
              onSwitchMode={() => navigate("/login")}
            />
          </div>
        }
      />

      {/* ---------- Protected Routes ---------- */}
      <Route
        element={
          currentUser ? <ProtectedLayout /> : <Navigate to="/login" replace />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="pending" element={<Pending />} />
        <Route path="complete" element={<Complete />} />
        <Route
          path="profile"
          element={
            <Profile
              user={currentUser}
              setCurrentUser={setCurrentUser}
              onLogout={handleLogout}
            />
          }
        />
      </Route>

      {/* ---------- Fallback ---------- */}
      <Route
        path="*"
        element={
          <Navigate to={currentUser ? "/" : "/login"} replace />
        }
      />
    </Routes>
  );
};

export default App;
