import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { Url } from "../../../utils/apiUrls";
import { postApiWithoutAuth } from "../../../utils/api";
import db from "../../../Firebase/firebase";
import { NRBtn, NRInput } from "../../commonComponents";
import navRoboLogo from "../../../assets/images/nav-logo-header-auth-screens.png";
import "./SignUpOne.scss";

const SignUpOne = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [gotToNextPage, setGoToNextPage] = useState(true);
  const [userFullData, setUserFullData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "1",
    password: "",
  });

  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setUserFullData({ ...userFullData, [name]: value });
  };

  const goToSignUpPage = () => {
    setGoToNextPage(false);
  };

  const createAccount = async () => {
    setisLoading(true);

    const folderTreeRef = await getDocs(collection(db, "movies"));
    folderTreeRef.docs.forEach((item) => {
      console.log("item id in snapshot map", item);
    });

    const response = await postApiWithoutAuth(Url.signUp, userFullData);
    if (response.status === 201) {
      setisLoading(false);
      message.success("Account Created successfully");
      navigate("/signUpEmailVerificationSent", {
        state: userFullData,
      });
    } else {
      setisLoading(false);
      message.error(response.error);
    }
  };
  return (
    <>
      {gotToNextPage ? (
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
                    <div className="auth-hero-text">SIGN UP</div>
                    <div className="inputwBtnSignUpOne">
                      <div className="form">
                        <label className="auth-label-text">FIRST NAME</label>
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
                                name="first_name"
                                rules={[
                                  {
                                    required: true,
                                    message: "First Name Required",
                                  },
                                ]}
                              >
                                <NRInput
                                  placeholder=""
                                  type="text"
                                  name="first_name"
                                  value={userFullData.first_name}
                                  onChange={onChangeValue}
                                />
                              </Form.Item>
                              <label className="auth-label-text password-field-move-down">
                                LAST NAME
                              </label>
                              <Form.Item
                                className="formField"
                                name="last_name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Last Name Required",
                                  },
                                ]}
                              >
                                <div className="signUpOneLastName">
                                  <NRInput
                                    placeholder=""
                                    type="text"
                                    name="last_name"
                                    value={userFullData.last_name}
                                    onChange={onChangeValue}
                                  />
                                </div>
                              </Form.Item>

                              <Form.Item
                                className="NLBtnStyling"
                                wrapperCol={{}}
                              >
                                <div
                                  className="inputwBtn"
                                  onClick={goToSignUpPage}
                                >
                                  <NRBtn
                                    className="log-in-screen-auth-log-in-button"
                                    title="NEXT"
                                    disabled={
                                      userFullData.first_name == "" ||
                                      userFullData.last_name == ""
                                    }
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
            </div>
          </section>
        </div>
      ) : (
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
                    <div className="auth-hero-text">SIGN UP</div>
                    <div className="inputwBtnSignUpTwo">
                      <div className="form">
                        <label className="auth-label-text">EMAIL</label>
                        <div className="control">
                          <Form name="basic" autoComplete="off" type="Submit">
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
                                  value={userFullData.email}
                                  onChange={onChangeValue}
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
                                    pattern:
                                      "^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$",
                                    message:
                                      "Password must contain atleast 1 small, 1 capital, 1 special character, 1 digit and length must be atleast 8 characters",
                                  },
                                ]}
                              >
                                <NRInput
                                  name="password"
                                  type="password"
                                  placeholder=""
                                  value={userFullData.password}
                                  onChange={onChangeValue}
                                />
                              </Form.Item>
                              <div className="terms-text">
                                BY CLICKING SIGN UP, YOU ARE INDICATING THAT YOU
                                HAVE READ AND ACKNOWLEDGE THE{" "}
                                <Link
                                  to="/termsnConditions"
                                  className="terms-hyperlink"
                                >
                                  TERMS OF SERVICE
                                </Link>{" "}
                                AND
                                <Link
                                  to="/privacyPolicy"
                                  className="terms-hyperlink"
                                >
                                  {" "}
                                  PRIVACY NOTICE
                                </Link>
                                .
                              </div>
                              <div className="signUpDiv signUp">
                              <a
                                href="/login"
                                className="forgot-password-text"
                              >
                                ALREADY HAVE AN ACCOUNT?
                              </a>
                              </div>
                              <Form.Item
                                className="NLBtnStyling"
                                wrapperCol={{}}
                              >
                                <div
                                  className="inputwBtn"
                                  onClick={createAccount}
                                >
                                  <NRBtn
                                    className="log-in-screen-auth-log-in-button"
                                    title="SIGN UP"
                                    showSpinner={isLoading}
                                    disabled={
                                      userFullData.email == "" ||
                                      userFullData.password == ""
                                    }
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
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default SignUpOne;
