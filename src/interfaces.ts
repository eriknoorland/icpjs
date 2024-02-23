export interface Options {
  maxIterations?: number,
  tolerance?: number,
}

export interface Point {
  x: number,
  y: number,
};

export interface LineSegment {
  x1: number,
  x2: number,
  y1: number,
  y2: number,
};

export interface Pose {
  x: number,
  y: number,
  phi: number,
};

export interface Transformation {
  x: number,
  y: number,
  phi: number,
};

export interface Result {
  transformation: Transformation,
  dataPoints: Array<Point>,
  numIterations: number,
};

export const instanceOfPoint = (object: any): object is Point => {
  return 'x' in object && 'y' in object;
}

export const instanceOfLineSegment = (object: any): object is LineSegment => {
  return 'x1' in object && 'x2' in object && 'y1' in object && 'y2' in object;
}