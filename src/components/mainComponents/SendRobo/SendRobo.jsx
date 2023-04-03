import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, Spin } from "antd";
import { NRBtn } from "../../commonComponents";
import { Url } from "../../../utils/apiUrls";
import {
  postApiWithAuth,
  getApiWithAuth,
} from "../../../utils/api";
import { getFirestore, onSnapshot, doc } from "@firebase/firestore";
import "./SendRobo.scss";

const SendRobo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const turnMotor = "off";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [motorStatus, setMotorStatus] = useState(false);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [robot, setRobot] = useState({});
  const [user, setUser] = useState({});
  const db = getFirestore();

  const getRoboData = () => {
    if (user?.data?.robot == null) {
      navigate("/connectRoboConfirmation");
    }
    const docRef = doc(
      db,
      "robot_data_from_software_side",
      `${user?.data?.robot}`
    );
    onSnapshot(docRef, (doc) => {
      const data = doc.data();
      if (data !== undefined) {
        setRobot(data);
        if (Object.keys(data).length !== 0) {
          if (data?.status == "initiated" && location.pathname == "/sendRobo") {
            setIsLoading3(false);
            navigate("/rideRequest");
          } else if (
            data?.status == "canceled" &&
            location.pathname == "/sendRobo"
          ) {
            setIsLoading3(false);
            navigate("/rideRequest");
          } 
          else if (
            data?.status == "accepted" &&
            location.pathname == "/sendRobo"
          ) {
            setIsLoading3(false);
            setIsLoading1(false);
            setBtnDisabled(true);
          } else if (
            data?.status == "started" &&
            location.pathname == "/sendRobo"
          ) {
            setIsLoading3(false);
            navigate("/rideName");
          }
          else if (
            data?.status == "completed" &&
            location.pathname == "/sendRobo"
          ) {
            setIsLoading3(false);
            navigate("/rideName");
          }
        } else if(Object.keys(data).length === 0) {
          setIsLoading3(false);
          showModal();
        }
      }
    });
  };

  const getRobotCurrentData = async () => {
    const response = await getApiWithAuth(Url.meApi);
    setUser(response);
  };

  const turnMotorOff = async () => {
    setIsLoading(true);
    const response = await postApiWithAuth(`${Url.motorStatus}${turnMotor}`);
    if (response.success) {
      setIsLoading(false);
      setMotorStatus(true);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/rideRequest");
  };

  useEffect(() => {
    if (user !== undefined) {
      if (Object.keys(user).length != 0) {
        if (user?.data?.status == "Offline") {
          navigate("/goOnline");
        }
        getRoboData();
      }
    }
  }, [user]);

  useEffect(() => {
    getRobotCurrentData();
  }, []);

  return (
    <div className="bg fullPg">
      {isLoading3 ? (
        <Spin size="large" />
      ) : (
        <section className="hero is-fullheight">
          <div className="hero-background-screen sendRobo-bg-screen">
            <div className="sendRoboContainer">
              <div className="sendRoboInnerContainer">
                <span className="sendRoboHeading">SEND ROBOT</span>
                <span className="rideAccept">
                  RIDE ACCEPTED AT {robot?.estimating_time}
                </span>
                <Modal
                  open={isModalOpen}
                  onOk={handleOk}
                  // onCancel={handleCancel}
                  maskClosable={false}
                  footer={null}
                >
                  <div className="column has-text-centered modalStyling rideNameModalStyling">
                    <div className="hero-text sendRobo">
                      RIDE HAS BEEN CANCELED BY THE RIDER
                    </div>
                    <div className="ridenameContainer sendRobo"></div>
                    <div className="main-auth-button-container customRideName">
                      <NRBtn title="OKAY" onClick={handleCancel} />
                    </div>
                  </div>
                </Modal>
                <div className="rideNameContainer">
                  <span className="rideName">{robot?.rider_name}</span>
                  <span className="rideName">{robot?.pickup_location}</span>
                </div>
                <span className="rideAccept sendRobo">
                  3 MINS ( 1 MI ) AWAY
                </span>
                <div className="goOfflineBtn" onClick={turnMotorOff}>
                  <NRBtn
                    title="TURN MOTOR OFF"
                    showSpinner={isLoading}
                    disabled={motorStatus}
                  />
                </div>
              </div>
              <div className="container">
                <div className="columns is-centered rideReqContainer">
                  <div className="optimusOnlineContainer">
                    <span className="terms-hyperlink sendRobo">
                      OPTIMUS IS ONLINE
                    </span>
                    <div className="goOfflineBtn">
                      <NRBtn
                        title="GO OFFLINE"
                        showSpinner={isLoading1}
                        disabled={btnDisabled}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
export default SendRobo;
