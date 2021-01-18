import React, { useState, useEffect } from "react";
import JoJoText from "./JoJoText";

const PlayResult = ({ result }) => {
  return (
    <div className="round-border main-box">
      {result ? (
        <>
          <JoJoText style={{ fontSize: "35px" }}>YOU WIN!</JoJoText>
          <img src="2-2.png" alt="logo" />
        </>
      ) : (
          <>
        <JoJoText style={{ fontSize: "35px" }}>FAILED...</JoJoText>
        <img src="2-2.png" alt="logo" />
        </>
      )}
    </div>
  );
};

export default PlayResult;
