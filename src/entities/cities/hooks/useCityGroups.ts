import {useMemo} from 'react';
import {useCitiesQuery} from '../queries/citiesQueries';
import {City} from '../types/citiesTypes';

type Options = {
  searchValue?: string;
};

export const useCityGroups = (options?: Options) => {
  const {data} = useCitiesQuery();

  const {searchValue} = options ?? {};

  const sortedData = useMemo(() => {
    if (!data) {
      return [];
    }

    return [...data].sort((a, b) => (a.name < b.name ? -1 : 1));
  }, [data]);

  const filteredData = useMemo(() => {
    if (!searchValue) {
      return sortedData;
    }

    return sortedData.filter(city =>
      city.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [sortedData, searchValue]);

  return useMemo(() => {
    const getMapOfGroupCities = filteredData.reduce((acc, city) => {
      const firstLetter = city.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(city);
      return acc;
    }, {} as Record<string, City[]>);

    return Object.entries(getMapOfGroupCities)
      .map(([letter, cities]) => ({
        title: letter,
        data: cities,
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [filteredData]);
};
