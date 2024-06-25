export const getCurrentLocalHour = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {hour: '2-digit', hour12: false};

  return date.toLocaleTimeString('ru-RU', options);
};
