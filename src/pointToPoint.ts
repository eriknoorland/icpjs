import { Point } from './interfaces';
import calculatePointsDistance from './utils/calculatePointsDistance';

export default (point: Point, reference: Array<Point>): Point => {
  const numReferencePoints = reference.length;
  let closest = Infinity;
  let closestPoint: Point = { x: Infinity, y: Infinity };

  for (let i = 0; i < numReferencePoints; i += 1) {
    const referencePoint = reference[i];
    const dist = calculatePointsDistance(point, referencePoint);

    if (dist < closest) {
      closest = dist;
      closestPoint = referencePoint;
    }
  }

  return closestPoint;
};