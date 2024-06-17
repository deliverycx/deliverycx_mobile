import {QueryClient, useQuery} from '@tanstack/react-query';
import {getCitiesApi} from '../api/citiesApi';
import {deleteFalseFromArr} from '../../../shared/utils/deleteFalseFromArr';

const QUERY_KEY = 'CITIES';

const getCities = async () => {
  const {data} = await getCitiesApi();

  // This is a workaround for the API response
  return deleteFalseFromArr(data);
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
