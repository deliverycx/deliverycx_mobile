import {useCallback} from 'react';
import {getCoordsByYandex} from '../utils/getCoordsByYandex';
import {useFetchYandexGeo} from './useFetchYandexGeo';
import {useOrgCity} from '../../../entities/organisations';

export const useGetPositionByStreetAndHouse = () => {
  const fetchYandexGeo = useFetchYandexGeo();
  const city = useOrgCity();

  return useCallback(
    async (street: string, house: string) => {
      const geoData = await fetchYandexGeo(`${city}, ${street}, ${house}`);

      if (!geoData) {
        return;
      }

      const coordsStr = getCoordsByYandex(geoData);

      if (!coordsStr) {
        return;
      }

      const [lon, lat] = coordsStr.split(' ');

      return {
        lon: +lon,
        lat: +lat,
      };
    },
    [fetchYandexGeo, city],
  );
};
