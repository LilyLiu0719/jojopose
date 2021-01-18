import React, { useState, useEffect } from "react";
import JoJoText from "./JoJoText";

const PlayResult = ({ result, resultImage }) => {
  return (
    <div className="round-border main-box">
      {result ? (
        <>
          <JoJoText style={{ fontSize: "35px" }}>YOU WIN!</JoJoText>
          <br />
          <img src="1-1.png" alt="resultImage" />
          <JoJoText style={{ fontSize: "35px" }}>DOWNLOAD</JoJoText>
        </>
      ) : (
        <>
          <JoJoText style={{ fontSize: "35px" }}>FAILED...</JoJoText>
          <br />
          <img src="1-1.png" alt="resultImage" />
          <br />
          <JoJoText style={{ fontSize: "35px" }}>TRY AGAIN</JoJoText>
        </>
      )}
    </div>
  );
};

export default PlayResult;
