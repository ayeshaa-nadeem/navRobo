import React from "react";
import { Input } from "antd";
import "./NRInput.scss";

const NRInput = (props) => {
  return (
    <div>
      {props.type == "password" ? (
        <Input.Password
          placeholder={props.placeholder}
          type="password"
          name={props.name}
          className="auth-input-field"
          {...props}
        />
      ) : (
        <Input
          placeholder={props.placeholder}
          name={props.name}
          className="auth-input-field"
          {...props}
        />
      )}
    </div>
  );
};
export default NRInput;
