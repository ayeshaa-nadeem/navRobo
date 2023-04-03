import React, { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, message } from "antd";
import { Url } from "../../../utils/apiUrls";
import { postApiWithoutAuth } from "../../../utils/api";
import { NRBtn, NRInput } from "../../commonComponents";
import navRoboLogo from "../../../assets/images/nav-logo-header-auth-screens.png";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setisLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const btnDisableRef = useRef(true);
  const passRef = useRef({});
  const [userData, setUserData] = useState({
    new_password: "",
    re_new_password: "",
    uid: searchParams.get("uid"),
    token: searchParams.get("token"),
  });

  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    passRef.current = { ...userData, [name]: value };
    if (
      userData.new_password != "" &&
      passRef.current.re_new_password === passRef.current.new_password
    ) {
      setButtonDisabled(false);
      btnDisableRef.current = false;
    } else {
      setButtonDisabled(true);
      btnDisableRef.current = true;
    }
  };

  const resetPassword = async () => {
    setisLoading(true);
    const response = await postApiWithoutAuth(Url.resetPassword, userData);
    if (response.status == 200 && response.data.data.role == 1) {
      message.success("Password has been updated sucessfully");
      setisLoading(false);
      navigate("/logIn");
    } else if (response.status == 200 && response.data.data.role == 2) {
      navigate("/resetPasswordVerification");
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
                <div className="form">
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
                        <label className="auth-label-text password-field-move-down">
                          NEW PASSWORD
                        </label>
                        <Form.Item
                          name="new_password"
                          rules={[
                            {
                              required: true,
                              message: "Password Required",
                            },
                            {
                              pattern:
                                "^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$",
                              message:
                                "Password must contain atleast 1 small, 1 capital, 1 special character, 1 digit and length must be atleast 8 characters",
                            },
                          ]}
                        >
                          <NRInput
                            name="new_password"
                            type="password"
                            placeholder=""
                            onChange={onChangeValue}
                          />
                        </Form.Item>
                        <label className="auth-label-text password-field-move-down">
                          CONFIRM NEW PASSWORD
                        </label>
                        <div className="resetPasswordConfirm">
                          <Form.Item
                            name="re_new_password"
                            dependencies={["new_password"]}
                            rules={[
                              {
                                required: true,
                                message: "Please confirm your password!",
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (
                                    !value ||
                                    getFieldValue("new_password") === value
                                  ) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    new Error(
                                      "The two passwords that you entered do not match!"
                                    )
                                  );
                                },
                              }),
                            ]}
                          >
                            <NRInput
                              name="re_new_password"
                              type="password"
                              placeholder=""
                              onChange={onChangeValue}
                            />
                          </Form.Item>
                        </div>
                        <Form.Item className="NLBtnStyling" wrapperCol={{}}>
                          <div
                            className="inputwBtnLogin"
                            onClick={() => {
                              if (btnDisableRef.current == false) {
                                resetPassword();
                              }
                            }}
                          >
                            <NRBtn
                              className="log-in-screen-auth-log-in-button"
                              title="CONFIRM"
                              showSpinner={isLoading}
                              disabled={buttonDisabled}
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
export default ResetPassword;
