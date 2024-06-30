import {getWeekdayIndexFromMonday} from './getWeekdayIndexFromMonday';

export const getNextTimeRange = (workTime: string[]) => {
  const currentWeekDayIndex = getWeekdayIndexFromMonday(new Date());
  return workTime[(currentWeekDayIndex + 1) % 7];
};
