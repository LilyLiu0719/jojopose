import React, { useEffect, useContext, useCallback } from "react";
import JoJoText from "./JoJoText";
import failedImage from "../static/img/failed.jpg";
import { useMutation } from "@apollo/client";
import { CREATE_GALLERY_MUTATION } from "../graphql";
import { User, getUserID } from "../contexts/user";
import displayStatus from "../utils/displayStatus";

const PlayResult = ({
  result,
  resultImage,
  onToMenu,
  finished,
  onToLevel,
  onToNext,
  maxScore,
}) => {
  const { user } = useContext(User);
  const userID = getUserID(user);

  const createGallery = useMutation(CREATE_GALLERY_MUTATION)[0];

  const uploadGallery = useCallback(
    (userID, password, image) => {
      if (userID === "" || password === "") {
        displayStatus({ type: "danger", msg: "Missing userID or password." });
        return;
      }
      createGallery({ variables: { ownerID: userID, password, image } })
        .then(({ data }) => {
          if (data.createGallery.ok) {
            displayStatus({
              type: "success",
              msg: "Successfully saved image.",
            });
          } else {
            displayStatus({
              type: "danger",
              msg: "Wrong password or userID.",
            });
          }
        })
        .catch(() => {
          displayStatus({
            type: "danger",
            msg: "Error occurred when trying to upload.",
          });
        });
    },
    [createGallery]
  );

  useEffect(() => {
    uploadGallery(userID, user.password, resultImage);
  }, [uploadGallery, resultImage, userID, user]);

  return (
    <div className="round-border main-box">
      {result ? (
        <>
          <JoJoText style={{ fontSize: "35px" }}>
            {finished ? "YOU WIN!" : "SUCCESS!"}
          </JoJoText>
          <br />
          <img src={resultImage} alt="resultImage" />
          <div
            className="row-flex"
            style={{
              padding: "1em 15%",
            }}
          >
            <div className="button" onClick={onToMenu}>
              <JoJoText className="back-button">Menu</JoJoText>
            </div>
            <div className="button" onClick={null}>
              <a href={resultImage} download>
                <JoJoText style={{ color: "#8A2195" }}>
                  DOWNLOAD
                </JoJoText>
              </a>
            </div>
            {!finished && (
              <div className="button" onClick={onToNext}>
                <JoJoText style={{ fontSize: "35px" }}>CONTINUE</JoJoText>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <JoJoText style={{ fontSize: "35px" }}>FAILED...</JoJoText>
          <br />
          <img src={failedImage} alt="road roller da" />
          <br />
          <div
            className="row-flex"
            style={{
              padding: "1em 15%",
            }}
          >
            <div className="button" onClick={onToMenu}>
              <JoJoText className="back-button">Menu</JoJoText>
            </div>
            <div className="button" onClick={onToLevel}>
              <JoJoText style={{ color: "#8A2195" }}>
                TRY AGAIN
              </JoJoText>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayResult;
