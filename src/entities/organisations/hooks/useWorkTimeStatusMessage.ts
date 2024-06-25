import {useMemo} from 'react';
import {getWeekdayIndexFromMonday} from '../utils/getWeekdayIndexFromMonday';
import {getCurrentLocalHour} from '../../../shared/utils/getCurrentLocalHour';

const timeToMinutes = (time: string) => {
  let [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const useWorkTimeStatusMessage = (workTime: string[]) => {
  const currentWeekDayIndex = getWeekdayIndexFromMonday(new Date());
  const todayWorkTime = workTime[currentWeekDayIndex];
  const nextDayWorkTime = workTime[(currentWeekDayIndex + 1) % 7];

  const currentLocalHour = getCurrentLocalHour();

  return useMemo(() => {
    const getStatusMessage = (
      localHour: string,
      range: string,
      nextDayRange: string,
    ) => {
      let [startTime, endTime] = range.split('-').map(timeToMinutes);
      let timeInMinutes = timeToMinutes(localHour + ':00');

      if (timeInMinutes >= startTime && timeInMinutes <= endTime) {
        return `Открыто до ${range.split('-')[1]}`;
      } else {
        const toRange = timeInMinutes >= endTime ? nextDayRange : range;

        return `Закрыто до ${toRange.split('-')[0]}`;
      }
    };

    return getStatusMessage(currentLocalHour, todayWorkTime, nextDayWorkTime);
  }, [currentLocalHour, todayWorkTime, nextDayWorkTime]);
};
