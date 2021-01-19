import { message } from "antd";

export default function displayStatus(status) {
  switch (status.type) {
    case "success":
      message.success(status.msg, 1.0);
      break;
    case "info":
      message.info(status.msg, 1.0);
      break;
    case "danger":
    default:
      message.error(status.msg, 1.0);
      break;
  }
}
