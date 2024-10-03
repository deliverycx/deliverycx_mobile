import {
  useCurrentOrgStore,
  useOrganisationQuery,
} from '../../../entities/organisations';

export const useOrgCity = () => {
  const currentOrgId = useCurrentOrgStore(state => state.orgId);

  const {data} = useOrganisationQuery(
    {
      organizationId: currentOrgId!,
    },
    {
      enabled: !!currentOrgId,
    },
  );

  return data?.city ?? null;
};
