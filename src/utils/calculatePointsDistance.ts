import { Point } from '../interfaces';

export default (a:Point, b:Point):number => {
  const deltaX:number = a.x - b.x;
  const deltaY:number = a.y - b.y;

  return ((deltaX * deltaX) + (deltaY * deltaY)) ** 0.5;
};