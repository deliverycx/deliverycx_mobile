import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {getOrganisationApi} from '../api/organisationApi';
import {
  OrganisationRequestModel,
  OrganisationResponseModel,
} from '../types/organisationsTypes';

const QUERY_KEY = 'ORGANISATION_DETAIL';

const getOrganisation = async (params: OrganisationRequestModel) => {
  const {data} = await getOrganisationApi(params);

  return data;
};

export const useOrganisationQuery = (
  params: OrganisationRequestModel,
  config?: Partial<UseQueryOptions<OrganisationResponseModel>>,
) => {
  return useQuery({
    ...config,
    queryKey: [QUERY_KEY, params.organizationId],
    queryFn: () => getOrganisation(params),
  });
};
