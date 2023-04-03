import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, Spin } from "antd";
import { NRBtn } from "../../commonComponents";
import { Url } from "../../../utils/apiUrls";
import { getApiWithAuth, patchApiWithAuth } from "../../../utils/api";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import "./RideName.scss";

const RideName = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading3, setIsLoading3] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
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
      if (data != undefined) {
        setRobot(doc?.data());
        if(Object.keys(data).length != 0){
          if (
            data?.status == "completed" && location.pathname == "/rideName"
          ) {
            setIsLoading3(false)
            showModal();
          }
          else if(data?.status == "started" && location.pathname == "/rideName"){
            setIsLoading3(false);
          }
          else if(data?.status == "initiated" && location.pathname == "/rideName"){
            setIsLoading3(false);
            navigate("/rideRequest")
          }
          else if(data?.status == "canceled" && location.pathname == "/rideName"){
            setIsLoading3(false);
            navigate("/rideRequest")
          }
          else if(data?.status == "accepted" && location.pathname == "/rideName"){
            setIsLoading3(false);
            navigate("/sendRobo")
          }
        }
        else{
          setIsLoading3(false);
          navigate("/rideRequest")
        }
      }
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
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

  const goToRideRequestPage = async () => {
    setIsLoading1(true);
    const response = await patchApiWithAuth(Url.rideEnd);
    if (response.success) {
      setIsLoading1(false);
      handleCancel();
      navigate("/rideRequest");
    }
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

  useEffect(() => {
    if (robot?.status === "started") {
      setIsLoading(false);
      setButtonDisabled(true);
    }
  }, [robot]);

  return (
    <div className="bg fullPg">
      {isLoading3 ? (
        <Spin size="large" />
      ) : (
        <section className="hero is-fullheight">
          <div className="rideName-hero-background-screen hero-background-screen">
            <div className="container">
              <div className="columns is-centered rideReqContainer rideNameRideReq">
                <div className="rideReqModalBtnContainer ridenameModal">
                  <span className="hero-text">{robot?.rider_name}</span>
                  <span className="rideCurrently">
                    RIDE CURRENTLY IN PROGRESS
                  </span>
                </div>
                <Modal
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  maskClosable={false}
                  footer={null}
                >
                  <div className="column has-text-centered modalStyling rideNameModalStyling">
                    <div className="hero-text">RIDE HAS ENDED</div>
                    <div className="ridenameContainer">
                      <span className="hero-subtext">{robot?.rider_name}</span>
                    </div>
                    <div className="main-auth-button-container customRideName">
                      <NRBtn
                        title="OKAY"
                        onClick={goToRideRequestPage}
                        showSpinner={isLoading1}
                      />
                    </div>
                  </div>
                </Modal>
                <div className="optimusOnlineContainer">
                  <span className="terms-hyperlink rideName">
                    OPTIMUS IS ONLINE
                  </span>
                  <div className="goOfflineBtn">
                    <NRBtn
                      title="GO OFFLINE"
                      disabled={buttonDisabled}
                      showSpinner={isLoading}
                    />
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
export default RideName;
