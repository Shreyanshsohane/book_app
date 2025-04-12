import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";
import React from "react";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import MyBooksPage from "./pages/MyBooksPage";
import PrivateRoute from "./PrivateRoute";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route
        path="/home-page"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-books"
        element={
          <PrivateRoute>
            <MyBooksPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/user-profile"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
