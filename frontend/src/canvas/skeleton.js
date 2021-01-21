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
    this.points = initPoints.map((p) => [...p]);
    this.lines = lineInfo.map((info, i) => [
      ...initPoints[info[0]],
      ...initPoints[info[1]],
    ]);
    this.pointGroup = new Konva.Group();
    this.lineGroup = new Konva.Group();
  }

  resetPos() {
    this.pointGroup.destroyChildren();
    this.lineGroup.destroyChildren();
    this.createShape();
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

  createShape() {
    const layer = this.pointGroup.getLayer();
    this.points.forEach((i, idx) => {
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
      this.pointGroup.add(p);
    });
    this.lines.forEach((i, ind) => {
      if (
        disabledPoints.has(lineInfo[ind][0]) ||
        disabledPoints.has(lineInfo[ind][1])
      ) {
        return null;
      }
      this.lineGroup.add(
        new Konva.Line({
          points: i,
          ...lineAttr,
          stroke: lineColor[ind],
        })
      );
    });
    layer.batchDraw();
  }

  connect(layer) {
    layer.add(this.lineGroup);
    layer.add(this.pointGroup);
  }

  static initialize() {
    const layerDraw = new Konva.Layer();
    const skeleton = new Skeleton();
    skeleton.connect(layerDraw);
    return { layer: layerDraw, skeleton };
  }
}
