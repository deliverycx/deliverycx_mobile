import {useMemo} from 'react';

export const useWeekWorkTimeTemplate = (workTime: string[]) => {
  return useMemo(() => {
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    return workTime
      .map((time, index) => {
        return `${days[index]}: ${time}`;
      })
      .join('\n');
  }, [workTime]);
};
