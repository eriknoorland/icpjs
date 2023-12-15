import {
  Options,
  Point,
  Tranformation,
  Pose,
  Result,
  instanceOfPoint,
  instanceOfLineSegment,
} from './interfaces';
import calculatePointsDistance from './utils/calculatePointsDistance';
import applyTranslation from './utils/applyTranslation';
import applyRotation from './utils/applyRotation';
import pointToPoint from './pointToPoint';
import pointToPlane from './pointToPlane';

export default (function() {
  const run = (
    reference:Array<any>,
    data:Array<Point>,
    pose:Pose = { x: 0, y: 0, phi: 0 },
    options:Options = {}
  ):Result => {
    if (!reference.length) {
      throw new Error('At least 1 reference point or line segment is required');
    }

    const referenceItem = reference[0];
    const isReferenceOfTypePoints = instanceOfPoint(referenceItem);
    const isReferenceOfTypeLineSegments = instanceOfLineSegment(referenceItem);

    if (!isReferenceOfTypePoints && !isReferenceOfTypeLineSegments) {
      throw new Error('The reference should either be an array of points or line segments');
    }

    if (!data.length) {
      throw new Error('At least 1 data point is required');
    }

    const isDataOfTypePoints = instanceOfPoint(data[0]);

    if (!isDataOfTypePoints) {
      throw new Error('The data should be an array of points');
    }

    const opts = {
      method: isReferenceOfTypeLineSegments ? pointToPlane : pointToPoint,
      maxIterations: 20,
      tolerance: 0.1,
      ...options,
    };

    const numDataPoints:number = data.length;
    const transform:Tranformation = { x: 0, y: 0, phi: 0 };
    let dataPoints:Array<Point> = [...data];
    let numIterations:number = 0;

    for (let i:number = 0; i < opts.maxIterations; i += 1) {
      let sampleCounter:number = 0;
      let crp_x1:number = 0;
      let crp_x2:number = 0;
      let crp_y1:number = 0;
      let crp_y2:number = 0;
      let crp_xx:number = 0;
      let crp_yy:number = 0;
      let crp_xy:number = 0;
      let crp_yx:number = 0;
      let sumAbsX:number = 0;
      let sumAbsY:number = 0;

      for (let j:number = 0; j < numDataPoints; j += 1) {
        const point:Point = dataPoints[j];
        const closestPoint:Point = opts.method(point, reference);

        if (!closestPoint) {
          continue;
        }

        sampleCounter += 1;

        const p1:Point = {
          x: point.x - pose.x,
          y: point.y - pose.y,
        };

        const p2:Point = {
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

      const n:number = sampleCounter;

      // calculate S
      const sxx:number = crp_xx - crp_x1 * crp_x2 / n;
      const syy:number = crp_yy - crp_y1 * crp_y2 / n;
      const sxy:number = crp_xy - crp_x1 * crp_y2 / n;
      const syx:number = crp_yx - crp_y1 * crp_x2 / n;

      // calculate means
      const xm1:number = crp_x1 / n;
      const ym1:number = crp_y1 / n;
      const xm2:number = crp_x2 / n;
      const ym2:number = crp_y2 / n;

      const mean1:Point = { x: xm1, y: ym1 };
      const mean2:Point = { x: xm2, y: ym2 };

      const pointsCenterDifference = calculatePointsDistance(mean1, mean2);

      if (pointsCenterDifference < opts.tolerance) {
        break;
      }

      const transformation:Tranformation = { x: 0, y: 0, phi: 0 };
      transformation.phi = Math.atan2(sxy - syx, sxx + syy);

      const c:number = Math.cos(transformation.phi);
      const s:number = Math.sin(transformation.phi);

      transformation.x = xm2 - (xm1 * c - ym1 * s);
      transformation.y = ym2 - (xm1 * s + ym1 * c);

      // let rotationPoint:Point = { x: xm2, y: ym2 };
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