import React, { useState, useEffect } from "react";

import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";

import displayStatus from "../utils/displayStatus";
import { UPLOAD_IMAGE_MUTATION } from "../graphql";

export default function TestUpload() {
  const [images, setImages] = useState({
    background: null,
    outline: null,
    mask: null,
  });
  const uploadImage = useMutation(UPLOAD_IMAGE_MUTATION)[0];

  return (
    <>
      {["background", "outline", "mask"].map((s) => (
        <Upload
          maxCount={1}
          listType="picture"
          beforeUpload={(file) => {
            let reader = new FileReader();
            reader.addEventListener("loadend", () => {
              setImages({ ...images, [s]: reader.result });
            });
            reader.readAsDataURL(file);
            return false; // Do not send http request
          }}
        >
          <Button icon={<UploadOutlined />}>Upload {s} Image</Button>
        </Upload>
      ))}
      <Button
        type="primary"
        onClick={() => {
          if (images.background && images.outline && images.mask) {
            console.log("started uploading", images);
            uploadImage({
              variables: { uploaderID: null, ...images },
            })
              .then(() => {
                displayStatus({
                  type: "success",
                  msg: "Image uploaded.",
                });
              })
              .catch(() => {
                displayStatus({
                  type: "error",
                  msg: "Error occurred when uploading image.",
                });
              });
          }
        }}
      >
        Send
      </Button>
    </>
  );
}
