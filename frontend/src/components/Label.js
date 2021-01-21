import React, { useState, useEffect, useContext } from "react";
import { Button, Upload, Layout, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { User, getUserID } from "../contexts/user";

import displayStatus from "../utils/displayStatus";
import { UPLOAD_IMAGE_MUTATION } from "../graphql";
import {
  initialize,
  resetPoly,
  updateImage,
  resizeStage,
  getImageURI,
  backFromPreview,
  confirmPoints,
} from "../canvas";
import { Skeleton } from "../canvas/skeleton";

import classes from "./Label.module.css";
import JoJoText from "./JoJoText";

const { Content, Footer } = Layout;
const { layer: skeletonLayer, skeleton } = Skeleton.initialize();

export default function Label({ onToMenu }) {
  // initialize canvas after div#container is mounted
  useEffect(() => {
    const parent = document.getElementById("stage-parent");
    const stage = initialize(parent.clientWidth, parent.clientHeight);
    stage.add(skeletonLayer);
    skeletonLayer.hide();
    window.addEventListener("resize", () => {
      resizeStage(stage, parent.clientWidth, parent.clientHeight);
    });
  }, []);

  const [labelState, setLabelState] = useState("Mask");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(User);
  const userID = getUserID(user);

  const uploadImage = useMutation(UPLOAD_IMAGE_MUTATION)[0];
  return (
    <Layout
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
      }}
    >
      <Content id="stage-parent">
        <div id="container" />
      </Content>
      <Footer className={classes.footer} style={{ backgroundColor: "#fff" }}>
        <div className="row-flex" style={{ alignSelf: "flex-start" }}>
          <div className="button" style={{ marginRight: "2em" }}>
            <JoJoText className="back-button" onClick={onToMenu}>
              back
            </JoJoText>
          </div>
          <Upload
            maxCount={1}
            listType="picture"
            beforeUpload={(file) => {
              let reader = new FileReader();
              reader.addEventListener("loadend", () => {
                updateImage(reader.result);
              });
              reader.readAsDataURL(file);
              return false; // Do not send http request
            }}
            className={classes.rowFlex}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </div>
        <Space>
          {labelState === "Mask" ? (
            <>
              <Button danger onClick={resetPoly}>
                Clear points
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setLabelState("Skeleton");
                  confirmPoints();
                  skeleton.resetPos();
                  skeletonLayer.show();
                  skeletonLayer.getStage().draw();
                }}
              >
                Next
              </Button>
            </>
          ) : labelState === "Skeleton" ? (
            <Button
              type="primary"
              loading={loading}
              onClick={() => {
                setLoading(true);
                console.log(skeleton.points);
                uploadImage({
                  variables: {
                    uploaderID: userID,
                    skeleton: skeleton.points.map((p) => [
                      Math.round(p[0]),
                      Math.round(p[1]),
                    ]),
                    ...getImageURI(),
                  },
                })
                  .then(() => {
                    displayStatus({ type: "success", msg: "Image uploaded." });
                    setLoading(false);
                  })
                  .catch(() => {
                    displayStatus({
                      type: "error",
                      msg: "Error occurred when uploading image.",
                    });
                    setLoading(false);
                  });
              }}
              onMouseOut={backFromPreview}
            >
              Confirm
            </Button>
          ) : (
            <Button disabled>Next</Button>
          )}
        </Space>
      </Footer>
    </Layout>
  );
}
