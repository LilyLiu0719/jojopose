import React from "react";
import JoJoText from "./JoJoText";

const Collection = ({ onToMenu, onSelect }) => {
  return (
    <>
      <div className="round-border main-box">
        <JoJoText style={{ fontSize: "35px" }} onClick={onToMenu}>
          Gallery
        </JoJoText>

        <div className="level-grid">
          <img src="1-1.png" onClick={() => onSelect("1-1.png")} />
          <img src="1-2.png" onClick={() => onSelect("1-2.png")} />
          <img src="1-3.png" onClick={() => onSelect("1-3.png")} />
          <img src="1-4.png" onClick={() => onSelect("1-4.png")} />
          <img src="1-5.png" onClick={() => onSelect("1-5.png")} />
          <img src="1-6.png" onClick={() => onSelect("1-6.png")} />
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

export default Collection;
