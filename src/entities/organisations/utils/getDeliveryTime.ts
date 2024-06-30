export const getDeliveryTime = (timeRange: string) => {
  const [startTime, endTime] = timeRange.split('-');

  let [endHours, endMinutes] = endTime.split(':').map(Number);

  endHours -= 1;

  if (endHours < 0) {
    endHours = 23;
  }

  const formattedEndHours = endHours.toString().padStart(2, '0');
  const formattedEndMinutes = endMinutes.toString().padStart(2, '0');

  return `${startTime}-${formattedEndHours}:${formattedEndMinutes}`;
};
