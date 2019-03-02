'use strict';

function degree2Radian(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function getAngleTo(mx, my, px, py) {
    var distX = my - py;
    var distY = mx - px;
    var angle = Math.atan2(distX, distY) - Math.PI / 2;
    //var degrees = angle * 180/ Math.PI;
    return angle;
}

function getAngleX(length, angle) {
    return Math.cos(angle - Math.PI / 2) * length;
}

function getAngleY(length, angle) {
    return Math.sin(angle - Math.PI / 2) * length;
}

module.exports.getAngleTo = getAngleTo;
module.exports.getAngleX = getAngleX;
module.exports.getAngleY = getAngleY;
module.exports.degree2Radian = degree2Radian;