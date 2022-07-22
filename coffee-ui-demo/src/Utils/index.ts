export const roundPrecision = (value: number, precision: number) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
