export const getToTime = (timeRange: string) => {
  return timeRange.split('-').at(1);
};
