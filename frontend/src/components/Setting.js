import React from "react";
import { Slider, Switch } from "antd";
import JoJoText from "./JoJoText";

const Setting = ({ onToMenu, volume, setVolume }) => {
  return (
    <>
      <div className="round-border main-box">
        <div className="row-flex">

        <JoJoText style={{ fontSize: "20px" }} onClick={onToMenu}>
          BGM Volume
        </JoJoText>
        <Slider value={volume} onChange={(v) => setVolume(v)} style={{width:"20%"}}/>
        </div>
        <div className="button">
          <JoJoText style={{ fontSize: "35px" }} onClick={onToMenu}>
            back
          </JoJoText>
        </div>
      </div>
    </>
  );
};

export default Setting;
