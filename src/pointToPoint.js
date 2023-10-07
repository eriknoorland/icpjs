const calculatePointsDistance = require('./utils/calculatePointsDistance');

/**
 * Point to point
 * @param {Object} point
 * @param {Array} reference
 * @returns {Object}
 */
module.exports = (point, reference) => {
  const numReferencePoints = reference.length;
  let closest = Infinity;
  let closestPoint;

  for (let i = 0; i < numReferencePoints; i += 1) {
    const referencePoint = reference[i];
    const dist = calculatePointsDistance(point, referencePoint);

    if (dist < closest) {
      closest = dist;
      closestPoint = referencePoint;
    }
  }

  return closestPoint;
};