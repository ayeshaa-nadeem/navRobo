import React from "react";
import { Button, Spin} from 'antd';
import "./NRBtn.scss";

const NRBtn = (props) => {
  return (
    <Button
    className={props.disabled ? "disabledBtnStyling" : "log-in-screen-auth-log-in-button"}
    disabled={props.disabled}
    onClick={props.onClick}
    >
        {props.showSpinner ? <Spin /> : props.title}
    </Button>
  );
};

export default NRBtn;
