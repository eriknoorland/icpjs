import { Point } from '../interfaces';

export default (p1: Point, p2: Point): Point => ({ x: p1.x - p2.x, y: p1.y - p2.y });