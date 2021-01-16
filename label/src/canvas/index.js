import Konva from "konva";
import { pointAttr, lineAttr } from "../canvas/constants";

// States
const flattenedPoints = [];
const indicationPoints = [];
let finished = false;
let mouseOverFirstPoint = false;

// Konva variables
const width = window.innerWidth;
const height = window.innerHeight - 50;

// Background image layer
const layerImg = new Konva.Layer();
const backgroundImage = new Konva.Image({
  x: 0,
  y: 0,
});
layerImg.add(backgroundImage);

// Foreground layer
const layerDraw = new Konva.Layer();
// The polygon
let poly = new Konva.Line({ points: flattenedPoints, ...lineAttr });
layerDraw.add(poly);
// Line connecting the last point and the cursor
const indicationLine = new Konva.Line({
  points: indicationPoints,
  dash: [10, 10],
  ...lineAttr,
});
layerDraw.add(indicationLine);
// Group of all points (Rects)
const pointGroup = new Konva.Group();
layerDraw.add(pointGroup);

function initCanvas() {
  const stage = new Konva.Stage({
    container: "container",
    width: width,
    height: height,
  });

  stage.add(layerImg);
  stage.add(layerDraw);

  // Event handlers
  stage.on("mousemove", (evt) => {
    if (finished) return;
    const { x, y } = stage.getPointerPosition();
    indicationPoints[0] = x;
    indicationPoints[1] = y;
    layerDraw.batchDraw();
  });

  stage.on("click", () => {
    if (finished) return;
    const ind = flattenedPoints.length;
    if (mouseOverFirstPoint && ind >= 6) {
      // mouse over first point and has at least 3 points
      closePoly();
      layerDraw.batchDraw();
      return;
    }

    const pos = stage.getPointerPosition();
    addPoint(ind, pos.x, pos.y);
    layerDraw.batchDraw();
  });

  stage.batchDraw();
}

// Private
function closePoly() {
  if (finished) return;
  poly.closed(true);
  poly.fill("#f0f0f07f");
  finished = true;
  indicationPoints.splice(0, 4);
}

function openPoly() {
  poly.closed(false);
  poly.fill(null);
  finished = false;
}

function addPoint(ind, x, y) {
  // Add a new vertex to polygon
  flattenedPoints.push(x, y);

  // Add a rectangle to represent the vertex
  const newPoint = new Konva.Rect({
    x: x,
    y: y,
    ...pointAttr,
  });
  pointGroup.add(newPoint);

  // Attach event handlers
  newPoint.on("dragend dragmove", (evt) => {
    const { x, y } = evt.target.attrs;
    flattenedPoints[ind] = x;
    flattenedPoints[ind + 1] = y;

    layerDraw.batchDraw();
  });
  newPoint.on("mouseenter", () => {
    newPoint.scale({ x: 2, y: 2 });
    layerDraw.batchDraw();
  });
  newPoint.on("mouseleave", () => {
    newPoint.scale({ x: 1, y: 1 });
    layerDraw.batchDraw();
  });

  if (ind === 0) {
    // is first point
    newPoint.on("mouseenter", () => {
      mouseOverFirstPoint = true;
    });
    newPoint.on("mouseleave", () => {
      mouseOverFirstPoint = false;
    });
  }

  // Update the line connecting cursor and the last point
  indicationPoints[2] = x;
  indicationPoints[3] = y;
}

// Public
export function initialize() {
  initCanvas();
}

export function resetPoly() {
  flattenedPoints.splice(0, flattenedPoints.length);
  indicationPoints.splice(0, indicationPoints.length);
  pointGroup.destroyChildren();
  openPoly();
  layerDraw.batchDraw();
}

export function updateImage(src) {
  let image = new Image();
  image.onload = () => {
    const scale = Math.min(width / image.width, height / image.height);
    backgroundImage.width(image.width * scale);
    backgroundImage.height(image.height * scale);
    backgroundImage.image(image);
    layerImg.batchDraw();
  };
  image.src = src;
  layerImg.batchDraw();
}
