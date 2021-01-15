import React, { useState, useEffect, useRef } from "react"
import { Image, Layer } from "react-konva"
import useImage from "use-image"

import useStore from "../store"

// const IMAGE_NUMBER = 1 + Math.round(Math.random() * 1)
const IMAGE_URL = '2-3.png'

export default () => {
  const [image] = useImage(IMAGE_URL, "Anonymous")

  const setImageSize = useStore(state => state.setImageSize)
  const setScale = useStore(state => state.setScale)
  const setSize = useStore(state => state.setSize)
  const width = useStore(state => state.width)
  const height = useStore(state => state.height)

  useEffect(() => {
    if (!image) return

    const scale = Math.min(width / image.width, height / image.height)
    setScale(scale)
    setImageSize({ width: image.width, height: image.height })

    const ratio = image.width / image.height
    setSize({
      width: width,
      height: width / ratio
    })
  }, [image, width, height, setScale, setImageSize, setSize])

  const layerRef = useRef(null)

  return (
    <Layer ref={layerRef}>
      <Image image={image} />
    </Layer>
  )
}
