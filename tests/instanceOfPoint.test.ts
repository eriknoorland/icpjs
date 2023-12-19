import { Point, instanceOfPoint } from '../src/interfaces';

describe('testing instanceOfPoint function', () => {
  test('instanceOfPoint should return a boolean value', () => {
    const point: Point = { x: 10, y: 10 };
    
    expect(typeof instanceOfPoint(point)).toBe('boolean');
  });

  test('instanceOfPoint should return true if the passed argument is a point object', () => {
    const point: Point = { x: 10, y: 10 };
    
    expect(instanceOfPoint(point)).toBe(true);
  });

  test('instanceOfPoint should return false if the passed argument is not a point object', () => {
    const point: any = { x1: 10, x2: 10, y1: 10, y2: 10 };
    
    expect(instanceOfPoint(point)).toBe(false);
  });
});