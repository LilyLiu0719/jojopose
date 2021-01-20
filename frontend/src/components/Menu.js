import React from "react";
import JoJoText from "./JoJoText";

const Menu = ({ onSelect, onLogout }) => {
  const fontSize = ["34px", "40px"];
  return (
    <div className="menu-grid">
      <div className="button" onClick={() => onSelect("Play")}>
        <JoJoText style={{ fontSize: fontSize[0] }}>{"START\nGAME"}</JoJoText>
      </div>
      <div className="button" onClick={() => onSelect("Gallery")}>
        <JoJoText style={{ fontSize: fontSize[1], color: "#8A2195" }}>
          GALLERY
        </JoJoText>
      </div>
      {/* <div className="button" onClick={() => onSelect("Shop")}>
        <JoJoText style={{ fontSize: fontSize[1], color: "#C0E701" }}>
          SHOP
        </JoJoText>
      </div> */}
      <div className="button" onClick={() => onSelect("Upload")}>
        <JoJoText style={{ fontSize: fontSize[1], color: "#C0E701" }}>
          UPLOAD
        </JoJoText>
      </div>
      <div className="button" onClick={() => onSelect("Setting")}>
        <JoJoText style={{ fontSize: fontSize[1], color: "#F0AA09" }}>
          SETTING
        </JoJoText>
      </div>
      <div className="button" onClick={() => onLogout()}>
        <JoJoText style={{ fontSize: fontSize[1], color: "#3978BD" }}>
          Logout
        </JoJoText>
      </div>
    </div>
  );
};

export default Menu;
