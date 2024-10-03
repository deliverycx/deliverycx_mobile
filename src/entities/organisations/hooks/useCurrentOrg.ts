import {useEffect} from 'react';
import {useOrganisationQuery} from '../queries/organisationQueries';
import {useCurrentOrgStore} from '../stores/useCurrentOrgStore';

export const useCurrentOrg = () => {
  const orgId = useCurrentOrgStore(state => state.orgId);
  const deleteOrgInfo = useCurrentOrgStore(state => state.deleteOrgInfo);

  const {data, isFetched} = useOrganisationQuery(
    {organizationId: orgId!},
    {
      enabled: !!orgId,
    },
  );

  useEffect(() => {
    if (!data && isFetched) {
      // The organisation was closed or removed
      // We have to send a user to select a new organisation
      deleteOrgInfo();
    }
  }, [deleteOrgInfo, data, isFetched]);

  return {
    data,
    isFetched,
  };
};
