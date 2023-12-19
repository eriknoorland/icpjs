import { Point } from '../src/interfaces';
import pointLengthSquare from '../src/utils/pointLengthSquare';

describe('testing pointLengthSquare function', () => {
    test('squaring the point object should return a number', () => {
      const point: Point = { x: 10, y: 10 };
      const actualResult: number = pointLengthSquare(point);
      
      expect(typeof actualResult).toBe('number');
    });

  test('squaring the point object should return a correct value', () => {
    const point: Point = { x: 10, y: 10 };
    const expectedResult: number = 200;
    const actualResult: number = pointLengthSquare(point);
    
    expect(actualResult).toBe(expectedResult);
  });
});