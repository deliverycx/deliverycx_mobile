import {useCallback} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {fetchYandexData, YandexResponseModel} from '../../../entities/geo';

export const useFetchYandexGeo = () => {
  const queryClient = useQueryClient();

  return useCallback(
    async (geocode: string): Promise<YandexResponseModel | void> => {
      try {
        return await fetchYandexData(queryClient, {
          geocode,
        });
      } catch (err) {
        console.error(err);
      }
    },
    [queryClient],
  );
};
