import React from "react";
 import { Navigate } from "react-router-dom";
 
 const isLoggedIn = () => {
   return !!localStorage.getItem("token");
 };
 
 const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
   return isLoggedIn() ? <>{children}</> : <Navigate to="/" />;
 };
 
 export default PrivateRoute;