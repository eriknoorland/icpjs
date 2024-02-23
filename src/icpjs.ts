import {
  Options,
  Point,
  Transformation,
  Pose,
  Result,
  isArrayOfPoints,
  isArrayOfLineSegments,
  LineSegment,
} from './interfaces';
import calculatePointsDistance from './utils/calculatePointsDistance';
import applyTranslation from './utils/applyTranslation';
import applyRotation from './utils/applyRotation';
import pointToPoint from './pointToPoint';
import pointToPlane from './pointToPlane';

export default (function() {
  const run = (
    reference: Array<Point | LineSegment>,
    data: Point[],
    pose: Pose = { x: 0, y: 0, phi: 0 },
    options: Options = {}
  ): Result => {
    if (!reference.length) {
      throw new Error('At least 1 reference point or line segment is required');
    }

    const isReferenceOfTypePoints = isArrayOfPoints(reference);
    const isReferenceOfTypeLineSegments = isArrayOfLineSegments(reference);
    const isDataOfTypePoints = isArrayOfPoints(data);

    if (!isReferenceOfTypePoints && !isReferenceOfTypeLineSegments) {
      throw new Error('The reference should either be an array of points or line segments');
    }

    if (!data.length) {
      throw new Error('At least 1 data point is required');
    }

    if (!isDataOfTypePoints) {
      throw new Error('The data should be an array of points');
    }

    const opts = {
      maxIterations: 20,
      tolerance: 0.1,
      ...options,
    };

    const numDataPoints = data.length;
    const transform: Transformation = { x: 0, y: 0, phi: 0 };
    let dataPoints: Point[] = [...data];
    let numIterations = 0;

    for (let i = 0; i < opts.maxIterations; i += 1) {
      let sampleCounter = 0;
      let crp_x1 = 0;
      let crp_x2 = 0;
      let crp_y1 = 0;
      let crp_y2 = 0;
      let crp_xx = 0;
      let crp_yy = 0;
      let crp_xy = 0;
      let crp_yx = 0;
      let sumAbsX = 0;
      let sumAbsY = 0;

      for (let j = 0; j < numDataPoints; j += 1) {
        const point = dataPoints[j];
        
        let closestPoint = null;

        if (isReferenceOfTypePoints) {
          closestPoint = pointToPoint(point, reference);
        }
        
        if (isReferenceOfTypeLineSegments) {
          closestPoint = pointToPlane(point, reference);
        }

        if (!closestPoint) {
          continue;
        }

        sampleCounter += 1;

        const p1: Point = {
          x: point.x - pose.x,
          y: point.y - pose.y,
        };

        const p2: Point = {
          x: closestPoint.x - pose.x,
          y: closestPoint.y - pose.y,
        };

        crp_x1 += p1.x;
        crp_x2 += p2.x;
        crp_y1 += p1.y;
        crp_y2 += p2.y;

        crp_xx += p1.x * p2.x;
        crp_yy += p1.y * p2.y;
        crp_xy += p1.x * p2.y;
        crp_yx += p1.y * p2.x;

        sumAbsX += Math.abs(p1.x - p2.x);
        sumAbsY += Math.abs(p1.y - p2.y);
      }

      const n = sampleCounter;

      // calculate S
      const sxx = crp_xx - crp_x1 * crp_x2 / n;
      const syy = crp_yy - crp_y1 * crp_y2 / n;
      const sxy = crp_xy - crp_x1 * crp_y2 / n;
      const syx = crp_yx - crp_y1 * crp_x2 / n;

      // calculate means
      const xm1 = crp_x1 / n;
      const ym1 = crp_y1 / n;
      const xm2 = crp_x2 / n;
      const ym2 = crp_y2 / n;

      const mean1: Point = { x: xm1, y: ym1 };
      const mean2: Point = { x: xm2, y: ym2 };

      const pointsCenterDifference = calculatePointsDistance(mean1, mean2);

      if (pointsCenterDifference < opts.tolerance) {
        break;
      }

      const transformation: Transformation = { x: 0, y: 0, phi: 0 };
      transformation.phi = Math.atan2(sxy - syx, sxx + syy);

      const c = Math.cos(transformation.phi);
      const s = Math.sin(transformation.phi);

      transformation.x = xm2 - (xm1 * c - ym1 * s);
      transformation.y = ym2 - (xm1 * s + ym1 * c);

      // let rotationPoint: Point = { x: xm2, y: ym2 };
      // rotationPoint += pose.phi;

      dataPoints = applyTranslation(dataPoints, transformation);
      dataPoints = applyRotation(dataPoints, transformation);

      transform.x += transformation.x;
      transform.y += transformation.y;
      transform.phi += transformation.phi;

      numIterations += 1;
    }

    return Object.freeze({
      transformation: transform,
      dataPoints,
      numIterations,
    });
  }

  return Object.freeze({
    run,
    utils: {
      applyTranslation,
      applyRotation,
    },
  });
})();