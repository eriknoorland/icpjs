import { Point, instanceOfPoint } from '../src/interfaces';
import subtractPoints from '../src/utils/subtractPoints';

describe('testing subtractPoints function', () => {
  test('subtracting two point objects should result in a new point object', () => {
    const point1: Point = { x: 10, y: 10 };
    const point2: Point = { x: 5, y: 5 };
    const actualResult: Point = subtractPoints(point1, point2);
    
    expect(instanceOfPoint(actualResult)).toBe(true);
  });

  test('subtracting two point objects should result in a correct new point object', () => {
    const point1: Point = { x: 10, y: 10 };
    const point2: Point = { x: 5, y: 5 };
    const expectedResult: Point = { x: 5, y: 5 };
    const actualResult: Point = subtractPoints(point1, point2);
    
    expect(actualResult).toStrictEqual(expectedResult);
  });
});