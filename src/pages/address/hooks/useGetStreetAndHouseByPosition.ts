import {useCallback} from 'react';
import {getYandexComponentName} from '../utils/getYandexComponentName';
import {Kind} from '../../../entities/geo';
import {useFetchYandexGeo} from './useFetchYandexGeo';
import {useGetKladr} from './useGetKladr';
import {Position} from '../../../shared/types/map';

export const useGetStreetAndHouseByPosition = () => {
  const fetchYandexGeo = useFetchYandexGeo();
  const getKladr = useGetKladr();

  return useCallback(
    async ({lon, lat}: Position) => {
      const geoData = await fetchYandexGeo(`${lon},${lat}`);

      if (!geoData) {
        return;
      }

      const kladr = await getKladr(geoData);

      if (!kladr) {
        return;
      }

      const house = getYandexComponentName(geoData, Kind.house);

      return {
        street: kladr.name,
        house,
      };
    },
    [getKladr, fetchYandexGeo],
  );
};
