import React from "react";
import JoJoText from "./JoJoText";

const PlayResult = ({ result, resultImage, onToMenu, onToLevel }) => {
  return (
    <div className="round-border main-box">
      {result ? (
        <>
          <JoJoText style={{ fontSize: "35px" }}>YOU WIN!</JoJoText>
          <br />
          <img src="1-1.png" alt="resultImage" />
          <div
            className="row-flex"
            style={{
              padding: "1em 15%",
            }}
          >
            <div className="button" onClick={onToMenu}>
              <JoJoText style={{ fontSize: "35px" }}>Menu</JoJoText>
            </div>
            <div className="button" onClick={null}>
              <JoJoText style={{ fontSize: "35px", color: "#8A2195" }}>
                DOWNLOAD
              </JoJoText>
            </div>
          </div>
        </>
      ) : (
        <>
          <JoJoText style={{ fontSize: "35px" }}>FAILED...</JoJoText>
          <br />
          <img src="1-1.png" alt="resultImage" />
          <br />
          <div
            className="row-flex"
            style={{
              padding: "1em 15%",
            }}
          >
            <div className="button" onClick={onToMenu}>
              <JoJoText style={{ fontSize: "35px" }}>Menu</JoJoText>
            </div>
            <div className="button" onClick={onToLevel}>
              <JoJoText style={{ fontSize: "35px", color: "#8A2195" }}>
                TRY AGAIN
              </JoJoText>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayResult;
