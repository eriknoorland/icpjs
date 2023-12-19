import { Point } from '../src/interfaces';
import calculatePointsDistance from '../src/utils/calculatePointsDistance';

describe('testing calculatePointsDistance function', () => {
  test('calculating the distance between two point objects should return a number', () => {
    const point1: Point = { x: 10, y: 10 };
    const point2: Point = { x: 20, y: 20 };
    const actualResult: number = calculatePointsDistance(point1, point2);
    
    expect(typeof actualResult).toBe('number');
  });

  test('calculating the distance between two point objects should return the correct value', () => {
    const point1: Point = { x: 10, y: 10 };
    const point2: Point = { x: 20, y: 20 };
    const expectedResult: number = 14.142135623730951;
    const actualResult: number = calculatePointsDistance(point1, point2);
    
    expect(actualResult).toBe(expectedResult);
  });
});