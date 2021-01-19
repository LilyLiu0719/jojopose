import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import useConnection from "../hooks/useConnection";
import JoJoText from "./JoJoText";

const PERIOD_SIO = 1000;

const PlayGame = ({ mask }) => {
  const { socket } = useConnection();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [processedImage, setProcessedImage] = useState("");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const sendImageSIO = () => {
    capture();
    if (!imgSrc) return;
    socket.emit("process_image", imgSrc);
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

  return (
    <div className="round-border main-box">
      {/* <JoJoText>Click on video for screenshot</JoJoText> */}
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <br />
      {imgSrc && <img src={imgSrc} alt="screenshot" />}
    </div>
  );
};

export default PlayGame;
