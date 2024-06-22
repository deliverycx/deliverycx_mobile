const formatter = Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const getFormatPrice = (value: number) => {
  return formatter.format(value);
};
