const corners = [
  { x: 0, y: 1200 },
  { x: 1188, y: 1200 },
  { x: 1188, y: 0 },
  { x: 2376, y: 0 },
  { x: 2376, y: 1200 },
  { x: 3564, y: 1200 },
  { x: 3564, y: 2400 },
  { x: 0, y: 2400 },
];

const lineSegments = corners.reduce((acc, corner, index, array) => {
  const isLastCorner = index === array.length - 1;
  const nextCorner = array[isLastCorner ? 0 : index + 1];

  acc.push({
    x1: corner.x,
    y1: corner.y,
    x2: nextCorner.x,
    y2: nextCorner.y,
  });

  return acc;
}, []);

module.exports = lineSegments;