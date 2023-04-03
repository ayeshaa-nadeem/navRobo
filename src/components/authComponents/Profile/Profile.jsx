import React, { useEffect, useState } from "react";
import { message, Spin, Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { NRBtn } from "../../commonComponents";
import { Url } from "../../../utils/apiUrls";
import { getApiWithAuth, patchApiWithAuth } from "../../../utils/api";
import { deleteToken } from "../../../utils/localStorage";
import "./Profile.scss";

const Profile = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setisLoading1] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const logOut = async () => {
    const response = await patchApiWithAuth(`${Url.robotModes}${"offline"}`);
    if (response?.success) {
      deleteToken();
      message.success("Logout successfully");
      navigate("/logIn");
    }
  };

  const goToConnectRobo = () => {
    navigate("/connectRoboConfirmation");
  }
  const disconnetRobot = async() => {
    setisLoading1(true);
    const response = await patchApiWithAuth(`${Url.disconnectRobot}${"disconnect"}`)
    if(response?.success){
      setisLoading1(false);
    message.success("Robot is Disconnected successfully")
    handleCancel();
    navigate("/connectRoboConfirmation")
    }
    else{
      message.error(response?.error);
    }
  }
  const getCurrentData = async () => {
    setIsLoading(true);
    const response = await getApiWithAuth(Url?.meApi);
    if (response?.success) {
      setIsLoading(false);
      if (response?.data?.robot != null) setIsConnected(true);
    }
  };
  useEffect(() => {
    getCurrentData();
  }, []);

  return (
    <div className="bggg">
      <div className="profileCrossIcon">
        <CloseCircleOutlined
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
      <div className="profileList">
        <ul>
          <li>
            {isLoading ? (
              <Spin size="small" />
            ) : isConnected == true ? (
              <a onClick={showModal}>DISCONNECT ROBOT</a>
            ) : isConnected == false ? (
              <a onClick={goToConnectRobo}>CONNECT ROBOT</a>
            ) : (
              ""
            )}
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable = {false}
                footer={null}
              >
                <div className="column has-text-centered modalStyling rideNameModalStyling">
                  <div className="hero-text profile">Are You Sure You Want To Disconnect?</div>
                  <div className="ridenameContainer">
                  </div>
                  <div className="main-auth-button-container customRideName profile" onClick={disconnetRobot}>
                      <NRBtn title="DISCONNECT" showSpinner={isLoading1}/>
                  </div>
                  <div className="main-auth-button-container customRideName profile" onClick={handleCancel}>
                      <NRBtn title="CANCEL"/>
                  </div>
                </div>
              </Modal>
          </li>
          <li>
            <a href="support">SUPPORT</a>
          </li>
          <li onClick={logOut}>LOG OUT</li>
        </ul>
      </div>
    </div>
  );
};
export default Profile;
