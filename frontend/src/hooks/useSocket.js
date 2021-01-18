import { useState, useEffect } from "react";
import io from "socket.io-client";

function createSocket(id) {
  const s = io(document.URL, { query: { id } });
  s.on("connect", () => {
    console.log("connected", id);
  });
  s.on("process_image_response", (data) => {
    console.log("receive response", data);
  });
  return s;
}

export default function useSocket(id) {
  const [socket, setSocket] = useState(() => createSocket(id));
  useEffect(() => {
    setSocket(createSocket(id));
  }, [setSocket, id]);
  return socket;
}
