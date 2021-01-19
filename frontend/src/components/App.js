import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import io from 'socket.io-client';
import Peer from 'peerjs';
import Menu from './Menu'
import Play from './Play'
import Collection from './Collection'
import Shop from './Shop'
import Setting from './Setting'
import './App.css'

export default () => {
  const [gameState, setGameState] = useState("Menu")
  const id = uuidv4()
  const peer = new Peer(id)
  const socket = io(document.URL, { query: { id: id } })
  return (
    <>
      <div className="App" style={{ backgroundImage: 'url("jojo-dance.gif")' }}>
        <div className="Logo">

        </div>
        <div className="Content">
          {gameState === "Menu" ? (
            <Menu />
          ) : gameState === "Play" ? (
            <Play />
          ) : gameState === "Collection" ? (
            <Collection />
          ) : gameState === "Shop" ? (
            <Shop />
          ) : gameState === "Setting" ? (
            <Setting />
          ) : (
                      <></>
                    )
          }
        </div>
      </div>
    </>
  )
}