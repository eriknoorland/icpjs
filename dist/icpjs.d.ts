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
interface Tranformation {
    x: number;
    y: number;
    phi: number;
}
interface Result {
    transformation: Tranformation;
    dataPoints: Array<Point>;
    numIterations: number;
}

declare const _default: Readonly<{
    run: (reference: Array<any>, data: Array<Point>, pose?: Pose, options?: Options) => Result;
    utils: {
        applyTranslation: (points: Point[], transformation: Tranformation) => Point[];
        applyRotation: (points: Point[], transformation: Tranformation) => Point[];
    };
}>;

export { _default as default };
