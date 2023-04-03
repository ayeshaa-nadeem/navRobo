import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { message } from "antd";
import { Url } from "../../../utils/apiUrls";
import { postApiWithoutAuth } from "../../../utils/api";
import { NRBtn } from "../../commonComponents";
import NRLogo from "../../../assets/images/nav-logo-header-auth-screens.png";
import "./SignUpEmailVerificationSent.scss";

const SignUpEmailVerificationSent = () => {
  const location = useLocation();
  const UserEmail = location.state?.email;
  const [isLoading, setisLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: UserEmail,
  });

  const resendEmail = async () => {
    setisLoading(true);
    const response = await postApiWithoutAuth(Url.resendMail, userData);
    if (response.status === 200) {
      setisLoading(false);
      message.success("Email Sent Successfully");
    } else {
      setisLoading(false);
      message.error(response.error);
    }
  };

  return (
    <div className="bgg">
      <section className="hero is-fullheight">
        <div className="hero-head">
          <header className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <a href="/" className="navbar-auth-logo">
                  <img src={NRLogo} />
                </a>
              </div>
            </div>
          </header>
        </div>
        <div className="hero-background-screen">
          <div className="container">
            <div className="columns is-centered">
              <div className="column has-text-centered auth-column-move-up">
                <div className="auth-hero-text verificationSent">
                  CHECK YOUR EMAIL
                </div>
                <div className="confirmation-email-text">
                  AN EMAIL WAS SENT TO{" "}
                  <span className="terms-hyperlink">{UserEmail}</span> WITH A
                  LINK TO VERIFY YOUR EMAIL AND LOG IN.
                </div>
                <div className="sent-btn" onClick={resendEmail}>
                  <NRBtn title="RESEND EMAIL" showSpinner={isLoading} />
                </div>
                <div className="signUpEmailVerificationSentText">
                  <a href="/login" className="forgot-password-text">
                    ALREADY VERIFIED?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpEmailVerificationSent;
