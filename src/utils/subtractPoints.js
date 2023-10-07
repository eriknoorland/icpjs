/**
 * Subtract one point from another and return a new point
 * @param {Object} p1
 * @param {Object} p2
 * @returns {Object}
 */
module.exports = (p1, p2) => ({ x: p1.x - p2.x, y: p1.y - p2.y });