import {useMemo} from 'react';

export const useKhinkaliCounterRequestDates = () => {
  return useMemo(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const getDateString = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    };
    return [getDateString(yesterday), getDateString(today)];
  }, []);
};
