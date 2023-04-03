import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { Url } from "../../../utils/apiUrls";
import { postApiWithoutAuth, getApiWithAuth } from "../../../utils/api";
import { setToken } from "../../../utils/localStorage";
import { NRBtn, NRInput } from "../../commonComponents";
import navRoboLogo from "../../../assets/images/nav-logo-header-auth-screens.png";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    role: "1",
    email: "",
    password: "",
  });

  const [isLoading, setisLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    if (userData.email !== "" || userData.password !== "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const userLogin = async () => {
    setisLoading(true);
    const response = await postApiWithoutAuth(Url.loginUrl, userData);
    if (response.status == 200) {
      setisLoading(false);
      setToken(response.data.data.access);
      message.success("Login successfully");
      const res = await getApiWithAuth(Url.meApi);
      if (res.success) {
        if (res?.data?.robot != null && res?.data?.status == "Offline") {
          navigate("/goOnline");
        } else if (res?.data?.robot != null && res?.data?.status == "Online") {
          navigate("/rideRequest");
        } else {
          navigate("/connectRoboConfirmation");
        }
      }
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
                <div className="auth-hero-text">LOG IN</div>
                <div className="form">
                  <label className="auth-label-text">EMAIL</label>
                  <div className="control">
                    <Form
                      name="basic"
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 22,
                      }}
                      initialValues={{
                        remember: true,
                      }}
                      autoComplete="off"
                      type="Submit"
                    >
                      <div className="loginField">
                        <Form.Item
                          className="formField"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Email Required",
                            },
                            {
                              type: "email",
                              message: "Please Enter Valid Email",
                            },
                          ]}
                        >
                          <NRInput
                            name="email"
                            type="email"
                            placeholder=""
                            value={userData.email}
                            onChange={onChangeValue}
                            autoComplete="off"
                          />
                        </Form.Item>
                        <label className="auth-label-text password-field-move-down">
                          PASSWORD
                        </label>
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Password Required",
                            },
                            {
                              pattern: /^[ A-Za-z0-9_@./#&+-]*$/,
                              message: "Please Enter Valid Password",
                            },
                          ]}
                        >
                          <NRInput
                            name="password"
                            type="password"
                            placeholder=""
                            value={userData.password}
                            onChange={onChangeValue}
                          />
                        </Form.Item>
                        <div className="terms-text">
                          BY CLICKING SIGN UP, YOU ARE INDICATING THAT YOU HAVE
                          READ AND ACKNOWLEDGE THE{" "}
                          <a
                            href="http://ridenav.co/terms-of-service.html"
                            className="terms-hyperlink"
                          >
                            TERMS OF SERVICE
                          </a>{" "}
                          AND
                          <a href="http://ridenav.co/privacy-policy.html" className="terms-hyperlink">
                            {" "}
                            PRIVACY NOTICE
                          </a>
                        </div>
                        <div className="signupLogin">
                          <a
                            href="/forgotPassword"
                            className="forgot-password-text"
                          >
                            FORGOT PASSWORD?
                          </a>
                          <a href="/signUp" className="forgot-password-text">
                            SIGN UP
                          </a>
                        </div>

                        <Form.Item className="NLBtnStyling" wrapperCol={{}}>
                          <div
                            className="inputwBtnLogin"
                            onClick={() => {
                              if (buttonDisabled == false) {
                                userLogin();
                              }
                            }}
                          >
                            <NRBtn
                              className="log-in-screen-auth-log-in-button"
                              title="LOG IN"
                              disabled={buttonDisabled}
                              showSpinner={isLoading}
                            />
                          </div>
                        </Form.Item>
                      </div>
                    </Form>
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

export default Login;
