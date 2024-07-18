export const calculatePercentageDifference = (oldValue: number, newValue: number) => {
  const difference = newValue - oldValue;
  const sumValues = newValue + oldValue;
  return +(100 * Math.abs(difference / (sumValues / 2))).toFixed(2);
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
