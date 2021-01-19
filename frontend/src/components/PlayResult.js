import React, { useState, useEffect } from "react";
import JoJoText from "./JoJoText";

const PlayResult = ({ result, resultImage, onToMenu, onToLevel }) => {
  return (
    <div className="round-border main-box">
      {result ? (
        <>
          <JoJoText style={{ fontSize: "35px" }}>YOU WIN!</JoJoText>
          <br />
          <img src="1-1.png" alt="resultImage" />

          <JoJoText className="button" style={{ fontSize: "35px" }}>
            DOWNLOAD
          </JoJoText>
          <JoJoText
            className="button"
            style={{ fontSize: "35px" }}
            onClick={onToMenu}
          >
            Menu
          </JoJoText>
        </>
      ) : (
        <>
          <JoJoText style={{ fontSize: "35px" }}>FAILED...</JoJoText>
          <br />
          <img src="1-1.png" alt="resultImage" />
          <br />
          <JoJoText
            className="button"
            style={{ fontSize: "35px" }}
            onClick={onToLevel}
          >
            TRY AGAIN
          </JoJoText>
          <br />
          <JoJoText
            className="button"
            style={{ fontSize: "35px" }}
            onClick={onToMenu}
          >
            Menu
          </JoJoText>
        </>
      )}
    </div>
  );
};

export default PlayResult;
