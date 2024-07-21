import {QueryClient, useQuery} from '@tanstack/react-query';
import {getOrgSocialApi} from '../api/orgSocialApi';
import {OrgSocialRequestModel} from '../types/orgSocialTypes';

const QUERY_KEY = 'ORG_SOCIAL';

const getOrgSocial = async (params: OrgSocialRequestModel) => {
  const {data} = await getOrgSocialApi(params);

  return data;
};

export const fetchOrgSocial = (
  queryClient: QueryClient,
  params: OrgSocialRequestModel,
) => {
  return queryClient.fetchQuery({
    queryKey: [QUERY_KEY, params.idorganization],
    queryFn: () => getOrgSocial(params),
  });
};

export const useOrgSocialQuery = (params: OrgSocialRequestModel) => {
  return useQuery({
    queryKey: [QUERY_KEY, params.idorganization],
    queryFn: () => getOrgSocial(params),
  });
};
