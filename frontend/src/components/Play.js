import React, { useState } from "react";
import PlayLevel from "./PlayLevel";
import PlayPrepare from "./PlayPrepare";
import PlayGame from "./PlayGame";
import PlayResult from "./PlayResult";

const Play = ({ onToMenu }) => {
  const [playState, setPlayState] = useState("Level"); // Level, Prepare, Game, Result
  const [isWin, setIsWin] = useState(false);
  const [stage, setStage] = useState(null);
  const handleSelectStage = (src) => {
    setStage(src);
    setPlayState("Prepare");
  };
  const handleGameFinish = (rst) => {
    setIsWin(rst);
    setPlayState("Result");
  };
  return (
    <>
      {playState === "Level" ? (
        <PlayLevel onSelect={(e) => handleSelectStage(e)} />
      ) : playState === "Prepare" ? (
        <PlayPrepare
          stage={stage}
          onNext={() => setPlayState("Game")}
          onToLevel={() => setPlayState("Level")}
        />
      ) : playState === "Game" ? (
        <PlayGame
          stage={stage}
          onFinish={handleGameFinish}
          setIsWin={(v) => setIsWin(v)}
        />
      ) : playState === "Result" ? (
        <PlayResult
          result={isWin}
          onToLevel={() => setPlayState("Level")}
          onToMenu={() => {
            setPlayState("Level");
            onToMenu();
          }}
        />
      ) : (
        <>Play State Error</>
      )}
    </>
  );
};

export default Play;
