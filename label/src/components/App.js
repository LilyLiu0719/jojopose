import React from "react"
import Canvas from "./Canvas"
import Panel from "./Panel"

export default () => {
  return (
    <>
      <div className="App">
        <div className="left-panel">
          <Panel />
        </div>
        <div className="right-panel">
          <Canvas />
        </div>
      </div>
    </>
  )
}
