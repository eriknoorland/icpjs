import { LineSegment, Point } from './interfaces';
import calculatePointsDistance from './utils/calculatePointsDistance';

export default (point:Point, reference:Array<Point>):Point => {
  const numReferencePoints:number = reference.length;
  let closest:number = Infinity;
  let closestPoint:Point = { x: Infinity, y: Infinity };

  for (let i:number = 0; i < numReferencePoints; i += 1) {
    const referencePoint:Point = reference[i];
    const dist:number = calculatePointsDistance(point, referencePoint);

    if (dist < closest) {
      closest = dist;
      closestPoint = referencePoint;
    }
  }

  return closestPoint;
};