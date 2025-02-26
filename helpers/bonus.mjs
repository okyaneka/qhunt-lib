// _src/helpers/bonus.ts
var timeBonus = (seconds, totalSeconds, maxPoint = 1e3) => {
  return Math.round(maxPoint * (1 - seconds / totalSeconds));
};
var bonus = { timeBonus };
var bonus_default = bonus;

export { bonus_default as default, timeBonus };
