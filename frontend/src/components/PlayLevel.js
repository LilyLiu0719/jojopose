import React from "react";
import JoJoText from "./JoJoText";
import ladybugColor from "../static/img/ladybug_color.png";
import ladybugGray from "../static/img/ladybug_gray.png";

const PlayLevel = ({ onSelect }) => {
  const Level = ({ src, diffculty, onClick }) => {
    const arr = [...Array(5)].map((_, i) =>
      i < diffculty ? ladybugColor : ladybugGray
    );
    return (
      <div className="level-container">
        <img
          className="round-img"
          style={{ cursor: "pointer" }}
          src={src}
          onClick={onClick}
          alt="level thumbnail"
        />
        <div className="level-difficulty">
          {arr.map((e) => (
            <img src={e} alt="difficulty-indicator" />
          ))}
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="round-border main-box">
        <JoJoText style={{ fontSize: "35px" }}>CHOOSE LEVEL</JoJoText>
        <div className="level-grid">
          <Level
            src="1-1.png"
            diffculty={1}
            onClick={() => onSelect("1-1.png")}
          />
          <Level
            src="1-2.png"
            diffculty={2}
            onClick={() => onSelect("1-2.png")}
          />
          <Level
            src="1-3.png"
            diffculty={3}
            onClick={() => onSelect("1-3.png")}
          />
          <Level
            src="1-4.png"
            diffculty={4}
            onClick={() => onSelect("1-4.png")}
          />
          <Level
            src="1-5.png"
            diffculty={5}
            onClick={() => onSelect("1-5.png")}
          />
          <Level
            src="1-6.png"
            diffculty={0}
            onClick={() => onSelect("1-6.png")}
          />
        </div>
      </div>
    </>
  );
};

export default PlayLevel;
