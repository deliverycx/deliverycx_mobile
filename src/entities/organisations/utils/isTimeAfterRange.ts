export const isTimeAfterRange = (timeRange: string) => {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  const [_, endTime] = timeRange.split('-');

  const [endHours, endMinutes] = endTime.split(':').map(Number);

  const currentTimeInMinutes = currentHours * 60 + currentMinutes;
  const endTimeInMinutes = endHours * 60 + endMinutes;

  return currentTimeInMinutes > endTimeInMinutes;
};
