import React from "react";
import JoJoText from "./JoJoText";

const PlayPrepare = ({ onNext, stage }) => {
  return (
    <div className="round-border main-box">
      <JoJoText style={{ fontSize: "35px" }}>Please Fill in the shape</JoJoText>
      <br />
      <JoJoText style={{ fontSize: "35px" }}>with your sexy body</JoJoText>
      <br />
      <img src={stage} />
      <br />
      <JoJoText
        className="button"
        style={{ fontSize: "35px", color: "#8A2195", align: "right" }}
        onClick={onNext}
      >
        start
      </JoJoText>
    </div>
  );
};

export default PlayPrepare;
