import React from "react";
import JoJoText from "./JoJoText";

const PlayPrepare = ({ onToLevel, onNext, stage }) => {
  return (
    <div className="round-border main-box">
      <JoJoText style={{ fontSize: "35px" }}>Please Fill in the shape</JoJoText>
      <br />
      <JoJoText style={{ fontSize: "35px" }}>with your sexy body</JoJoText>
      <br />
      <img src={stage} />
      <br />
      <div
        className="row-flex"
        style={{
          padding: "1em 15%",
        }}
      >
        <div className="button">
          <JoJoText
            style={{ fontSize: "35px" }}
            onClick={onToLevel}
          >
            back
          </JoJoText>
        </div>
        <div className="button">
          <JoJoText
            className="button"
            style={{ fontSize: "35px", color: "#8A2195" }}
            onClick={onNext}
          >
            start
          </JoJoText>
        </div>
      </div>
    </div>
  );
};

export default PlayPrepare;
