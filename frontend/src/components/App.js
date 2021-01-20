import React, { useState, useCallback } from "react";
import { User } from "../contexts/user";

import Login from "./Login";
import Menu from "./Menu";
import Play from "./Play";
import Collection from "./Gallery";
import Shop from "./Shop";
import Setting from "./Setting";
import Label from "./Label";
import logo from "../static/img/logo.png";
import "./App.css";
import "./styles.css";

export default function App() {
  const [gameState, setGameState] = useState("Login");
  const [user, setUser] = useState(null);

  const backToMenu = useCallback(() => setGameState("Menu"), [setGameState]);

  return (
    <div className="background">
      <div className="App">
        {gameState !== "Play" ? (
          <div className="App-logo">
            <img src={logo} alt="logo" />
          </div>
        ) : (
          <></>
        )}
        {user === null ? (
          <Login
            onLogin={(user) => {
              setGameState("Menu");
              setUser(user);
            }}
          />
        ) : (
          <User.Provider value={{ user, setUser }}>
            <div className="App-Content">
              {gameState === "Menu" ? (
                <Menu onSelect={(val) => setGameState(val)} />
              ) : gameState === "Play" ? (
                <Play onToMenu={backToMenu} />
              ) : gameState === "Gallery" ? (
                <Collection onToMenu={backToMenu} />
              ) : gameState === "Shop" ? (
                <Shop onToMenu={backToMenu} />
              ) : gameState === "Setting" ? (
                <Setting onToMenu={backToMenu} />
              ) : gameState === "Upload" ? (
                <Label onToMenu={backToMenu} />
              ) : (
                <>Game State Error</>
              )}
            </div>
          </User.Provider>
        )}
      </div>
    </div>
  );
}
