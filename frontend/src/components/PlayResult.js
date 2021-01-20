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
          <div className="button" onClick={null}>
            <JoJoText style={{ fontSize: "35px" }}>DOWNLOAD</JoJoText>
          </div>
          <div className="button" onClick={onToMenu}>
            <JoJoText style={{ fontSize: "35px" }}>Menu</JoJoText>
          </div>
        </>
      ) : (
        <>
          <JoJoText style={{ fontSize: "35px" }}>FAILED...</JoJoText>
          <br />
          <img src="1-1.png" alt="resultImage" />
          <br />
          <div className="button" onClick={onToLevel}>
            <JoJoText style={{ fontSize: "35px" }}>TRY AGAIN</JoJoText>
          </div>
          <br />
          <div className="button" onClick={onToMenu}>
            <JoJoText style={{ fontSize: "35px" }}>Menu</JoJoText>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayResult;
