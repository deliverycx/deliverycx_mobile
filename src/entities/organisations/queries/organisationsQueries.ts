import {QueryClient, useQuery} from '@tanstack/react-query';
import {getOrganisationsApi} from '../api/organisationsApi';
import {OrganisationsRequestModel} from '../types/organisationsTypes';

const QUERY_KEY = 'ORGANISATIONS';

const getOrganisations = async (params: OrganisationsRequestModel) => {
  const {data} = await getOrganisationsApi(params);

  return data;
};

export const fetchOrganisations = (
  queryClient: QueryClient,
  params: OrganisationsRequestModel,
) => {
  return queryClient.fetchQuery({
    queryKey: [QUERY_KEY, params.cityId],
    queryFn: () => getOrganisations(params),
  });
};

export const useOrganisationsQuery = (params: OrganisationsRequestModel) => {
  return useQuery({
    queryKey: [QUERY_KEY, params.cityId],
    queryFn: () => getOrganisations(params),
  });
};
