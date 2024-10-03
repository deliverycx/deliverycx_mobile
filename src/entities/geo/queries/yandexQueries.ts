import {QueryClient, useIsFetching, useQuery} from '@tanstack/react-query';
import {getYandexApi} from '../api/yandexApi';
import {YandexRequestModel} from '../types/yandexTypes';

export const QUERY_KEY = 'YANDEX_DATA';

const getYandexData = async (params: YandexRequestModel) => {
  const {data} = await getYandexApi(params);

  return data;
};

export const fetchYandexData = (
  queryClient: QueryClient,
  params: YandexRequestModel,
) => {
  return queryClient.fetchQuery({
    queryKey: [QUERY_KEY, params.geocode, params.kind],
    queryFn: () => getYandexData(params),
  });
};

export const useYandexDataQuery = (params: YandexRequestModel) => {
  return useQuery({
    queryKey: [QUERY_KEY, params.geocode, params.kind],
    queryFn: () => getYandexData(params),
  });
};

export const useIsYandexDataFetching = () => {
  return useIsFetching({queryKey: [QUERY_KEY]}) > 0;
};
