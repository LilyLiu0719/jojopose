import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import useConnection from "../hooks/useConnection";
import JoJoText from "./JoJoText";

const PERIOD_SIO = 1000;
const GAME_TIME = 10;

const PlayGame = ({ onFinish, index, stage }) => {
  const { socket } = useConnection();
  const webcamRef = useRef(null);
  const [counter, setCounter] = useState(GAME_TIME);

  const capture = useCallback(
    () => webcamRef && webcamRef.current.getScreenshot(),
    [webcamRef]
  );

  const sendImageSIO = useCallback(() => {
    const imgSrc = capture();
    if (!imgSrc) return;
    socket.emit("process_image", { image_uri: imgSrc, stage: stage });
  }, [capture, socket, stage]);

  useEffect(() => {
    const ID = setInterval(sendImageSIO, PERIOD_SIO);
    return () => {
      clearInterval(ID);
    };
  }, [sendImageSIO]);

  useEffect(() => {
    socket.on("process_image_response", (data) => {
      if (!data.pass) return;
      onFinish(true, data.image);
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

  const images = stage.images.edges[index].node;

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
          className="tranparent-background"
          src={images.background}
          alt="background"
        />
      </div>
      {/* {imgSrc && <img src={imgSrc} alt="screenshot" />} */}
    </div>
  );
};

export default PlayGame;
