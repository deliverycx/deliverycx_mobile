import {useMemo} from 'react';
import {getNextTimeRange} from '../utils/getNextTimeRange';
import {getCurrentTimeRange} from '../utils/getCurrentTimeRange';
import {getCurrentLocalHour} from '../../../shared/utils/getCurrentLocalHour';

const timeToMinutes = (time: string) => {
  let [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const useWorkTimeStatusMessage = (workTime: string[]) => {
  const todayWorkTime = getCurrentTimeRange(workTime);
  const nextDayWorkTime = getNextTimeRange(workTime);

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
