import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../graphql";
import { User } from "../contexts/user";
import displayStatus from "../utils/displayStatus";

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
  const createUser = useMutation(CREATE_USER_MUTATION)[0];

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
            onLogin={(username, password) => {
              createUser({ variables: { username, password } })
                .then(({ data }) => {
                  if (data.createUser.ok) {
                    displayStatus({
                      type: "success",
                      msg: "Successfully logged in.",
                    });
                    setGameState("Menu");
                    setUser(data.createUser.user);
                  } else {
                    displayStatus({
                      type: "danger",
                      msg: "Wrong password or username is taken.",
                    });
                  }
                })
                .catch(() =>
                  displayStatus({
                    type: "danger",
                    msg: "Error occurred when trying to log in.",
                  })
                );
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
