import {QueryClient, useQuery, UseQueryOptions} from '@tanstack/react-query';
import {getOrgStatusApi} from '../api/orgStatusApi';
import {
  OrgStatusRequestModel,
  OrgStatusResponseModel,
} from '../types/orgOrgStatusTypes';

const QUERY_KEY = 'ORG_STATUS';

const getOrgStatus = async (params: OrgStatusRequestModel) => {
  const {data} = await getOrgStatusApi(params);

  return data;
};

export const fetchOrgStatus = (
  queryClient: QueryClient,
  params: OrgStatusRequestModel,
) => {
  return queryClient.fetchQuery({
    queryKey: [QUERY_KEY, params.organization],
    queryFn: () => getOrgStatus(params),
  });
};

export const useOrgStatusQuery = (
  params: OrgStatusRequestModel,
  config?: Partial<UseQueryOptions<OrgStatusResponseModel>>,
) => {
  return useQuery({
    queryKey: [QUERY_KEY, params.organization],
    queryFn: () => getOrgStatus(params),
    ...config,
  });
};
