import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import useConnection from "../hooks/useConnection";
import JoJoText from "./JoJoText";
import background from "../static/img/stage1-3/1-3.png";
import outline from "../static/img/stage1-3/outline1-3.png";

const PERIOD_SIO = 1000;
const GAME_TIME = 2000;

const PlayGame = ({ mask, onFinish, setIsWin, stage }) => {
  const { socket } = useConnection();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [processedImage, setProcessedImage] = useState("");
  const [counter, setCounter] = useState(GAME_TIME);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const sendImageSIO = () => {
    capture();
    if (!imgSrc) return;
    socket.emit("process_image", imgSrc);
  };

  const calcResult = () => {
    onFinish();
    // receive result from server
    const isWin = true;
    setIsWin(isWin);
  };

  useEffect(() => {
    const ID = setInterval(sendImageSIO, PERIOD_SIO);
    return () => {
      clearInterval(ID);
    };
  }, []);

  useEffect(() => {
    socket.on("process_image_response", (data) => {
      console.log("received");
      setProcessedImage(data);
    });
  }, [socket]);

  // countdown timer
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      calcResult();
    }
  }, [counter]);

  return (
    <div className="round-border main-box">
      <JoJoText>{counter}</JoJoText>
      <br />
      <div className="image-layers">
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored={true}
          screenshotFormat="image/jpeg"
          height={618}
          width={824}
        />
        <img className="outline" src={outline} alt="outline image" />
        <img className="tranparent-background" src={background} alt="background image" />
      </div>
      {/* {imgSrc && <img src={imgSrc} alt="screenshot" />} */}
    </div>
  );
};

export default PlayGame;
