import { Point, LineSegment } from './interfaces';
import calculateLineSegmentDistance from './utils/calculateLineSegmentDistance';
import calculatePointsDistance from './utils/calculatePointsDistance';

export default (point: Point, reference: Array<LineSegment>): Point => {
  const numLineSegments = reference.length;
  let closest = Infinity;
  let closestPoint: Point = { x: Infinity, y: Infinity };

  for (let i = 0; i < numLineSegments; i += 1) {
    const lineSegment = reference[i];
    const referencePoint = calculateLineSegmentDistance(point, lineSegment);

    if (!referencePoint) {
      continue;
    }

    const dist = calculatePointsDistance(point, referencePoint);

    if (dist < closest) {
      closest = dist;
      closestPoint = referencePoint;
    }
  }

  return closestPoint;
};