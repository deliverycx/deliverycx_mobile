import {QueryClient, useQuery} from '@tanstack/react-query';
import {getKhinkaliCounterApi} from '../api/orgKhinkaliCounterApi';
import {OrgKhinkaliCounterRequestModel} from '../types/orgKhinkaliCounterTypes';

const QUERY_KEY = 'ORG_KHINKALI_COUNTER';

const getKhinkaliCounter = async (params: OrgKhinkaliCounterRequestModel) => {
  const {data} = await getKhinkaliCounterApi(params);

  return data;
};

export const fetchKhinkaliCounter = (
  queryClient: QueryClient,
  params: OrgKhinkaliCounterRequestModel,
) => {
  return queryClient.fetchQuery({
    queryKey: [
      QUERY_KEY,
      params.point,
      params.oldtime,
      params.time,
      params.phone,
    ],
    queryFn: () => getKhinkaliCounter(params),
  });
};

export const useKhinkaliCounterQuery = (
  params: OrgKhinkaliCounterRequestModel,
) => {
  return useQuery({
    queryKey: [
      QUERY_KEY,
      params.point,
      params.oldtime,
      params.time,
      params.phone,
    ],
    queryFn: () => getKhinkaliCounter(params),
  });
};
