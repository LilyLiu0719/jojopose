import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import JoJoText from "./JoJoText";

const Menu = ({ onSelect }) => {
  const [fontSize, setFontSize] = useState(["34px", "40px"]);
  return (
    <div className="menu-grid">
      <div className="menu-item button" onClick={() => onSelect("Play")}>
        <JoJoText style={{ fontSize: fontSize[0] }}>{"START\nGAME"}</JoJoText>
      </div>
      <div className="menu-item button" onClick={() => onSelect("Gallery")}>
        <JoJoText style={{ fontSize: fontSize[1], color: "#8A2195" }}>
          GALLERY
        </JoJoText>
      </div>
      <div className="menu-item button" onClick={() => onSelect("Shop")}>
        <JoJoText style={{ fontSize: fontSize[1], color: "#C0E701" }}>
          SHOP
        </JoJoText>
      </div>
      <div className="menu-item button" onClick={() => onSelect("Setting")}>
        <JoJoText style={{ fontSize: fontSize[1], color: "#F0AA09" }}>
          SETTING
        </JoJoText>
      </div>
    </div>
  );
};

export default Menu;
