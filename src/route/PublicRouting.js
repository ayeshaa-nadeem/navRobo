import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/localStorage";

const PublicRoute = ({ children, restricted =true }) => {
  return getToken() && restricted ? <Navigate to="/connectRobo" /> : children;
};

export default PublicRoute;
