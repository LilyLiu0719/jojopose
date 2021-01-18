import Konva from "konva";
import { pointAttr, lineAttr, maskLineAttr } from "../canvas/constants";

// States
const flattenedPoints = [];
const indicationPoints = [];
let finished = true;
let mouseOverFirstPoint = false;
let imageInfo = null;

// Konva variables
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

// Mask layer (for export)
const layerMask = new Konva.Layer();
let polyMask = new Konva.Line({ points: flattenedPoints, ...maskLineAttr });
layerMask.add(polyMask);

function initCanvas(width, height) {
  const stage = new Konva.Stage({
    container: "container",
    width: width,
    height: height,
  });

  stage.add(layerImg);
  stage.add(layerDraw);
  stage.add(layerMask);

  // Event handlers
  stage.on("mousemove", (evt) => {
    if (finished) return;
    const { x, y } = stage.getPointerPosition();
    indicationPoints[0] = x / stage.scaleX();
    indicationPoints[1] = y / stage.scaleY();
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
    addPoint(ind, pos.x / stage.scaleX(), pos.y / stage.scaleY());
    layerDraw.batchDraw();
  });

  stage.batchDraw();
  return stage;
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

function dragBound(pos) {
  const stage = this.getStage();
  return {
    x: Math.max(Math.min(pos.x, stage.width()), 0),
    y: Math.max(Math.min(pos.y, stage.height()), 0),
  };
}

function addPoint(ind, x, y) {
  // Add a new vertex to polygon
  flattenedPoints.push(x, y);

  // Add a rectangle to represent the vertex
  const newPoint = new Konva.Rect({
    x: x,
    y: y,
    dragBoundFunc: dragBound,
    ...pointAttr,
  });
  pointGroup.add(newPoint);

  // Attach event handlers
  newPoint.on("dragend dragmove", (evt) => {
    const { x, y } = evt.target.attrs;
    flattenedPoints[ind] = x;
    flattenedPoints[ind + 1] = y;
    if (flattenedPoints.length === ind + 2) {
      indicationPoints[0] = x;
      indicationPoints[1] = y;
      indicationPoints[2] = x;
      indicationPoints[3] = y;
    }
    layerDraw.batchDraw();
  });
  newPoint.on("mouseenter", (e) => {
    if (e.target.index !== 0 && !finished) return;
    newPoint.scale({ x: 2, y: 2 });
    layerDraw.batchDraw();
  });
  newPoint.on("mouseleave", (e) => {
    if (e.target.index !== 0 && !finished) return;
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

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // delete link;
}

// Public
export function initialize(width, height) {
  return initCanvas(width, height);
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
    const parent = document.getElementById("stage-parent");
    const scale = Math.min(
      parent.clientWidth / image.width,
      parent.clientHeight / image.height
    );

    const newHeight = Math.ceil(image.height * scale);
    const newWidth = Math.ceil(image.width * scale);
    imageInfo = { height: newHeight, width: newWidth };
    backgroundImage.width(newWidth);
    backgroundImage.height(newHeight);
    backgroundImage.image(image);

    const stage = layerImg.getStage();
    stage.width(newWidth);
    stage.height(newHeight);
    layerImg.batchDraw();
    resetPoly();
  };
  image.src = src;
  layerImg.batchDraw();
}

export function resizeStage(stage, width, height) {
  if (!imageInfo) return;
  const scale = Math.min(width / imageInfo.width, height / imageInfo.height);
  const newWidth = Math.floor(imageInfo.width * scale);
  const newHeight = Math.floor(imageInfo.height * scale);
  stage.width(newWidth);
  stage.height(newHeight);
  stage.scale({ x: scale, y: scale });
  stage.draw();
}

export function downloadImage() {
  if (!finished) return;
  const stage = layerDraw.getStage();
  const dataURL = stage.toDataURL();
  downloadURI(dataURL, "stage.png");
}

export function downloadPreview() {
  if (!finished) return;
  layerImg.hide();
  layerDraw.hide();
  layerMask.show();
  layerMask.batchDraw();
}

export function backFromPreview() {
  if (!finished) return;
  layerImg.show();
  layerDraw.show();
  layerMask.hide();
}
