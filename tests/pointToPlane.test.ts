import { Point,LineSegment, instanceOfPoint } from '../src/interfaces';
import pointToPlane from '../src/pointToPlane';

describe('testing pointToPlane function', () => {
  test('finding the closest point object in a reference line segment objects list should return a point object', () => {
    const lineSegments: Array<LineSegment> = [{ x1: 10, y1: 10, x2: 20, y2: 20 }];
    const point: Point = { x: 5, y: 5 };
    const actualResult: Point = pointToPlane(point, lineSegments);
    
    expect(instanceOfPoint(actualResult)).toBe(true);
  });

  test('finding the closest point object in a reference line segment objects list should return the closest point object', () => {
    const lineSegments: Array<LineSegment> = [{ x1: 10, y1: 10, x2: 20, y2: 10 }, { x1: 50, y1: 50, x2: 60, y2: 50 }];
    const point: Point = { x: 5, y: 5 };
    const expectedResult: Point = { x: 10, y: 10 };
    const actualResult: Point = pointToPlane(point, lineSegments);
    
    expect(actualResult).toStrictEqual(expectedResult);
  });

  test('finding the closest point object in an empty reference line segment objects list should return a point object to infinity', () => {
    const lineSegments: Array<LineSegment> = [];
    const point: Point = { x: 5, y: 5 };
    const expectedResult: Point = { x: Infinity, y: Infinity };
    const actualResult: Point = pointToPlane(point, lineSegments);
    
    expect(actualResult).toStrictEqual(expectedResult);
  });
});