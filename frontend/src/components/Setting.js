import React from "react";
import { Slider, Progress } from "antd";
import JoJoText from "./JoJoText";

const Setting = ({ onToMenu, volume, setVolume }) => {
  return (
    <>
      <div className="round-border main-box">
        <div className="row-flex">
          <JoJoText style={{ fontSize: "20px" }}>BGM Volume</JoJoText>
          <Slider
            value={volume}
            onChange={(v) => setVolume(v)}
            style={{ width: "20%" }}
          />
        </div>
        <div
          className="button"
          style={{
            padding: "1em 15%",
          }}
        >
          {/* <Progress percent={volume} showInfo={false} status="active" strokeWidth="20px"/> */}
          <JoJoText style={{ fontSize: "35px" }} onClick={onToMenu}>
            back
          </JoJoText>
        </div>
      </div>
    </>
  );
};

export default Setting;
