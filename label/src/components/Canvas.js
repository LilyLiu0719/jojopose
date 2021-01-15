import React, { useState, useEffect } from 'react'
import { Stage, Layer, Group, Line, Rect } from "react-konva"
import BaseImage from './BaseImage'
// let isMouseOverStartPoint = false;
// const setIsMouseOverStartPoint = (v) => {
//   isMouseOverStartPoint = v;
// }
let counter = 0;

const Canvas = () => {
  const [isFinished, setIsFinished] = useState(false)
  const [isMouseOverStartPoint, setIsMouseOverStartPoint] = useState(false)
  const [points, setPoints] = useState([])
  const [mousePos, setMousePos] = useState([0, 0])

  const getMousePos = stage => {
    return [stage.getPointerPosition().x, stage.getPointerPosition().y]
  }

  const handleClick = (e) => {
    const stage = e.target.getStage()
    const mousePos = getMousePos(stage)

    if (isFinished) return
    if (isMouseOverStartPoint && points.length >= 3) {
      setIsFinished(true)
    } else {
      setPoints([...points, mousePos])
    }
  }
  const handleMouseMove = e => {
    const stage = e.target.getStage()
    setMousePos(getMousePos(stage))
  }

  const flattenedPoints = points
    .concat(isFinished ? [] : mousePos)
    .reduce((a, b) => a.concat(b), [])

  const handleMouseOverStartPoint = (e) => {
    if (isFinished || points.length < 3) return
    e.target.scale({ x: 2, y: 2 })
    setIsMouseOverStartPoint(true)
  }

  const handleMouseOutStartPoint = (e) => {
    e.target.scale({ x: 1, y: 1 })
    setIsMouseOverStartPoint(false)
  }

  const handleDragStartPoint = (e) => {
    // console.log("start", e)
  }
  const handleDragMovePoint = (e) => {
    const index = e.target.index - 1
    const pos = [e.target.x(), e.target.y()]
    // e.target.position({ x: points[index][0], y: points[index][1] })
    // console.log("move", e)
    console.log(pos)
    setPoints([...points.slice(0, index), pos, ...points.slice(index + 1)])
  }
  const handleDragEndPoint = (e) => {
    // console.log("end", e)
  }
  console.log(points, points[0])
  console.log(counter++)
  return (
    <Stage
      width={500}
      height={500}
      onMouseDown={handleClick}
      onMouseMove={handleMouseMove}
    >
      <BaseImage />
      <Layer>
        <Line
          points={flattenedPoints}
          stroke="black"
          strokeWidth={5}
          closed={isFinished}
          fill={isFinished ? '#f0f0f0ff' : 0}
          opacity={0.5}
        />
        {points.map((point, index) => {
          const width = 6
          const x = point[0] - width / 2
          const y = point[1] - width / 2
          const startPointAttr =
            index === 0
              ? {
                hitStrokeWidth: 12,
                onMouseOver: handleMouseOverStartPoint,
                onMouseOut: handleMouseOutStartPoint
              }
              : null
          return (
            <Rect
              key={index}
              x={x}
              y={y}
              width={width}
              height={width}
              fill="white"
              stroke="black"
              strokeWidth={3}
              onDragStart={handleDragStartPoint}
              onDragMove={handleDragMovePoint}
              onDragEnd={handleDragEndPoint}
              draggable
              {...startPointAttr}
            />
          )
        })}
      </Layer>

    </Stage>
  )
}
export default Canvas