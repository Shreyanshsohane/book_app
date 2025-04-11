import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";
import React from "react";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route
        path="/user-profile"
        element={
          <Layout>
            <UserProfile />
          </Layout>
        }
      />
      {/* write all routes here */}

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
