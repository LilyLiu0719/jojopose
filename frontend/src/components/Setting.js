import React from "react";
import { Slider } from "antd";
import JoJoText from "./JoJoText";

const Setting = ({ onToMenu, volume, setVolume }) => {
  return (
    <>
      <div className="round-border main-box">
      <JoJoText style={{ fontSize: "35px", color: "#F0AA09" }}>
          Setting
        </JoJoText>
        <div className="column-flex" style={{ height: "calc(100% - 70px)" }}>
          <div className="row-flex">
            <JoJoText style={{ fontSize: "30px" }}>BGM Volume</JoJoText>
            <Slider
              value={volume}
              onChange={(v) => setVolume(v)}
              style={{ width: "20%" }}
            />
          </div>
        </div>
        <div className="button">
          <JoJoText className="back-button" onClick={onToMenu}>
            back
          </JoJoText>
        </div>
      </div>
    </>
  );
};

export default Setting;
