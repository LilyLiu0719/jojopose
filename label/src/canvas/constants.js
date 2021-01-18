const pointSize = 6;
export const pointAttr = {
  fill: "white",
  stroke: "black",
  strokeWidth: 2,
  width: pointSize,
  height: pointSize,
  offsetX: pointSize / 2,
  offsetY: pointSize / 2,
  draggable: true
};

export const lineAttr = {
  stroke: "black",
  strokeWidth: 4,
  lineCap: 'round',
  closed: false
};

export const maskLineAttr = {
  strokeEnabled: false,
  fill: 'black',
  closed: true
};