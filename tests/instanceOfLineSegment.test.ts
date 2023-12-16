import { LineSegment, instanceOfLineSegment } from '../src/interfaces';

describe('testing instanceOfLineSegment function', () => {
  test('instanceOfLineSegment should return a boolean value', () => {
    const lineSegment: LineSegment = { x1: 10, y1: 10, x2: 20, y2: 20 };
    
    expect(typeof instanceOfLineSegment(lineSegment)).toBe('boolean');
  });

  test('instanceOfLineSegment should return true if the passed argument is a lineSegment object', () => {
    const lineSegment: LineSegment = { x1: 10, y1: 10, x2: 20, y2: 20 };
    
    expect(instanceOfLineSegment(lineSegment)).toBe(true);
  });

  test('instanceOfLineSegment should return false if the passed argument is not a lineSegment object', () => {
    const lineSegment: any = { x: 10, y: 10 };
    
    expect(instanceOfLineSegment(lineSegment)).toBe(false);
  });
});