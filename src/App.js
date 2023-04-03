import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  EmailVerification,
  ForgetPassword,
  Login,
  MainScreen,
  NewPasswordOnWay,
  Profile,
  ResetPassword,
  SignUpEmailVerificationSent,
  SignUpOne,
  Support,
  ResetPasswordConfirmation,
} from "./components/authComponents";
import {
  ConnectRobo,
  ConnectRoboConfirmation,
  DisconnectRobo,
  GoOnline,
  RideName,
  RideRequest,
  SendRobo,
} from "./components/mainComponents";
import PrivateRoute from "./route/PrivateRouting";
import PublicRoute from "./route/PublicRouting";
import "./App.css";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <MainScreen />
              </PublicRoute>
            }
          />
          <Route
            path="forgotPassword"
            element={
              <PublicRoute>
                <ForgetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="resetPassword"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="logIn"
            element={
              <PublicRoute restricted={true}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="newPasswordOnWay"
            element={
              <PublicRoute>
                <NewPasswordOnWay />
              </PublicRoute>
            }
          />
          <Route
            path="emailVerification"
            element={
              <PublicRoute>
                <EmailVerification />
              </PublicRoute>
            }
          />
          <Route
            path="signUp"
            element={
              <PublicRoute>
                <SignUpOne />
              </PublicRoute>
            }
          />
          <Route
            path="signUpEmailVerificationSent"
            element={
              <PublicRoute>
                <SignUpEmailVerificationSent />
              </PublicRoute>
            }
          />
          <Route
            path="resetPasswordVerification"
            element={
              <PublicRoute>
                <ResetPasswordConfirmation />
              </PublicRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="support"
            element={
              <PrivateRoute>
                <Support />
              </PrivateRoute>
            }
          />
          <Route
            path="connectRoboConfirmation"
            element={
              <PrivateRoute>
                <ConnectRoboConfirmation />
              </PrivateRoute>
            }
          />
          <Route
            path="goOnline"
            element={
              <PrivateRoute>
                <GoOnline />
              </PrivateRoute>
            }
          />
          <Route
            path="sendRobo"
            element={
              <PrivateRoute>
                <SendRobo />
              </PrivateRoute>
            }
          />
          <Route
            path="rideName"
            element={
              <PrivateRoute>
                <RideName />
              </PrivateRoute>
            }
          />
          <Route
            path="rideRequest"
            element={
              <PrivateRoute>
                <RideRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="disconnectRobo"
            element={
              <PrivateRoute>
                <DisconnectRobo />
              </PrivateRoute>
            }
          />
          <Route
            path="connectRobo"
            element={
              <PrivateRoute>
                <ConnectRobo />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
