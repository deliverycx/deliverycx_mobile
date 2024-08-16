import {useStreets} from './useStreets';
import {useCallback} from 'react';
import {getYandexComponentName} from '../utils/getYandexComponentName';
import {Kind, Street, YandexResponseModel} from '../../../entities/geo';

export const useGetKladr = () => {
  const streets = useStreets();

  return useCallback(
    async (geoData: YandexResponseModel): Promise<undefined | Street> => {
      if (!streets) {
        return;
      }

      const yandexStreet = getYandexComponentName(geoData, Kind.street);

      return streets.find(({name}) =>
        yandexStreet?.toLowerCase().includes(name.toLowerCase()),
      );
    },
    [streets],
  );
};
