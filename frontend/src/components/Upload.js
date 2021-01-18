import React, { useState } from "react";

import { Button, Upload, Layout, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import useSocket from "../hooks/useSocket";

export default function TestUpload(props) {
  const socket = useSocket(props.id);
  const [image, setImage] = useState("");

  return (
    <>
      <Upload
        type="primary"
        maxCount={1}
        listType="picture"
        beforeUpload={(file) => {
          let reader = new FileReader();
          reader.addEventListener("loadend", () => {
            setImage(reader.result);
          });
          reader.readAsDataURL(file);
          return false; // Do not send http request
        }}
      >
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>
      <Button
        onClick={() => {
          if (image !== "") {
            socket.emit("process_image", image);
          }
        }}
      >
        Send
      </Button>
    </>
  );
}
