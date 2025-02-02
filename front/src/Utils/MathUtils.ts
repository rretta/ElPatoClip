import { Point, Rect } from "../types";

const isInsideRect = (point: Point, rect: Rect) => (
  point.x >= rect.x &&
  point.x <= (rect.x + rect.width) &&
  point.y >= rect.y &&
  point.y <= rect.y + rect.height
);

const clamp = (value: number, min: number, max: number) => (
  Math.min(max, Math.max(value, min))
);

const isNearPoint = (point1: Point, point2:Point, threshold: number) => (
  (Math.abs(point1.x - point2.x) <= threshold) &&
  (Math.abs(point1.y - point2.y) <= threshold)
);

const secondsToReadableText = (value:number, includeMilliseconds: boolean = false) => {
  const secondsTotal = Math.floor(value);
  const milliseconds = Math.floor((value - secondsTotal) * 100);
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = secondsTotal - (minutes * 60);
  let text = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  if (includeMilliseconds){
    text += `.${milliseconds.toString().padStart(2, '0')}`
  }
  return text;
};

const getNearestCorner = (point: Point, rect: Rect, threshold: number) => {
  if (isNearPoint(point, { x: rect.x, y: rect.y }, threshold)) {
    return '00';
  }

  if (isNearPoint(point, { x: rect.x + rect.width, y: rect.y }, threshold)) {
    return '10';
  }
  if (isNearPoint(point, { x: rect.x + rect.width, y: rect.y + rect.height }, threshold)) {
    return '11';
  }
  if (isNearPoint(point, { x: rect.x, y: rect.y + rect.height }, threshold)){
    return '01';
  }
  return null;
};

export const calcualtedInputAspectRatioBasednOutput = (input: Rect, output: Rect) => {
  let width = output.width;
  let height = output.height;

  const scaling = input.height / output.height;
  if (input.width > output.width * scaling) {
    height *= scaling; 
    width *= scaling;
  } else {
    const scaling2 = input.width / output.width;
    height *= scaling2;
    width *= scaling2;
  }

  const centerPoint = { x: input.x + (input.width / 2), y: input.y + (input.height / 2) };
  const centeredOrigin = MathUtils.subPosition(centerPoint, {
    x: width / 2,
    y: height /2
  });

  return { 
    x: centeredOrigin.x,
    y: centeredOrigin.y,
    width, 
    height 
  };
}

const addPosition = <T extends Point, U extends Point>(point1: T, point2: U): T => {
  return {
    ...point1,
    x: point1.x + point2.x,
    y: point1.y + point2.y
  }
}

const subPosition = <T extends Point, U extends Point>(point1: T, point2: U): T => {
  return {
    ...point1,
    x: point1.x - point2.x,
    y: point1.y - point2.y
  }
}

export const MathUtils = {
  clamp,
  isNearPoint,
  isInsideRect,
  secondsToReadableText,
  getNearestCorner,
  calcualtedInputAspectRatioBasednOutput,
  addPosition,
  subPosition
};