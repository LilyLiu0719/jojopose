import React, { useState, useEffect, useRef, useCallback } from "react";
import atoID from "../utils/atoID";
import Webcam from "react-webcam";
import useConnection from "../hooks/useConnection";
import JoJoText from "./JoJoText";
import { Progress } from "antd";

const PERIOD_SIO = 1000;
const GAME_TIME = 100;

const PlayGame = ({ onFinish, index, stage}) => {
  const { socket } = useConnection();
  const webcamRef = useRef(null);
  const [counter, setCounter] = useState(GAME_TIME);
  const [progress, setProgress] = useState(0);
  const [maxprog, setMaxprog] = useState(0);
  const images = stage.images.edges[index].node;

  const capture = useCallback(
    () => webcamRef && webcamRef.current.getScreenshot(),
    [webcamRef]
  );

  const sendImageSIO = useCallback(() => {
    const imgSrc = capture();
    if (!imgSrc) return;
    socket.emit("process_image", {
      image_uri: imgSrc,
      stage_id: atoID(stage.id),
      image_id: atoID(images.id),
    });
  }, [capture, socket, stage, images]);

  useEffect(() => {
    const ID = setInterval(sendImageSIO, PERIOD_SIO);
    return () => clearInterval(ID);
  }, [sendImageSIO]);

  useEffect(() => {
    socket.on("process_image_response", (data) => {
      if (data.score > maxprog) setMaxprog(data.score);
      setProgress(data.score);
      if (!data.pass) return;
      onFinish(true, data.image, maxprog);
    });
    return () => socket.off("process_image_response");
  }, [socket, onFinish]);

  // countdown timer
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      // receive result from server
      onFinish(false, null);
    }
  }, [counter, onFinish]);

  return (
    <div className="round-border main-box">
      <JoJoText>Time Left: </JoJoText>
      <JoJoText>{counter}</JoJoText>
      <br />
      <div className="image-layers h-center" style={{ marginTop: "2em" }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored={true}
          screenshotFormat="image/jpeg"
          height={618}
          width={824}
        />
        <img className="outline" src={images.outline} alt="outline" />
        <img
          className="transparent-background"
          src={images.background}
          alt="background"
        />
      </div>
      <Progress
        percent={progress}
        showInfo={false}
        status="active"
        strokeWidth={20}
      />
    </div>
  );
};

export default PlayGame;
