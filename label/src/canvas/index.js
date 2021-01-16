import { pointAttr, lineAttr } from '../canvas/constants'

const flattenedPoints = [];
const indicationPoints = [];
let finished = false;
let mouseOverFirstPoint = false;

const width = window.innerWidth;
const height = window.innerHeight - 50;

const stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
})
const layerImg = new Konva.Layer();
const layerDraw = new Konva.Layer();
stage.add(layerImg);
stage.add(layerDraw);

let poly = new Konva.Line({ points: flattenedPoints, ...lineAttr });
layerDraw.add(poly);
const indicationLine = new Konva.Line({ points: indicationPoints, dash: [10, 10], ...lineAttr });
layerDraw.add(indicationLine);

export function getCanvas() {
    return { stage, layerImg, layerDraw, poly, indicationLine }
}

export function resetCanvasStates() {

}

export function clearPoints() {

}

function closePoly() {
    poly.closed(true);
    poly.fill('#f0f0f07f');
    finished = true;
    indicationPoints.splice(0, 4);
    layerDraw.batchDraw();
}