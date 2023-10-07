const calculateLineSegmentDistance = require('./utils/calculateLineSegmentDistance');
const calculatePointsDistance = require('./utils/calculatePointsDistance');

/**
 * Point to plane
 * @param {Object} point
 * @param {Array} reference
 * @returns {Object}
 */
module.exports = (point, reference) => {
  const numLineSegments = reference.length;
  let closest = Infinity;
  let closestPoint;

  for (let i = 0; i < numLineSegments; i += 1) {
    const lineSegment = reference[i];
    const referencePoint = calculateLineSegmentDistance(point, lineSegment);
    const dist = calculatePointsDistance(point, referencePoint);

    if (dist < closest) {
      closest = dist;
      closestPoint = referencePoint;
    }
  }

  return closestPoint;
};