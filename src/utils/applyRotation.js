module.exports = (points, { phi }) => {
  const s = Math.sin(phi);
  const c = Math.cos(phi);

  return points.map(point => ({
    x: c * point.x - s * point.y,
    y: s * point.x + c * point.y,
  }));
};