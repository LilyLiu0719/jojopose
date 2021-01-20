import React from "react";
import { Spin } from "antd";
import JoJoText from "./JoJoText";
import demo from "../static/img/demo.gif";

const PlayPrepare = ({ onToLevel, onNext, index, stage, loading }) => {
  return (
    <div className="round-border main-box">
      <JoJoText style={{ fontSize: "30px" }}>Please Fill in the shape</JoJoText>
      <br />
      <JoJoText style={{ fontSize: "30px" }}>with your sexy body</JoJoText>
      <br />
      {loading ? (
        <div className="image-layers h-center column-flex">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div
            className="h-center"
            style={{
              display: "grid",
              gridTemplateColumns: "5fr 7fr",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={demo}
              className="h-center"
              style={{ width: "400px", height: "400px" }}
              alt="demo animation"
            />
            <div className="image-layers">
              <img
                className="transparent-background"
                src={stage.images.edges[index].node.background}
                alt="example background"
              />
              <img
                className="outline"
                src={stage.images.edges[index].node.outline}
                alt="example outline"
              />
            </div>
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
        </>
      )}
    </div>
  );
};

export default PlayPrepare;
