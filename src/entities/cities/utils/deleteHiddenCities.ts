import {City} from '../types/citiesTypes';

export const filterHiddenCities = (cities: City[]) => {
  return cities.filter(city => !(city.isHidden || city.isHiddenOnMobile));
};
