import React, { useEffect, useState } from "react";
import {
  useSearchParams,
  Link,
} from "react-router-dom";
import { message, Spin } from "antd";
import { Url } from "../../../utils/apiUrls";
import { postApiWithoutAuth } from "../../../utils/api";
import { NRBtn } from "../../commonComponents";
import navRoboLogo from "../../../assets/images/nav-logo-header-auth-screens.png";
import CheckMark from "../../../assets/images/check-mark.png";
import crossMark from "../../../assets/images/cross.png";
import "./EmailVerification.scss";

const EmailVerification = () => {
  const [check, setCheck] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [userEmail, setUserEmail] = useState({
    uid: searchParams.get("uid"),
    token: searchParams.get("token"),
  });

  const emailVerification = async () => {
    setisLoading(true);
    const response = await postApiWithoutAuth(Url.emailVerification, userEmail);
    if (response.status === 200) {
      setisLoading(false);
      setCheck(true);
      message.success("Emai Verified Successfully");
    } else {
      setisLoading(false);
      setCheck(false);
      message.error(response.error);
    }
  };

  useEffect(() => {
    emailVerification();
  }, []);

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
                {isLoading ? (
                  <div className="spinStyling">
                    <Spin size="large" />
                  </div>
                ) : check == false ? (
                  <>
                    <div className="auth-hero-text-center">EMAIL IS NOT VERIFIED</div>
                    <div className="check-mark-image emailVerification">
                      <img src={crossMark} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="auth-hero-text-center">
                      YOUR EMAIL HAS BEEN VERIFIED
                    </div>
                    <div className="check-mark-image emailVerification">
                      <img src={CheckMark} />
                    </div>
                  </>
                )}
                <div className="inputwBtn emailVerification">
                  <Link to="/logIn">
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
export default EmailVerification;
