import React, { useState } from "react";
import PlayLevel from "./PlayLevel";
import PlayPrepare from "./PlayPrepare";
import PlayGame from "./PlayGame";
import PlayResult from "./PlayResult";

const Play = ({ onToMenu }) => {
  const [playState, setPlayState] = useState("Result"); // Level, Prepare, Game, Result
  const [isWin, setIsWin] = useState(false);
  const [level, setLevel] = useState(0);
  const handleSelectLevel = (ind) => {
    setLevel(ind);
    setPlayState("Prepare");
  };
  const handleGameFinish = (rst) => {
    setIsWin(rst);
    setPlayState("Result");
  };
  return (
    <>
      {playState === "Level" ? (
        <PlayLevel onSelect={handleSelectLevel} />
      ) : playState === "Prepare" ? (
        <PlayPrepare onNext={() => setPlayState("Game")} />
      ) : playState === "Game" ? (
        <PlayGame onFinish={handleGameFinish} setIsWin={(v) => setIsWin(v)} />
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
