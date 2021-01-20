import React, { useState } from "react";
import JoJoText from "./JoJoText";

const GalleryItem = ({ src, onClick }) => {
  return (
    <div className="level-container" style={{ cursor: "pointer" }}>
      <img src={src} alt="gallery" onClick={onClick} />
    </div>
  );
};

const Collection = ({ onToMenu }) => {
  const [image, setImage] = useState(null);

  const imgSrc = [
    "1-1.png",
    "1-2.png",
    "1-3.png",
    "1-4.png",
    "1-5.png",
    "1-6.png",
    "2-1.png",
    "2-2.png",
    "2-3.png",
  ];

  return (
    <>
      <div className="round-border main-box">
        <JoJoText style={{ fontSize: "35px" }} onClick={onToMenu}>
          Gallery
        </JoJoText>
        {image ? (
          <>
            <br />
            <img
              src={image}
              alt="maximized"
              style={{ maxHeight: "calc(100% - 4.8em - 35px)" }}
            />
            <div
              className="row-flex"
              style={{
                padding: "1em 15%",
              }}
            >
              <div className="button">
                <JoJoText
                  style={{ fontSize: "35px" }}
                  onClick={() => setImage(null)}
                >
                  back
                </JoJoText>
              </div>
              <div className="button">
                <a href={image} download>
                  <JoJoText style={{ fontSize: "35px" }} onClick={null}>
                    DOWNLOAD
                  </JoJoText>
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="level-grid" style={{ height: "80%" }}>
              {imgSrc.map((e) => (
                <GalleryItem src={e} onClick={() => setImage(e)} />
              ))}
            </div>
            <div
              className="button"
              style={{
                padding: "1em 15%",
              }}
            >
              <JoJoText style={{ fontSize: "35px" }} onClick={onToMenu}>
                back
              </JoJoText>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Collection;
