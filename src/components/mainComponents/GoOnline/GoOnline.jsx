import React,{useState } from "react";
import { useNavigate } from "react-router-dom";
import { NRBtn } from "../../commonComponents";
import { Url } from "../../../utils/apiUrls";
import { patchApiWithAuth } from "../../../utils/api";
import "./GoOnline.scss";

const GoOnline = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading]=useState(false);
  const robotStatus = "online";

  const turnRobotOn = async () => {
    setIsLoading(true)
    const response = await patchApiWithAuth(`${Url.robotModes}${robotStatus}`);
    if (response?.success) {
      setIsLoading(false)
      navigate("/rideRequest");
    }
  };

  return (
    <div className="bg">
      <section className="hero is-fullheight">
        <div className="hero-background-screen">
          <div className="container">
            <div className="columns is-centered">
              <div className="column has-text-centered auth-column-move-up">
                <div className="confirmation-email-text">
                  SET <span className="terms-hyperlink">OPTIMUS</span> OUT IN
                  THE WORLD AND START EARNING MONEY
                </div>
                <div className="sent-btn" onClick={turnRobotOn}>
                  <NRBtn title="GO ONLINE" showSpinner={isLoading} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default GoOnline;
