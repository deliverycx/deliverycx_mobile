export const isCurrentTimeInRange = (range: string) => {
  const [startTimeStr, endTimeStr] = range.split('-');

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const [startHours, startMinutes] = startTimeStr.split(':').map(Number);
  const startTime = startHours * 60 + startMinutes;

  const [endHours, endMinutes] = endTimeStr.split(':').map(Number);
  const endTime = endHours * 60 + endMinutes;

  return currentTime >= startTime && currentTime <= endTime;
};
