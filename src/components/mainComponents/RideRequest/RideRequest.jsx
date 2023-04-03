import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, Spin } from "antd";
import { NRBtn } from "../../commonComponents";
import { Url } from "../../../utils/apiUrls";
import { patchApiWithAuth, getApiWithAuth } from "../../../utils/api";
import { getFirestore, onSnapshot, doc } from "@firebase/firestore";
import "./RideRequest.scss";

const RideRequest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const robotStatus = "offline";
  const [seconds, setSeconds] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading3, setIsLoading3] = useState(true);
  const [robot, setRobot] = useState({});
  const [user, setUser] = useState({});
  const [operatorData, setOperatorData] = useState({
    trip_id: "",
    robot_id: "",
    ride_status: "",
    device_token: "",
  });
  const db = getFirestore();

  const showModal = () => {
    setIsModalOpen(true);
    setSeconds(30);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getRobotCurrentData = async () => {
    const response = await getApiWithAuth(Url.meApi);
    setUser(response);
  };

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
      if (data != undefined) {
        setRobot(doc?.data());
        if (Object.keys(data).length != 0) {
          if (
            data?.status == "initiated" &&
            location.pathname == "/rideRequest"
          ) {
            setIsLoading3(false);
            showModal();
          } else if (
            data?.status == "canceled" &&
            location.pathname == "/rideRequest"
          ) {
            setIsLoading3(false);
            handleCancel();
          } 
          else if (
            data?.status == "accepted" &&
            location.pathname == "/rideRequest"
          ) {
            setIsLoading3(false);
            navigate("/sendRobo");
          } else if (
            data?.status == "started" &&
            location.pathname == "/rideRequest"
          ) {
            setIsLoading3(false);
            navigate("/rideName");
          }
          else if (
            data?.status == "completed" &&
            location.pathname == "/rideRequest"
          ) {
            setIsLoading3(false);
            navigate("/rideName");
          }
        } else {
          setIsLoading3(false);
        }
      }
    });
  };

  const turnRobotOff = async () => {
    setIsLoading2(true);
    const response = await patchApiWithAuth(`${Url.robotModes}${robotStatus}`);
    if (response.success) {
      setIsLoading2(false);
      navigate("/goOnline");
    }
  };

  const acceptRobot = (item) => {
    if (item === "ACCEPT") {
      setIsLoading1(true);
      acceptRobotData(
        robot.trip_id,
        "accepted",
        user.data.robot,
        robot.device_token
      );
    } else if (item === "DECLINE") {
      setIsLoading(true);
      acceptRobotData(
        robot.trip_id,
        "canceled",
        user.data.robot,
        robot.device_token
      );
    }
  };

  const acceptRobotData = async (tripId, check, robotId, deviceToken) => {
    const response = await patchApiWithAuth(Url.operatorResponse, {
      trip_id: tripId,
      ride_status: check,
      robot_id: robotId,
      device_token: deviceToken,
    });
    if (response.success) {
      setIsLoading1(false);
      setIsLoading(false);
      handleCancel();
      if (check === "accepted") {
        navigate("/sendRobo");
      }
    } else {
      setIsLoading1(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRobotCurrentData();
  }, []);

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
    if (user && robot) {
      setOperatorData({
        ...operatorData,
        trip_id: robot?.trip_id,
        robot_id: user?.data?.robot,
        device_token: robot?.device_token,
      });
    }
  }, [robot]);

  useEffect(() => {
    if (robot?.status === "initiated") {
      if (seconds > 0) {
        const interval = setInterval(() => {
          setSeconds(seconds - 1);
        }, 1000);
        return () => clearInterval(interval);
      } else {
        acceptRobot("DECLINE");
      }
    }
  }, [seconds, robot?.status]);

  return (
    <div className="bg fullPg">
      {isLoading3 ? (
        <Spin size="large" />
      ) : (
        <section className="hero is-fullheight">
          <div className="hero-background-screen customHeroBgRideReq">
            <div className="container sidebarContainerDiv">
              <div className="columns is-centered rideReqContainer">
                <div className="rideReqModalBtnContainer"></div>
                <Modal
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  maskClosable={false}
                  footer={null}
                >
                  <div className="column has-text-centered modalStyling">
                    <div className="twoMinAgo">
                      <span className="hero-subtext">
                        REQUEST WILL BE DECLINED AFTER {seconds} SECONDS
                      </span>
                    </div>
                    <div className="hero-text">RIDE REQUEST</div>
                    <div className="rideReqText">
                      <div className="hero-subtext centerText">
                        {robot?.rider_name}
                      </div>
                      <div className="hero-subtext centerText">
                        {robot?.estimating_time}
                      </div>
                      <div className="hero-subtext centerText">
                        {robot?.pickup_location}
                      </div>
                    </div>
                    <div className="main-auth-button-container">
                      <div className="rideReqBtn">
                        <NRBtn
                          title="ACCEPT"
                          onClick={() => {
                            acceptRobot("ACCEPT");
                          }}
                          showSpinner={isLoading1}
                        />
                      </div>
                      <NRBtn
                        title="DECLINE"
                        onClick={() => {
                          acceptRobot("DECLINE");
                        }}
                        showSpinner={isLoading}
                      />
                    </div>
                  </div>
                </Modal>
                <div className="optimusOnlineContainer">
                  <span className="terms-hyperlink rideReq">
                    OPTIMUS IS ONLINE
                  </span>
                  <div className="goOfflineBtn" onClick={turnRobotOff}>
                    <NRBtn title="GO OFFLINE" showSpinner={isLoading2} />
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
export default RideRequest;
