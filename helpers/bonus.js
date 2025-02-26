'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// _src/helpers/bonus.ts
var timeBonus = (seconds, totalSeconds, maxPoint = 1e3) => {
  return Math.round(maxPoint * (1 - seconds / totalSeconds));
};
var bonus = { timeBonus };
var bonus_default = bonus;

exports.default = bonus_default;
exports.timeBonus = timeBonus;
