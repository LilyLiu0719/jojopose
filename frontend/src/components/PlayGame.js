import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import JoJoText from "./JoJoText";

const PlayGame = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);
  return (
    <div className="round-border main-box">
        <JoJoText>Click on video for screenshot</JoJoText>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" onClick={capture} style={{width:"40%"}}/>
      {imgSrc && <img src={imgSrc} style={{width:"40%", height:"auto"}}/>}
    </div>
  );
};

export default PlayGame;
