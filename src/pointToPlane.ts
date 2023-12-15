import { Point, LineSegment } from './interfaces';
import calculateLineSegmentDistance from './utils/calculateLineSegmentDistance';
import calculatePointsDistance from './utils/calculatePointsDistance';

export default (point: Point, reference: Array<LineSegment>): Point => {
  const numLineSegments: number = reference.length;
  let closest: number = Infinity;
  let closestPoint: Point = { x: Infinity, y: Infinity };

  for (let i: number = 0; i < numLineSegments; i += 1) {
    const lineSegment: LineSegment = reference[i];
    const referencePoint: Point | null = calculateLineSegmentDistance(point, lineSegment);

    if (!referencePoint) {
      continue;
    }

    const dist: number = calculatePointsDistance(point, referencePoint);

    if (dist < closest) {
      closest = dist;
      closestPoint = referencePoint;
    }
  }

  return closestPoint;
};