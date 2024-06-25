import {QueryClient, useQuery} from '@tanstack/react-query';
import {getYaPlaceApi} from '../api/orgYaPlaceApi';
import {OrgYaPlaceRequestModel} from '../types/orgYaPlaceTypes';

const QUERY_KEY = 'ORG_YA_PLACE';

const getYaPlace = async (params: OrgYaPlaceRequestModel) => {
  const {data} = await getYaPlaceApi(params);

  return data;
};

export const fetchOrgYaPlace = (
  queryClient: QueryClient,
  params: OrgYaPlaceRequestModel,
) => {
  return queryClient.fetchQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => getYaPlace(params),
  });
};

export const useOrgYaPlaceQuery = (params: OrgYaPlaceRequestModel) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => getYaPlace(params),
  });
};
