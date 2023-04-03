import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { NRBtn } from "../../commonComponents";
import { Url } from "../../../utils/apiUrls";
import { patchApiWithAuth } from "../../../utils/api";
import "./DisconnectRobo.scss";

const DisconnectRobo = () => {
  const [isLoading, setIsLoading]=useState(false);
  const navigate = useNavigate();
  const robotStatus="disconnect"
  const disconnectFromRobot = async() => {
    setIsLoading(true)
    const response=await patchApiWithAuth(`${Url.disconnectRobot}${robotStatus}`)
    if(response?.success){
      setIsLoading(false)
      navigate("/connectRoboConfirmation")
    }
  }
  return (
    <div className="bg">
      <section className="hero is-fullheight">
        <div className="hero-background-screen customHeroBgRideReq disconnect-screen">
          <div className="container sidebarConnectRobo">
            <div className="sidebarConnectRoboContainer">
              <div className="columns is-centered">
                <div className="column has-text-centered auth-column-move-up">
                  <div className="confirmation-email-text">
                    <span className="terms-hyperlink">OPTIMUS </span>
                    IS CURRENTLY CONNECTED
                  </div>
                  <div className="sent-btn" onClick={disconnectFromRobot}>
                      <NRBtn title="DISCONNECT ROBOT" showSpinner={isLoading} />
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
export default DisconnectRobo;
