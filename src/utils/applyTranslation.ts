import { Point, Tranformation } from '../interfaces';

export default (points:Array<Point>, transformation:Tranformation):Array<Point> => points.map(point => ({
  x: point.x + transformation.x,
  y: point.y + transformation.y,
}));