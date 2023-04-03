import React from "react";
import { Link } from "react-router-dom";
import { NRBtn } from "../../commonComponents";
import NavLogo from "../../../assets/images/nav-operator-app-logo.png";
import "./MainScreen.scss";

const MainScreen = () => {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body hero-background">
        <div className="container">
          <div className="columns is-centered">
            <div className="column has-text-centered">
              <div className="nav-logo-main-auth-screen">
                <img src={NavLogo} />
              </div>
              <div className="hero-text">OPERATOR APP</div>
              <div className="hero-subtext">
                START EARNING MONEY WITH YOUR ROBOT
              </div>
              <div className="main-auth-button-container">
                <Link to="/logIn">
                  <NRBtn title="LOG IN" />
                </Link>
                <Link to="/signUp" className="signUpbtn">
                  <NRBtn title="SIGN UP" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainScreen;
