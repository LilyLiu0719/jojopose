import React from "react";
import Peer from "peerjs";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

function createSocket(id) {
  const s = io(document.URL, { query: { id } });
  s.on("connect", () => {
    console.log("connected", id);
  });
  return s;
}

export const Connection = React.createContext({
  id: null,
  peer: null,
  socket: null,
});
Connection.displayName = "Connection";

export function initializeContext() {
  const id = uuidv4();
  return {
    id: id,
    peer: new Peer(id),
    socket: createSocket(id),
  };
}
