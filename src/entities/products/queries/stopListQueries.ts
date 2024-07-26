import {QueryClient, useQuery} from '@tanstack/react-query';
import {getStopListApi} from '../api/stopListApi';
import {StopListRequestModel} from '../types/stopListTypes';

const QUERY_KEY = 'STOP_LIST';

const getStopList = async (params: StopListRequestModel) => {
  const {data} = await getStopListApi(params);

  return data;
};

export const fetchProducts = (
  queryClient: QueryClient,
  params: StopListRequestModel,
) => {
  return queryClient.fetchQuery({
    queryKey: [QUERY_KEY, params.organizationId],
    queryFn: () => getStopList(params),
  });
};

export const useStopListQuery = (params: StopListRequestModel) => {
  return useQuery({
    queryKey: [QUERY_KEY, params.organizationId],
    queryFn: () => getStopList(params),
  });
};
