import React from "react";
import JoJoText from "./JoJoText";
import demo from "../static/img/demo.gif";

const PlayPrepare = ({ onToLevel, onNext, stage }) => {
  return (
    <div className="round-border main-box">
      <JoJoText style={{ fontSize: "35px" }}>Please Fill in the shape</JoJoText>
      <br />
      <JoJoText style={{ fontSize: "35px" }}>with your sexy body</JoJoText>
      <br />
      <div
        className="row-flex"
        // style={{
        //   padding: "1em 0",
        // }}
      >
      <img src={demo} style={{width:"29%"}}/>
      <img src={stage} style={{width:"50%", borderRadius: "30px"}}/>
      </div>
      <br />
      <div
        className="row-flex"
        style={{
          padding: "1em 15%",
        }}
      >
        <div className="button">
          <JoJoText style={{ fontSize: "35px" }} onClick={onToLevel}>
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
