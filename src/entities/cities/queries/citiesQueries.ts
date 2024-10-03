import {QueryClient, useQuery} from '@tanstack/react-query';
import {deleteFalseFromArr} from '../../../shared/utils/deleteFalseFromArr';
import {getCitiesApi} from '../api/citiesApi';
import {filterHiddenCities} from '../utils/deleteHiddenCities';

const QUERY_KEY = 'CITIES';

const getCities = async () => {
  const {data} = await getCitiesApi();

  // This is a workaround for the API response
  const dataWithoutFalse = deleteFalseFromArr(data);

  return filterHiddenCities(dataWithoutFalse);
};

export const fetchCities = (queryClient: QueryClient) => {
  return queryClient.fetchQuery({
    queryKey: [QUERY_KEY],
    queryFn: getCities,
  });
};

export const hasCities = (queryClient: QueryClient) => {
  return !!queryClient.getQueryData([QUERY_KEY]);
};

export const useCitiesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getCities,
  });
};
