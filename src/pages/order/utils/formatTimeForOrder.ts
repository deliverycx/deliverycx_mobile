export const formatTimeForOrder = (date: Date) => {
  return date.toLocaleString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
