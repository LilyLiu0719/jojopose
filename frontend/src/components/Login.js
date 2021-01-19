import React, { useState, useEffect, useRef } from "react";
import { Input, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import JoJoText from "./JoJoText";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const pwdRef = useRef(null);
  return (
    <div className="round-border login-box">
      <Space direction="vertical">
        <JoJoText>SIGN IN</JoJoText>
        <Input
          placeholder="Username"
          value={username}
          size="large"
          //   ref={nameRef}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: 10 }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && username) {
              pwdRef.current.focus();
            }
          }}
        ></Input>
        <Input.Password
          placeholder="Password"
          value={pwd}
          size="large"
          ref={pwdRef}
          onChange={(e) => setPwd(e.target.value)}
          //   style={{ marginBottom: 10 }}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" && pwd) {
              // send to backend
              // login success
              onLogin();
            }
          }}
        ></Input.Password>
      </Space>
    </div>
  );
};

export default Login;
