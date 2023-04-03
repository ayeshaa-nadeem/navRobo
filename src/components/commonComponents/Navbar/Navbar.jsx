import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import siteLogo from "../../../assets/images/nav-logo-header-auth-screens.png";
import sidebarLogo from "../../../assets/images/sidebar.png";
import "./Navbar.scss";

const Navbar = ({ children }) => {

  return (
    <Layout className="layout">
        <div className="navContentParent">
          <div className="navContent">
            <div className="logo">
              <Link to="/connectRobo">
                <img src={siteLogo} />
              </Link>
            </div>
            <div className="sidelogo">
              <Link to="/profile">
                <img src={sidebarLogo} />
              </Link>
            </div>
          </div>
        </div>
      {/* )} */}
      <main>{children}</main>
    </Layout>
  );
};

export default Navbar;
