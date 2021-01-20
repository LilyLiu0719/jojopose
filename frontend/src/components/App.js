import React, { useState, useCallback, useRef, useEffect } from "react";
import { User } from "../contexts/user";

import Login from "./Login";
import Menu from "./Menu";
import Play from "./Play";
import Collection from "./Gallery";
import Shop from "./Shop";
import Setting from "./Setting";
import Label from "./Label";
import logo from "../static/img/logo.png";
import bgm from "../static/audio/bgm5.mp3";
import "./App.css";
import "./styles.css";

export default function App() {
  const [gameState, setGameState] = useState("Menu");
  const [user, setUser] = useState("a");
  const [volume, setVolume] = useState(50);
  const audioPlayer = useRef(null);

  const backToMenu = useCallback(() => setGameState("Menu"), [setGameState]);

  const handleLogout = () => {
    setGameState("Login");
    setUser(null);
  };

  useEffect(() => {
    audioPlayer.current.volume = volume / 100;
  }, [volume]);

  return (
    <div className="background">
      <audio loop ref={audioPlayer} volume={0} controls>
        <source src={bgm} type="audio/mpeg" />
      </audio>

      <div className="App">
        {gameState === "Login" || gameState === "Menu" ? (
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
              if (audioPlayer && audioPlayer.current) {
                audioPlayer.current.play();
              }
            }}
          />
        ) : (
          <User.Provider value={{ user, setUser }}>
            <div className="App-Content">
              {gameState === "Menu" ? (
                <Menu
                  onSelect={(val) => setGameState(val)}
                  onLogout={handleLogout}
                />
              ) : gameState === "Play" ? (
                <Play onToMenu={backToMenu} />
              ) : gameState === "Gallery" ? (
                <Collection onToMenu={backToMenu} />
              ) : gameState === "Shop" ? (
                <Shop onToMenu={backToMenu} />
              ) : gameState === "Setting" ? (
                <Setting
                  onToMenu={backToMenu}
                  setVolume={(v) => setVolume(v)}
                  volume={volume}
                />
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
