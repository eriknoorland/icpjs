const xOffset = 150;
const yOffset = 200;
const phiOffset = -0.08;
const noiseOffset = 50;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const pose = { x: 0, y: 0, phi: 0 };
const reference = window.referenceLineSegments;

let points = window.icpjs.utils.applyTranslation(window.referencePoints, { x: xOffset, y: yOffset });
points = window.icpjs.utils.applyRotation(points, { phi: phiOffset });
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
const result = window.icpjs.run(reference, points, pose, {
  maxIterations: 30,
  tolerance: 2,
});
console.timeEnd('icp');

// plotPoints(context, window.referencePoints, 'blue', { xOffset: 40, yOffset: 40, scale: 0.25 });
plotLines(context, window.referenceLineSegments, 'black', { xOffset: 40, yOffset: 40, scale: 0.25 });
plotPoints(context, points, 'red', { xOffset: 40, yOffset: 40, scale: 0.25 });
plotPoints(context, result.dataPoints, 'green', { xOffset: 40, yOffset: 40, scale: 0.25 });

console.log('result:', result.transformation, result.numIterations);

function plotPoints(context, data, color, options = { xOffset: 0, yOffset: 0, scale: 1 }) {
  const { xOffset, yOffset, scale } = options;

  data.forEach(({ x, y }) => {
    context.fillStyle = color;
    context.beginPath();
    context.arc((x * scale) + xOffset, (y * scale) + yOffset, 1, 0, Math.PI * 2);
    context.fill();
  });
}

function plotLines(context, data, color, options = { xOffset: 0, yOffset: 0, scale: 0 }) {
  const { xOffset, yOffset, scale } = options;

  data.forEach(({ x1, y1, x2, y2 }) => {
    context.fillStyle = color;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo((x1 * scale) + xOffset, (y1 * scale) + yOffset);
    context.lineTo((x2 * scale) + xOffset, (y2 * scale) + yOffset);
    context.stroke();
  });
}