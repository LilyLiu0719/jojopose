import React, { useState } from "react";
import { User } from "../contexts/user";

import Login from "./Login";
import Menu from "./Menu";
import Play from "./Play";
import Collection from "./Gallery";
import Shop from "./Shop";
import Setting from "./Setting";
import logo from "../static/img/logo.png";
import "./App.css";
import "./styles.css";

export default function App() {
  const [gameState, setGameState] = useState("Login");
  const [user, setUser] = useState(null);

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
                <Play onToMenu={() => setGameState("Menu")} />
              ) : gameState === "Gallery" ? (
                <Collection onToMenu={() => setGameState("Menu")} />
              ) : gameState === "Shop" ? (
                <Shop onToMenu={() => setGameState("Menu")} />
              ) : gameState === "Setting" ? (
                <Setting onToMenu={() => setGameState("Menu")} />
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
