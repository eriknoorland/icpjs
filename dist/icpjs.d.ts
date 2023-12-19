interface Options {
    maxIterations?: number;
    tolerance?: number;
}
interface Point {
    x: number;
    y: number;
}
interface Pose {
    x: number;
    y: number;
    phi: number;
}
interface Transformation {
    x: number;
    y: number;
    phi: number;
}
interface Result {
    transformation: Transformation;
    dataPoints: Array<Point>;
    numIterations: number;
}

declare const _default: Readonly<{
    run: (reference: Array<any>, data: Array<Point>, pose?: Pose, options?: Options) => Result;
    utils: {
        applyTranslation: (points: Point[], transformation: Transformation) => Point[];
        applyRotation: (points: Point[], transformation: Transformation) => Point[];
    };
}>;

export { _default as default };
