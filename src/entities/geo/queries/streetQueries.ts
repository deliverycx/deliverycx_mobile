import {QueryClient, useIsFetching, useQuery} from '@tanstack/react-query';
import {getStreetApi} from '../api/streetApi';
import {StreetRequestModel} from '../types/streetTypes';
import {removeStreetsDuplicates} from '../utils/removeStreetsDuplicates';

export const QUERY_KEY = 'STREET_DATA';

const getStreetData = async (params: StreetRequestModel) => {
  const {data} = await getStreetApi(params);

  return removeStreetsDuplicates(data);
};

export const fetchStreetData = (
  queryClient: QueryClient,
  params: StreetRequestModel,
) => {
  return queryClient.fetchQuery({
    queryKey: [QUERY_KEY, params.organizationId],
    queryFn: () => getStreetData(params),
  });
};

export const useStreetDataQuery = (params: StreetRequestModel) => {
  return useQuery({
    queryKey: [QUERY_KEY, params.organizationId],
    queryFn: () => getStreetData(params),
  });
};

export const useIsStreetFetching = () => {
  return useIsFetching({queryKey: [QUERY_KEY]}) > 0;
};
