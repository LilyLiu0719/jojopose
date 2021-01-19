import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";
import Peer from "peerjs";
import Login from "./Login";
import Menu from "./Menu";
import Play from "./Play";
import Collection from "./Gallery";
import Shop from "./Shop";
import Setting from "./Setting";
import logo from "../static/img/logo.png";
import "./App.css";
import "./styles.css";

export default () => {
  const [gameState, setGameState] = useState("Play");
  const [rivalId, setRivalId] = useState(null);
  const [role, setRole] = useState("");
  const id = uuidv4();
  const peer = new Peer(id);
  const socket = io(document.URL, { query: { id: id } });

  /**
   * [For connect side]
   * After this client receive its rival's id from the server,
   * it will use 'peer' to inform its rival that the game is about to start.
   */
  socket.on("get_rival", (data) => {
    const rivalId = data.id;
    const conn = peer.connect(rivalId);
    conn.on("open", () => {
      conn.send(id);
      console.log("connect side sends peer data");
    });
    setRivalId(rivalId);
    setRole("call");
  });

  /**
   * [For receiver side]
   * It will receive rival's id from connect side.
   */
  peer.on("connection", (conn) => {
    conn.on("data", (data) => {
      const rivalId = data;
      console.log("receiver side receives peer data");
    });
    setRivalId(rivalId);
    setRole("recv");
  });

  return (
    <div className="background">
      <div className="App">
        {gameState === "Play" ? (
          <></>
        ) : (
          <div className="App-logo">
            <img src={logo} alt="logo" />
          </div>
        )}
        <div className="App-Content">
          {gameState === "Login" ? (
            <Login onLogin={() => setGameState("Menu")} />
          ) : gameState === "Menu" ? (
            <Menu onSelect={(val) => setGameState(val)} />
          ) : gameState === "Play" ? (
            <Play />
          ) : gameState === "Gallery" ? (
            <Collection />
          ) : gameState === "Shop" ? (
            <Shop />
          ) : gameState === "Setting" ? (
            <Setting />
          ) : (
            <>Game State Error</>
          )}
        </div>
      </div>
    </div>
  );
};
