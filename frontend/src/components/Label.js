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
} from "../canvas";

import classes from "./Label.module.css";

const { Content, Footer } = Layout;

export default function Label() {
  // initialize canvas after div#container is mounted
  useEffect(() => {
    const parent = document.getElementById("stage-parent");
    const stage = initialize(parent.clientWidth, parent.clientHeight);
    window.addEventListener("resize", () => {
      resizeStage(stage, parent.clientWidth, parent.clientHeight);
    });
  }, []);

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
          style={{ alignSelf: "flex-start" }}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
        <Space>
          <Button danger onClick={resetPoly}>
            Clear points
          </Button>
          <Button
            type="primary"
            loading={loading}
            onClick={() => {
              setLoading(true);
              uploadImage({
                variables: { uploaderID: userID, ...getImageURI() },
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
        </Space>
      </Footer>
    </Layout>
  );
}
