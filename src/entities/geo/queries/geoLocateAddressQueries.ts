import {
  DefaultError,
  QueryClient,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import {getGeoLocateAddressDataApi} from '../api/geoLocateAddressApi';
import {
  GeoLocateAddressRequestModel,
  GeoLocateAddressResponseModel,
} from '../types/geoLocateAddressTypes';

const QUERY_KEY = 'DADATA_GEO_LOCATE_ADDRESS';

export const useAddressDataQuery = (
  params: GeoLocateAddressRequestModel,
  options?: Omit<
    UseQueryOptions<unknown, DefaultError, GeoLocateAddressResponseModel>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: [QUERY_KEY, params.lat, params.lon],
    queryFn: () => getGeoLocateAddressDataApi(params),
    ...options,
  });
};

export const fetchGeoLocateAddressData = (
  queryClient: QueryClient,
  params: GeoLocateAddressRequestModel,
) => {
  return queryClient.fetchQuery({
    queryKey: [QUERY_KEY, params.lat, params.lon],
    queryFn: () => getGeoLocateAddressDataApi(params),
  });
};
