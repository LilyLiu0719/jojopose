import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { STAGE_QUERY } from "../graphql";
import PlayLevel from "./PlayLevel";
import PlayPrepare from "./PlayPrepare";
import PlayGame from "./PlayGame";
import PlayResult from "./PlayResult";

const Play = ({ onToMenu }) => {
  const [playState, setPlayState] = useState("Level"); // Level, Prepare, Game, Result
  const [isWin, setIsWin] = useState(false);
  const [stageID, setStageID] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [result, setResult] = useState(null);
  const { data, loading } = useQuery(STAGE_QUERY, {
    skip: stageID === null,
    variables: { id: stageID },
  });
  const stage = data && data.allStages.edges[0].node;

  return (
    <>
      {playState === "Level" ? (
        <PlayLevel
          onSelect={(stageID) => {
            setStageID(stageID);
            setPlayState("Prepare");
          }}
        />
      ) : playState === "Prepare" ? (
        <PlayPrepare
          index={imageIndex}
          stage={stage}
          loading={loading}
          onNext={() => setPlayState("Game")}
          onToLevel={() => {
            setPlayState("Level");
            setImageIndex(0);
          }}
        />
      ) : playState === "Game" ? (
        <PlayGame
          index={imageIndex}
          stage={stage}
          onFinish={(won, result) => {
            setIsWin(won);
            if (result) {
              setResult(result);
            }
            setPlayState("Result");
          }}
        />
      ) : playState === "Result" ? (
        <PlayResult
          result={isWin}
          onToLevel={() => {
            setPlayState("Level");
            setStageID(null);
            setResult(null);
            setImageIndex(0);
          }}
          onToMenu={() => {
            setPlayState("Level");
            onToMenu();
          }}
          resultImage={result}
        />
      ) : (
        <>Play State Error</>
      )}
    </>
  );
};

export default Play;
