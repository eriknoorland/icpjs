/**
 * Returns the distance between two given points
 * @param {Object} a
 * @param {Object} b
 * @returns {Number}
 */
module.exports = (a, b) => {
  const deltaX = a.x - b.x;
  const deltaY = a.y - b.y;

  return ((deltaX * deltaX) + (deltaY * deltaY)) ** 0.5;
};