import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { NRBtn, NRInput } from "../../commonComponents";
import { Url } from "../../../utils/apiUrls";
import { patchApiWithAuth, getApiWithAuth } from "../../../utils/api";
import { getToken } from "../../../utils/localStorage";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import "./ConnectRobo.scss";

const ConnectRobo = () => {
  const navigate = useNavigate();
  const db = getFirestore();
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [userFullData, setUserFullData] = useState({});
  const [userData, setUserData] = useState({
    robot_id: "",
  });
  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    if (useState.robot_id !== "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const goToOnlinePage = async () => {
    setIsLoading(true);
    if (buttonDisabled == false) {
      const response = await patchApiWithAuth(Url.connectRobo, userData);
      if (response?.success) {
        setIsLoading(false);
        navigate("/goOnline");
      } else {
        message.error(response.error);
        setIsLoading(false);
      }
    }
  };

  const getRoboData = () => {
    const docRef = doc(
      db,
      "robot_data_from_software_side",
      `${userFullData?.data?.robot}`
    );
    onSnapshot(docRef, (doc) => {
      if (doc?.data()?.status == "initiated") {
        navigate("/rideRequest");
      } else if (doc?.data()?.status == "accepted") {
        navigate("/sendRobo");
      } else if (doc?.data()?.status == "started") {
        navigate("/rideName");
      }
      else if(doc?.data()?.status == "completed"){
        navigate("/rideName")
      }
    });
  };

  const getRobotCurrentData = async () => {
    const response = await getApiWithAuth(Url.meApi);
    setUserFullData(response);
  };

  useEffect(() => {
    getRobotCurrentData();
  }, []);

  useEffect(() => {
    if (userFullData?.data?.robot) {
      getRoboData();
    }
  }, [userFullData]);

  useEffect(() => {
    if (userFullData) {
      if (
        getToken() != "" &&
        userFullData?.data?.robot != null &&
        getToken() != "" &&
        userFullData?.data?.status != "Online"
      ) {
        navigate("/goOnline");
      } else if (getToken() != "" && userFullData?.data?.robot == null) {
        navigate("/connectRobo");
      } else if  (
        getToken() != "" &&
        userFullData?.data?.robot != null &&
        getToken() != "" &&
        userFullData?.data?.status == "Online"
      )  {
        navigate("/rideRequest");
      }
    }
  }, [userFullData]);

  return (
    <div className="bg">
      <section className="hero is-fullheight">
        <div className="hero-background-screen customHeroBg">
          <div className="container flex-input-field sidebarConnectRobo">
            <div className="sidebarConnectRoboContainer">
              <div className="columns is-centered">
                <div className="column is-5 auth-column-move-up">
                  <div className="auth-hero-text">CONNECT YOUR ROBOT</div>
                  <div className="form">
                    <label className="auth-label-text">ROBOT ID</label>
                    <div className="control connetRobo">
                      <NRInput
                        type="text"
                        placeholder=""
                        name="robot_id"
                        onChange={onChangeValue}
                      />
                    </div>
                    <div className="inputwBtn">
                      <NRBtn
                        title="CONFIRM"
                        showSpinner={isLoading}
                        disabled={buttonDisabled}
                        onClick={goToOnlinePage}
                      />
                    </div>
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
export default ConnectRobo;
