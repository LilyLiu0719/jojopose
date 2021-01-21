import Konva from "konva";
import { getPointAttr, lineAttr } from "./constants";
import {
  initPoints,
  lineInfo,
  adj,
  lineColor,
  disabledPoints,
} from "./skeleton_constant";

function dragBound(pos) {
  const stage = this.getStage();
  return {
    x: Math.max(Math.min(pos.x, stage.width()), 0),
    y: Math.max(Math.min(pos.y, stage.height()), 0),
  };
}

export class Skeleton {
  constructor() {
    this.points = [...initPoints];
    this.lines = lineInfo.map((info, i) => [
      ...this.points[info[0]],
      ...this.points[info[1]],
    ]);
    this.pointObjs = [];
    this.lineObjs = [];
  }

  updatePoint(idx, x, y) {
    if (disabledPoints.has(idx)) {
      return;
    }
    this.points[idx][0] = x;
    this.points[idx][1] = y;
    adj[idx].forEach(({ idx, pos }) => {
      if (pos === 0) {
        this.lines[idx][0] = x;
        this.lines[idx][1] = y;
      } else {
        this.lines[idx][2] = x;
        this.lines[idx][3] = y;
      }
    });
  }

  materialize(layer) {
    this.pointObjs = this.points.map((i, idx) => {
      if (disabledPoints.has(idx)) {
        return null;
      }
      const p = new Konva.Rect({
        x: i[0],
        y: i[1],
        dragBoundFunc: dragBound,
        ...getPointAttr(12),
      });
      p.on("dragend dragmove", (evt) => {
        const { x, y } = evt.target.attrs;
        this.updatePoint(idx, x, y);
        layer.batchDraw();
      });
      return p;
    });
    this.lineObjs = this.lines.map((i, ind) => {
      if (
        disabledPoints.has(lineInfo[ind][0]) ||
        disabledPoints.has(lineInfo[ind][1])
      ) {
        return null;
      }
      return new Konva.Line({
        points: i,
        ...lineAttr,
        stroke: lineColor[ind],
      });
    });
    this.lineObjs.forEach((i) => i && layer.add(i));
    this.pointObjs.forEach((i) => i && layer.add(i));
    layer.batchDraw();
  }

  static initialize() {
    const layerDraw = new Konva.Layer({
      width: 824,
      height: 618,
    });
    const skeleton = new Skeleton();
    skeleton.materialize(layerDraw);
    return { layer: layerDraw, skeleton };
  }
}
