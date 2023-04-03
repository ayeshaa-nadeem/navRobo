import React from "react";
import { Link } from "react-router-dom";
import { NRBtn } from "../../commonComponents";
import "./ConnectRoboConfirmation.scss"

const ConnectRoboConfirmation = () =>{
    return(
        <div className="bg">
      <section className="hero is-fullheight">
        <div className="hero-background-screen">
          <div className="container">
            <div className="columns is-centered">
              <div className="column has-text-centered auth-column-move-up">
                <div className="confirmation-email-text">
                  NO ROBOT CURRENTLY CONNECTED
                </div>
                <div className="sent-btn">
                  <Link to="/connectRobo">
                    <NRBtn
                      title="CONNECT A ROBOT"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    )
}
export default ConnectRoboConfirmation;