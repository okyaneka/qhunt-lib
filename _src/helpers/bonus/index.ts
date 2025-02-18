export const timeBonus = (
  seconds: number,
  totalSeconds: number,
  maxPoint: number = 1e3
) => {
  return Math.round(maxPoint * (1 - seconds / totalSeconds));
};

const bonus = { timeBonus } as const;

export default bonus;
