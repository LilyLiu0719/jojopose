import React, { useState, useEffect } from "react";
import { Button, Upload, Layout, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { initialize, resetPoly, updateImage, resizeStage, downloadImage, downloadPreview, backFromPreview } from "../canvas";

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
  return (
    <Layout style={{ height: "100%" }}>
      <Content id="stage-parent">
        <div id="container" />
      </Content>
      <Footer className={classes.footer} style={{ backgroundColor: "#fff" }}>
        <Upload
          type="primary"
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
            onClick={downloadImage}
            onMouseOver={downloadPreview}
            onMouseOut={backFromPreview}
          >
            Confirm
          </Button>
        </Space>
      </Footer>
    </Layout>
  );
}
