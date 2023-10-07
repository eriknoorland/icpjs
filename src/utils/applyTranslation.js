module.exports = (points, transformation) => points.map(point => ({
  x: point.x + transformation.x,
  y: point.y + transformation.y,
}));