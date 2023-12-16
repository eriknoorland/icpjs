import { Point, instanceOfPoint } from '../src/interfaces';
import pointToPoint from '../src/pointToPoint';

describe('testing pointToPoint function', () => {
  test('finding the closest point object in a reference point objects list should return a point object', () => {
    const points: Array<Point> = [{ x: 10, y: 10 }];
    const point: Point = { x: 5, y: 5 };
    const actualResult: Point = pointToPoint(point, points);
    
    expect(instanceOfPoint(actualResult)).toBe(true);
  });

  test('finding the closest point object in a reference point objects list should return the closest point object', () => {
    const points: Array<Point> = [{ x: 10, y: 10 }, { x: 20, y: 20 }];
    const point: Point = { x: 5, y: 5 };
    const expectedResult: Point = { x: 10, y: 10 };
    const actualResult: Point = pointToPoint(point, points);
    
    expect(actualResult).toStrictEqual(expectedResult);
  });

  test('finding the closest point object in an empty reference point objects list should return a point object to infinity', () => {
    const points: Array<Point> = [];
    const point: Point = { x: 5, y: 5 };
    const expectedResult: Point = { x: Infinity, y: Infinity };
    const actualResult: Point = pointToPoint(point, points);
    
    expect(actualResult).toStrictEqual(expectedResult);
  });
});