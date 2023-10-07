const icpjs = require('../../dist/icpjs.min.js');
const referenceLineSegments = require('./referenceLineSegments');
const referencePoints = require('./referencePoints');

const xOffset = 150;
const yOffset = 200;
const phiOffset = -0.08;
const noiseOffset = 50;
const method = icpjs.methods.POINT_TO_PLANE;

const pose = { x: 0, y: 0, phi: 0 };
const reference = referenceLineSegments;

let points = icpjs.utils.applyTranslation(referencePoints, { x: xOffset, y: yOffset });
points = icpjs.utils.applyRotation(points, { phi: phiOffset });
points = points.map(point => ({
  x: point.x + ((Math.random() * noiseOffset) - (noiseOffset / 2)),
  y: point.y + ((Math.random() * noiseOffset) - (noiseOffset / 2)),
}));
// reduce amount of points to match number of lidar points (roughly)
points = points.reduce((acc, point, index) => {
  if (index % 3 === 0) {
    acc.push(point);
  }

  return acc;
}, []);

console.log('points offsets:', { x: xOffset, y: yOffset, phi: phiOffset });
console.log(`data noise: -${noiseOffset / 2} / ${noiseOffset / 2}`);
console.log(' ');

console.log('ICP');
console.time('icp');
const result = icpjs.run(reference, points, pose, {
  maxIterations: 30,
  tolerance: 2,
  method,
});
console.timeEnd('icp');

console.log('result:', result.transformation, result.numIterations);