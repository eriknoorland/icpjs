import { Point } from '../interfaces';

export default (a: Point, b: Point): number => {
  const deltaX = a.x - b.x;
  const deltaY = a.y - b.y;

  return ((deltaX * deltaX) + (deltaY * deltaY)) ** 0.5;
};