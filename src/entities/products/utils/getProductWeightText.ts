export const getProductWeightText = (measureUnit: string, weight: number) => {
  return measureUnit === 'шт' ? `1 ${measureUnit}` : `${weight} г`;
};
