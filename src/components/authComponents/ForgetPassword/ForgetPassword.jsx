import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { Url } from "../../../utils/apiUrls";
import { postApiWithoutAuth } from "../../../utils/api";
import { NRBtn, NRInput } from "../../commonComponents";
import navRoboLogo from "../../../assets/images/nav-logo-header-auth-screens.png";
import "./ForgetPassword.scss";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
  });

  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    if(userData?.email == "" || userData?.email != ""){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  };

  const getnNewPass = async () => {
    if (userData.email !== "") {
      setButtonDisabled(false);
      setisLoading(true);
      const response = await postApiWithoutAuth(Url.forgetPass, userData);
      if (response.status == 200) {
        setisLoading(false);
        navigate("/newPasswordOnWay");
      } else {
        setisLoading(false);
        message.error(response.error);
      }
    } else {
      setButtonDisabled(true);
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
                  <img src={navRoboLogo} />
                </a>
              </div>
            </div>
          </header>
        </div>
        <div className="hero-background-screen">
          <div className="container flex-input-field">
            <div className="columns is-centered">
              <div className="column is-5 auth-column-move-up">
                <div className="auth-hero-text">FORGOT PASSWORD</div>
                <div className="form">
                  <label className="auth-label-text">EMAIL</label>
                  <div className="control forgetPassword">
                    <NRInput
                      type="text"
                      placeholder=""
                      name="email"
                      onChange={onChangeValue}
                    />
                  </div>
                  <div className="inputwBtn" onClick={getnNewPass}>
                    <NRBtn
                      title="SEND PASSWORD RESET LINK"
                      disabled={buttonDisabled}
                      showSpinner={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgetPassword;
