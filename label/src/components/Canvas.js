import React, { useState, useEffect } from 'react'
import Konva from "konva"
import { pointAttr, lineAttr } from '../canvas/constants'

const IMAGE_PATH = '2-3.png'
const width = window.innerWidth;
const height = window.innerHeight - 50;

const Canvas = () => {
  const { stage, layerImg, layerDraw } = React.useMemo(() => () => {
    const stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height
    })
    const layerImg = new Konva.Layer();
    const layerDraw = new Konva.Layer();
    stage.add(layerImg);
    stage.add(layerDraw);
    return { stage, layerImg, layerDraw }
  }, [])

  useEffect(() => {
    const flattenedPoints = [];
    let finished = false;
    let mouseOverFirstPoint = false;

    let poly = new Konva.Line({ points: flattenedPoints, ...lineAttr });
    layerDraw.add(poly);

    const indicationPoints = [];
    const indicationLine = new Konva.Line({ points: indicationPoints, dash: [10, 10], ...lineAttr });
    layerDraw.add(indicationLine);

    let imageObj = new Image();
    imageObj.onload = () => {
      console.log(imageObj.width, imageObj.heigh)
      const sc = Math.min(width / imageObj.width, height / imageObj.height);
      let image = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: imageObj.width * sc,
        height: imageObj.height * sc
      });
      layerImg.add(image);
      layerImg.batchDraw();
    };
    imageObj.src = IMAGE_PATH


    // stage.on('mousemove', (evt) => {
    //   if (finished) {
    //     return;
    //   }
    //   const { x, y } = stage.getPointerPosition();
    //   indicationPoints[0] = x;
    //   indicationPoints[1] = y;
    //   layerDraw.batchDraw();
    // });

    stage.on('click', () => {
      const pos = stage.getPointerPosition();
      const ind = flattenedPoints.length;
      if (finished) {
        return;
      }
      if (mouseOverFirstPoint && ind >= 6) {
        // mouse over first point and has at least 3 points
        poly.closed(true);
        poly.fill('#f0f0f07f');
        finished = true;
        indicationPoints.splice(0, 4);
        layerDraw.batchDraw();
        return;
      }

      flattenedPoints.push(pos.x, pos.y);

      const newPoint = new Konva.Rect({
        x: pos.x,
        y: pos.y,
        ...pointAttr
      });

      const updatePoint = (evt) => {
        const { x, y } = evt.target.attrs;
        flattenedPoints[ind] = x;
        flattenedPoints[ind + 1] = y;

        layerDraw.batchDraw();
      };

      newPoint.on('dragend dragmove', updatePoint);
      newPoint.on('mouseenter', () => {
        newPoint.scale({ x: 2, y: 2 });
        layerDraw.batchDraw();
      });
      newPoint.on('mouseleave', () => {
        newPoint.scale({ x: 1, y: 1 });
        layerDraw.batchDraw();
      });

      if (ind === 0) { // first point
        newPoint.on('mouseenter', () => {
          mouseOverFirstPoint = true;
        });
        newPoint.on('mouseleave', () => {
          mouseOverFirstPoint = false;
        });
      }
      indicationPoints[2] = pos.x;
      indicationPoints[3] = pos.y;
      layerDraw.add(newPoint);
      layerDraw.batchDraw();
    });

  })
  return (<div id="container" />
  )
}
export default Canvas