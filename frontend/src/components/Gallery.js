import React, { useState, useContext } from "react";
import JoJoText from "./JoJoText";
import { User, getUserID } from "../contexts/user";
import { useQuery } from "@apollo/client";
import { GALLERIES_QUERY } from "../graphql";
import { Spin } from "antd";
import refused from "../static/img/refused.jpg";

const GalleryItem = ({ src, onClick }) => {
  return (
    <div className="level-container" style={{ cursor: "pointer" }}>
      <img src={src} alt="gallery" onClick={onClick} />
    </div>
  );
};

const Collection = ({ onToMenu }) => {
  const { user } = useContext(User);
  const [image, setImage] = useState(null);
  const { data, loading } = useQuery(GALLERIES_QUERY, {
    variables: { id: getUserID(user), password: user.password },
  });

  return (
    <>
      <div className="round-border main-box">
        <JoJoText style={{ color: "8A2195" }}>Gallery</JoJoText>
        {loading ? (
          <div className="column-flex" style={{ height: "100%" }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
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
                      className="back-button"
                      onClick={() => setImage(null)}
                    >
                      back
                    </JoJoText>
                  </div>
                  <div className="button">
                    <a href={image} download>
                      <JoJoText onClick={null}>DOWNLOAD</JoJoText>
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <br />
                {data.galleryImages === null ||
                data.galleryImages.length === 0 ? (
                  <img src={refused} alt="refused" />
                ) : (
                  <div className="level-grid" style={{ height: "80%" }}>
                    {data.galleryImages &&
                      data.galleryImages.length &&
                      data.galleryImages.map((node) => (
                        <GalleryItem
                          key={node.id}
                          src={node.data}
                          onClick={() => setImage(node.data)}
                        />
                      ))}
                  </div>
                )}
                <div
                  className="button"
                  style={{
                    padding: "1em 15%",
                  }}
                >
                  <JoJoText className="back-button" onClick={onToMenu}>
                    back
                  </JoJoText>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Collection;
