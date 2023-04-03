/* eslint-disable no-console */
import React from "react";
import { Navigate } from "react-router-dom";
import { Navbar } from "../components/commonComponents";
import { getToken } from "../utils/localStorage";

const PrivateRoute = ({ children }) => {
  return getToken() ? <Navbar>{children}</Navbar> : <Navigate to="/logIn" />;
};

export default PrivateRoute;
