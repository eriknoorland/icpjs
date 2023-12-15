import { Point, Transformation } from '../interfaces';

export default (points:Array<Point>, transformation:Transformation):Array<Point> => points.map(point => ({
  x: point.x + transformation.x,
  y: point.y + transformation.y,
}));