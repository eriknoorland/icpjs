import { Point, Transformation, instanceOfPoint } from '../src/interfaces';
import applyTranslation from '../src/utils/applyTranslation';

describe('testing applyTranslation function', () => {
  test('applying a translation to a list of point objects should return a list', () => {
    const points: Array<Point> = [{ x: 10, y: 10 }];
    const translation: Transformation = { x: 5, y: 5, phi: 0 };
    const actualResult: Array<Point> = applyTranslation(points, translation);
    
    expect(Array.isArray(actualResult)).toBe(true);
  });

  test('applying a translation to a list of point objects should return a list of point objects', () => {
    const points: Array<Point> = [{ x: 10, y: 10 }];
    const translation: Transformation = { x: 5, y: 5, phi: 0 };
    const actualResult: Array<Point> = applyTranslation(points, translation);
    
    expect(instanceOfPoint(actualResult[0])).toBe(true);
  });

  test('applying a translation to a list of point objects should return a list of translated point objects', () => {
    const points: Array<Point> = [{ x: 10, y: 10 }];
    const translation: Transformation = { x: 5, y: 5, phi: 0 };
    const expectedResult: Array<Point> = [{ x: 15, y: 15 }];
    const actualResult: Array<Point> = applyTranslation(points, translation);
    
    expect(actualResult).toStrictEqual(expectedResult);
  });
});