import {useCallback} from 'react';
import {getYandexComponentName} from '../utils/getYandexComponentName';
import {Kind} from '../../../entities/geo';
import {useFetchYandexGeo} from './useFetchYandexGeo';
import {useGetKladr} from './useGetKladr';
import {Position} from '../../../shared/types/map';
import {useOrgCity} from '../../../entities/organisations';

export const useGetStreetAndHouseByPosition = () => {
  const fetchYandexGeo = useFetchYandexGeo();
  const getKladr = useGetKladr();
  const orgCity = useOrgCity();

  return useCallback(
    async ({lon, lat}: Position) => {
      const geoData = await fetchYandexGeo(`${lon},${lat}`);

      if (!geoData) {
        return;
      }

      const city = getYandexComponentName(geoData, Kind.locality);

      if (city !== orgCity) {
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
    [getKladr, fetchYandexGeo, orgCity],
  );
};
