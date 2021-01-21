import React, { useState, useRef, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../graphql";
import displayStatus from "../utils/displayStatus";
import { Input, Space, Button } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  RightOutlined,
} from "@ant-design/icons";
import JoJoText from "./JoJoText";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const pwdRef = useRef(null);
  const createUser = useMutation(CREATE_USER_MUTATION)[0];

  const signInOrSignUp = useCallback(
    (username, password) => {
      if (username === "" || password === "") {
        displayStatus({ type: "danger", msg: "Missing username or password." });
        return;
      }
      setLoading(true);
      createUser({ variables: { username, password } })
        .then(({ data }) => {
          if (data.createUser.ok) {
            displayStatus({
              type: "success",
              msg: "Successfully logged in.",
            });
            onLogin(data.createUser.user, password);
          } else {
            displayStatus({
              type: "danger",
              msg: "Wrong password or username is taken.",
            });
          }
          setLoading(false);
        })
        .catch(() => {
          displayStatus({
            type: "danger",
            msg: "Error occurred when trying to log in.",
          });
          setLoading(false);
        });
    },
    [onLogin, createUser, setLoading]
  );
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
          className="ant-input-search ant-input-search-large"
          addonAfter={
            <Button
              className="ant-input-search-button"
              type="primary"
              onClick={() => signInOrSignUp(username, pwd)}
              loading={loading}
              icon={<RightOutlined />}
              size="large"
            >
              Log in
            </Button>
          }
          placeholder="Password"
          value={pwd}
          size="large"
          ref={pwdRef}
          onChange={(e) => setPwd(e.target.value)}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              signInOrSignUp(username, pwd);
            }
          }}
        />
      </Space>
    </div>
  );
};

export default Login;
