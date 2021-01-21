export function getPointAttr(pointSize) {
  return {
    fill: "white",
    stroke: "black",
    strokeWidth: 2,
    width: pointSize,
    height: pointSize,
    offsetX: pointSize / 2,
    offsetY: pointSize / 2,
    draggable: true,
  };
}

const pointSize = 6;
export const pointAttr = getPointAttr(pointSize);

export const lineAttr = {
  stroke: "black",
  strokeWidth: 4,
  lineCap: "round",
  lineJoin: "round",
  closed: false,
};

export const maskLineAttr = {
  strokeEnabled: false,
  fill: "black",
  closed: true,
};

export const outlineLineAttr = {
  stroke: "black",
  strokeWidth: 4,
  lineCap: "round",
  lineJoin: "round",
  closed: true,
};
