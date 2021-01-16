import React, { useState, useEffect } from "react";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { initialize, resetPoly, updateImage } from "../canvas";

export default function Label() {
  const [fileList, updateFileList] = useState([]);
  // initialize canvas after div#container is mounted
  useEffect(initialize, []);
  return (
    <>
      <div className="left-panel">
        <Upload
          type="primary"
          fileList={fileList}
          beforeUpload={(file) => {
            let reader = new FileReader();
            reader.addEventListener("loadend", () => {
              updateImage(reader.result);
            });
            reader.readAsDataURL(file);
            return false; // Do not send http request
          }}
          onChange={(info) => {
            // Only keep the last file uploaded
            updateFileList([info.fileList.pop()]);
          }}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
        <Button type="primary" onClick={null}>
          Download
        </Button>
        <Button type="primary" onClick={resetPoly}>
          Clear
        </Button>
      </div>
      <div className="right-panel">
        <div id="container" />
      </div>
    </>
  );
}
