const subtractPoints = require('./subtractPoints');
const pointLengthSquare = require('./pointLengthSquare');

module.exports = (point, { x1, y1, x2, y2 }) => {
  const a2 = pointLengthSquare(subtractPoints(point, { x: x2, y: y2 }));
  const b2 = pointLengthSquare(subtractPoints({ x: x1, y: y1 }, { x: x2, y: y2 }));
  const c2 = pointLengthSquare(subtractPoints(point, { x: x1, y: y1 }));

  if (c2 + b2 < a2) {
    return { x: x1, y:  y1 };
  }

  if (a2 + b2 < c2) {
    return { x: x2, y:  y2 };
  }

  let a = y1 - y2;
  let b = x2 - x1;
  let c = x1 * y2 - x2 * y1;
  let scale;


  if (b === 0) {
    if (a === 0) {
      // console.log('error, A or B must be non-zero');
      return;
    }

    scale = -a;
    a = -1;
    c /= scale;
  } else {
    scale = -b;
    a /= scale;
    b =  -1;
    c /= scale;
  }

  if (b !== 0) {
    if (b !== -1) {
      // console.log(`LineError: ${b} is not -1, fixing required`);
    }

    let x;

    if (a !== 0) {
      x = (point.x / a + point.y - c) / (a + 1.0 / a);
    } else {
      x = point.x;
    }

    return {
      x: x,
      y: a * x + c,
    }
  } else {
    if (a != -1) {
      // console.log(`LineError: ${a} is not -1 (should have been normalized, fixed for now).`);
    }

    return {
      x: c / -a,
      y: point.y,
    }
  }
};