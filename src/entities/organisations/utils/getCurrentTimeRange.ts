import {getWeekdayIndexFromMonday} from './getWeekdayIndexFromMonday';

export const getCurrentTimeRange = (workTime: string[]) => {
  const currentWeekDayIndex = getWeekdayIndexFromMonday(new Date());
  return workTime[currentWeekDayIndex];
};
