import { Point, Transformation } from '../interfaces';

export default (points: Array<Point>, transformation: Transformation): Array<Point> => {
  const { phi } = transformation;
  const s = Math.sin(phi);
  const c = Math.cos(phi);

  return points.map(point => ({
    x: c * point.x - s * point.y,
    y: s * point.x + c * point.y,
  }));
};