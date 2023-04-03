import React from "react";
import { Link } from "react-router-dom";
import { NRBtn } from "../../commonComponents";
import navRoboLogo from "../../../assets/images/nav-logo-header-auth-screens.png";
import CheckMark from "../../../assets/images/check-mark.png";
import "./NewPasswordOnWay.scss";

const NewPasswordOnWay = () => {
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
                <div className="auth-hero-text-center">CHECK YOUR EMAIL</div>
                <div className="check-mark-image">
                  <img src={CheckMark} />
                </div>
                <div className="inputwBtn">
                  <div className="confirmation-email-text">
                    YOUR NEW PASSWORD LINK IS ON THE WAY
                  </div>
                </div>
                <div className="inputwBtn">
                  <Link to="/login">
                    <NRBtn
                      className="log-in-screen-auth-log-in-button"
                      title="DONE"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewPasswordOnWay;
