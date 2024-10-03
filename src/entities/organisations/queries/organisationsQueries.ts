import {QueryClient, useQuery, UseQueryOptions} from '@tanstack/react-query';
import {getOrganisationsApi} from '../api/organisationsApi';
import {
  OrganisationsRequestModel,
  OrganisationsResponseModel,
} from '../types/organisationsTypes';
import {filterHiddenOrganisations} from '../utils/filterHiddenOrganisations';

const QUERY_KEY = 'ORGANISATIONS';

const getOrganisations = async (params: OrganisationsRequestModel) => {
  const {data} = await getOrganisationsApi(params);

  return filterHiddenOrganisations(data);
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

export const useOrganisationsQuery = (
  params: OrganisationsRequestModel,
  config?: Partial<UseQueryOptions<OrganisationsResponseModel>>,
) => {
  return useQuery({
    ...config,
    queryKey: [QUERY_KEY, params.cityId],
    queryFn: () => getOrganisations(params),
  });
};
