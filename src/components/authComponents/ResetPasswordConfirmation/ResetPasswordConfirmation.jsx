import React from "react";
import navRoboLogo from "../../../assets/images/nav-logo-header-auth-screens.png";
import CheckMark from "../../../assets/images/check-mark.png";
import "./ResetPasswordConfirmation.scss";

const ResetPasswordConfirmation = () => {
  return (
    <div className="bgg">
      <section className="hero is-fullheight">
        <div className="hero-head">
          <header className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <a href="/" className="navbar-auth-logo">
                  <img src={navRoboLogo} />
                </a>
              </div>
            </div>
          </header>
        </div>
        <div className="hero-background-screen">
          <div className="container">
            <div className="columns is-centered">
              <div className="column has-text-centered auth-column-move-up">
                    <div className="check-mark-image resetPasswordVerification">
                      <img src={CheckMark} />
                    </div>
                    <div className="auth-hero-text-center">
                      YOUR PASSWORD HAS BEEN RESET SUCCESSFULLY
                    </div>
                <div className="inputwBtn">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPasswordConfirmation;
