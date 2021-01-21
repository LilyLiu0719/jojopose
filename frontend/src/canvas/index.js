import Konva from "konva";
import {
  pointAttr,
  lineAttr,
  maskLineAttr,
  outlineLineAttr,
} from "../canvas/constants";

const ratio = 0.75;
const IMAGE_WIDTH = 824;
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

const layerOutline = new Konva.Layer();
let polyOutline = new Konva.Line({
  points: flattenedPoints,
  ...outlineLineAttr,
});
layerOutline.add(polyOutline);

function initCanvas(width, height) {
  const scaledHeight = Math.min(height, Math.floor(width * ratio));
  const scaledWidth = Math.floor(scaledHeight / ratio);
  const stage = new Konva.Stage({
    container: "container",
    width: scaledWidth,
    height: scaledHeight,
  });

  stage.add(layerImg);
  stage.add(layerDraw);
  stage.add(layerMask);
  stage.add(layerOutline);

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
    const width = parent.clientWidth;
    const height = parent.clientHeight;

    const newWidth = IMAGE_WIDTH;
    const newHeight = Math.floor((IMAGE_WIDTH / image.width) * image.height);
    const offsetY = IMAGE_WIDTH * ratio - newHeight;

    backgroundImage.width(newWidth);
    backgroundImage.height(newHeight);
    backgroundImage.y(offsetY);
    backgroundImage.image(image);

    const scale = Math.min(height / ratio, width) / newWidth;
    const stage = layerImg.getStage();
    stage.scale({ x: scale, y: scale });

    layerImg.batchDraw();
    resetPoly();
  };
  image.src = src;
  layerImg.batchDraw();
}

export function resizeStage(stage, width, height) {
  if (!imageInfo) return;
  const scaledHeight = Math.min(height, Math.floor(width * ratio));
  const scaledWidth = Math.floor(scaledHeight / ratio);
  const scale = IMAGE_WIDTH / scaledWidth;
  const offsetY = Math.floor(
    scaledHeight - (scaledWidth / imageInfo.width) * imageInfo.height
  );

  stage.width(scaledWidth);
  stage.height(scaledHeight);
  stage.scale({ x: scale, y: scale });
  backgroundImage.y(offsetY);
  stage.draw();
}

export function downloadImage() {
  if (!finished) return;
  let dataURL = layerMask.toDataURL();
  downloadURI(dataURL, "outline.png");
  dataURL = layerOutline.toDataURL();
  downloadURI(dataURL, "mask.png");
}

export function getImageURI() {
  if (!finished) return;
  return {
    background: layerImg.toDataURL(),
    mask: layerMask.toDataURL(),
    outline: layerOutline.toDataURL(),
  };
}

export function downloadPreview() {
  if (!finished) return;
  layerImg.hide();
  layerDraw.hide();
  layerMask.show();
  layerOutline.show();
  layerMask.batchDraw();
  layerOutline.batchDraw();
}

export function backFromPreview() {
  if (!finished) return;
  layerImg.show();
  layerDraw.show();
  layerMask.hide();
  layerOutline.hide();
}
